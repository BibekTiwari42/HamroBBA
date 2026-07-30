import api from "./api";
import { setTokens, getRefreshToken, clearTokens } from "./tokens";

export { setTokens, getAccessToken, getRefreshToken, clearTokens } from "./tokens";


// Envelope helpers

// The backend wraps every success response as { success, message, data }.
// This helper unwraps it so call sites work with plain domain objects.
function unwrap<T>(response: { data: { success?: boolean; data?: T; message?: string } }): T {
  return response.data.data as T;
}


// Auth API calls

import type {
  AuthTokenResponse,
  AuthUser,
  OtpRequestPayload,
  OtpVerifyPayload,
  OtpVerifyResponse,
  ProfileUpdatePayload,
  UserProfile,
} from "@/types/auth";

/** POST /auth/otp/request/ — always 200; a code is emailed to ``email``. */
export async function requestOtp(email: string): Promise<void> {
  const payload: OtpRequestPayload = { email };
  await api.post("/auth/otp/request/", payload);
}

/** POST /auth/otp/verify/ — exchange the emailed code for a session. */
export async function verifyOtp(payload: OtpVerifyPayload): Promise<OtpVerifyResponse> {
  const res = await api.post("/auth/otp/verify/", payload);
  const data = unwrap<OtpVerifyResponse>(res);
  // Persist tokens immediately so the very next request is authenticated.
  setTokens(data.access, data.refresh);
  return data;
}

/** POST /auth/google/ — verify a Google ID token credential and log in. */
export async function googleLogin(credential: string): Promise<AuthTokenResponse> {
  const res = await api.post("/auth/google/", { credential });
  const data = unwrap<AuthTokenResponse>(res);
  // Same token persistence as the OTP flow.
  setTokens(data.access, data.refresh);
  return data;
}

export async function logout(): Promise<void> {
  const refresh = getRefreshToken();
  try {
    await api.post("/auth/logout/", { refresh });
  } finally {
    clearTokens();
  }
}

export async function refreshAccessToken(refresh: string): Promise<AuthTokenResponse> {
  const res = await api.post("/auth/refresh/", { refresh });
  const data = unwrap<AuthTokenResponse>(res);
  setTokens(data.access, data.refresh);
  return data;
}

export async function getMe(): Promise<AuthUser> {
  const res = await api.get("/auth/me/");
  return unwrap<AuthUser>(res);
}

export async function getProfile(): Promise<UserProfile> {
  const res = await api.get("/auth/profile/");
  return unwrap<UserProfile>(res);
}

export async function updateProfile(payload: ProfileUpdatePayload): Promise<UserProfile> {
  const res = await api.patch("/auth/profile/", payload);
  return unwrap<UserProfile>(res);
}