import type { CSSProperties } from "react";
import { Circle } from "lucide-react";
import type { LocalizedProject, PortfolioCopy } from "./types";
import { projectCardPanelVariants, projectCardVariants } from "./variants";

type GalleryProjectStyle = CSSProperties & {
  "--project-accent": string;
  "--project-status": string;
};

const getGenreLabels = (scope: string) =>
  scope
    .split(/[·+/]/)
    .map((part) => part.trim())
    .filter(Boolean);

const getGalleryProjectStyle = (project: LocalizedProject): GalleryProjectStyle => ({
  "--project-accent": project.accent,
  "--project-status": project.statusColor,
  opacity: project.cardOpacity,
});

export function ProjectGallery({
  copy,
  projects,
  onOpenProject,
}: {
  copy: PortfolioCopy;
  projects: LocalizedProject[];
  onOpenProject: (projectId: string) => void;
}) {
  return (
    <section className="px-5 py-16 sm:px-9 sm:pb-[84px]" id="gallery">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-2.5 font-oswald text-[13px] font-bold tracking-[4px]">
              — {copy.sectionKicker}
            </div>
            <h2 className="m-0 font-anton text-[clamp(48px,7vw,92px)] uppercase leading-[0.86]">
              {copy.sectionTitle}
            </h2>
          </div>
          <div className="max-w-[260px] border-2 border-[#16130C] px-3.5 py-[9px] font-oswald text-sm font-medium tracking-[1px]">
            {copy.sectionDesc}
          </div>
        </div>

        <div className="flex flex-col gap-[18px]">
          {projects.map((project) => (
            <button
              aria-label={`${project.title} ${copy.heroCta}`}
              className={projectCardVariants()}
              key={project.id}
              onClick={() => onOpenProject(project.id)}
              style={getGalleryProjectStyle(project)}
              type="button"
            >
              <div className={projectCardPanelVariants()}>
                <div
                  className="relative h-[168px] w-full flex-none overflow-hidden border-b-[3px] border-[var(--project-accent)] md:h-auto md:w-[312px] md:border-b-0 md:border-r-[3px]"
                  style={{ filter: project.posterFilter }}
                >
                  {project.posterSrc ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element -- Project rules prefer native img over next/image. */}
                      <img
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                        src={project.posterSrc}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(22,19,14,0.08)_0%,rgba(22,19,14,0.36)_56%,rgba(22,19,14,0.78)_100%)]" />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#1c1810_0_16px,#17140E_16px_32px)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(115%_85%_at_18%_0%,rgba(255,206,0,0.16),transparent_58%)]" />
                      <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(22,19,14,0.3)_0%,rgba(22,19,14,0.72)_56%,rgba(22,19,14,0.92)_100%)]" />
                    </>
                  )}
                  <div
                    className="absolute inset-0 opacity-45 mix-blend-multiply"
                    style={{
                      background:
                        "linear-gradient(125deg, transparent 32%, var(--project-accent) 168%)",
                    }}
                  />
                  <div className="absolute inset-0 opacity-50 [background:repeating-linear-gradient(135deg,rgba(0,0,0,0.16)_0_7px,transparent_7px_14px)]" />

                  <div className="absolute left-[15px] top-[13px] font-oswald text-[10px] font-bold tracking-[2px] text-white/70">
                    SCREEN {project.num}
                  </div>
                  <div className="absolute bottom-[-6px] left-5 font-anton text-[118px] leading-[0.78] text-[var(--project-accent)] [text-shadow:0_3px_16px_rgba(0,0,0,0.55)]">
                    {project.num}
                  </div>

                  {project.dimmed ? (
                    <div className="absolute right-[-40px] top-[22px] rotate-[28deg] border-y-2 border-white bg-[#16130C] px-[50px] py-[5px] font-anton text-xs tracking-[2px] text-white">
                      {project.statusLabel}
                    </div>
                  ) : null}
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-6 px-5 py-[22px] sm:flex-row sm:items-stretch sm:justify-between sm:gap-6 sm:px-7">
                  <div className="min-w-0 sm:flex sm:flex-col sm:justify-center">
                    <div className="font-anton text-[34px] leading-[0.92] text-[#FFCE00] sm:text-[40px] lg:text-[46px]">
                      {project.title}
                    </div>
                    <div className="mb-[13px] mt-[7px] font-oswald text-xs font-medium tracking-[2px] text-white/55">
                      {project.eng}
                    </div>
                    <div className="flex flex-wrap gap-[7px]">
                      {getGenreLabels(project.scope).map((genre) => (
                        <span
                          className="whitespace-nowrap border border-[#FFCE00]/40 px-[9px] py-[3px] font-oswald text-[11px] font-semibold tracking-[0.5px] text-[#FFCE00]"
                          key={genre}
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                    {project.cardTags.length > 0 ? (
                      <div className="mt-3 flex max-w-[620px] flex-wrap gap-2">
                        {project.cardTags.map((tag) => (
                          <span
                            className="bg-white/[0.07] px-2.5 py-1 font-oswald text-[11px] font-bold leading-[1.35] tracking-[0.2px] text-[var(--project-accent)]"
                            key={`${project.id}-${tag}`}
                          >
                            # {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-none flex-wrap items-center gap-2.5 sm:flex-col sm:items-end sm:justify-between sm:gap-[11px] sm:self-stretch">
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap bg-[var(--project-status)] px-3 py-1.5 font-oswald text-xs font-bold tracking-[1px] text-white">
                      <Circle
                        aria-hidden="true"
                        className="h-2 w-2 fill-current"
                        strokeWidth={3}
                      />
                      {project.statusLabel}
                    </span>
                    <div className="max-w-[230px] font-oswald text-[11px] font-semibold leading-[1.5] tracking-[0.8px] text-white/70 sm:text-right">
                      <span className="text-white/40">{copy.periodLabel}</span>{" "}
                      {project.period}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
