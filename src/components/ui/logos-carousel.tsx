"use client";

import * as React from "react";

export interface LogosCarouselProps {
  children: React.ReactNode;
  stagger?: number;
  count?: number;
  className?: string;
  duration?: number;
  interval?: number;
  initialDelay?: number;
}

export function LogosCarousel({
  children,
  stagger = 0.14,
  count,
  className,
  duration = 600,
  interval = 3200,
  initialDelay = 500,
}: LogosCarouselProps) {
  const [index, setIndex] = React.useState(0);
  const [animate, setAnimate] = React.useState(false);
  const [nextIndex, setNextIndex] = React.useState(1);
  const [inView, setInView] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  const childrenArray = React.Children.toArray(children);
  const logosPerGroup = count || childrenArray.length;
  const groups: React.ReactNode[][] = [];
  for (let i = 0; i < childrenArray.length; i += logosPerGroup) {
    groups.push(childrenArray.slice(i, i + logosPerGroup));
  }
  const groupsLength = groups.length;

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const onChange = (event: MediaQueryListEvent) =>
      setReducedMotion(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { threshold: 0.2 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (reducedMotion) return;
    const id = window.setTimeout(() => setAnimate(true), initialDelay);
    return () => window.clearTimeout(id);
  }, [initialDelay, reducedMotion]);

  React.useEffect(() => {
    if (!animate || groupsLength < 2 || !inView || reducedMotion) return;
    const intervalId = window.setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % groupsLength;
        setNextIndex((newIndex + 1) % groupsLength);
        return newIndex;
      });
    }, interval);
    return () => window.clearInterval(intervalId);
  }, [animate, interval, groupsLength, inView, reducedMotion]);

  if (groupsLength === 0) return null;

  const shouldAnimate = animate && !reducedMotion;

  return (
    <div ref={rootRef} className="grid w-full max-w-[720px] place-items-center">
      {groups.map((group, groupIndex) => {
        const isCurrent = groupIndex === index;
        const isNext = groupIndex === nextIndex && shouldAnimate;
        const isVisible = reducedMotion ? groupIndex === 0 : isCurrent || isNext;
        return (
          <div
            key={groupIndex}
            className={`flex w-full justify-center gap-10 ${className ?? ""}`}
            style={{
              gridArea: "1 / 1",
              pointerEvents: isVisible ? "auto" : "none",
              visibility: isVisible ? "visible" : "hidden",
            }}
            aria-hidden={!isVisible}
          >
            {group.map((logo, logoIndex) => (
              <Logo
                key={logoIndex}
                state={isCurrent ? "exit" : "enter"}
                animate={shouldAnimate && isVisible}
                index={logoIndex}
                stagger={stagger}
                duration={duration}
              >
                {logo}
              </Logo>
            ))}
          </div>
        );
      })}
    </div>
  );
}

interface LogoProps {
  children: React.ReactNode;
  animate?: boolean;
  index: number;
  state?: "enter" | "exit";
  stagger?: number;
  duration?: number;
}

function Logo({
  children,
  animate,
  index,
  state = "enter",
  stagger = 0.14,
  duration = 600,
}: LogoProps) {
  const animationStyles: React.CSSProperties = {
    animationDelay: `${index * (stagger ?? 0.14)}s`,
    animationDuration: `${duration}ms`,
    animationFillMode: "both",
  };

  if (!animate) {
    return (
      <div
        className={state === "enter" ? "opacity-0" : "opacity-100"}
        style={animationStyles}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={
        state === "enter" ? "logos-enter" : "logos-exit"
      }
      style={animationStyles}
    >
      {children}
    </div>
  );
}
