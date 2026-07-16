import { createContext, useState, useEffect, type ReactNode } from "react";
import type { themeType } from "../types/utils";

export type ThemeContextType = {
  theme: themeType;
  setTheme: (theme: themeType) => void;
};

function resolveTheme(theme: themeType): "light" | "dark" {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return theme;
}

function getInitialTheme(): themeType {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }
  return "system";
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<themeType>(() => getInitialTheme());

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const resolved = resolveTheme(theme);
    document.documentElement.classList.toggle("dark", resolved === "dark");
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      document.documentElement.classList.toggle("dark", mq.matches);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
};
