import type { ReactNode } from "react";
import { ctaButtonVariants, stillButtonVariants } from "./variants";
import type { LocalizedProject, PortfolioCopy } from "./types";

export function ProjectOverlay({
  copy,
  currentShot,
  onClose,
  onShotChange,
  project,
  shotIndex,
}: {
  copy: PortfolioCopy;
  currentShot?: string;
  onClose: () => void;
  onShotChange: (index: number) => void;
  project: LocalizedProject;
  shotIndex: number;
}) {
  const liveEnabled = project.liveUrl !== "#";
  const repoEnabled = project.repoUrl !== "#";
  const selectedStill = project.detailStills[shotIndex] ?? project.detailStills[0];

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
        <button
          aria-label={copy.close}
          className="absolute right-4 top-4 z-20 h-[42px] w-[42px] border-0 bg-[#FFCE00] font-anton text-[22px] leading-none text-[#16130C] shadow-[3px_3px_0_rgba(0,0,0,0.4)]"
          onClick={onClose}
          type="button"
        >
          ✕
        </button>

        <div className="max-h-[92vh] overflow-y-auto">
          <div className="relative overflow-hidden border-b-[3px] border-[#FFCE00] bg-[#17140E] px-5 py-10 sm:px-12 sm:pb-[34px] sm:pt-[46px]">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#1d1810_0_17px,#17140E_17px_34px)]" />
            <div className="absolute inset-0 bg-[radial-gradient(90%_120%_at_100%_0%,rgba(255,180,0,0.16),transparent_55%)]" />
            <div
              className="pointer-events-none absolute bottom-[-30px] right-6 select-none font-anton text-[200px] leading-[0.7] opacity-15"
              style={{ color: project.accent }}
            >
              {project.num}
            </div>

            <div className="relative z-[1] max-w-[760px]">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-oswald text-[11px] font-bold tracking-[2px] text-white/40">
                  REEL · {project.num}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-[11px] py-[5px] font-oswald text-xs font-bold tracking-[1px] text-white"
                  style={{ backgroundColor: project.statusColor }}
                >
                  ● {project.statusLabel}
                </span>
              </div>

              <div
                className="mb-1.5 font-oswald text-sm font-semibold tracking-[3px]"
                style={{ color: project.accent }}
              >
                {project.eng}
              </div>
              <h3
                className="m-0 mb-4 font-anton text-[clamp(46px,6.5vw,84px)] uppercase leading-[0.84] text-[#FFCE00]"
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
            </div>
          </div>

          <div className="px-5 py-10 text-[#f3e9d2] sm:px-12 sm:pb-12">
            <SectionTitle accent={project.accent}>{copy.synopsisLabel}</SectionTitle>
            <p className="m-0 mb-9 max-w-[760px] text-[15px] leading-[1.8] text-[#e6dcc4]">
              {project.synopsis}
            </p>

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
                        <span className="shrink-0" style={{ color: project.accent }}>
                          ▸
                        </span>
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
                  <div className="text-[13px] leading-[1.65] text-[#d8cdb4]">
                    {problem.desc}
                  </div>
                </div>
              ))}
            </div>

            <SectionTitle accent={project.accent}>{copy.shotsLabel}</SectionTitle>
            <div className="relative mb-2.5 aspect-video overflow-hidden border-2 border-[#f3e9d2]/20 bg-[#17140E]">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#211c12_0_18px,#17140E_18px_36px)]" />
              <div className="absolute left-4 top-3.5 font-oswald text-[11px] font-bold tracking-[2px] text-[#f3e9d2]/40">
                STILL · {selectedStill?.tag ?? "01"}
              </div>
              <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-[15px] font-semibold tracking-[1px] text-[#f3e9d2]/55">
                {currentShot ?? selectedStill?.name}
              </div>
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
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#211c12_0_10px,#17140E_10px_20px)]" />
                  <div className="absolute inset-0 flex items-center justify-center font-oswald text-xs font-bold text-[#f3e9d2]/60">
                    {shot.tag}
                  </div>
                </button>
              ))}
            </div>

            <SectionTitle accent={project.accent}>{copy.impactLabel}</SectionTitle>
            <div className="mb-9 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
              <div className="bg-[#FFCE00] px-5 py-[18px] text-[#16130C]">
                <div className="mb-2 font-oswald text-[11px] font-bold tracking-[2px] opacity-70">
                  ★ {copy.outcomeLabel}
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
                  ✎ {copy.learnedLabel}
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

            <div className="flex flex-wrap gap-3">
              {liveEnabled ? (
                <a
                  className={ctaButtonVariants({ size: "overlay", tone: "overlay" })}
                  href={project.liveUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  ▸ {copy.live}
                </a>
              ) : (
                <DisabledLink>
                  ▸ {copy.live} · {copy.linkSoon}
                </DisabledLink>
              )}
              {repoEnabled ? (
                <a
                  className={ctaButtonVariants({
                    size: "overlay",
                    tone: "overlayOutline",
                  })}
                  href={project.repoUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  ◆ {copy.repo}
                </a>
              ) : (
                <DisabledLink>
                  ◆ {copy.repo} · {copy.linkSoon}
                </DisabledLink>
              )}
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

function DisabledLink({ children }: { children: ReactNode }) {
  return (
    <span className="flex cursor-not-allowed items-center gap-2 border-2 border-dashed border-[#f3e9d2]/30 bg-transparent px-5 py-[11px] font-oswald text-sm font-bold tracking-[1px] text-[#f3e9d2]/40">
      {children}
    </span>
  );
}
