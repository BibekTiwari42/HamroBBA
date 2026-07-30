// Domain types for authentication. These mirror the JSON shapes returned by
// the Django accounts API (see apps/accounts/serializers.py). Auth is OTP +
// Google only .

export type UserRole = "student" | "admin";

export interface UserProfile {
  role: UserRole;
  avatar: string | null;
  university: string;
  college: string;
  semester: string;
  phone: string;
  bio: string;
  theme_preference: "light" | "dark" | "system";
  language: string;
  timezone: string;
  email_verified_at: string | null;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  date_joined: string;
  profile: UserProfile;
}

// Shape returned by the OTP-verify and Google login endpoints.
export interface AuthTokenResponse {
  access: string;
  refresh: string;
  user: AuthUser;
}

// OTP-verify additionally tells the client whether the account was just
// auto-created (the email had no account yet).
export interface OtpVerifyResponse extends AuthTokenResponse {
  is_new_user: boolean;
}

export interface OtpRequestPayload {
  email: string;
}

export interface OtpVerifyPayload {
  email: string;
  otp: string;
}

export interface ProfileUpdatePayload {
  first_name?: string;
  last_name?: string;
  university?: string;
  college?: string;
  semester?: string;
  phone?: string;
  bio?: string;
  theme_preference?: "light" | "dark" | "system";
  language?: string;
  timezone?: string;
}

/**
 * Normalised error shape returned by the custom DRF exception handler:
 *   { success: false, errors: { ... } }
 * where errors is either a field-keyed object (validation) or a string.
 */
export interface ApiErrorResponse {
  success: false;
  message?: string;
  errors: Record<string, string | string[]> | { detail: string };
}

/** Pull the first error message out of an ApiErrorResponse for a toast. */
export function extractError(err: unknown, fallback = "Something went wrong."): string {
  const data = (err as { data?: ApiErrorResponse })?.data;
  const errors = data?.errors;

  if (typeof errors === "string") return errors;
  if (errors && typeof errors === "object") {
    if ("detail" in errors && typeof errors.detail === "string") return errors.detail;
    for (const value of Object.values(errors)) {
      if (Array.isArray(value) && value.length) return value[0];
      if (typeof value === "string") return value;
    }
  }
  return data?.message ?? fallback;
}