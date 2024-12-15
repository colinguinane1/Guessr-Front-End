import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { UserProvider } from "@/context/UserContext";
import BackgroundGrid from "@/components/bg-grid";

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
  title: "Numby",
  description: "A random number guessing game!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-sans)] transition-colors duration-300`}
          >
            {/* <BackgroundGrid /> disabled temporary for local development performance. */}
            <Header />
            <div className="">{children}</div>
          </body>
        </ThemeProvider>
      </UserProvider>
    </html>
  );
}
