import axios, { type AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

import { clearTokens, getRefreshToken, setTokens } from "./tokens";

const ACCESS_COOKIE = "access_token";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});


// Request interceptor: attach the access token to every request.

api.interceptors.request.use((config) => {
  const token = Cookies.get(ACCESS_COOKIE);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// Response interceptor: transparent single-flight 401 → refresh → retry.

// When a request returns 401 and we have a refresh token, attempt exactly one
// refresh; every other 401 that arrives concurrently awaits the same promise
// so we never fire multiple refreshes at once. On refresh failure we clear
// tokens and bounce to /login.

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;
const waitingQueue: Array<(token: string | null) => void> = [];

function onTokenRefreshed(token: string | null): void {
  waitingQueue.forEach((cb) => cb(token));
  waitingQueue.length = 0;
}

function shouldRefresh(error: AxiosError): boolean {
  const retry = (error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined)?._retry;
  return error.response?.status === 401 && !retry;
}

async function doRefresh(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  try {
    // Use a bare axios call so the response interceptor doesn't recurse.
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh/`,
      { refresh },
      { headers: { "Content-Type": "application/json" } }
    );
    const access: string | undefined = res.data?.data?.access;
    const newRefresh: string | undefined = res.data?.data?.refresh;
    if (!access) return null;
    setTokens(access, newRefresh ?? refresh);
    return access;
  } catch {
    clearTokens();
    return null;
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Only attempt a refresh once per request, and never on the auth endpoints
    // themselves (otp request/verify, google, refresh) to avoid loops.
    const isAuthEndpoint = (original?.url ?? "").includes("/auth/otp/")
      || (original?.url ?? "").includes("/auth/google")
      || (original?.url ?? "").includes("/auth/refresh");

    if (!shouldRefresh(error) || isAuthEndpoint) {
      return Promise.reject(error);
    }

    // Start (or join) the in-flight refresh.
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = doRefresh().finally(() => {
        isRefreshing = false;
      });
    } else {
      refreshPromise ??= Promise.resolve(null);
    }

    const newToken = await refreshPromise;

    // If refresh failed, reject the original request; the caller decides
    // whether to redirect to /login.
    if (!newToken) {
      onTokenRefreshed(null);
      return Promise.reject(error);
    }

    // Fan the new token out to the queued requests.
    if (waitingQueue.length) onTokenRefreshed(newToken);

    original._retry = true;
    original.headers = original.headers ?? ({} as Record<string, string>);
    (original.headers as Record<string, string>).Authorization = `Bearer ${newToken}`;
    return api(original as AxiosRequestConfig);
  }
);

export default api;
