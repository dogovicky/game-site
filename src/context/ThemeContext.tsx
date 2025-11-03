
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

    const applyThemeClass = (currentTheme: Theme) => {
        if(currentTheme === 'light') {
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
        }
    }

    //load saved themes
    useEffect(() => {
        const saved = localStorage.getItem("theme") as Theme | null;
        const initialTheme: Theme = saved || 'dark';

        setTheme(initialTheme);
        applyThemeClass(initialTheme);
        
    }, []);


    const toggleTheme = () => {
        // ✅ FIX 1: Correctly switch the theme
        const newTheme = theme === "dark" ? "light" : "dark"; 

        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        
        // ✅ FIX 2: Apply the new theme class immediately
        applyThemeClass(newTheme);
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