import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { PosterArtwork } from "./poster-artwork";
import type { LocalizedProject, PortfolioCopy } from "./types";
import { ctaButtonVariants } from "./variants";

export function HeroSection({
  copy,
  featured,
  onOpenProject,
}: {
  copy: PortfolioCopy;
  featured: LocalizedProject;
  onOpenProject: (projectId: string) => void;
}) {
  return (
    <section className="relative overflow-hidden px-5 py-[54px] sm:px-9" id="top">
      <div className="pointer-events-none absolute left-0 right-0 top-2 z-0 select-none whitespace-nowrap text-center font-anton text-[clamp(120px,22vw,300px)] leading-[0.8] text-transparent [-webkit-text-stroke:2px_rgba(22,19,14,0.13)]">
        PORTFOLIO
      </div>

      <div className="relative z-[1] mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="mb-[22px] inline-flex items-center gap-2 whitespace-nowrap bg-[#16130C] px-[13px] py-[7px] font-oswald text-xs font-bold tracking-[3px] text-[#FFCE00]">
            ★ {copy.featuredTag}
          </div>
          <h1 className="m-0 mb-2 font-anton text-[clamp(64px,9vw,128px)] uppercase leading-[0.86] tracking-normal">
            {featured.title}
          </h1>
          <div className="mb-[22px] font-oswald text-[clamp(16px,1.6vw,22px)] font-medium tracking-[2px] text-[#16130C]/70">
            {featured.eng}
          </div>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center gap-[7px] bg-[var(--project-status)] px-3 py-1.5 font-oswald text-[13px] font-bold tracking-[1px] text-white"
              style={{
                "--project-status": featured.statusColor,
              } as CSSProperties}
            >
              ● {featured.statusLabel}
            </span>
            <span className="whitespace-nowrap border-2 border-[#16130C] px-[11px] py-[5px] font-oswald text-sm font-semibold tracking-[1px]">
              {featured.period}
            </span>
          </div>
          <p className="m-0 mb-[30px] max-w-[480px] text-base leading-[1.7] text-[#2a2519]">
            {featured.desc}
          </p>
          <div className="flex flex-wrap gap-3.5">
            <button
              className={ctaButtonVariants({
                shadow: true,
                size: "hero",
                tone: "primary",
              })}
              onClick={() => onOpenProject(featured.id)}
              type="button"
            >
              {copy.heroCta}
              <span className="text-lg">▸</span>
            </button>
            <a
              className={cn(
                ctaButtonVariants({ size: "heroOutline", tone: "outline" }),
                "no-underline",
              )}
              href="#gallery"
            >
              {copy.navGallery}
            </a>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="scf-float absolute left-[-24px] top-[-30px] z-[3] flex h-20 w-20 items-center justify-center rounded-full bg-[#FF4D00] px-[13px] pb-[11px] pt-[13px] text-center font-anton text-[13px] leading-[1.05] tracking-[1px] text-white shadow-[0_6px_0_rgba(22,19,14,0.3)]">
            {copy.featuredTag}
          </div>
          <button
            className="block w-full max-w-[400px] cursor-pointer bg-transparent p-0 text-left"
            onClick={() => onOpenProject(featured.id)}
            type="button"
          >
            <PosterArtwork
              project={featured}
              surface="hero"
              withCaption
              withStatus
            />
          </button>
        </div>
      </div>
    </section>
  );
}
