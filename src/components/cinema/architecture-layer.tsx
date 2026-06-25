"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Language } from "@/constants/portfolio";
import { translateArchitectureHtml } from "./architecture-translations";

type ArchitectureLayerProps = {
  alt?: string;
  height?: number;
  language: Language;
  projectId: string;
  src: string;
  width?: number;
};

export function ArchitectureLayer({
  alt,
  height = 900,
  language,
  projectId,
  src,
  width = 1280,
}: ArchitectureLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layer, setLayer] = useState<{ html: string; src: string }>();
  const [scale, setScale] = useState(1);
  const html = layer?.src === src ? layer.html : "";
  const localizedHtml = useMemo(
    () => translateArchitectureHtml(html, language, projectId),
    [html, language, projectId],
  );

  useEffect(() => {
    const controller = new AbortController();

    fetch(src, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load architecture layer: ${src}`);
        }

        return response.text();
      })
      .then((markup) => setLayer({ html: markup, src }))
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          console.error(error);
        }
      });

    return () => controller.abort();
  }, [src]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    const updateScale = () => {
      const nextScale = Math.min(1, container.clientWidth / width);
      setScale(Number.isFinite(nextScale) ? nextScale : 1);
    };
    const observer = new ResizeObserver(updateScale);

    updateScale();
    observer.observe(container);

    return () => observer.disconnect();
  }, [width]);

  return (
    <figure
      aria-label={alt}
      className="mb-9 overflow-hidden border-2 border-[#f3e9d2]/20 bg-[#0f0b07]"
      ref={containerRef}
    >
      <div
        aria-hidden={localizedHtml ? undefined : true}
        className="relative"
        style={{ height: height * scale }}
      >
        {localizedHtml ? (
          <div
            className="origin-top-left"
            dangerouslySetInnerHTML={{ __html: localizedHtml }}
            style={{
              height,
              transform: `scale(${scale})`,
              width,
            }}
          />
        ) : null}
      </div>
    </figure>
  );
}
