"use client"
import { MoonIcon, SunIcon } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

function Navbar() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="h-12 w-full px-2 flex flex-row justify-between items-center">
      <SidebarTrigger />
      <div>
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark"? "light": "dark")}>
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </div>
  );
};

export { Navbar };