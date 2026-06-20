import type { CSSProperties } from "react";
import type { Billing, Language, Project } from "@/constants/portfolio";
import type { portfolioCopy } from "@/constants/portfolio";

export type PortfolioCopy = (typeof portfolioCopy)[Language];
export type ContributionKey = "fe" | "be" | "db" | "infra";

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
  }[];
  outcome: string;
  learned: string;
  stack: {
    name: string;
    reason: string;
  }[];
  stills: string[];
};

export type ProjectDetail = {
  id: string;
  scope: string;
  locale: Partial<Record<Language, ProjectDetailLocale>>;
};

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
  }[];
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
