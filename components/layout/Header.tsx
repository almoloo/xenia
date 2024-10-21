import React from "react";
import ToggleTheme from "@/components/layout/ToggleTheme";
import { GiftIcon } from "lucide-react";

export default function Header() {
  return (
    <div className="flex items-center px-5 py-3">
      <h1 className="font-bolder flex items-center gap-2 text-2xl">
        <GiftIcon className="h-6 w-6" />
        Xenia
      </h1>
      <ToggleTheme />
      <w3m-button />
    </div>
  );
}
