export const supportedLanguages = ["ko", "en", "ja"] as const;

export type Language = (typeof supportedLanguages)[number];
export type ProjectStatus = "now" | "coming" | "ended";
export type Billing = "lead" | "support" | "cameo";

export type ProjectLocale = {
  role: string;
  period: string;
  tagline: string;
  description: string;
};

export type Project = {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  status: ProjectStatus;
  accent: string;
  accentSoft: string;
  posterLabel: string;
  liveUrl: string;
  repoUrl: string;
  stack: {
    billing: Billing;
    name: string;
  }[];
  shots: string[];
  locale: Record<Language, ProjectLocale>;
};

export const defaultLanguage: Language = "ko";

export const portfolioCopy = {
  ko: {
    navHome: "홈",
    navGallery: "상영작",
    navAbout: "소개",
    cta: "상영작 보기",
    featuredTag: "이번 주 상영작",
    heroCta: "자세히 보기",
    heroTitle: "PORTFOLIO THEATER",
    heroSubtitle:
      "프로젝트를 영화처럼 예고하고, 포스터처럼 고르고, 상영 기록처럼 읽는 포트폴리오입니다.",
    heroMeta: "3개 언어 지원 / 포스터 갤러리 / 오버레이 상세",
    sectionKicker: "전체 상영작",
    sectionTitle: "상영 시간표",
    sectionDesc: "포스터를 누르면 작품 정보가 오버레이로 열립니다.",
    detailLink: "관람",
    roleLabel: "역할",
    periodLabel: "상영 기간",
    scopeLabel: "상영 포맷",
    synopsisLabel: "시놉시스",
    contributionLabel: "참여 파트",
    featuresLabel: "주요 장면",
    problemsLabel: "비하인드",
    impactLabel: "흥행 및 회고",
    outcomeLabel: "성과",
    learnedLabel: "배운 점",
    stackLabel: "출연 및 제작",
    descLabel: "시놉시스",
    shotsLabel: "스틸컷",
    leadBadge: "직접 구현",
    linkSoon: "준비중",
    dept_fe: "프론트엔드",
    dept_be: "백엔드",
    dept_db: "데이터베이스",
    dept_infra: "인프라",
    live: "상영관 입장",
    repo: "필름 원본",
    close: "닫기",
    statusNow: "상영중",
    statusComing: "상영 예정",
    statusEnded: "상영 종료",
    billLead: "주연",
    billSupport: "조연",
    billCameo: "특별출연",
    footerNote: "포스터와 스틸컷은 데이터 파일에서 교체할 수 있습니다.",
    ticker: "지금 상영 중 / 전회 매진 / 앵콜 상영 결정 / 절찬 상영 중 / ",
  },
  en: {
    navHome: "HOME",
    navGallery: "SHOWS",
    navAbout: "ABOUT",
    cta: "VIEW SHOWS",
    featuredTag: "FEATURED",
    heroCta: "VIEW DETAILS",
    heroTitle: "PORTFOLIO THEATER",
    heroSubtitle:
      "A cinema-inspired portfolio where projects are teased, selected, and opened like screenings.",
    heroMeta: "3 languages / poster gallery / overlay details",
    sectionKicker: "ALL SHOWS",
    sectionTitle: "SHOWTIMES",
    sectionDesc: "Tap a poster to open the project overlay.",
    detailLink: "WATCH",
    roleLabel: "ROLE",
    periodLabel: "RUN",
    scopeLabel: "FORMAT",
    synopsisLabel: "SYNOPSIS",
    contributionLabel: "CONTRIBUTION",
    featuresLabel: "CORE SCENES",
    problemsLabel: "BEHIND THE SCENES",
    impactLabel: "BOX OFFICE & NOTES",
    outcomeLabel: "OUTCOME",
    learnedLabel: "LEARNED",
    stackLabel: "CAST AND CREW",
    descLabel: "SYNOPSIS",
    shotsLabel: "STILLS",
    leadBadge: "BUILT",
    linkSoon: "COMING SOON",
    dept_fe: "FRONTEND",
    dept_be: "BACKEND",
    dept_db: "DATABASE",
    dept_infra: "INFRA",
    live: "ENTER THEATER",
    repo: "SOURCE REEL",
    close: "Close",
    statusNow: "NOW SHOWING",
    statusComing: "COMING SOON",
    statusEnded: "ENDED",
    billLead: "LEAD",
    billSupport: "SUPPORTING",
    billCameo: "CAMEO",
    footerNote: "Posters and stills can be replaced in the data file.",
    ticker: "NOW SHOWING / SOLD OUT / ENCORE SCREENING / HELD OVER / ",
  },
  ja: {
    navHome: "ホーム",
    navGallery: "上映作品",
    navAbout: "紹介",
    cta: "上映作品を見る",
    featuredTag: "今週の上映作",
    heroCta: "詳しく見る",
    heroTitle: "PORTFOLIO THEATER",
    heroSubtitle:
      "プロジェクトを映画のように予告し、ポスターのように選び、上映記録のように読めるポートフォリオです。",
    heroMeta: "3言語対応 / ポスターギャラリー / オーバーレイ詳細",
    sectionKicker: "全上映作品",
    sectionTitle: "上映スケジュール",
    sectionDesc: "ポスターをタップすると作品情報が開きます。",
    detailLink: "鑑賞",
    roleLabel: "役割",
    periodLabel: "上映期間",
    scopeLabel: "上映形式",
    synopsisLabel: "あらすじ",
    contributionLabel: "参加パート",
    featuresLabel: "主要シーン",
    problemsLabel: "ビハインド",
    impactLabel: "興行と振り返り",
    outcomeLabel: "成果",
    learnedLabel: "学び",
    stackLabel: "出演と制作",
    descLabel: "あらすじ",
    shotsLabel: "スチル",
    leadBadge: "実装担当",
    linkSoon: "準備中",
    dept_fe: "フロントエンド",
    dept_be: "バックエンド",
    dept_db: "データベース",
    dept_infra: "インフラ",
    live: "劇場へ入る",
    repo: "フィルム原本",
    close: "閉じる",
    statusNow: "上映中",
    statusComing: "公開予定",
    statusEnded: "上映終了",
    billLead: "主演",
    billSupport: "助演",
    billCameo: "特別出演",
    footerNote: "ポスターとスチルはデータファイルで差し替えできます。",
    ticker: "上映中 / 満員御礼 / アンコール上映決定 / ロングラン上映中 / ",
  },
} satisfies Record<Language, Record<string, string>>;

export const statusThemes = {
  now: {
    dot: "#1d8f5f",
    ribbon: "#1d8f5f",
  },
  coming: {
    dot: "#2e5bd7",
    ribbon: "#2e5bd7",
  },
  ended: {
    dot: "#786c57",
    ribbon: "#786c57",
  },
} satisfies Record<ProjectStatus, { dot: string; ribbon: string }>;

export const isLanguage = (value: string): value is Language =>
  supportedLanguages.includes(value as Language);
