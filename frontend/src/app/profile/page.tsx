"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BadgeCheck,
  Camera,
  KeyRound,
  Mail,
  Save,
  Shield,
  User as UserIcon,
} from "lucide-react";
import { toast } from "sonner";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import Select from "@/components/common/Select";
import Spinner from "@/components/common/Spinner";
import { useAuth } from "@/context/AuthContext";
import {
  getProfile,
  updateProfile,
} from "@/services/auth.service";
import { profileSchema, type ProfileValues } from "@/lib/validation/profile";
import { extractError } from "@/types/auth";

const SEMESTER_OPTIONS = [
  { value: "", label: "Select semester" },
  { value: "1st Semester", label: "1st Semester" },
  { value: "2nd Semester", label: "2nd Semester" },
  { value: "3rd Semester", label: "3rd Semester" },
  { value: "4th Semester", label: "4th Semester" },
  { value: "5th Semester", label: "5th Semester" },
  { value: "6th Semester", label: "6th Semester" },
  { value: "7th Semester", label: "7th Semester" },
  { value: "8th Semester", label: "8th Semester" },
];

const THEME_OPTIONS = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  


  // Profile form
  const profileForm = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      university: "",
      college: "",
      semester: "",
      phone: "",
      bio: "",
      theme_preference: "system",
      language: "en",
      timezone: "Asia/Kathmandu",
    },
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  // Load profile data
  useEffect(() => {
    const currentUser = user;
    if (!currentUser) return;

    // Fallback to username if first_name is empty
    const firstName = currentUser.first_name || currentUser.username || "";
    const lastName = currentUser.last_name || "";

    async function loadProfile() {
      try {
        const profile = await getProfile();
        profileForm.reset({
          first_name: firstName,
          last_name: lastName,
          university: profile.university || "",
          college: profile.college || "",
          semester: profile.semester || "",
          phone: profile.phone || "",
          bio: profile.bio || "",
          theme_preference: profile.theme_preference || "system",
          language: profile.language || "en",
          timezone: profile.timezone || "Asia/Kathmandu",
        });
        if (profile.avatar) {
          setAvatarPreview(profile.avatar);
        }
      } catch (err) {
        toast.error(extractError(err, "Failed to load profile."));
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user, profileForm]);

  // Handle profile update
  const onProfileSubmit = async (values: ProfileValues) => {
    setSaving(true);
    try {
      const updatedProfile = await updateProfile(values);
      if (user) {
        setUser({
          ...user,
          first_name: values.first_name || user.first_name,
          last_name: values.last_name || user.last_name,
          profile: {
            ...user.profile,
            ...updatedProfile,
          },
        });
      }
      toast.success("Profile updated successfully.");
    } catch (err) {
      toast.error(extractError(err, "Failed to update profile."));
    } finally {
      setSaving(false);
    }
  };

  // Show loading state while auth is hydrating
  if (authLoading || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Spinner className="h-8 w-8 text-blue-600" />
          <p className="text-sm text-slate-500 dark:text-slate-400">Loading profile…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const initials = (user.username || user.email || "?").slice(0, 2).toUpperCase();
  const memberSince = new Date(user.date_joined).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const verificationDate = user.profile.email_verified_at
    ? new Date(user.profile.email_verified_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Profile</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your account information and preferences.
        </p>
      </div>

      {/* Account Info Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
        <div className="flex items-start gap-5">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-slate-600 shadow-sm transition hover:bg-slate-300 dark:border-slate-900 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              aria-label="Change avatar"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* User Info */}
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {user.first_name || user.last_name
                ? `${user.first_name} ${user.last_name}`.trim()
                : user.username}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">@{user.username}</p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <UserIcon className="h-3.5 w-3.5" />
                {user.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" />
                {user.profile.email_verified ? (
                  <span className="text-green-600 dark:text-green-400">Email verified</span>
                ) : (
                  <span className="text-amber-600 dark:text-amber-400">Email not verified</span>
                )}
              </span>
              <span>Member since {memberSince}</span>
            </div>
          </div>
        </div>
      </div>

            {/* Sign-in Method */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Sign-in method</h2>
          {user.profile.email_verified ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-400">
              <BadgeCheck className="h-3.5 w-3.5" /> Verified
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
              <KeyRound className="h-3.5 w-3.5" /> Not verified
            </span>
          )}
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
            <Mail className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="font-medium text-slate-800 dark:text-slate-100">{user.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
            <KeyRound className="h-4 w-4 shrink-0 text-slate-400" />
            <span>
              You sign in with a 6-digit code emailed to you (or Google) — no password to remember.
            </span>
          </div>
          {user.profile.email_verified && verificationDate ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">Verified on {verificationDate}.</p>
          ) : null}
        </div>
      </div>
{/* Profile Information Form */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
        <h2 className="mb-5 text-lg font-bold text-slate-900 dark:text-white">Profile Information</h2>

        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-5" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="First name"
              placeholder="John"
              error={profileForm.formState.errors.first_name?.message}
              {...profileForm.register("first_name")}
            />
            <Input
              label="Last name"
              placeholder="Doe"
              error={profileForm.formState.errors.last_name?.message}
              {...profileForm.register("last_name")}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="University"
              placeholder="Tribhuvan University"
              error={profileForm.formState.errors.university?.message}
              {...profileForm.register("university")}
            />
            <Input
              label="College"
              placeholder="Your college name"
              error={profileForm.formState.errors.college?.message}
              {...profileForm.register("college")}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Select
              label="Semester"
              options={SEMESTER_OPTIONS}
              error={profileForm.formState.errors.semester?.message}
              {...profileForm.register("semester")}
            />
            <Input
              label="Phone"
              type="tel"
              placeholder="+977-98XXXXXXXX"
              error={profileForm.formState.errors.phone?.message}
              {...profileForm.register("phone")}
            />
          </div>

          <Textarea
            label="Bio"
            placeholder="Tell us a little about yourself…"
            rows={3}
            error={profileForm.formState.errors.bio?.message}
            {...profileForm.register("bio")}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <Select
              label="Theme preference"
              options={THEME_OPTIONS}
              error={profileForm.formState.errors.theme_preference?.message}
              {...profileForm.register("theme_preference")}
            />
          </div>

          <div className="flex justify-end border-t border-slate-100 pt-5 dark:border-slate-800">
            <Button type="submit" loading={saving}>
              <Save className="h-4 w-4 mr-2" />
              Save changes
            </Button>
          </div>
        </form>
      </div>

      </div>
  );
}