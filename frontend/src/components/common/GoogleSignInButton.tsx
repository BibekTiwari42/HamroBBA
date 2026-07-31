"use client";

import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";

import { useAuth } from "@/context/AuthContext";
import { extractError } from "@/types/auth";

/**
 * Google Sign-In button that exchanges a Google ID token credential for a
 * HamroBBA JWT (via the /auth/google/ endpoint) and redirects home.
 * Reused by both the login and register pages.
 */
export default function GoogleSignInButton() {
  const router = useRouter();
  const { googleLogin } = useAuth();

  return (
    <div className="flex w-full justify-center">
      <GoogleLogin
        onSuccess={async ({ credential }) => {
          if (!credential) {
            toast.error("Google login failed. Please try again.");
            return;
          }
          try {
            const user = await googleLogin(credential);
            toast.success(`Welcome, ${user.username}!`);
            router.push("/");
            router.refresh();
          } catch (err) {
            toast.error(extractError(err, "Could not sign in with Google."));
          }
        }}
        onError={() => toast.error("Google sign-in failed. Please try again.")}
        useOneTap={false}
        shape="pill"
        theme="outline"
        text="continue_with"
        size="large"
        width="100%"
      />
    </div>
  );
}