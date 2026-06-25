import { ArrowRight } from "lucide-react";
import { supportedLanguages, type Language } from "@/constants/portfolio";
import { cn } from "@/lib/utils";
import type { LocalizedProject, PortfolioCopy } from "./types";
import { ctaButtonVariants, languageButtonVariants } from "./variants";

export function CinemaHeader({
  copy,
  featured,
  language,
  onLanguageChange,
  onOpenFeatured,
}: {
  copy: PortfolioCopy;
  featured: LocalizedProject;
  language: Language;
  onLanguageChange: (language: Language) => void;
  onOpenFeatured: (projectId: string) => void;
}) {
  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between gap-5 border-b-[3px] border-[#16130C] bg-[#FFCE00] px-5 py-[18px] sm:px-9">
      <div className="flex items-center gap-2.5">
        <a
          className="skew-x-[-6deg] bg-[#16130C] px-[13px] pb-[5px] pt-[7px] font-anton text-[22px] leading-none tracking-[1px] text-[#FFCE00]"
          href="#top"
          style={{ color: "#FFCE00" }}
        >
          CINÉ·FOLIO
        </a>
        <div className="hidden border-2 border-[#16130C] px-[7px] py-[3px] font-oswald text-[11px] font-semibold tracking-[3px] sm:block">
          EST.2026
        </div>
      </div>

      <div className="hidden items-center gap-[26px] font-oswald text-sm font-semibold tracking-[1px] md:flex">
        <a className="text-[#16130C] no-underline" href="#top">
          {copy.navHome}
        </a>
        <a className="text-[#16130C] no-underline" href="#gallery">
          {copy.navGallery}
        </a>
        <a className="text-[#16130C] no-underline" href="#about">
          {copy.navAbout}
        </a>
      </div>

      <div className="flex items-center gap-3.5">
        <div className="flex border-2 border-[#16130C]">
          {supportedLanguages.map((code) => (
            <button
              className={languageButtonVariants({ active: language === code })}
              key={code}
              onClick={() => onLanguageChange(code)}
              type="button"
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
        <button
          className={cn(
            ctaButtonVariants({ size: "nav", tone: "primary" }),
            "hidden sm:inline-flex",
          )}
          onClick={() => onOpenFeatured(featured.id)}
          type="button"
        >
          {copy.cta}
          <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={3} />
        </button>
      </div>
    </nav>
  );
}
