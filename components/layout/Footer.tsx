import React from "react";
import Logo from "@/components/layout/Logo";
import Link from "next/link";
import { ChevronRightIcon, GithubIcon, TwitterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ToggleTheme from "@/components/layout/ToggleTheme";

export default function Footer() {
  return (
    <footer className="bg-white px-10 py-5 dark:bg-slate-800">
      <section className="flex items-center justify-between">
        <p className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <ChevronRightIcon className="h-4 w-4 text-pink-400" />
          Designed and developed by{" "}
          <Link href="https://github.com/almoloo" passHref>
            <Button variant="link" className="px-0">
              almoloo
            </Button>
          </Link>
        </p>
        <div className="flex items-center">
          <Link href="https://x.com/almoloo" passHref>
            <Button variant="ghost" size="icon" title="Github">
              <TwitterIcon className="h-6 w-6" />
            </Button>
          </Link>
          <Link href="https://github.com/almoloo/xenia" passHref>
            <Button variant="ghost" size="icon" title="Github">
              <GithubIcon className="h-6 w-6" />
            </Button>
          </Link>
          <Separator orientation="vertical" className="mx-5 h-5" />
          <ToggleTheme />
        </div>
      </section>
    </footer>
  );
}
