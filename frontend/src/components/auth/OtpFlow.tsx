"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, KeyRound, Mail } from "lucide-react";
import { toast } from "sonner";

import Button from "@/components/common/Button";
import GoogleSignInButton from "@/components/common/GoogleSignInButton";
import Input from "@/components/common/Input";
import { useAuth } from "@/context/AuthContext";
import { otpRequestSchema, otpVerifySchema } from "@/lib/validation/auth";
import { extractError } from "@/types/auth";
import { requestOtp } from "@/services/auth.service";

type OtpFlowProps = {
  mode: "login" | "register";
};

/**
 * Unified OTP signup/login flow shared by /login and /register.
 *
 * Step 1 — enter an email → the backend emails a 6-digit code (always a
 * generic 200, so it never reveals whether an account exists).
 * Step 2 — enter the code → the backend logs the user in, or auto-creates a
 * brand-new account when the email is unknown.
 */
export default function OtpFlow({ mode }: OtpFlowProps) {
  const router = useRouter();
  const { loginWithOtp } = useAuth();

  const isLogin = mode === "login";

  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [inlineError, setInlineError] = useState("");

  const emailForm = useForm<{ email: string }>({
    resolver: zodResolver(otpRequestSchema),
    defaultValues: { email: "" },
  });

  // Validate just the otp field — the email is already known at this step.
  const otpForm = useForm<{ otp: string }>({
    resolver: zodResolver(otpVerifySchema.pick({ otp: true })),
    defaultValues: { otp: "" },
  });

  const heading = isLogin ? "Welcome back" : "Create your account";
  const subtext = isLogin
    ? "Enter your email and we'll send you a one-time code. No password needed."
    : "Sign up with just your email. We'll send you a one-time code.";

  const onEmailSubmit = async ({ email: value }: { email: string }) => {
    setSending(true);
    setInlineError("");
    try {
      await requestOtp(value);
      setEmail(value);
      setStep("otp");
      otpForm.reset();
    } catch (err) {
      // Generic toast — never reveal whether the account exists.
      toast.error(extractError(err, "Could not send a login code."));
    } finally {
      setSending(false);
    }
  };

  const onResend = async () => {
    if (!email) return;
    setResending(true);
    try {
      await requestOtp(email);
      toast.success("A fresh code is on its way.");
      otpForm.reset();
    } catch (err) {
      toast.error(extractError(err, "Could not resend the code."));
    } finally {
      setResending(false);
    }
  };

  const onVerifySubmit = async ({ otp }: { otp: string }) => {
    setVerifying(true);
    setInlineError("");
    try {
      const { user, isNewUser } = await loginWithOtp(email, otp);
      toast.success(
        isNewUser ? `Welcome to HamroBBA, ${user.username}!` : `Welcome back, ${user.username}!`
      );
      router.push("/");
      router.refresh();
    } catch (err) {
      const message = extractError(err, "That code didn't work. Please try again.");
      setInlineError(message);
      toast.error(message);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{heading}</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtext}</p>
      </div>

      {step === "email" ? (
        <>
          <GoogleSignInButton />

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
              or
            </span>
            <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          </div>

          <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4" noValidate>
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              error={emailForm.formState.errors.email?.message}
              hint="We'll email you a 6-digit code."
              {...emailForm.register("email")}
            />

            <Button type="submit" fullWidth size="lg" loading={sending}>
              Send login code
            </Button>
          </form>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setStep("email")}
            className="mb-4 inline-flex items-center gap-1 text-xs font-medium text-slate-500 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Change email
          </button>

          <form onSubmit={otpForm.handleSubmit(onVerifySubmit)} className="space-y-4" noValidate>
            <div className="flex items-start gap-3 rounded-xl border border-blue-200/60 bg-blue-50/60 p-4 dark:border-blue-500/20 dark:bg-blue-500/5">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
              <p className="text-sm text-slate-600 dark:text-slate-300">
                We sent a 6-digit code to{" "}
                <span className="font-semibold text-slate-800 dark:text-slate-100">{email}</span>.
                It expires in 10 minutes.
              </p>
            </div>

            <Input
              label="Login code"
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              autoComplete="one-time-code"
              placeholder="••••••"
              className="text-center text-lg font-semibold tracking-[0.3em]"
              error={otpForm.formState.errors.otp?.message || inlineError || undefined}
              {...otpForm.register("otp")}
            />

            <Button type="submit" fullWidth size="lg" loading={verifying}>
              <KeyRound className="h-4 w-4" />
              {isLogin ? "Log in" : "Verify & create account"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={onResend}
              disabled={resending}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-60 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {resending ? "Sending…" : "Resend code"}
            </button>
          </div>
        </>
      )}

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        {isLogin ? (
          <>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              Log in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
