import { Routes, Route } from "react-router-dom";
import SearchWords from "./pages/SearchWord";
import NotFound from "./pages/NotFound";
import { ThemeContext } from "./context/theme";
import { themeType } from "./types/utils";
import { useState, useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import WordDefinition from "./pages/WordDefinition";
const queryClient = new QueryClient()

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
        <QueryClientProvider client={queryClient}>
          <Routes>
              <Route path="/" element={<SearchWords />} />
              <Route path="/word-definition/:word" element={<WordDefinition />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </QueryClientProvider>
      </ThemeContext>

    </>
  );
  }