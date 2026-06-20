import { PosterArtwork } from "./poster-artwork";
import type { LocalizedProject, PortfolioCopy } from "./types";
import {
  ctaButtonVariants,
  overlayMetaVariants,
  stillButtonVariants,
} from "./variants";

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
  return (
    <div
      aria-labelledby={`project-title-${project.id}`}
      aria-modal="true"
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[#080603]/90 p-4 backdrop-blur-sm sm:p-7"
      onClick={onClose}
      role="dialog"
    >
      <div
        className="scf-pop relative grid max-h-[88vh] w-full max-w-[1080px] overflow-hidden border-4 border-[#FFCE00] bg-[#14110A] shadow-[0_30px_80px_rgba(0,0,0,0.6)] lg:grid-cols-[minmax(0,380px)_1fr]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          aria-label={copy.close}
          className="absolute right-3.5 top-3.5 z-[5] h-10 w-10 border-0 bg-[#FFCE00] font-anton text-[22px] leading-none text-[#16130C]"
          onClick={onClose}
          type="button"
        >
          ✕
        </button>

        <div className="hidden lg:block">
          <PosterArtwork
            project={project}
            surface="overlay"
            withCaption
            withStatus={false}
          />
        </div>

        <div className="max-h-[88vh] overflow-y-auto px-5 py-10 text-[#f3e9d2] sm:px-10 sm:pb-11">
          <div
            className="mb-2 font-oswald text-[13px] font-semibold tracking-[3px]"
            style={{ color: project.accent }}
          >
            {project.eng}
          </div>
          <h3
            className="m-0 mb-4 font-anton text-[clamp(44px,6vw,72px)] uppercase leading-[0.86] text-[#FFCE00]"
            id={`project-title-${project.id}`}
          >
            {project.title}
          </h3>

          <div className="mb-[26px] flex flex-wrap gap-2.5">
            <span
              className={overlayMetaVariants({ tone: "status" })}
              style={{ backgroundColor: project.statusColor }}
            >
              ● {project.statusLabel}
            </span>
            <span className={overlayMetaVariants({ tone: "outline" })}>
              {copy.periodLabel} · {project.period}
            </span>
            <span className={overlayMetaVariants({ tone: "outline" })}>
              {copy.roleLabel} · {project.role}
            </span>
          </div>

          <div
            className="mb-2 font-oswald text-xs font-bold tracking-[3px]"
            style={{ color: project.accent }}
          >
            — {copy.descLabel}
          </div>
          <p className="m-0 mb-7 text-[15px] leading-[1.75] text-[#e6dcc4]">
            {project.desc}
          </p>

          <div
            className="mb-3 font-oswald text-xs font-bold tracking-[3px]"
            style={{ color: project.accent }}
          >
            — {copy.stackLabel}
          </div>
          <div className="mb-[30px] flex flex-col gap-px border border-[#f3e9d2]/20">
            {project.stackDisplay.map((credit) => (
              <div
                className="flex items-center justify-between bg-white/[0.03] px-[15px] py-[11px]"
                key={`${project.id}-${credit.billing}-${credit.name}`}
              >
                <span className="font-oswald text-xs font-semibold tracking-[2px] text-[#f3e9d2]/60">
                  {credit.billingLabel}
                </span>
                <span className="font-anton text-lg tracking-[0.5px] text-[#FFCE00]">
                  {credit.name}
                </span>
              </div>
            ))}
          </div>

          <div className="mb-8 flex flex-wrap gap-3">
            <a
              className={ctaButtonVariants({ size: "overlay", tone: "overlay" })}
              href={project.liveUrl}
              rel="noreferrer"
              target="_blank"
            >
              ▸ {copy.live}
            </a>
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
          </div>

          <div
            className="mb-3 font-oswald text-xs font-bold tracking-[3px]"
            style={{ color: project.accent }}
          >
            — {copy.shotsLabel}
          </div>
          <div className="relative mb-3 aspect-video overflow-hidden border-2 border-[#f3e9d2]/20 bg-[#17140E]">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#211c12_0_18px,#17140E_18px_36px)]" />
            <div className="absolute inset-0 flex items-center justify-center font-oswald text-[13px] font-semibold tracking-[3px] text-[#f3e9d2]/45">
              {currentShot}
            </div>
          </div>
          <div className="flex gap-2.5">
            {project.shots.map((shot, index) => (
              <button
                aria-label={`${copy.shotsLabel} ${index + 1}: ${shot}`}
                aria-pressed={shotIndex === index}
                className={stillButtonVariants({ active: shotIndex === index })}
                key={shot}
                onClick={() => onShotChange(index)}
                type="button"
              >
                <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#211c12_0_10px,#17140E_10px_20px)]" />
                <div className="absolute inset-0 flex items-center justify-center font-oswald text-[11px] font-bold text-[#f3e9d2]/55">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
