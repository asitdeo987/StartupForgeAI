import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "StartupForge AI",
  description: "AI Powered Startup Simulator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Provider>
          {children}
          <Toaster richColors position="top-right" />
        </Provider>
      </body>
    </html>
  );
}
