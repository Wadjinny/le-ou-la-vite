import { useContext, useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";
import { ThemeContext } from "../context/theme";

function subscribeSystemTheme(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getSystemIsDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export const NavBar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const systemIsDark = useSyncExternalStore(subscribeSystemTheme, getSystemIsDark, () => false);
  const isDark = theme === "dark" || (theme === "system" && systemIsDark);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 pb-2 pt-6">
      <div className="flex items-center gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center text-[15px] font-bold text-white"
          style={{
            background: "var(--indigo)",
            borderRadius: "var(--r-ctrl)",
          }}
          aria-hidden
        >
          L
        </div>
        <div>
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: "var(--g900)" }}
          >
            Le ou La
          </h1>
          <p className="text-[12.5px] font-medium" style={{ color: "var(--g400)" }}>
            Genre des noms français
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={toggleTheme}
        className="sr-icon-btn"
        aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
      >
        {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
      </button>
    </header>
  );
};
