import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LocalizedProject, ProjectStyle } from "./types";
import { posterFrameVariants } from "./variants";

const getProjectStyle = (project: LocalizedProject): ProjectStyle => ({
  "--project-accent": project.accent,
  "--project-status": project.statusColor,
});

export function PosterArtwork({
  project,
  surface = "card",
  withCaption = false,
  withStatus = true,
}: {
  project: LocalizedProject;
  surface?: "hero" | "card" | "overlay";
  withCaption?: boolean;
  withStatus?: boolean;
}) {
  return (
    <div
      className={cn(
        posterFrameVariants({
          surface,
          status: project.status,
        }),
      )}
      style={getProjectStyle(project)}
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#1c1810_0_16px,#17140E_16px_32px)]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_12%,rgba(255,178,0,0.18),transparent_60%)]" />

      <div className="absolute left-[18px] top-[18px] font-oswald text-xs font-bold tracking-[2px] text-white/45">
        POSTER · {project.num}
      </div>

      {withStatus ? (
        <div
          className="absolute right-3.5 top-3.5 inline-flex items-center gap-1.5 bg-[var(--project-status)] px-2.5 py-[5px] font-oswald text-xs font-bold tracking-[1px] text-white"
        >
          <Circle
            aria-hidden="true"
            className="h-2.5 w-2.5 fill-current"
            strokeWidth={3}
          />
          {project.statusLabel}
        </div>
      ) : null}

      <div
        className={cn(
          "absolute left-0 right-0 text-center font-anton leading-[0.8] text-[var(--project-accent)]",
          surface === "card"
            ? "top-[34%] text-8xl"
            : surface === "overlay"
              ? "top-[42%] text-[130px]"
              : "top-[38%] text-[clamp(90px,13vw,150px)]",
        )}
      >
        {project.num}
      </div>

      {project.dimmed && surface === "card" ? (
        <div className="absolute left-[-44px] top-[30px] rotate-[-32deg] border-y-2 border-white bg-[#16130C] px-14 py-1.5 font-anton text-sm tracking-[2px] text-white">
          {project.statusLabel}
        </div>
      ) : null}

      {withCaption ? (
        <div className="absolute bottom-0 left-0 right-0 bg-[#16130C] px-[18px] py-4 text-left">
          <div className="font-anton text-3xl leading-[0.95] text-[#FFCE00]">
            {project.title}
          </div>
          {surface === "hero" ? (
            <div className="mt-[5px] font-oswald text-[11px] font-medium tracking-[2px] text-white/55">
              {project.eng}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export { getProjectStyle };
