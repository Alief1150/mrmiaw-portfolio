"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { R6ScrollCopy } from "./r6-scroll-copy";
import { preloadR6Model } from "./r6-scene";
import type { ProgressSource } from "./r6-scene";

const R6Scene = dynamic(
  () => import("./r6-scene").then((module) => module.R6Scene),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-full w-full items-center justify-center"
        role="status"
        aria-label="Loading 3D character"
      >
        <div className="h-40 w-40 animate-pulse rounded-full border border-ember" />
      </div>
    ),
  },
);

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function R6AssemblySection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<ProgressSource>({ current: 0 });
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    preloadR6Model();
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const onChange = (event: MediaQueryListEvent) =>
      setReducedMotion(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      progressRef.current.current = 1;
      setProgress(1);
      return;
    }
    let raf = 0;
    let last = -1;
    const tick = () => {
      const outer = outerRef.current;
      if (outer) {
        const rect = outer.getBoundingClientRect();
        const total = Math.max(1, rect.height - window.innerHeight);
        const value = clamp01(-rect.top / total);
        progressRef.current.current = value;
        if (Math.abs(value - last) > 0.001) {
          last = value;
          setProgress(value);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const observer = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { threshold: 0 },
    );
    observer.observe(outer);
    return () => observer.disconnect();
  }, []);

  if (reducedMotion) {
    return (
      <section aria-labelledby="r6-title" className="scroll-mt-20 border-t border-ember">
        <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-8">
          <h2 id="r6-title" className="sr-only">
            MrMiaw character, assembled
          </h2>
          <div className="mx-auto max-w-[720px] text-center">
            <div className="h-[52svh] min-h-[380px]">
              <R6Scene progress={progressRef.current} running={inView} />
            </div>
            <div className="mt-6">
              <R6ScrollCopy progress={1} staticMode />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="r6-title" className="border-t border-ember">
      <h2 id="r6-title" className="sr-only">
        Watch the MrMiaw character assemble as you scroll
      </h2>
      <div ref={outerRef} className="relative" style={{ height: "420svh" }}>
        <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-ink" aria-hidden="true" />
          <div className="relative h-[62svh] w-full max-w-[900px] px-5">
            <R6Scene progress={progressRef.current} running={inView} />
          </div>
          <div className="relative w-full max-w-[720px] px-5">
            <R6ScrollCopy progress={progress} staticMode={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
