"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import type { AuthUser } from "@/types/auth";
import {
  getMe,
  googleLogin as googleLoginRequest,
  logout as logoutRequest,
  verifyOtp as verifyOtpRequest,
} from "@/services/auth.service";
import { clearTokens, getAccessToken } from "@/services/tokens";

interface OtpLoginResult {
  user: AuthUser;
  /** True when the email had no account and the backend auto-created one. */
  isNewUser: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  /** True only during the initial /me hydration on mount. */
  isLoading: boolean;
  /**
   * Unified OTP signup/login: exchange the emailed 6-digit code for a
   * session. Unknown emails get an account auto-created by the backend.
   */
  loginWithOtp: (email: string, otp: string) => Promise<OtpLoginResult>;
  /** Log in with a Google ID token credential. */
  googleLogin: (credential: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
  /** Replace the cached user (e.g. after a profile update). */
  setUser: (user: AuthUser | null) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount: if a token cookie exists, hydrate the user via /me.
  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      const token = getAccessToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const me = await getMe();
        if (!cancelled) setUser(me);
      } catch {
        // Token invalid/expired and refresh failed — drop it.
        if (!cancelled) {
          clearTokens();
          setUser(null);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    hydrate();
    return () => {
      cancelled = true;
    };
  }, []);

  const loginWithOtp = useCallback(async (email: string, otp: string): Promise<OtpLoginResult> => {
    const data = await verifyOtpRequest({ email, otp });
    const me = await getMe();
    setUser(me);
    return { user: me, isNewUser: data.is_new_user };
  }, []);

  const googleLogin = useCallback(async (credential: string): Promise<AuthUser> => {
    await googleLoginRequest(credential);
    const me = await getMe();
    setUser(me);
    return me;
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await logoutRequest();
    } finally {
      clearTokens();
      setUser(null);
    }
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    loginWithOtp,
    googleLogin,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}