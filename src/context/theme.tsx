import { createContext } from "react";
import { themeType } from "../types/utils";

export const ThemeContext = createContext<themeType>('light');

