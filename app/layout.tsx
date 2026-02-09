import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/context";

export const metadata: Metadata = {
  title: "ViaJalan – Tourism Marketplace",
  description: "Connect travelers with local drivers, guides, and tour agencies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full font-sans antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
