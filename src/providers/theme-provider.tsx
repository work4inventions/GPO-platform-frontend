import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context; 

};

interface ThemeProviderProps {
    children: ReactNode;
    /**
     * The class to add to the root element when the theme is dark
     * @default "dark-mode"
     */
    darkModeClass?: string;
    /**
     * The default theme to use if no theme is stored in localStorage
     * @default "system"
     */
    defaultTheme?: Theme;
    /**
     * The key to use to store the theme in localStorage
     * @default "ui-theme"
     */
    storageKey?: string;
}

export const ThemeProvider = ({ children, defaultTheme = "light", storageKey = "ui-theme", darkModeClass = "dark-mode" }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== "undefined") {
            // Apply theme immediately to prevent flash
            const root = window.document.documentElement;
            root.classList.remove(darkModeClass);
            
            try {
                const savedTheme = localStorage.getItem(storageKey) as Theme | null;
                const initialTheme = savedTheme || defaultTheme;
                
                // Apply the theme immediately
                if (initialTheme === "system") {
                    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                    root.classList.toggle(darkModeClass, systemTheme === "dark");
                } else {
                    root.classList.toggle(darkModeClass, initialTheme === "dark");
                }
                
                return initialTheme;
            } catch (error) {
                // If localStorage is not available (e.g., in incognito mode), use default theme
                console.warn("localStorage not available, using default theme:", defaultTheme);
                root.classList.toggle(darkModeClass, defaultTheme === "dark");
                return defaultTheme;
            }
        }
        return defaultTheme;
    });

    useEffect(() => {
        const applyTheme = () => {
            const root = window.document.documentElement;

            if (theme === "system") {
                const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

                root.classList.toggle(darkModeClass, systemTheme === "dark");
                try {
                    localStorage.removeItem(storageKey);
                } catch (error) {
                    console.warn("Could not remove from localStorage:", error);
                }
            } else {
                root.classList.toggle(darkModeClass, theme === "dark");
                try {
                    localStorage.setItem(storageKey, theme);
                } catch (error) {
                    console.warn("Could not save to localStorage:", error);
                }
            }
        };

        applyTheme();

        // Listen for system theme changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = () => {
            if (theme === "system") {
                applyTheme();
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
