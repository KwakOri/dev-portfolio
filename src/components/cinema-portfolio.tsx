"use client";

import { useEffect, useMemo, useState } from "react";
import {
  defaultLanguage,
  portfolioCopy,
  statusThemes,
  type Billing,
  type Language,
  type Project,
  type ProjectStatus,
} from "@/constants/portfolio";
import rawProfile from "@/data/profile.json";
import rawProjects from "@/data/projects.json";
import rawProjectDetails from "@/data/project-details.json";
import { CinemaFooter } from "./cinema/cinema-footer";
import { CinemaHeader } from "./cinema/cinema-header";
import { HeroSection } from "./cinema/hero-section";
import { ProjectGallery } from "./cinema/project-gallery";
import { ProjectOverlay } from "./cinema/project-overlay";
import { TickerStrip } from "./cinema/ticker-strip";
import type {
  ContributionKey,
  DeveloperProfile,
  LocalizedDeveloperProfile,
  LocalizedProject,
  PortfolioCopy,
  ProjectDetail,
} from "./cinema/types";

const projects = rawProjects as Project[];
const projectDetails = rawProjectDetails as ProjectDetail[];
const developerProfile = rawProfile as DeveloperProfile;

const billingLabelKeys = {
  lead: "billLead",
  support: "billSupport",
  cameo: "billCameo",
} satisfies Record<Billing, "billLead" | "billSupport" | "billCameo">;

const statusLabelKeys = {
  coming: "statusComing",
  ended: "statusEnded",
  now: "statusNow",
} satisfies Record<
  ProjectStatus,
  "statusComing" | "statusEnded" | "statusNow"
>;

const getStatusLabel = (copy: PortfolioCopy, status: ProjectStatus) =>
  copy[statusLabelKeys[status]];
const getStatusColor = (status: ProjectStatus) => statusThemes[status].ribbon;
const getDepartmentLabel = (copy: PortfolioCopy, key: ContributionKey) =>
  copy[`dept_${key}`] ?? key.toUpperCase();

const cardTagsByLanguage: Record<Language, Record<string, string[]>> = {
  ko: {
    "231edu": ["실제 학원 운영", "등원생 약 200명", "학생·시간표·리포트"],
    "flea-market": ["참가부스 10-20", "이벤트 매출 약 1000만원", "영수증·정산·PDF"],
    lucent: ["주문·제작·배송 관리", "복수 팝업 이벤트", "팝업 평균 200-300만원"],
    ssudam: ["2024 해커톤 수상", "AI 활용 역량 인정", "아이디어 우수성 검증"],
    temis: ["유료 유저 100명 이상", "주간 실사용 200명+", "누적 매출 800만원+"],
    "vshot-v2": ["2026 일러스타페스", "방송인 콜라보 20명+", "화상 팬미팅 플랫폼"],
  },
  en: {
    "231edu": ["Live academy ops", "~200 enrolled students", "Students·schedules·reports"],
    "flea-market": ["10-20 booths/event", "~KRW 10M event sales", "Receipts·settlement·PDF"],
    lucent: ["Order·production·shipping", "Multiple pop-up events", "KRW 2-3M avg pop-up sales"],
    ssudam: ["2024 hackathon award", "Recognized AI usage", "Validated idea quality"],
    temis: ["100+ paid users", "200+ weekly active buyers", "KRW 8M+ revenue"],
    "vshot-v2": ["Illustar Fes 2026", "20+ creator collabs", "Event completed"],
  },
  ja: {
    "231edu": ["実稼働の塾運営", "通塾生約200名", "生徒·時間割·レポート"],
    "flea-market": ["出店10-20ブース", "イベント売上約1000万ウォン", "領収書·精算·PDF"],
    lucent: ["注文·制作·配送管理", "複数ポップアップ運営", "平均売上200-300万ウォン"],
    ssudam: ["2024ハッカソン受賞", "AI活用力を評価", "アイデア品質を検証"],
    temis: ["有料ユーザー100名以上", "週次実利用200名+", "売上800万ウォン+"],
    "vshot-v2": ["2026 Illustar Fes", "配信者コラボ20名+", "イベント完了"],
  },
};

const getStartTime = (startDate: string) => {
  const [year = "0", month = "1", day = "1"] = startDate.split("-");
  return Date.UTC(Number(year), Number(month) - 1, Number(day));
};

const sortByStartDateAsc = (items: Project[]) =>
  [...items].sort((a, b) => getStartTime(a.startDate) - getStartTime(b.startDate));

const localizeDeveloperProfile = (
  language: Language,
): LocalizedDeveloperProfile => {
  const locale =
    developerProfile.locale[language] ?? developerProfile.locale[defaultLanguage];

  return {
    ...developerProfile,
    ...locale,
  };
};

const localizeProjects = (language: Language): LocalizedProject[] => {
  const copy = portfolioCopy[language];

  return sortByStartDateAsc(projects).map((project, index) => {
    const locale = project.locale[language] ?? project.locale[defaultLanguage];
    const detail = projectDetails.find((item) => item.id === project.id);
    const defaultDetailLocale = detail?.locale[defaultLanguage];
    const detailLocale =
      detail?.locale[language] ??
      defaultDetailLocale ??
      ({
        contribution: [],
        features: [],
        learned: "",
        outcome: "",
        problems: [],
        stack: [],
        stills: project.shots,
        synopsis: locale.description,
      } satisfies NonNullable<ProjectDetail["locale"][Language]>);
    const ended = project.status === "ended";
    const heroSummary = detailLocale.heroSummary ??
      defaultDetailLocale?.heroSummary ?? {
        decision: locale.description,
        problem: locale.tagline,
        result: detailLocale.outcome || locale.description,
        role: locale.role,
    };
    const stillAssets = detail?.assets?.stills ?? [];

    return {
      ...project,
      ...locale,
      cardOpacity: ended ? 0.82 : 1,
      cardTags:
        cardTagsByLanguage[language][project.id] ??
        cardTagsByLanguage[defaultLanguage][project.id] ??
        [],
      desc: locale.description,
      dimmed: ended,
      eng: project.subtitle,
      num: String(index + 1).padStart(2, "0"),
      contribution: detailLocale.contribution.map((dept) => ({
        key: dept.key,
        label: getDepartmentLabel(copy, dept.key),
        lead: Boolean(dept.lead),
        items: dept.items,
      })),
      detailStack: detailLocale.stack,
      detailStills: detailLocale.stills.map((name, index) => ({
        alt: stillAssets[index]?.alt,
        fit: stillAssets[index]?.fit,
        name,
        src: stillAssets[index]?.src,
        tag: String(index + 1).padStart(2, "0"),
      })),
      features: detailLocale.features.map((feature, index) => ({
        ...feature,
        scene: `S#${String(index + 1).padStart(2, "0")}`,
      })),
      heroSummary,
      learned: detailLocale.learned,
      outcome: detailLocale.outcome,
      posterFilter: ended ? "grayscale(0.45)" : "none",
      posterSrc: detail?.assets?.posterSrc,
      architectureAlt: detail?.assets?.architectureAlt,
      architectureHeight: detail?.assets?.architectureHeight,
      architectureHtmlSrc: detail?.assets?.architectureHtmlSrc,
      architectureWidth: detail?.assets?.architectureWidth,
      problems: detailLocale.problems,
      privacyNotes: detailLocale.privacyNotes ??
        defaultDetailLocale?.privacyNotes ??
        [],
      proofMetrics: detailLocale.proofMetrics ??
        defaultDetailLocale?.proofMetrics ??
        [],
      qualitySignals: detailLocale.qualitySignals ??
        defaultDetailLocale?.qualitySignals ??
        [],
      scope: detail?.scope ?? "Frontend",
      synopsis: detailLocale.synopsis,
      statusColor: getStatusColor(project.status),
      statusLabel: getStatusLabel(copy, project.status),
      stackDisplay: project.stack.map((credit) => ({
        ...credit,
        billingLabel: copy[billingLabelKeys[credit.billing]],
      })),
      talkingPoints: detailLocale.talkingPoints ??
        defaultDetailLocale?.talkingPoints ??
        [],
    };
  });
};

export function CinemaPortfolio() {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [shotIndex, setShotIndex] = useState(0);

  const copy = portfolioCopy[language];
  const localizedProjects = useMemo(() => localizeProjects(language), [language]);
  const profile = useMemo(() => localizeDeveloperProfile(language), [language]);
  const featured =
    localizedProjects.find((project) => project.status === "now") ??
    localizedProjects[0];
  const selectedProject = selectedId
    ? localizedProjects.find((project) => project.id === selectedId)
    : null;
  const currentShot =
    selectedProject?.detailStills[shotIndex]?.name ??
    selectedProject?.detailStills[0]?.name;

  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedId(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  const openProject = (projectId: string) => {
    setShotIndex(0);
    setSelectedId(projectId);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFCE00] text-[#16130C]">
      <CinemaHeader
        copy={copy}
        featured={featured}
        language={language}
        onLanguageChange={setLanguage}
        onOpenFeatured={openProject}
      />
      <HeroSection
        profile={profile}
      />
      <TickerStrip ticker={copy.ticker} />
      <ProjectGallery
        copy={copy}
        onOpenProject={openProject}
        projects={localizedProjects}
      />
      <CinemaFooter />

      {selectedProject ? (
        <ProjectOverlay
          copy={copy}
          currentShot={currentShot}
          language={language}
          onClose={() => setSelectedId(null)}
          onShotChange={setShotIndex}
          project={selectedProject}
          shotIndex={shotIndex}
        />
      ) : null}
    </main>
  );
}
