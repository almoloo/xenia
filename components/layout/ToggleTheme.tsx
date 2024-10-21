"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { MoonIcon, SunDimIcon } from "lucide-react";

export default function ToggleTheme() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  useEffect(() => {
    if (theme) setMounted(true);
  }, [theme]);

  return (
    <>
      {mounted && (
        <Button size="icon" variant="ghost" onClick={toggleTheme}>
          {theme === "dark" ? (
            <SunDimIcon className="h-6 w-6" />
          ) : (
            <MoonIcon className="h-6 w-6" />
          )}
        </Button>
      )}
    </>
  );
}
