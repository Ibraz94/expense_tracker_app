"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";

type Currency = {
  code: string;
  symbol: string;
  name: string;
};

export const currencies: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "PKR", symbol: "₨", name: "Pakistani Rupee" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
];

type SettingsContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(currencies[3]); // Default to PKR

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency");
    if (savedCurrency) {
      const parsedCurrency = JSON.parse(savedCurrency);
      setCurrencyState(parsedCurrency);
    }
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem("currency", JSON.stringify(newCurrency));
  };

  return (
    <SettingsContext.Provider value={{ currency, setCurrency }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <CurrencyProvider>{children}</CurrencyProvider>
    </NextThemeProvider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  const { theme, setTheme, systemTheme } = useTheme();
  
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  
  const toggleTheme = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };
  
  const currentTheme = theme === "system" ? systemTheme : theme;
  
  return {
    theme: (currentTheme || "light") as "light" | "dark",
    currency: context.currency,
    toggleTheme,
    setCurrency: context.setCurrency,
  };
}
