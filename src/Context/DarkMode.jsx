import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Create context
const DarkModeContext = createContext();

// 2. Provider component
export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Local storage se default value load karen
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : true; // default dark mode on
  });

  // Local storage me save karna
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    // body class me dark apply karna
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// 3. Custom hook for easier usage
export const useDarkMode = () => useContext(DarkModeContext);