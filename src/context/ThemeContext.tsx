
import { createContext, useContext, useEffect, useState } from "react";

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeContextProviderProps = {
    children: React.ReactNode
}

export const ThemeContextProvider = ({children}: ThemeContextProviderProps) => {

    const [theme, setTheme] = useState<Theme>('dark');

    //load saved themes
    useEffect(() => {
        const saved = localStorage.getItem("theme") as Theme | null;

        if (saved) {
            setTheme(saved);
            document.documentElement.classList.toggle("light", saved === "light");
        } else {
            // Default to dark theme (so ensure "light" isn't applied)
            document.documentElement.classList.remove("light");
        }
    }, []);


    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if(!context) throw new Error("useTheme must be used within a theme provider");
    return context;
}