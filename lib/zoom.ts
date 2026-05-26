/**
 * Zoom Server-to-Server OAuth クライアント
 *
 * 用途: セミナーの Zoom Meeting を API 経由で作成/取得する
 * 認証: Server-to-Server OAuth (account_credentials grant)
 *
 * 必要な ENV:
 *   ZOOM_ACCOUNT_ID
 *   ZOOM_CLIENT_ID
 *   ZOOM_CLIENT_SECRET
 *
 * 公式: https://developers.zoom.us/docs/internal-apps/s2s-oauth/
 */

const TOKEN_URL = "https://zoom.us/oauth/token";
const API_BASE = "https://api.zoom.us/v2";

let cachedToken: { token: string; exp: number } | null = null;

export async function getZoomAccessToken(): Promise<string> {
  const accountId = process.env.ZOOM_ACCOUNT_ID;
  const clientId = process.env.ZOOM_CLIENT_ID;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET;
  if (!accountId || !clientId || !clientSecret) {
    throw new Error(
      "Zoom credentials missing: ZOOM_ACCOUNT_ID / ZOOM_CLIENT_ID / ZOOM_CLIENT_SECRET",
    );
  }
  if (cachedToken && cachedToken.exp > Date.now()) {
    return cachedToken.token;
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch(
    `${TOKEN_URL}?grant_type=account_credentials&account_id=${accountId}`,
    {
      method: "POST",
      headers: { Authorization: `Basic ${basic}` },
    },
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Zoom OAuth failed: ${res.status} ${text}`);
  }
  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    token: data.access_token,
    exp: Date.now() + (data.expires_in - 300) * 1000,
  };
  return data.access_token;
}

export type ZoomMeetingInput = {
  topic: string;
  startISO: string;
  durationMin: number;
  timezone?: string;
  password?: string;
  agenda?: string;
};

export type ZoomMeeting = {
  id: number;
  uuid: string;
  topic: string;
  start_time: string;
  duration: number;
  timezone: string;
  join_url: string;
  start_url: string;
  password: string;
};

export async function createZoomMeeting(
  input: ZoomMeetingInput,
): Promise<ZoomMeeting> {
  const token = await getZoomAccessToken();
  const body = {
    topic: input.topic,
    type: 2, // scheduled
    start_time: input.startISO,
    duration: input.durationMin,
    timezone: input.timezone || "Asia/Tokyo",
    password: input.password,
    agenda: input.agenda || "",
    settings: {
      host_video: true,
      participant_video: false,
      join_before_host: false,
      mute_upon_entry: true,
      waiting_room: true,
      auto_recording: "none",
      approval_type: 2, // no registration required
      audio: "both",
    },
  };
  const res = await fetch(`${API_BASE}/users/me/meetings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Zoom create meeting failed: ${res.status} ${text}`);
  }
  return (await res.json()) as ZoomMeeting;
}

export async function getZoomMeeting(meetingId: number): Promise<ZoomMeeting> {
  const token = await getZoomAccessToken();
  const res = await fetch(`${API_BASE}/meetings/${meetingId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Zoom get meeting failed: ${res.status} ${text}`);
  }
  return (await res.json()) as ZoomMeeting;
}
