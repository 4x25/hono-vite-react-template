import { useEffect, useSyncExternalStore } from "react";
import { useLocalStorageState } from "ahooks";

const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
const subscribe = (onChange: () => void) => {
  darkModeQuery.addEventListener("change", onChange);
  return () => darkModeQuery.removeEventListener("change", onChange);
};

export function useTheme() {
  const prefersDark = useSyncExternalStore(subscribe, () => darkModeQuery.matches);
  const [preference, setPreference] = useLocalStorageState<"light" | "dark">("app-theme");
  const theme = preference === "light" || preference === "dark"
    ? preference
    : prefersDark ? "dark" : "light";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return { theme, toggleTheme: () => setPreference(theme === "dark" ? "light" : "dark") };
}
