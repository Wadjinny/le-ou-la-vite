import { createContext, useState, useEffect, ReactNode } from "react";
import { themeType } from "../types/utils";

export type ThemeContextType = {
    theme: themeType;
    setTheme: (theme: themeType) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
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
        <ThemeContext value={{ theme, setTheme }}>
            {children}
        </ThemeContext>
    );
};

