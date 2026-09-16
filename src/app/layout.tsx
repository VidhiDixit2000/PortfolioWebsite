import type { Metadata } from "next";
import { Inter, Aclonica } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const aclonica = Aclonica({
  variable: "--font-aclonica",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vidhi Dixit — Portfolio",
  description: "Portfolio of Vidhi Dixit.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${aclonica.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
