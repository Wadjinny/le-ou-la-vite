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
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme as themeType);
    } else {
      setTheme('light');
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('theme', theme);
    const htmlElement = document.documentElement;
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [theme]);
  
  return (
    <>
      <ThemeContext value={{theme, setTheme}}>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
          <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" element={<SearchWords />} />
                <Route path="/word-definition/:word" element={<WordDefinition />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
          </QueryClientProvider>
        </div>
      </ThemeContext>
    </>
  );
  }