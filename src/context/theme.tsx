import { createContext } from "react";
import { themeType } from "../types/utils";

export type ThemeContextType = {
    theme: themeType;
    setTheme: (theme: themeType) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    setTheme: () => {},
});

