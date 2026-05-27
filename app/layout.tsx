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

export const metadata: Metadata = {
  title: "Claude Code 実践セミナー — 半年で、仕事がここまで変わる",
  description:
    "経営者・次期リーダーのための Claude Code 実践セミナー。半年前まで AI を使えなかった2人が、AI で業務がどう変わったかを2時間で実演します。2026/6/3(水) 19:00・6/14(日) 11:00 オンライン開催 / セミナー1回 ¥5,500(税込)。",
  openGraph: {
    title: "Claude Code 実践セミナー — 半年で、仕事がここまで変わる",
    description:
      "経営者・次期リーダーのための Claude Code 実践セミナー。半年前まで AI を使えなかった2人が、AI で業務がどう変わったかを2時間で実演します。2026/6/3(水) 19:00・6/14(日) 11:00 オンライン開催 / セミナー1回 ¥5,500(税込)。",
    type: "website",
    locale: "ja_JP",
    siteName: "Claude Code 実践セミナー",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Code 実践セミナー — 半年で、仕事がここまで変わる",
    description:
      "経営者・次期リーダーのための Claude Code 実践セミナー。半年前まで AI を使えなかった2人が、AI で業務がどう変わったかを2時間で実演します。2026/6/3(水) 19:00・6/14(日) 11:00 オンライン開催 / セミナー1回 ¥5,500(税込)。",
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
