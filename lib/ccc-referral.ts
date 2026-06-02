/**
 * CCC 会員プラットフォーム (member-app) の Supabase へ
 * 紹介トラッキングと referrer ポイント加算を書き込むヘルパー。
 *
 * seminar-lp-intro の Stripe webhook から呼ぶ。
 * env: CCC_MEMBER_APP_SUPABASE_URL / CCC_MEMBER_APP_SERVICE_ROLE_KEY
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const REFERRAL_POINTS_ON_SEMINAR_PAID = 100;

let cached: SupabaseClient | null = null;

function getMemberAppAdmin(): SupabaseClient | null {
  if (cached) return cached;
  const url = process.env.CCC_MEMBER_APP_SUPABASE_URL;
  const key = process.env.CCC_MEMBER_APP_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.warn(
      "[ccc-referral] CCC_MEMBER_APP_SUPABASE_URL / CCC_MEMBER_APP_SERVICE_ROLE_KEY missing",
    );
    return null;
  }
  cached = createClient(url, key, { auth: { persistSession: false } });
  return cached;
}

export interface ReferralRecordInput {
  referralCode: string;          // 紹介者の users.referral_code
  referredEmail: string;          // 被紹介者の決済時メアド
  stripeSessionId: string;        // 冪等キー
  amountTotal?: number | null;    // 決済額（ログ用）
}

export type ReferralRecordResult =
  | { ok: true; alreadyRecorded: boolean; referrerId: string }
  | { ok: false; reason: string };

/**
 * セミナー決済完了時に呼ぶ。
 * - referrals テーブルに status='seminar_paid' で INSERT（既存なら skip）
 * - referrer の users.referral_points を +100
 *
 * 冪等性: meta.stripe_session_id をキーに既存チェック。
 */
export async function recordSeminarPaidReferral(
  input: ReferralRecordInput,
): Promise<ReferralRecordResult> {
  const supabase = getMemberAppAdmin();
  if (!supabase) return { ok: false, reason: "supabase_not_configured" };

  // 1. 紹介者を referral_code で引く
  const { data: referrer, error: refErr } = await supabase
    .from("users")
    .select("id, referral_points")
    .eq("referral_code", input.referralCode)
    .maybeSingle();

  if (refErr) {
    console.error("[ccc-referral] referrer lookup failed", refErr);
    return { ok: false, reason: `referrer_lookup: ${refErr.message}` };
  }
  if (!referrer) {
    return { ok: false, reason: "referrer_not_found" };
  }

  // 2. 冪等チェック（meta.stripe_session_id ベース）
  const { data: existing } = await supabase
    .from("referrals")
    .select("id")
    .contains("meta", { stripe_session_id: input.stripeSessionId })
    .maybeSingle();

  if (existing) {
    return { ok: true, alreadyRecorded: true, referrerId: referrer.id };
  }

  // 3. referrals INSERT
  const { error: insertErr } = await supabase.from("referrals").insert({
    referrer_user_id: referrer.id,
    referred_email: input.referredEmail,
    referred_user_id: null,
    status: "seminar_paid",
    points_awarded: REFERRAL_POINTS_ON_SEMINAR_PAID,
    meta: {
      stripe_session_id: input.stripeSessionId,
      amount_total: input.amountTotal ?? null,
      source: "seminar-lp-intro",
      recorded_at: new Date().toISOString(),
    },
  });

  if (insertErr) {
    console.error("[ccc-referral] referrals insert failed", insertErr);
    return { ok: false, reason: `referrals_insert: ${insertErr.message}` };
  }

  // 4. 紹介者の referral_points を +100
  const newPoints =
    (referrer.referral_points ?? 0) + REFERRAL_POINTS_ON_SEMINAR_PAID;
  const { error: updateErr } = await supabase
    .from("users")
    .update({ referral_points: newPoints, updated_at: new Date().toISOString() })
    .eq("id", referrer.id);

  if (updateErr) {
    console.error("[ccc-referral] points update failed", updateErr);
    // points 更新失敗でも referrals は記録済 → OK 扱い、管理画面で手動補正
  }

  // 5. point_transactions ログ（あれば）。失敗しても致命じゃない
  try {
    await supabase.from("point_transactions").insert({
      user_id: referrer.id,
      delta: REFERRAL_POINTS_ON_SEMINAR_PAID,
      category: "referral",
      reason: "seminar_paid",
      meta: {
        stripe_session_id: input.stripeSessionId,
        referred_email: input.referredEmail,
      },
    });
  } catch (e) {
    console.error("[ccc-referral] point_transactions log failed", e);
  }

  return { ok: true, alreadyRecorded: false, referrerId: referrer.id };
}
