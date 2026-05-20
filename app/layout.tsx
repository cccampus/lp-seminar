import type { Metadata } from "next";
import {
  Poppins,
  Noto_Sans_JP,
  Noto_Serif_JP,
  Lora,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Claude Code Campus セミナー",
  description:
    "Claude Code Campus 主催の公開セミナー。経営者・意思決定者向けに、組織への AI 実装の具体像をお伝えします。",
  openGraph: {
    title: "Claude Code Campus セミナー",
    description:
      "Claude Code Campus 主催の公開セミナー。経営者・意思決定者向けに、組織への AI 実装の具体像をお伝えします。",
    type: "website",
    locale: "ja_JP",
    siteName: "Claude Code Campus",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Code Campus セミナー",
    description:
      "Claude Code Campus 主催の公開セミナー。経営者・意思決定者向けに、組織への AI 実装の具体像をお伝えします。",
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
        {children}
      </body>
    </html>
  );
}
