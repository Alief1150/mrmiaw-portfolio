import type { Metadata } from "next";
import { Anton, Archivo } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/lenis-provider";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MrMiaw — Roblox GFX Artist",
  description:
    "Portfolio and commissions for Roblox thumbnails, game icons, avatar GFX, and multi-character artwork by MrMiaw.",
  metadataBase: undefined,
  openGraph: {
    title: "MrMiaw — Roblox GFX Artist",
    description:
      "Portfolio and commissions for Roblox thumbnails, game icons, avatar GFX, and multi-character artwork by MrMiaw.",
    type: "website",
    images: [
      {
        url: "/gfx/Warhammer_WATERMARKED.jpg",
        width: 1600,
        height: 900,
        alt: "Warhammer Roblox GFX scene by MrMiaw",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MrMiaw — Roblox GFX Artist",
    description:
      "Portfolio and commissions for Roblox thumbnails, game icons, avatar GFX, and multi-character artwork by MrMiaw.",
    images: ["/gfx/Warhammer_WATERMARKED.jpg"],
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${anton.variable} ${archivo.variable}`}>
      <body className="min-h-screen bg-ink text-cream antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
