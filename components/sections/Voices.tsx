/**
 * Voices
 * PC = VoicesC (Marquee 確定)
 * Mobile = VoicesMobileD (縦stack + 「もっと見る」展開式 確定) 採用
 */
import VoicesC from "./voices/VoicesC";
import VoicesMobileD from "./voices/mobile/VoicesMobileD";

export default function Voices() {
  return (
    <>
      <div className="hidden md:block">
        <VoicesC />
      </div>
      <div className="md:hidden">
        <VoicesMobileD />
      </div>
    </>
  );
}
