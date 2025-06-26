import React, { createContext, useState, useEffect } from "react";
import { useColorScheme, Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
  colors: {},
});

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");

  // Load saved theme preference on app start
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        if (savedTheme) {
          setIsDarkMode(savedTheme === "dark");
        } else {
          setIsDarkMode(colorScheme === "dark");
        }
      } catch (e) {
        console.error("Failed to load theme", e);
      }
    };
    loadThemePreference();
  }, []);

  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const theme = {
    light: {
      primary: "#161f7c",
      secondary: "#10425B",
      background: "#F4F4FB",
      text: "#000000",
      icon: "#555555",
      border: "#e0e0e0",
      card: {
        background: "#FFFFFF",
        text: "#000000",
      },
      tabBar: "#FFFFFF",
      // border: "#e0e0e0",
      kanban: {
        todo: "#e3f2fd",
        inProgress: "#fff8e1",
        done: "#e8f5e9",
        text: "#333333",
      },
      calendar: {
        selectedDay: "#3f51b5",
        todayText: "#161f7c",
        dotColor: "#757575",
      },
    },
    dark: {
      primary: "#6a7eff",
      secondary: "#4dabf5",
      background: "#121212",
      text: "#ffffff",
      icon: "#bbbbbb", // Slightly lighter than text for better visibility
      border: "#333333",
      tabBar: "#1E1E1E",
      border: "#333333",
      card: {
        background: "#1E1E1E",
        text: "#fff",
      },
      kanban: {
        todo: "#1e3a8a",
        inProgress: "#713f12",
        done: "#14532d",
        text: "#ffffff",
      },
      calendar: {
        selectedDay: "#7c4dff",
        todayText: "#bb86fc",
        dotColor: "#a5d6a7",
      },
    },
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        colors: isDarkMode ? theme.dark : theme.light,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
