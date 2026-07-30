import { z } from "zod";

/**
 * zod schemas for the auth (OTP) forms.
 */

export const emailSchema = z
  .string()
  .min(1, "Email is required.")
  .email("Enter a valid email address.")
  .transform((v) => v.trim().toLowerCase());

// The 6-digit one-time code emailed to the user.
export const otpSchema = z
  .string()
  .length(6, "The code is 6 digits long.")
  .regex(/^\d{6}$/, "Enter the 6-digit code sent to your email.");

export const otpRequestSchema = z.object({
  email: emailSchema,
});

export const otpVerifySchema = z.object({
  email: emailSchema,
  otp: otpSchema,
});

export type OtpRequestValues = z.infer<typeof otpRequestSchema>;
export type OtpVerifyValues = z.infer<typeof otpVerifySchema>;