import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import type { Language } from "@/constants/portfolio";
import {
  Accessibility,
  Bug,
  Circle,
  ExternalLink,
  GitBranch,
  Gauge,
  PencilLine,
  Play,
  ShieldCheck,
  Star,
  Wrench,
  X,
} from "lucide-react";
import { detailPanelVariants, stillButtonVariants } from "./variants";
import { ArchitectureLayer } from "./architecture-layer";
import type {
  LocalizedProject,
  PortfolioCopy,
  QualitySignalType,
} from "./types";

const qualitySignalIcons: Record<QualitySignalType, LucideIcon> = {
  accessibility: Accessibility,
  "error-state": Bug,
  maintainability: Wrench,
  performance: Gauge,
  testing: ShieldCheck,
};

type ProjectActionStyle = CSSProperties & {
  "--project-action-accent"?: string;
};

const getImageFitClass = (
  fit?: LocalizedProject["detailStills"][number]["fit"],
) => (fit === "contain" ? "object-contain" : "object-cover");

export function ProjectOverlay({
  copy,
  currentShot,
  language,
  onClose,
  onShotChange,
  project,
  shotIndex,
}: {
  copy: PortfolioCopy;
  currentShot?: string;
  language: Language;
  onClose: () => void;
  onShotChange: (index: number) => void;
  project: LocalizedProject;
  shotIndex: number;
}) {
  const liveEnabled = project.liveUrl !== "#";
  const repoLinks = project.repoLinks?.length
    ? project.repoLinks
    : project.repoUrl !== "#"
      ? [{ label: copy.repo, url: project.repoUrl }]
      : [];
  const selectedStill = project.detailStills[shotIndex] ?? project.detailStills[0];
  const summaryItems = [
    {
      label: copy.summaryProblemLabel,
      value: project.heroSummary.problem,
    },
    {
      label: copy.summaryRoleLabel,
      value: project.heroSummary.role,
    },
    {
      label: copy.summaryDecisionLabel,
      value: project.heroSummary.decision,
    },
    {
      label: copy.summaryResultLabel,
      value: project.heroSummary.result,
    },
  ];

  return (
    <div
      aria-labelledby={`project-title-${project.id}`}
      aria-modal="true"
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[#080603]/90 p-4 backdrop-blur-[5px] sm:p-6"
      onClick={onClose}
      role="dialog"
    >
      <div
        className="scf-pop relative flex max-h-[92vh] w-full max-w-[1140px] flex-col overflow-hidden border-4 border-[#FFCE00] bg-[#14110A] shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute right-4 top-4 z-20 flex max-w-[calc(100vw-2rem)] items-start justify-end gap-2 sm:right-6 sm:top-6 sm:max-w-[calc(100vw-3rem)] lg:right-8 lg:top-8 lg:max-w-[calc(100vw-4rem)]">
          <div className="flex max-w-[calc(100vw-5.5rem)] flex-wrap justify-end gap-2 sm:flex-nowrap">
            {liveEnabled ? (
              <ProjectActionLink href={project.liveUrl} tone="live">
                <ExternalLink
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={3}
                />
                {copy.live}
              </ProjectActionLink>
            ) : (
              <DisabledLink icon="external">
                {copy.live} · {copy.linkSoon}
              </DisabledLink>
            )}
            <div className="flex max-w-full flex-wrap justify-end gap-2 sm:flex-nowrap">
              {repoLinks.length > 0 ? (
                repoLinks.map((link) =>
                  link.url !== "#" ? (
                    <ProjectActionLink
                      href={link.url}
                      key={`${project.id}-${link.label}`}
                      accent={project.accent}
                      tone="repo"
                    >
                      <GitBranch
                        aria-hidden="true"
                        className="h-4 w-4"
                        strokeWidth={3}
                      />
                      {link.label}
                    </ProjectActionLink>
                  ) : (
                    <DisabledLink
                      icon="repo"
                      key={`${project.id}-${link.label}`}
                    >
                      {link.label} · {copy.linkSoon}
                    </DisabledLink>
                  ),
                )
              ) : (
                <DisabledLink icon="repo">
                  {copy.repo} · {copy.linkSoon}
                </DisabledLink>
              )}
            </div>
          </div>
          <button
            aria-label={copy.close}
            className="flex h-[42px] w-[42px] shrink-0 items-center justify-center border-0 bg-[#FFCE00] text-[#16130C] shadow-[3px_3px_0_rgba(0,0,0,0.4)]"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" className="h-6 w-6" strokeWidth={3} />
          </button>
        </div>

        <div className="scf-overlay-scroll max-h-[92vh] overflow-y-auto">
          <div className="relative overflow-hidden border-b-[3px] border-[#FFCE00] bg-[#17140E] px-5 pb-10 pt-[126px] sm:px-12 sm:pb-[34px] sm:pt-[126px] lg:pt-[46px]">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#1d1810_0_17px,#17140E_17px_34px)]" />
            <div className="absolute inset-0 bg-[radial-gradient(90%_120%_at_100%_0%,rgba(255,180,0,0.16),transparent_55%)]" />
            <div
              className="pointer-events-none absolute bottom-[-30px] right-6 select-none font-anton text-[200px] leading-[0.7] opacity-15"
              style={{ color: project.accent }}
            >
              {project.num}
            </div>

            <div className="relative z-[1] max-w-[760px] lg:max-w-[620px] xl:max-w-[720px]">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-oswald text-[11px] font-bold tracking-[2px] text-white/40">
                  REEL · {project.num}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-[11px] py-[5px] font-oswald text-xs font-bold tracking-[1px] text-white"
                  style={{ backgroundColor: project.statusColor }}
                >
                  <Circle
                    aria-hidden="true"
                    className="h-2.5 w-2.5 fill-current"
                    strokeWidth={3}
                  />
                  {project.statusLabel}
                </span>
              </div>

              <div
                className="mb-1.5 font-oswald text-sm font-semibold tracking-[3px]"
                style={{ color: project.accent }}
              >
                {project.eng}
              </div>
              <h3
                className="m-0 mb-4 font-anton text-[clamp(46px,6.5vw,84px)] leading-[0.84] text-[#FFCE00]"
                id={`project-title-${project.id}`}
              >
                {project.title}
              </h3>
              <p
                className="m-0 mb-[22px] max-w-[600px] border-l-[3px] pl-3.5 text-base italic leading-[1.6] text-[#f3e9d2]"
                style={{ borderColor: project.accent }}
              >
                “{project.tagline}”
              </p>

              <div className="flex flex-wrap gap-[9px]">
                <MetaBox label={copy.periodLabel} value={project.period} />
                <MetaBox label={copy.roleLabel} value={project.role} />
                <MetaBox
                  accent={project.accent}
                  label={copy.scopeLabel}
                  value={project.scope}
                />
              </div>

              <div className="mt-5">
                <div className="mb-2.5 font-oswald text-[11px] font-bold tracking-[2px] text-[#f3e9d2]/45">
                  {copy.summaryLabel}
                </div>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {summaryItems.map((item) => (
                    <div
                      className={detailPanelVariants({ tone: "summary" })}
                      key={item.label}
                    >
                      <div
                        className="mb-1 font-oswald text-[9px] font-bold tracking-[2px]"
                        style={{ color: project.accent }}
                      >
                        {item.label}
                      </div>
                      <div className="text-[12.5px] leading-[1.55] text-[#f3e9d2]/85">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 py-10 text-[#f3e9d2] sm:px-12 sm:pb-12">
            {project.proofMetrics.length > 0 ? (
              <>
                <SectionTitle accent={project.accent}>{copy.proofLabel}</SectionTitle>
                <div className="mb-9 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
                  {project.proofMetrics.map((metric) => (
                    <div
                      className={detailPanelVariants({ tone: "metric" })}
                      key={`${project.id}-${metric.label}`}
                    >
                      <div
                        className="mb-1 font-anton text-[28px] leading-none"
                        style={{ color: project.accent }}
                      >
                        {metric.value}
                      </div>
                      <div className="mb-1 font-oswald text-[11px] font-bold tracking-[1px] text-[#FFCE00]">
                        {metric.label}
                      </div>
                      {metric.note ? (
                        <div className="text-[12px] leading-[1.55] text-[#d8cdb4]">
                          {metric.note}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            <SectionTitle accent={project.accent}>{copy.synopsisLabel}</SectionTitle>
            <p className="m-0 mb-9 max-w-[760px] text-[15px] leading-[1.8] text-[#e6dcc4]">
              {project.synopsis}
            </p>

            {project.architectureHtmlSrc ? (
              <>
                <SectionTitle accent={project.accent}>
                  {copy.architectureLabel}
                </SectionTitle>
                <ArchitectureLayer
                  alt={project.architectureAlt ?? `${project.title} architecture layer`}
                  height={project.architectureHeight}
                  language={language}
                  projectId={project.id}
                  src={project.architectureHtmlSrc}
                  width={project.architectureWidth}
                />
              </>
            ) : null}

            <SectionTitle accent={project.accent}>
              {copy.contributionLabel}
            </SectionTitle>
            <div className="mb-9 grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(248px,1fr))]">
              {project.contribution.map((dept) => (
                <div
                  className="border-2 border-[#f3e9d2]/15 bg-white/[0.02] px-[17px] py-4"
                  key={`${project.id}-${dept.key}`}
                >
                  <div className="mb-[11px] flex items-center gap-2">
                    <span className="font-anton text-[19px] tracking-[0.5px] text-[#FFCE00]">
                      {dept.label}
                    </span>
                    {dept.lead ? (
                      <span
                        className="px-[7px] py-[3px] font-oswald text-[9px] font-bold tracking-[1px] text-[#16130C]"
                        style={{ backgroundColor: project.accent }}
                      >
                        {copy.leadBadge}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-col gap-[7px]">
                    {dept.items.map((item) => (
                      <div
                        className="flex gap-2 text-[13px] leading-[1.5] text-[#d8cdb4]"
                        key={item}
                      >
                        <Play
                          aria-hidden="true"
                          className="mt-1 h-2.5 w-2.5 shrink-0 fill-current"
                          strokeWidth={3}
                          style={{ color: project.accent }}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <SectionTitle accent={project.accent}>{copy.featuresLabel}</SectionTitle>
            <div className="mb-9 flex flex-col gap-px border border-[#f3e9d2]/15">
              {project.features.map((feature) => (
                <div
                  className="flex items-start gap-[18px] bg-white/[0.025] px-[18px] py-4"
                  key={feature.scene}
                >
                  <span
                    className="min-w-[62px] shrink-0 font-anton text-3xl leading-[0.9]"
                    style={{ color: project.accent }}
                  >
                    {feature.scene}
                  </span>
                  <div>
                    <div className="mb-1 text-[15px] font-bold text-[#FFCE00]">
                      {feature.title}
                    </div>
                    <div className="text-[13px] leading-[1.6] text-[#d8cdb4]">
                      {feature.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SectionTitle accent={project.accent}>{copy.problemsLabel}</SectionTitle>
            <div className="mb-9 flex flex-col gap-3">
              {project.problems.map((problem) => (
                <div
                  className="border-l-4 bg-white/[0.025] px-[18px] py-3.5"
                  key={problem.title}
                  style={{ borderColor: project.accent }}
                >
                  <div className="mb-[5px] text-sm font-bold text-[#FFCE00]">
                    {problem.title}
                  </div>
                  {problem.situation || problem.solution ? (
                    <div className="grid gap-2.5 text-[13px] leading-[1.65] text-[#d8cdb4] sm:grid-cols-2">
                      {problem.situation ? (
                        <ProblemDetail
                          label={copy.problemSituationLabel}
                          value={problem.situation}
                        />
                      ) : null}
                      {problem.solution ? (
                        <ProblemDetail
                          label={copy.problemSolutionLabel}
                          value={problem.solution}
                        />
                      ) : null}
                    </div>
                  ) : (
                    <div className="text-[13px] leading-[1.65] text-[#d8cdb4]">
                      {problem.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {project.qualitySignals.length > 0 ? (
              <>
                <SectionTitle accent={project.accent}>
                  {copy.qualityLabel}
                </SectionTitle>
                <div className="mb-9 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
                  {project.qualitySignals.map((signal) => {
                    const Icon = qualitySignalIcons[signal.type];

                    return (
                      <div
                        className={detailPanelVariants({ tone: "quality" })}
                        key={`${project.id}-${signal.type}-${signal.title}`}
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <span
                            className="flex h-7 w-7 shrink-0 items-center justify-center border"
                            style={{
                              borderColor: project.accent,
                              color: project.accent,
                            }}
                          >
                            <Icon
                              aria-hidden="true"
                              className="h-4 w-4"
                              strokeWidth={2.6}
                            />
                          </span>
                          <div className="font-oswald text-[13px] font-bold tracking-[1px] text-[#FFCE00]">
                            {signal.title}
                          </div>
                        </div>
                        <div className="text-[12.5px] leading-[1.6] text-[#d8cdb4]">
                          {signal.desc}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : null}

            <SectionTitle accent={project.accent}>{copy.shotsLabel}</SectionTitle>
            <div className="relative mb-2.5 aspect-video overflow-hidden border-2 border-[#f3e9d2]/20 bg-[#17140E]">
              {selectedStill?.src ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element -- Stills are prepared project screenshots. */}
                  <img
                    alt={selectedStill.alt ?? selectedStill.name}
                    className={`absolute inset-0 h-full w-full ${getImageFitClass(selectedStill.fit)}`}
                    src={selectedStill.src}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,6,3,0.44),transparent_34%,rgba(8,6,3,0.72))]" />
                </>
              ) : (
                <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#211c12_0_18px,#17140E_18px_36px)]" />
              )}
              <div className="absolute left-4 top-3.5 font-oswald text-[11px] font-bold tracking-[2px] text-[#f3e9d2]/40">
                STILL · {selectedStill?.tag ?? "01"}
              </div>
              {selectedStill?.src ? (
                <div className="absolute bottom-4 left-4 right-4 text-[15px] font-semibold tracking-[0.4px] text-[#f3e9d2] [text-shadow:0_2px_8px_rgba(0,0,0,0.75)]">
                  {selectedStill.name}
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-[15px] font-semibold tracking-[1px] text-[#f3e9d2]/55">
                  {currentShot ?? selectedStill?.name}
                </div>
              )}
            </div>
            <div className="mb-9 flex gap-2.5">
              {project.detailStills.map((shot, index) => (
                <button
                  aria-label={`${copy.shotsLabel} ${index + 1}: ${shot.name}`}
                  aria-pressed={shotIndex === index}
                  className={stillButtonVariants({ active: shotIndex === index })}
                  key={`${project.id}-${shot.tag}`}
                  onClick={() => onShotChange(index)}
                  type="button"
                >
                  {shot.src ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element -- Stills are prepared project screenshots. */}
                      <img
                        alt=""
                        className={`absolute inset-0 h-full w-full ${getImageFitClass(shot.fit)}`}
                        src={shot.src}
                      />
                      <div className="absolute inset-0 bg-[#080603]/45" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#211c12_0_10px,#17140E_10px_20px)]" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center font-oswald text-xs font-bold text-[#f3e9d2]/80">
                    {shot.tag}
                  </div>
                </button>
              ))}
            </div>

            <SectionTitle accent={project.accent}>{copy.impactLabel}</SectionTitle>
            <div className="mb-9 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
              <div className="bg-[#FFCE00] px-5 py-[18px] text-[#16130C]">
                <div className="mb-2 font-oswald text-[11px] font-bold tracking-[2px] opacity-70">
                  <span className="inline-flex items-center gap-1.5">
                    <Star
                      aria-hidden="true"
                      className="h-3 w-3 fill-current"
                      strokeWidth={3}
                    />
                    {copy.outcomeLabel}
                  </span>
                </div>
                <div className="text-sm font-medium leading-[1.65]">
                  {project.outcome}
                </div>
              </div>
              <div className="border-2 border-[#f3e9d2]/20 px-5 py-[18px]">
                <div
                  className="mb-2 font-oswald text-[11px] font-bold tracking-[2px]"
                  style={{ color: project.accent }}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <PencilLine
                      aria-hidden="true"
                      className="h-3 w-3"
                      strokeWidth={3}
                    />
                    {copy.learnedLabel}
                  </span>
                </div>
                <div className="text-sm leading-[1.65] text-[#e6dcc4]">
                  {project.learned}
                </div>
              </div>
            </div>

            <SectionTitle accent={project.accent}>{copy.stackLabel}</SectionTitle>
            <div className="mb-[34px] flex flex-col gap-px border border-[#f3e9d2]/15">
              {project.detailStack.map((credit) => (
                <div
                  className="flex items-center gap-[18px] bg-white/[0.025] px-4 py-[13px]"
                  key={`${project.id}-${credit.name}`}
                >
                  <span className="min-w-[140px] shrink-0 font-anton text-lg tracking-[0.5px] text-[#FFCE00]">
                    {credit.name}
                  </span>
                  <span className="text-[13px] leading-[1.5] text-[#c9bea6]">
                    {credit.reason}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  accent,
  children,
}: {
  accent: string;
  children: ReactNode;
}) {
  return (
    <div
      className="mb-3.5 font-oswald text-xs font-bold tracking-[3px]"
      style={{ color: accent }}
    >
      — {children}
    </div>
  );
}

function MetaBox({
  accent,
  label,
  value,
}: {
  accent?: string;
  label: string;
  value: string;
}) {
  return (
    <div
      className="flex flex-col gap-0.5 border-2 px-[13px] py-[7px]"
      style={{ borderColor: accent ?? "rgba(243,233,210,0.28)" }}
    >
      <span className="font-oswald text-[9px] font-semibold tracking-[2px] text-[#f3e9d2]/50">
        {label}
      </span>
      <span
        className="text-[13px] font-bold text-[#f3e9d2]"
        style={accent ? { color: accent } : undefined}
      >
        {value}
      </span>
    </div>
  );
}

function ProblemDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-1 font-oswald text-[10px] font-bold tracking-[1.5px] text-[#f3e9d2]/45">
        {label}
      </div>
      <div>{value}</div>
    </div>
  );
}

function ProjectActionLink({
  accent,
  children,
  href,
  tone,
}: {
  accent?: string;
  children: ReactNode;
  href: string;
  tone: "live" | "repo";
}) {
  const toneClass =
    tone === "live"
      ? "border-[#FFCE00] bg-[#FFCE00] text-[#16130C] shadow-[3px_3px_0_rgba(0,0,0,0.42)] hover:bg-[#ffd936]"
      : "project-repo-link shadow-[3px_3px_0_rgba(0,0,0,0.32)]";
  const repoStyle: ProjectActionStyle | undefined =
    tone === "repo"
      ? { "--project-action-accent": accent ?? "#FFCE00" }
      : undefined;

  return (
    <a
      className={`inline-flex min-h-10 items-center gap-2 whitespace-nowrap border-2 px-3.5 py-2 font-oswald text-[12px] font-bold tracking-[1px] transition ${toneClass}`}
      href={href}
      rel="noreferrer"
      style={repoStyle}
      target="_blank"
    >
      {children}
    </a>
  );
}

function DisabledLink({
  children,
  icon,
}: {
  children: ReactNode;
  icon: "external" | "repo";
}) {
  const Icon = icon === "external" ? ExternalLink : GitBranch;

  return (
    <span className="inline-flex min-h-10 cursor-not-allowed items-center gap-2 whitespace-nowrap border-2 border-dashed border-[#f3e9d2]/30 bg-[#080603]/45 px-3.5 py-2 font-oswald text-[12px] font-bold tracking-[1px] text-[#f3e9d2]/45">
      <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={3} />
      {children}
    </span>
  );
}
