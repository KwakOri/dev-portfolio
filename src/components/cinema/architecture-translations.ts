import type { Language } from "@/constants/portfolio";

type ArchitectureLanguage = Exclude<Language, "ko">;
type ArchitectureDictionary = Record<string, string>;

const commonTranslations: Record<ArchitectureLanguage, ArchitectureDictionary> = {
  en: {
    "— 운영 주체 · CLIENT ENTRY —": "— operators · client entry —",
    "— CROSS-CUTTING · 공통 기능 —": "— cross-cutting · shared capabilities —",
    "— INFRASTRUCTURE · 로컬 검증 환경 —":
      "— infrastructure · local verification —",
    "API 호출 계층": "API call layer",
    "API 호출 추상화": "API call abstraction",
    "인증 · 접근 제어": "Auth · access control",
    "권한 · 접근 제어": "Permission · access control",
    "인증 · 마켓 접근 제어": "Auth · market access control",
    "인증 · 초대 검증": "Auth · invitation validation",
    "배포 확인 필요": "Deployment check required",
    "주간 리포트 발송": "Weekly report delivery",
    "인증 · 안내 메일": "Auth · guide emails",
    "인증 · 안내 발송": "Auth · notification delivery",
    "인증 · 초대 · 재설정": "Auth · invitation · reset",
    "주문 파일 · 포트폴리오": "Order files · portfolio",
    "결과물 이미지 · 다운로드": "Output images · downloads",
    "발송 로그 저장": "Delivery log storage",
    "설정 기반 hook 주입": "Config-driven hook injection",
    "설정 기반 편집기 주입": "Config-driven editor injection",
  },
  ja: {
    architecture: "アーキテクチャ",
    "— 운영 주체 · CLIENT ENTRY —": "— 運営主体 · クライアント入口 —",
    "— CROSS-CUTTING · 공통 기능 —": "— 横断機能 · 共通機能 —",
    "— INFRASTRUCTURE · 로컬 검증 환경 —": "— インフラ · ローカル検証環境 —",
    "CLIENT ENTRY": "クライアント入口",
    CUSTOMER: "顧客",
    ADMIN: "管理者",
    OPERATOR: "運営者",
    STAFF: "現場スタッフ",
    ENTRY: "入口",
    "USER · ADMIN": "ユーザー · 管理者",
    "ADMIN · TEACHER": "管理者 · 講師",
    "MOBILE USER": "モバイルユーザー",
    "CLIENT · HOST": "ホスト端末",
    "CLIENT · GUEST": "ゲスト端末",
    "API 호출 계층": "API呼び出しレイヤー",
    "API 호출 추상화": "API呼び出しの抽象化",
    "인증 · 접근 제어": "認証 · アクセス制御",
    "권한 · 접근 제어": "権限 · アクセス制御",
    "인증 · 마켓 접근 제어": "認証 · マーケットアクセス制御",
    "인증 · 초대 검증": "認証 · 招待検証",
    "배포 확인 필요": "デプロイ確認が必要",
    "주간 리포트 발송": "週次レポート送信",
    "인증 · 안내 메일": "認証 · 案内メール",
    "인증 · 안내 발송": "認証 · 案内送信",
    "인증 · 초대 · 재설정": "認証 · 招待 · 再設定",
    "주문 파일 · 포트폴리오": "注文ファイル · ポートフォリオ",
    "결과물 이미지 · 다운로드": "成果物画像 · ダウンロード",
    "발송 로그 저장": "送信ログ保存",
    "설정 기반 hook 주입": "設定ベースのhook注入",
    "설정 기반 편집기 주입": "設定ベースのエディタ注入",
  },
};

const projectTranslations: Record<
  ArchitectureLanguage,
  Record<string, ArchitectureDictionary>
> = {
  en: {
    "231edu": {
      "학원 운영 · OMR · 주간 리포트 · NEXT.JS + NESTJS API + PYTHON OMR + SUPABASE":
        "Academy ops · OMR · weekly reports · NEXT.JS + NESTJS API + PYTHON OMR + SUPABASE",
      "231EDU · 분리형 운영 시스템": "231EDU · separated operations system",
      "학원 관리자": "Academy admin",
      "강사 · 운영 데스크": "Teachers · operations desk",
      "로그인 · 초대": "Login · invitation",
      "Next.js 운영 UI": "Next.js operations UI",
      "학생 · 반 · 시간표 · 채점": "Students · classes · schedules · grading",
      "API · OMR 서버 호출": "API · OMR server calls",
      "인증 · 학생 · 시간표": "Auth · students · schedules",
      "리포트 · 발송 · query orchestration":
        "Reports · delivery · query orchestration",
      "템플릿 좌표 · 밝기 판정": "Template coordinates · brightness checks",
      "마킹 인식 · 채점 생성": "Mark recognition · grading output",
      "알림톡 · SMS": "Alimtalk · SMS",
      "xlsx · 배포 확인 필요": "xlsx · deployment check required",
    },
    "flea-market": {
      "정산 운영 시스템 · FRONTEND + BACKEND + DB":
        "Settlement operations system · FRONTEND + BACKEND + DB",
      "FLEA MARKET · 운영 시스템": "FLEA MARKET · operations system",
      운영자: "Operator",
      "정산 · 설정": "Settlement · settings",
      "현장 스태프": "On-site staff",
      "판매 입력": "Sales entry",
      "관리 대시보드": "Management dashboard",
      "정산 · 설정 · 참가자": "Settlement · settings · participants",
      "현장 판매 입력": "On-site sales entry",
      "영수증 · 결제수단": "Receipts · payment methods",
      "Controller · Service · 정산 계산":
        "Controller · Service · settlement calculation",
      "정산 PDF · 참가자별 ZIP": "Settlement PDF · ZIP by participant",
      "HTTP-only cookie · 접근 제어": "HTTP-only cookie · access control",
      "Decimal.js · 결제수단 비례 배분":
        "Decimal.js · proportional payment allocation",
      "회차 버전 · delta 변경 이력": "Round version · delta change history",
    },
    lucent: {
      "커머스 v2 전환 · NEXT.JS + NESTJS + SUPABASE / CLOUDFLARE R2":
        "Commerce v2 migration · NEXT.JS + NESTJS + SUPABASE / CLOUDFLARE R2",
      "LUCENT · 커머스 운영 시스템": "LUCENT · commerce operations system",
      고객: "Customer",
      "구매 · 결제": "Purchase · payment",
      "운영 관리자": "Operations admin",
      "카탈로그 · 정산": "Catalog · settlement",
      "상점 · 장바구니 · 체크아웃": "Shop · cart · checkout",
      "카탈로그 · 캠페인 · 제작/배송": "Catalog · campaign · production/shipping",
      "일부 BFF 경로": "Partial BFF routes",
      "이미지 · 파일": "Images · files",
      "v1 운영 테이블 유지": "Keep v1 operations tables",
      "public.v2_* 커머스": "public.v2_* commerce",
    },
    ssudam: {
      "FRONTEND ONLY · 외부 API 연동 · MSW MOCK · NEXT.JS 모바일 UI":
        "FRONTEND ONLY · external API integration · MSW MOCK · NEXT.JS mobile UI",
      "SSUDAM · 프론트엔드 시스템": "SSUDAM · frontend system",
      "모바일 사용자": "Mobile user",
      "상담 · 지원사업 · 지도": "Counseling · support programs · map",
      "지도 · 마커 · 주소 검색": "Map · markers · address search",
      "조회 · mutation · Context": "Queries · mutation · Context",
      "인증 · 상담 · 지원정보 · 스크랩":
        "Auth · counseling · support info · scraps",
      "직접 구현 없음": "Not implemented directly",
      "— TOOLING · 컴포넌트 검증 전제 —":
        "— tooling · component verification baseline —",
      "Atomic 컴포넌트": "Atomic components",
    },
    temis: {
      "제작 도구 · 템플릿 상점 · 관리자 · NEXT.JS API ROUTE + SUPABASE / R2":
        "Creator tools · template shop · admin · NEXT.JS API ROUTE + SUPABASE / R2",
      "TEMIS · 풀스택 운영 시스템": "TEMIS · full-stack operations system",
      "사용자 · 관리자": "Users · admins",
      "제작 · 구매 · 운영": "Creation · purchase · operations",
      인증: "Auth",
      "편집기 · 상점 · 관리자": "Editor · shop · admin",
      "권한 · 템플릿 · 주문 · 업로드 · 메일":
        "Permissions · templates · orders · uploads · mail",
    },
    "vshot-v2": {
      "실시간 미디어 · WEBRTC + WEBSOCKET · NODE/EXPRESS + SUPABASE / R2":
        "Realtime media · WEBRTC + WEBSOCKET · NODE/EXPRESS + SUPABASE / R2",
      "VSHOT · 실시간 미디어 시스템": "VSHOT · realtime media system",
      "촬영 제어 · 방 생성": "Capture control · room creation",
      "입장 · 촬영 · 선택": "Entry · capture · selection",
      "원본 캡처 서버 합성": "Server-side source capture merge",
      "촬영 결과 · 프레임": "Capture results · frames",
      "프레임 · 그룹 운영": "Frame · group operations",
      "프레임 · 유저 · 그룹 관리": "Frame · user · group management",
      "— REALTIME INFRA · 분리 배포 —": "— realtime infra · split deployment —",
      "GitHub Actions · 분리 배포": "GitHub Actions · split deployment",
    },
  },
  ja: {
    "231edu": {
      "학원 운영 · OMR · 주간 리포트 · NEXT.JS + NESTJS API + PYTHON OMR + SUPABASE":
        "学習塾運営 · OMR · 週次レポート · NEXT.JS + NESTJS API + PYTHON OMR + SUPABASE",
      "231EDU · 분리형 운영 시스템": "231EDU · 分離型運営システム",
      "학원 관리자": "学習塾管理者",
      "강사 · 운영 데스크": "講師 · 運営デスク",
      "로그인 · 초대": "ログイン · 招待",
      "Next.js 운영 UI": "Next.js運営UI",
      "학생 · 반 · 시간표 · 채점": "生徒 · クラス · 時間割 · 採点",
      "API · OMR 서버 호출": "API · OMRサーバー呼び出し",
      "인증 · 학생 · 시간표": "認証 · 生徒 · 時間割",
      "리포트 · 발송 · query orchestration":
        "レポート · 送信 · query orchestration",
      "템플릿 좌표 · 밝기 판정": "テンプレート座標 · 明度判定",
      "마킹 인식 · 채점 생성": "マーク認識 · 採点生成",
      "알림톡 · SMS": "通知トーク · SMS",
      "xlsx · 배포 확인 필요": "xlsx · デプロイ確認が必要",
    },
    "flea-market": {
      "정산 운영 시스템 · FRONTEND + BACKEND + DB":
        "精算運営システム · FRONTEND + BACKEND + DB",
      "FLEA MARKET · 운영 시스템": "FLEA MARKET · 運営システム",
      운영자: "運営者",
      "정산 · 설정": "精算 · 設定",
      "현장 스태프": "現場スタッフ",
      "판매 입력": "販売入力",
      "관리 대시보드": "管理ダッシュボード",
      "정산 · 설정 · 참가자": "精算 · 設定 · 参加者",
      "현장 판매 입력": "現場販売入力",
      "영수증 · 결제수단": "領収書 · 決済手段",
      "Controller · Service · 정산 계산": "Controller · Service · 精算計算",
      "정산 PDF · 참가자별 ZIP": "精算PDF · 参加者別ZIP",
      "HTTP-only cookie · 접근 제어": "HTTP-only cookie · アクセス制御",
      "Decimal.js · 결제수단 비례 배분":
        "Decimal.js · 決済手段の比例配分",
      "회차 버전 · delta 변경 이력": "回次バージョン · delta変更履歴",
    },
    lucent: {
      "커머스 v2 전환 · NEXT.JS + NESTJS + SUPABASE / CLOUDFLARE R2":
        "コマースv2移行 · NEXT.JS + NESTJS + SUPABASE / CLOUDFLARE R2",
      "LUCENT · 커머스 운영 시스템": "LUCENT · コマース運営システム",
      고객: "顧客",
      "구매 · 결제": "購入 · 決済",
      "운영 관리자": "運営管理者",
      "카탈로그 · 정산": "カタログ · 精算",
      "상점 · 장바구니 · 체크아웃": "ショップ · カート · チェックアウト",
      "카탈로그 · 캠페인 · 제작/배송": "カタログ · キャンペーン · 制作/配送",
      "일부 BFF 경로": "一部BFFルート",
      "이미지 · 파일": "画像 · ファイル",
      "— MIGRATION · v1 / v2 병행 전환 —": "— 移行 · v1 / v2並行運用 —",
      "v1 운영 테이블 유지": "v1運営テーブル維持",
      "public.v2_* 커머스": "public.v2_* コマース",
    },
    ssudam: {
      "FRONTEND ONLY · 외부 API 연동 · MSW MOCK · NEXT.JS 모바일 UI":
        "FRONTEND ONLY · 外部API連携 · MSW MOCK · NEXT.JSモバイルUI",
      "SSUDAM · 프론트엔드 시스템": "SSUDAM · フロントエンドシステム",
      "모바일 사용자": "モバイルユーザー",
      "상담 · 지원사업 · 지도": "相談 · 支援事業 · 地図",
      "지도 · 마커 · 주소 검색": "地図 · マーカー · 住所検索",
      "조회 · mutation · Context": "照会 · mutation · Context",
      "인증 · 상담 · 지원정보 · 스크랩": "認証 · 相談 · 支援情報 · スクラップ",
      "직접 구현 없음": "直接実装なし",
      "— TOOLING · 컴포넌트 검증 전제 —": "— ツール · コンポーネント検証前提 —",
      "Atomic 컴포넌트": "Atomicコンポーネント",
    },
    temis: {
      "제작 도구 · 템플릿 상점 · 관리자 · NEXT.JS API ROUTE + SUPABASE / R2":
        "制作ツール · テンプレートショップ · 管理画面 · NEXT.JS API ROUTE + SUPABASE / R2",
      "TEMIS · 풀스택 운영 시스템": "TEMIS · フルスタック運営システム",
      "사용자 · 관리자": "ユーザー · 管理者",
      "제작 · 구매 · 운영": "制作 · 購入 · 運営",
      인증: "認証",
      "편집기 · 상점 · 관리자": "エディタ · ショップ · 管理画面",
      "권한 · 템플릿 · 주문 · 업로드 · 메일":
        "権限 · テンプレート · 注文 · アップロード · メール",
    },
    "vshot-v2": {
      "실시간 미디어 · WEBRTC + WEBSOCKET · NODE/EXPRESS + SUPABASE / R2":
        "リアルタイムメディア · WEBRTC + WEBSOCKET · NODE/EXPRESS + SUPABASE / R2",
      "VSHOT · 실시간 미디어 시스템": "VSHOT · リアルタイムメディアシステム",
      "촬영 제어 · 방 생성": "撮影制御 · ルーム作成",
      "입장 · 촬영 · 선택": "入室 · 撮影 · 選択",
      "원본 캡처 서버 합성": "元キャプチャのサーバー合成",
      "촬영 결과 · 프레임": "撮影結果 · フレーム",
      "프레임 · 그룹 운영": "フレーム · グループ運営",
      "프레임 · 유저 · 그룹 관리": "フレーム · ユーザー · グループ管理",
      "— REALTIME INFRA · 분리 배포 —": "— リアルタイム基盤 · 分離デプロイ —",
      "GitHub Actions · 분리 배포": "GitHub Actions · 分離デプロイ",
    },
  },
};

const getArchitectureDictionary = (
  language: ArchitectureLanguage,
  projectId: string,
) => ({
  ...commonTranslations[language],
  ...(projectTranslations[language][projectId] ?? {}),
});

export const translateArchitectureHtml = (
  html: string,
  language: Language,
  projectId: string,
) => {
  if (language === "ko" || typeof DOMParser === "undefined") {
    return html;
  }

  const dictionary = getArchitectureDictionary(language, projectId);
  const doc = new DOMParser().parseFromString(html, "text/html");
  const walker = doc.createTreeWalker(doc.body, 4);

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const original = node.nodeValue ?? "";
    const key = original.trim();
    const translated = dictionary[key];

    if (translated) {
      node.nodeValue = original.replace(key, translated);
    }
  }

  return doc.body.innerHTML;
};
