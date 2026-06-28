"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() =>
        setTheme(
          theme === "dark"
            ? "light"
            : "dark"
        )
      }
      className="
        rounded-xl
        px-3
        py-2
        text-sm
        hover:bg-slate-100
        dark:hover:bg-blue-600
      "
    >
      {theme === "dark"
        ? "☀️"
        : "🌙"}
    </button>
  );
}