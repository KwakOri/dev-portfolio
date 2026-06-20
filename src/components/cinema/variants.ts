import { cva } from "class-variance-authority";

export const languageButtonVariants = cva(
  "border-0 px-[11px] pb-[5px] pt-[6px] font-oswald text-[13px] font-bold tracking-[1px] transition hover:bg-[#16130C] hover:text-[#FFCE00]",
  {
    variants: {
      active: {
        true: "bg-[#16130C] text-[#FFCE00]",
        false: "bg-transparent text-[#16130C]",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export const ctaButtonVariants = cva(
  "inline-flex items-center whitespace-nowrap font-oswald font-bold tracking-[1px] transition",
  {
    variants: {
      tone: {
        primary: "border-0 bg-[#16130C] text-[#FFCE00]",
        outline: "border-[3px] border-[#16130C] bg-transparent text-[#16130C]",
        overlay: "bg-[#FFCE00] text-[#16130C]",
        overlayOutline:
          "border-2 border-[#FFCE00] bg-transparent text-[#FFCE00] hover:bg-[#FFCE00] hover:text-[#16130C]",
      },
      size: {
        nav: "gap-2 px-4 py-[9px] text-[13px]",
        hero: "gap-[9px] px-[26px] py-[14px] text-[15px]",
        heroOutline: "gap-[9px] px-6 py-[11px] text-[15px]",
        overlay: "gap-2 px-[22px] py-[13px] text-sm",
      },
      shadow: {
        true: "shadow-[6px_6px_0_rgba(22,19,14,0.25)]",
        false: "",
      },
    },
    defaultVariants: {
      tone: "primary",
      size: "hero",
      shadow: false,
    },
  },
);

export const posterFrameVariants = cva("relative overflow-hidden bg-[#17140E]", {
  variants: {
    surface: {
      hero:
        "block aspect-[3/4.15] w-full max-w-[400px] border-4 border-[#16130C] shadow-[16px_16px_0_#16130C]",
      card: "aspect-[3/4]",
      overlay: "min-h-[360px]",
    },
    status: {
      now: "",
      coming: "",
      ended: "opacity-80 grayscale-[0.45]",
    },
  },
  defaultVariants: {
    surface: "card",
    status: "now",
  },
});

export const projectCardVariants = cva(
  "block w-[262px] flex-none cursor-pointer border-[3px] border-[#16130C] bg-[#17140E] p-0 text-left shadow-[8px_8px_0_#16130C] transition-[transform,box-shadow] duration-150 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[13px_13px_0_#16130C] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#16130C]",
);

export const overlayMetaVariants = cva(
  "font-oswald text-[13px] font-semibold tracking-[1px]",
  {
    variants: {
      tone: {
        status: "inline-flex items-center gap-1.5 px-3 py-1.5 font-bold text-white",
        outline: "border-2 border-[#f3e9d2]/40 px-[11px] py-[5px]",
      },
    },
    defaultVariants: {
      tone: "outline",
    },
  },
);

export const stillButtonVariants = cva(
  "relative aspect-video flex-1 cursor-pointer overflow-hidden border-2 bg-[#17140E] p-0",
  {
    variants: {
      active: {
        true: "border-[#FFCE00]",
        false: "border-[#f3e9d2]/20",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);
