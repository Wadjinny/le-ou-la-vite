import { Routes, Route } from "react-router-dom";
import SearchWords from "./pages/SearchWord";
import NotFound from "./pages/NotFound";
import { ThemeContext } from "./context/theme";
import { themeType } from "./types/utils";
import { useState, useEffect } from "react";
export default function App() {
  const [theme, setTheme] = useState<themeType>('light');
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      setTheme(theme as themeType);
    } else {
      setTheme('light');
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);
  return (
    <>
      <ThemeContext value={theme}>
      <Routes>
          <Route path="/" element={<SearchWords />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeContext>
    </>
  );
  }