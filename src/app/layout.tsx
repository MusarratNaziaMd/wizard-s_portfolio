import type { Metadata } from "next";
import { Cinzel, Inter, Cormorant_Garamond } from "next/font/google";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { content } from "@/lib/content";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${content.profile.name} | ${content.profile.role}`,
  description: content.profile.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy text-parchment font-inter">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
