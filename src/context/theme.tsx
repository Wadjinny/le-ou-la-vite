import { createContext } from "react";

type theme = "light" | "dark" | "system";  

export const ThemeContext = createContext<theme>('light');

