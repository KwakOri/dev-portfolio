import { PosterArtwork } from "./poster-artwork";
import type { LocalizedProject, PortfolioCopy } from "./types";
import { projectCardVariants } from "./variants";

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

        <div className="flex flex-wrap gap-[26px]">
          {projects.map((project) => (
            <button
              className={projectCardVariants()}
              key={project.id}
              onClick={() => onOpenProject(project.id)}
              style={{ opacity: project.cardOpacity }}
              type="button"
            >
              <div style={{ filter: project.posterFilter }}>
                <PosterArtwork project={project} surface="card" withStatus />
              </div>
              <div className="bg-[#16130C] px-[15px] pb-[15px] pt-3.5">
                <div className="font-anton text-[26px] uppercase leading-[0.95] text-[#FFCE00]">
                  {project.title}
                </div>
                <div className="mb-[11px] mt-[5px] font-oswald text-[11px] font-medium tracking-[1.5px] text-white/50">
                  {project.eng}
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="font-oswald text-[11px] font-semibold tracking-[1px]"
                    style={{ color: project.accent }}
                  >
                    {project.period}
                  </span>
                  <span className="inline-flex items-center gap-[5px] border border-[#FFCE00]/40 px-2 py-[3px] font-oswald text-[11px] font-bold tracking-[1px] text-[#FFCE00]">
                    {copy.detailLink} ▸
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
