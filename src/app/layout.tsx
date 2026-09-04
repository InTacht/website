import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
});

const seasonMix = localFont({
  src: "../../public/fonts/SeasonMix-Regular.ttf",
  variable: "--font-season-mix",
  display: "swap",
  weight: "400",
  style: "normal",
});

export const metadata = {
  title: "InTacht — Where Data Becomes Your Alpha",
  description:
    "XQUA distributed infrastructure, IQ foundational research, and IOTA self-learning intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${seasonMix.variable} ${GeistMono.variable} min-h-screen font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
