import { z } from "zod";

/**
 * zod schemas for the profile form.
 *
 * Mirrors the backend UserProfile model fields and validators.
 */

export const profileSchema = z.object({
  first_name: z.string().max(30, "First name may not exceed 30 characters.").optional(),
  last_name: z.string().max(30, "Last name may not exceed 30 characters.").optional(),
  university: z.string().max(255, "University may not exceed 255 characters.").optional(),
  college: z.string().max(255, "College may not exceed 255 characters.").optional(),
  semester: z.string().max(100, "Semester may not exceed 100 characters.").optional(),
  phone: z
    .string()
    .max(20, "Phone number may not exceed 20 characters.")
    .regex(/^[+]?[\d\s()-]*$/, "Enter a valid phone number.")
    .optional(),
  bio: z.string().max(500, "Bio may not exceed 500 characters.").optional(),
  theme_preference: z.enum(["light", "dark", "system"]).optional(),
  language: z.string().max(10).optional(),
  timezone: z.string().max(50).optional(),
});

export type ProfileValues = z.infer<typeof profileSchema>;
