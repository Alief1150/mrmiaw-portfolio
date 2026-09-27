"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatedGradient } from "./animated-gradient";

const MRMIAW_GRADIENT = {
  color1: "#F2DC73",
  color2: "#D7AA43",
  color3: "#201A12",
  rotation: 30,
  proportion: 35,
  scale: 1,
  speed: 10,
  distortion: 8,
  swirl: 35,
  swirlIterations: 10,
  softness: 100,
};

export function GradientChapter({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const onChange = (event: MediaQueryListEvent) =>
      setReducedMotion(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label={label}
      className="relative overflow-hidden border-t border-ember"
    >
      <AnimatedGradient
        config={MRMIAW_GRADIENT}
        active={inView && !reducedMotion}
      />
      <div className="absolute inset-0 bg-ink/72" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
