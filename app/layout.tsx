import type { Metadata } from "next";
import {
  Poppins,
  Noto_Sans_JP,
  Noto_Serif_JP,
  Lora,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import Header from "@/components/Header";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// layout.tsx は A案軸のデフォルト。/start (C案) は page.tsx で完全上書き
export const metadata: Metadata = {
  title: "Claude Code 実践セミナー — 自分が止まっても回る事業へ、半年で。",
  description:
    "経営者のための Claude Code 実践セミナー。社員を増やさずに事業を伸ばす設計図を、AI を毎日使う経営者が実演を交えてお見せします。オンライン開催。",
  openGraph: {
    title: "Claude Code 実践セミナー — 自分が止まっても回る事業へ、半年で。",
    description:
      "経営者のための Claude Code 実践セミナー。社員を増やさずに事業を伸ばす設計図を、AI を毎日使う経営者が実演を交えてお見せします。オンライン開催。",
    type: "website",
    locale: "ja_JP",
    siteName: "Claude Code 実践セミナー",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Code 実践セミナー — 自分が止まっても回る事業へ、半年で。",
    description:
      "経営者のための Claude Code 実践セミナー。社員を増やさずに事業を伸ばす設計図を、AI を毎日使う経営者が実演を交えてお見せします。オンライン開催。",
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${poppins.variable} ${notoSansJP.variable} ${notoSerifJP.variable} ${lora.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-sumi-deep overflow-x-hidden">
        <LenisProvider>
          <Header />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
