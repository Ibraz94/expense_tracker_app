"use client"
import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSettings, currencies } from "@/lib/settings-context";

export default function Header({ totalExpense }: { totalExpense: number }) {
  const { theme, currency, toggleTheme, setCurrency } = useSettings();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="bg-primary text-primary-foreground py-6 px-6 shadow-lg">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Expense Tracker</h1>
        
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold">
            Total: {currency.symbol} {totalExpense.toFixed(2)}
          </div>
          
          <Select
            value={currency.code}
            onValueChange={(code) => {
              const selected = currencies.find((c) => c.code === code);
              if (selected) setCurrency(selected);
            }}
          >
            <SelectTrigger className="w-[140px] bg-primary-foreground text-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((curr) => (
                <SelectItem key={curr.code} value={curr.code}>
                  {curr.symbol} {curr.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  onClick={() => {
                    console.log("Toggle clicked, current theme:", theme);
                    toggleTheme();
                  }}
                  className="hover:bg-primary-foreground/10 border"
                >
                  {mounted && theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle {theme === "dark" ? "Light" : "Dark"} Mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
}
