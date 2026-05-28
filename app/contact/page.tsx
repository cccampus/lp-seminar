"use client";

import { useState } from "react";
import LegalPage from "@/components/sections/LegalPage";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("お名前・メール・お問い合わせ内容は必須です");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "送信に失敗しました");
      }
      setSent(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "送信に失敗しました");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <LegalPage title="お問い合わせ" updatedAt="">
        <div className="text-center py-12">
          <p className="font-serif text-2xl text-coral mb-6">
            お問い合わせを受け付けました
          </p>
          <p className="text-sm sm:text-base leading-loose text-sumi/80">
            ご記入のメールアドレスに自動返信を送信しました。
            <br />
            通常2営業日以内に担当者よりご返信いたします。
          </p>
        </div>
      </LegalPage>
    );
  }

  return (
    <LegalPage title="お問い合わせ" updatedAt="">
      <p className="text-sm sm:text-base leading-loose text-sumi/85 mb-8">
        セミナー内容・参加可否・日程・アーカイブ視聴のご相談、法人参加(2名以上)のご相談など、
        お気軽にご記入ください。原則2営業日以内にご返信いたします。
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="contact-name"
            className="block font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-2"
          >
            お名前 <span className="text-coral-deep">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={submitting}
            className="w-full px-4 py-3 border border-sumi/20 rounded-lg bg-cream text-sumi-deep
              focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/30 transition-colors
              disabled:opacity-50"
            placeholder="山田 太郎"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-2"
          >
            メールアドレス <span className="text-coral-deep">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={submitting}
            className="w-full px-4 py-3 border border-sumi/20 rounded-lg bg-cream text-sumi-deep
              focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/30 transition-colors
              disabled:opacity-50"
            placeholder="example@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="contact-subject"
            className="block font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-2"
          >
            件名(任意)
          </label>
          <input
            id="contact-subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={submitting}
            className="w-full px-4 py-3 border border-sumi/20 rounded-lg bg-cream text-sumi-deep
              focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/30 transition-colors
              disabled:opacity-50"
            placeholder="アーカイブ視聴について / 法人参加の相談 等"
          />
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="block font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-2"
          >
            お問い合わせ内容 <span className="text-coral-deep">*</span>
          </label>
          <textarea
            id="contact-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            disabled={submitting}
            rows={8}
            className="w-full px-4 py-3 border border-sumi/20 rounded-lg bg-cream text-sumi-deep
              focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/30 transition-colors
              disabled:opacity-50 resize-y"
            placeholder="ご質問・ご相談内容をご記入ください"
          />
        </div>

        {error && (
          <p className="text-sm text-coral-deep bg-coral/10 border border-coral/30 rounded-md px-4 py-3">
            {error}
          </p>
        )}

        <div className="flex flex-col items-center gap-3 pt-4">
          <button
            type="submit"
            disabled={submitting}
            className={`inline-flex items-center gap-3 px-10 py-4 font-medium text-base rounded-full
              transition-all duration-200
              ${
                !submitting
                  ? "bg-coral text-cream hover:bg-coral-deep shadow-[0_12px_36px_rgba(217,119,87,0.4)]"
                  : "bg-coral/40 text-cream/60 cursor-not-allowed"
              }`}
          >
            {submitting ? "送信中..." : "送信する"}
            <span className="font-mono text-xs tracking-[0.2em]">→</span>
          </button>
          <p className="text-xs text-sumi/55">
            送信後、ご記入のメールアドレスに受付完了メールが届きます
          </p>
        </div>
      </form>
    </LegalPage>
  );
}
