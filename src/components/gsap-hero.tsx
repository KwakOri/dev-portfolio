"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";

const highlights = [
  "Product-minded frontend",
  "Interaction design",
  "Case-study storytelling",
];

export function GsapHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(".gsap-reveal", { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      const timeline = gsap.timeline({
        defaults: { duration: 0.9, ease: "power3.out" },
      });

      timeline
        .from(".gsap-kicker", { autoAlpha: 0, y: 18 })
        .from(".gsap-title", { autoAlpha: 0, y: 28 }, "-=0.55")
        .from(".gsap-copy", { autoAlpha: 0, y: 22 }, "-=0.55")
        .from(
          ".gsap-panel",
          { autoAlpha: 0, y: 34, scale: 0.96, stagger: 0.08 },
          "-=0.35",
        )
        .from(".gsap-track", { scaleX: 0, transformOrigin: "left center" }, "-=0.5");
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="min-h-screen overflow-hidden px-5 py-6 text-[#f7f3eb] sm:px-8 lg:px-12"
    >
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-7xl flex-col justify-between gap-12">
        <header className="flex items-center justify-between border-b border-white/12 pb-5 text-sm text-white/72">
          <Link className="font-semibold text-white" href="/">
            Portfolio
          </Link>
          <nav className="hidden items-center gap-6 sm:flex" aria-label="Primary">
            <a className="transition hover:text-white" href="#work">
              Work
            </a>
            <a className="transition hover:text-white" href="#about">
              About
            </a>
            <a className="transition hover:text-white" href="#contact">
              Contact
            </a>
          </nav>
        </header>

        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-4xl">
            <p className="gsap-kicker gsap-reveal mb-5 text-sm font-medium uppercase text-[#e7c46e]">
              Next.js + GSAP starter
            </p>
            <h1 className="gsap-title gsap-reveal text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-8xl">
              Portfolio motion system for selected work.
            </h1>
            <p className="gsap-copy gsap-reveal mt-7 max-w-2xl text-lg leading-8 text-white/68">
              Build your personal site with App Router, Tailwind CSS, and scoped GSAP
              animations that clean up safely between React renders.
            </p>
          </div>

          <div
            id="work"
            className="gsap-panel gsap-reveal border border-white/12 bg-white/[0.04] p-4 shadow-2xl shadow-black/20 backdrop-blur"
          >
            <div className="aspect-[4/3] border border-white/12 bg-[#171819] p-4">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="mb-4 h-2 w-20 bg-[#e7c46e]" />
                  <p className="text-sm text-white/60">Featured Project</p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    Interaction-led case study
                  </p>
                </div>

                <div className="space-y-3">
                  {highlights.map((item) => (
                    <div
                      className="gsap-panel flex items-center justify-between border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/72"
                      key={item}
                    >
                      <span>{item}</span>
                      <span className="h-2 w-2 bg-[#e7c46e]" aria-hidden="true" />
                    </div>
                  ))}
                </div>

                <div className="h-px w-full overflow-hidden bg-white/12">
                  <div className="gsap-track h-full w-full bg-[#e7c46e]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer
          id="contact"
          className="flex flex-col gap-3 border-t border-white/12 pt-5 text-sm text-white/56 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>Available for thoughtful web projects.</span>
          <a
            className="w-fit text-white transition hover:text-[#e7c46e]"
            href="mailto:hello@example.com"
          >
            hello@example.com
          </a>
        </footer>
      </div>
    </section>
  );
}
