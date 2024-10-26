import React from "react";
import ToggleTheme from "@/components/layout/ToggleTheme";

export default function Header() {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <h1 className="flex items-center gap-2 text-2xl font-black">Xenia</h1>
      <div className="flex items-center gap-2">
        <ToggleTheme />
        <w3m-button />
      </div>
    </div>
  );
}
