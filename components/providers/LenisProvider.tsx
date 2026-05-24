"use client";

/**
 * LenisProvider — ページ全体の慣性スムーズスクロール基盤
 *
 * - lenis/react の <ReactLenis root> で document をスムーズ化
 * - GSAP ScrollTrigger と同期（useLenis → ScrollTrigger.update / lagSmoothing(0)）
 * - prefers-reduced-motion 時は Lenis を完全に外しネイティブスクロールに戻す
 *
 * cinematic_upgrade_roadmap.md §5-2 / §5-8 準拠。
 */

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// プラグイン登録はモジュールトップで一度だけ（"Plugin already registered" 警告回避）
gsap.registerPlugin(ScrollTrigger);

function ScrollTriggerSync() {
  // Lenis のスクロールごとに ScrollTrigger を更新（scrub/pin の追従に必須）
  useLenis(() => ScrollTrigger.update());
  return null;
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  // SSR と初回ハイドレーションを一致させるため false 始まり → mount 後に判定
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    // Lenis + ScrollTrigger 併用時のタブ復帰ジャンプ防止
    gsap.ticker.lagSmoothing(0);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false, // iOS はネイティブタッチスクロールを維持
      }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
