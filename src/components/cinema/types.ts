import type { CSSProperties } from "react";
import type { Billing, Language, Project } from "@/constants/portfolio";
import type { portfolioCopy } from "@/constants/portfolio";

export type PortfolioCopy = (typeof portfolioCopy)[Language];

export type LocalizedProject = Project & {
  eng: string;
  role: string;
  period: string;
  desc: string;
  statusLabel: string;
  statusColor: string;
  dimmed: boolean;
  cardOpacity: number;
  posterFilter: string;
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
