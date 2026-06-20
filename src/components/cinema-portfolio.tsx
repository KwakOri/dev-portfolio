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
  LocalizedProject,
  PortfolioCopy,
  ProjectDetail,
} from "./cinema/types";

const projects = rawProjects as Project[];
const projectDetails = rawProjectDetails as ProjectDetail[];

const billingLabelKeys = {
  lead: "billLead",
  support: "billSupport",
  cameo: "billCameo",
} satisfies Record<Billing, "billLead" | "billSupport" | "billCameo">;

const getStatusLabel = (copy: PortfolioCopy, status: ProjectStatus) => {
  if (status === "now") {
    return copy.statusNow;
  }

  if (status === "coming") {
    return copy.statusComing;
  }

  return copy.statusEnded;
};

const getStatusColor = (status: ProjectStatus) => statusThemes[status].ribbon;
const getDepartmentLabel = (copy: PortfolioCopy, key: ContributionKey) =>
  copy[`dept_${key}`] ?? key.toUpperCase();

const localizeProjects = (language: Language): LocalizedProject[] => {
  const copy = portfolioCopy[language];

  return projects.map((project) => {
    const locale = project.locale[language] ?? project.locale[defaultLanguage];
    const detail = projectDetails.find((item) => item.id === project.id);
    const detailLocale =
      detail?.locale[language] ??
      detail?.locale[defaultLanguage] ??
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

    return {
      ...project,
      ...locale,
      cardOpacity: ended ? 0.82 : 1,
      desc: locale.description,
      dimmed: ended,
      eng: project.subtitle,
      contribution: detailLocale.contribution.map((dept) => ({
        key: dept.key,
        label: getDepartmentLabel(copy, dept.key),
        lead: Boolean(dept.lead),
        items: dept.items,
      })),
      detailStack: detailLocale.stack,
      detailStills: detailLocale.stills.map((name, index) => ({
        name,
        tag: String(index + 1).padStart(2, "0"),
      })),
      features: detailLocale.features.map((feature, index) => ({
        ...feature,
        scene: `S#${String(index + 1).padStart(2, "0")}`,
      })),
      learned: detailLocale.learned,
      outcome: detailLocale.outcome,
      posterFilter: ended ? "grayscale(0.45)" : "none",
      problems: detailLocale.problems,
      scope: detail?.scope ?? "Frontend",
      synopsis: detailLocale.synopsis,
      statusColor: getStatusColor(project.status),
      statusLabel: getStatusLabel(copy, project.status),
      stackDisplay: project.stack.map((credit) => ({
        ...credit,
        billingLabel: copy[billingLabelKeys[credit.billing]],
      })),
    };
  });
};

export function CinemaPortfolio() {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [shotIndex, setShotIndex] = useState(0);

  const copy = portfolioCopy[language];
  const localizedProjects = useMemo(() => localizeProjects(language), [language]);
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
        copy={copy}
        featured={featured}
        onOpenProject={openProject}
      />
      <TickerStrip ticker={copy.ticker} />
      <ProjectGallery
        copy={copy}
        onOpenProject={openProject}
        projects={localizedProjects}
      />
      <CinemaFooter copy={copy} />

      {selectedProject ? (
        <ProjectOverlay
          copy={copy}
          currentShot={currentShot}
          onClose={() => setSelectedId(null)}
          onShotChange={setShotIndex}
          project={selectedProject}
          shotIndex={shotIndex}
        />
      ) : null}
    </main>
  );
}
