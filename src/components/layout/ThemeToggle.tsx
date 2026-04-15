"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <button
      onClick={() => setTheme(mounted && theme === "dark" ? "light" : "dark")}
      aria-label={mounted && theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
      aria-pressed={mounted ? theme === "dark" : undefined}
      className="flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <span suppressHydrationWarning aria-hidden="true">
        {mounted && theme === "dark" ? (
          <Sun className="size-5" />
        ) : (
          <Moon className="size-5" />
        )}
      </span>
    </button>
  );
}
