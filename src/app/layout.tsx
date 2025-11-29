import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@/lib/stack";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZeroToVPN",
  description: "Best VPN Reviews & Comparisons",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <StackProvider app={stackServerApp}>
          <StackTheme>
            {children}
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
