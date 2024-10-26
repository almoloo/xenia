"use client";

import { LoaderIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { status } = useAccount();
  const [connectionStatus, setConnectionStatus] = useState<
    typeof status | null
  >(null);

  useEffect(() => {
    if (status) {
      setConnectionStatus(status);
    }
  }, [status]);

  useEffect(() => {
    if (connectionStatus === "disconnected") {
      redirect("/");
    }
  }, [connectionStatus]);

  return connectionStatus === "connecting" ||
    connectionStatus === "reconnecting" ? (
    <div className="flex grow items-center justify-center">
      <LoaderIcon className="h-10 w-10 animate-spin" />
    </div>
  ) : (
    <>
      {status}
      {children}
    </>
  );
}
