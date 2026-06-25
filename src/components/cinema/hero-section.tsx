import { Circle, CodeXml, Play, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LocalizedDeveloperProfile } from "./types";
import { ctaButtonVariants } from "./variants";

export function HeroSection({
  profile,
}: {
  profile: LocalizedDeveloperProfile;
}) {
  const [firstHeadline, secondHeadline] = profile.headline;

  return (
    <section
      className="relative overflow-hidden px-5 pb-16 pt-[54px] sm:px-9"
      id="top"
    >
      <div className="pointer-events-none absolute left-0 right-0 top-2 z-0 select-none whitespace-nowrap text-center font-anton text-[clamp(120px,22vw,300px)] leading-[0.8] text-transparent [-webkit-text-stroke:2px_rgba(22,19,14,0.13)]">
        PORTFOLIO
      </div>

      <div className="relative z-[1] mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-[9px] bg-[#16130C] px-[13px] py-[7px] font-oswald text-[11px] font-bold tracking-[3px] text-[#FFCE00]">
            <Star
              aria-hidden="true"
              className="h-3 w-3 shrink-0 fill-current"
              strokeWidth={3}
            />
            {profile.kicker}
          </div>
          <h1 className="m-0 font-anton text-[clamp(60px,8.4vw,122px)] uppercase leading-[0.82] tracking-normal">
            {firstHeadline}
            <br />
            <span className="text-[#16130C] [-webkit-text-stroke:2px_#FFCE00] [paint-order:stroke_fill]">
              {secondHeadline}
            </span>
          </h1>
          <div className="mb-6 mt-5 flex items-center gap-[11px]">
            <span className="h-[3px] w-[46px] shrink-0 bg-[#16130C]" />
            <span className="font-oswald text-[13px] font-bold tracking-[2px] text-[#16130C]">
              {profile.tagline}
            </span>
          </div>
          <p className="m-0 mb-3 max-w-[500px] text-[17px] font-medium leading-[1.65] text-[#16130C]">
            {profile.lead}
          </p>
          <p className="m-0 mb-[30px] max-w-[500px] text-sm leading-[1.6] text-[#3a3320]">
            {profile.sub}
          </p>
          <div className="flex flex-wrap gap-3.5">
            <a
              className={ctaButtonVariants({
                shadow: true,
                size: "hero",
                tone: "primary",
              })}
              href="#gallery"
              style={{ color: "#FFCE00" }}
            >
              {profile.projectsCta}
              <Play
                aria-hidden="true"
                className="h-4 w-4 shrink-0 fill-current"
                strokeWidth={3}
              />
            </a>
            <a
              className={cn(
                ctaButtonVariants({ size: "heroOutline", tone: "outline" }),
                "no-underline",
              )}
              href={profile.githubUrl}
              rel="noreferrer"
              target="_blank"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- Project rules prefer native img over next/image. */}
              <img
                alt=""
                aria-hidden="true"
                className="h-8 w-8 shrink-0 object-contain"
                src="/icons/github-sign.png"
              />
              {profile.githubCta}
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative w-full max-w-[400px] border-4 border-[#16130C] bg-[#17140E] shadow-[16px_16px_0_#16130C]">
            <div
              aria-label="Developer badge"
              className="scf-float absolute left-[-2px] top-[-36px] z-[5] flex h-[82px] w-[82px] items-center justify-center rounded-full bg-[#FF4D00] text-white shadow-[0_6px_0_rgba(22,19,14,0.3)] sm:left-[-58px] sm:top-[-48px]"
              role="img"
            >
              <CodeXml aria-hidden="true" className="h-10 w-10" strokeWidth={3} />
            </div>

            <div className="relative">
              <div className="relative overflow-hidden border-b-[3px] border-dashed border-[#FFCE00]/50 bg-[#17140E]">
                <div className="absolute inset-0 z-0 bg-[repeating-linear-gradient(135deg,#1c1810_0_16px,#17140E_16px_32px)]" />
                {/* eslint-disable-next-line @next/next/no-img-element -- Project rules prefer native img over next/image. */}
                <img
                  alt={profile.imageAlt}
                  className="relative z-[1] block aspect-video w-full object-cover"
                  src={profile.imageSrc}
                />
                <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_bottom,rgba(8,6,3,0.45),transparent_38%,transparent_72%,rgba(8,6,3,0.5))]" />
                <div className="pointer-events-none absolute left-3.5 top-3.5 z-[3] font-oswald text-[11px] font-bold tracking-[2px] text-white/85">
                  PROFILE · 00
                </div>
                <div className="pointer-events-none absolute right-3 top-3 z-[3] inline-flex items-center gap-1.5 whitespace-nowrap bg-[#1E8E5A] px-[9px] py-1 font-oswald text-[11px] font-bold tracking-[1px] text-white">
                  <Circle
                    aria-hidden="true"
                    className="h-2.5 w-2.5 fill-current"
                    strokeWidth={3}
                  />
                  {profile.availability}
                </div>
                <div className="pointer-events-none absolute bottom-3 left-3.5 z-[3] inline-flex items-center gap-[7px]">
                  <span className="font-anton text-[22px] tracking-[1px] text-[#FFB200]">
                    DEV
                  </span>
                  <span className="h-0.5 w-[22px] bg-[#FF4D00]" />
                  <span className="font-oswald text-[10px] font-semibold tracking-[3px] text-white/70">
                    PROFILE
                  </span>
                </div>
              </div>
              <div className="absolute bottom-[-9px] left-[-9px] z-[4] h-[18px] w-[18px] rounded-full bg-[#FFCE00]" />
              <div className="absolute bottom-[-9px] right-[-9px] z-[4] h-[18px] w-[18px] rounded-full bg-[#FFCE00]" />
            </div>

            <div className="flex flex-col gap-[15px] bg-[#16130C] px-5 pb-5 pt-[18px]">
              <div>
                <div className="mb-[3px] font-oswald text-[10px] font-bold tracking-[2px] text-[#FFB200]">
                  {profile.mainRoleLabel}
                </div>
                <div className="font-anton text-[23px] tracking-[0.5px] text-[#FFCE00]">
                  {profile.roleMain}
                </div>
              </div>

              <div>
                <div className="mb-1.5 font-oswald text-[10px] font-bold tracking-[2px] text-[#FFB200]">
                  {profile.backstageLabel}
                </div>
                <div className="flex flex-col gap-[5px]">
                  {profile.backstage.map((item) => (
                    <div
                      className="flex items-center gap-2 text-[13px] text-[#d8cdb4]"
                      key={item}
                    >
                      <Play
                        aria-hidden="true"
                        className="h-2.5 w-2.5 shrink-0 fill-current text-[#FF4D00]"
                        strokeWidth={3}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-[7px] font-oswald text-[10px] font-bold tracking-[2px] text-[#FFB200]">
                  {profile.genreLabel}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {profile.genre.map((item) => (
                    <span
                      className="border border-[#FFCE00]/40 px-[9px] py-[3px] font-oswald text-[11px] font-semibold tracking-[0.5px] text-[#FFCE00]"
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#FFCE00]/20 pt-[13px]">
                <div className="mb-[5px] font-oswald text-[10px] font-bold tracking-[2px] text-[#FFB200]">
                  {profile.stackLabel}
                </div>
                <div className="font-oswald text-[12.5px] font-semibold leading-[1.7] tracking-[0.5px] text-[#f3e9d2]/85">
                  {profile.stackLines.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
