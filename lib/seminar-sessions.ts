export type SeminarSessionInfo = {
  label: string;
  dateText: string;
  openText: string;
  zoomUrl: string;
  zoomId: string;
  zoomPw: string;
};

export function buildSeminarSessionMap(): Record<string, SeminarSessionInfo> {
  return {
    "2026-06-03": {
      label: "2026年6月3日（水）",
      dateText: "2026年6月3日（水）19:00〜21:00",
      openText: "開場 18:50（開催10分前）",
      zoomUrl: process.env.ZOOM_URL_20260603 || "",
      zoomId: process.env.ZOOM_ID_20260603 || "",
      zoomPw: process.env.ZOOM_PW_20260603 || "",
    },
    "2026-06-14": {
      label: "2026年6月14日（日）",
      dateText: "2026年6月14日（日）11:00〜13:00",
      openText: "開場 10:50（開催10分前）",
      zoomUrl: process.env.ZOOM_URL_20260614 || "",
      zoomId: process.env.ZOOM_ID_20260614 || "",
      zoomPw: process.env.ZOOM_PW_20260614 || "",
    },
    "2026-07-08": {
      label: "2026年7月8日（水）",
      dateText: "2026年7月8日（水）19:00〜21:00",
      openText: "開場 18:50（開催10分前）",
      zoomUrl: process.env.ZOOM_URL_20260708 || "",
      zoomId: process.env.ZOOM_ID_20260708 || "",
      zoomPw: process.env.ZOOM_PW_20260708 || "",
    },
    "2026-07-26": {
      label: "2026年7月26日（日）",
      dateText: "2026年7月26日（日）11:00〜13:00",
      openText: "開場 10:50（開催10分前）",
      zoomUrl: process.env.ZOOM_URL_20260726 || "",
      zoomId: process.env.ZOOM_ID_20260726 || "",
      zoomPw: process.env.ZOOM_PW_20260726 || "",
    },
  };
}
