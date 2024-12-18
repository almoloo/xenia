import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/layout/Header";
import WalletConnectProvider from "@/components/walletconnect-provider";
import { headers } from "next/headers";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Xenia",
  description:
    "Create, Share, and Redeem Gift Cards with Security and Ease. Built on AIA network.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = headers().get("cookie");

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <WalletConnectProvider cookies={cookies}>
            <Header />
            <main className="flex grow flex-col px-10 py-5">{children}</main>
            <Footer />
          </WalletConnectProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
