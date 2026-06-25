import type { CSSProperties } from "react";
import type { Billing, Language, Project } from "@/constants/portfolio";
import type { portfolioCopy } from "@/constants/portfolio";

export type PortfolioCopy = (typeof portfolioCopy)[Language];
export type ContributionKey = "fe" | "be" | "db" | "infra";
export type ProjectVisualFit = "contain" | "cover";
export type ProjectVisualAsset = {
  src: string;
  alt?: string;
  fit?: ProjectVisualFit;
};
export type QualitySignalType =
  | "accessibility"
  | "performance"
  | "testing"
  | "error-state"
  | "maintainability";

export type ProjectDetailLocale = {
  synopsis: string;
  contribution: {
    key: ContributionKey;
    lead?: boolean;
    items: string[];
  }[];
  features: {
    title: string;
    desc: string;
  }[];
  problems: {
    title: string;
    desc: string;
    situation?: string;
    solution?: string;
  }[];
  outcome: string;
  learned: string;
  stack: {
    name: string;
    reason: string;
  }[];
  stills: string[];
  heroSummary?: {
    problem: string;
    role: string;
    decision: string;
    result: string;
  };
  proofMetrics?: {
    label: string;
    value: string;
    note?: string;
  }[];
  qualitySignals?: {
    type: QualitySignalType;
    title: string;
    desc: string;
  }[];
  talkingPoints?: string[];
  privacyNotes?: string[];
};

export type ProjectDetail = {
  id: string;
  assets?: {
    posterSrc?: string;
    architectureHtmlSrc?: string;
    architectureWidth?: number;
    architectureHeight?: number;
    architectureAlt?: string;
    stills?: ProjectVisualAsset[];
  };
  scope: string;
  locale: Partial<Record<Language, ProjectDetailLocale>>;
};

export type DeveloperProfileLocale = {
  kicker: string;
  tagline: string;
  lead: string;
  sub: string;
  projectsCta: string;
  resumeCta: string;
  availability: string;
  mainRoleLabel: string;
  backstageLabel: string;
  genreLabel: string;
  stackLabel: string;
  roleMain: string;
  backstage: string[];
  genre: string[];
};

export type DeveloperProfile = {
  imageSrc: string;
  imageAlt: string;
  headline: string[];
  stackLines: string[];
  locale: Record<Language, DeveloperProfileLocale>;
};

export type LocalizedDeveloperProfile = Omit<DeveloperProfile, "locale"> &
  DeveloperProfileLocale;

export type LocalizedProject = Project & {
  eng: string;
  role: string;
  period: string;
  desc: string;
  tagline: string;
  statusLabel: string;
  statusColor: string;
  dimmed: boolean;
  cardOpacity: number;
  posterFilter: string;
  cardTags: string[];
  scope: string;
  synopsis: string;
  contribution: {
    key: ContributionKey;
    label: string;
    lead: boolean;
    items: string[];
  }[];
  features: {
    scene: string;
    title: string;
    desc: string;
  }[];
  problems: {
    title: string;
    desc: string;
    situation?: string;
    solution?: string;
  }[];
  outcome: string;
  learned: string;
  detailStack: {
    name: string;
    reason: string;
  }[];
  detailStills: {
    tag: string;
    name: string;
    src?: string;
    alt?: string;
    fit?: ProjectVisualFit;
  }[];
  posterSrc?: string;
  architectureHtmlSrc?: string;
  architectureWidth?: number;
  architectureHeight?: number;
  architectureAlt?: string;
  heroSummary: {
    problem: string;
    role: string;
    decision: string;
    result: string;
  };
  proofMetrics: {
    label: string;
    value: string;
    note?: string;
  }[];
  qualitySignals: {
    type: QualitySignalType;
    title: string;
    desc: string;
  }[];
  talkingPoints: string[];
  privacyNotes: string[];
  stackDisplay: {
    billing: Billing;
    billingLabel: string;
    name: string;
  }[];
};

export type ProjectStyle = CSSProperties & {
  "--project-accent": string;
  "--project-status": string;
};
