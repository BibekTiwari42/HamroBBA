import Cookies from "js-cookie";


// Token storage helpers, isolated so the api client can import them without
// pulling in the rest of the auth service (which would create a cycle).


const ACCESS_COOKIE = "access_token";
const REFRESH_COOKIE = "refresh_token";


const ACCESS_MAX_AGE_DAYS = 1 / 48; 
const REFRESH_MAX_AGE_DAYS = 7;

const isProd = process.env.NODE_ENV === "production";

export function setTokens(access: string, refresh: string, remember = true): void {
  if (remember) {
    Cookies.set(ACCESS_COOKIE, access, {
      sameSite: "lax",
      secure: isProd,
      expires: ACCESS_MAX_AGE_DAYS,
      path: "/",
    });
    Cookies.set(REFRESH_COOKIE, refresh, {
      sameSite: "lax",
      secure: isProd,
      expires: REFRESH_MAX_AGE_DAYS,
      path: "/",
    });
  } else {
    // Session-only cookies (cleared when the tab closes).
    Cookies.set(ACCESS_COOKIE, access, { sameSite: "lax", secure: isProd, path: "/" });
    Cookies.set(REFRESH_COOKIE, refresh, { sameSite: "lax", secure: isProd, path: "/" });
  }
}

export function getAccessToken(): string | undefined {
  return Cookies.get(ACCESS_COOKIE);
}

export function getRefreshToken(): string | undefined {
  return Cookies.get(REFRESH_COOKIE);
}

export function clearTokens(): void {
  Cookies.remove(ACCESS_COOKIE, { path: "/" });
  Cookies.remove(REFRESH_COOKIE, { path: "/" });
}
