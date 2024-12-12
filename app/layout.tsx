import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import FlickeringGrid from "@/components/ui/flickering-grid";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { UserProvider } from "@/context/UserContext";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-sans)]`}
          >
          <FlickeringGrid
              className="z-0 absolute [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
              squareSize={1}
              gridGap={16}
              color="#ffffff"
              maxOpacity={0.2}
              flickerChance={0.1}
          />
            {" "}
            <Header />
            <div className="p-4 z-[1]">{children}</div>
          </body>
        </ThemeProvider>
      </UserProvider>
    </html>
  );
}
