"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function ToggleTheme() {
  const { setTheme, theme } = useTheme();

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <>
      <Button onClick={toggleTheme}>toggle</Button>
    </>
  );
}
