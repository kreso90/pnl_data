import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";

export const metadata: Metadata = {
  title: "PnL data you need",
  description: "PnL data you need",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="container">
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
