"use client";

import type { CSSProperties } from "react";

interface BlurRevealProps {
  text: string;
  progress: number;
  windowStart: number;
  windowEnd: number;
  className?: string;
  style?: CSSProperties;
  as?: "p" | "h2" | "h3" | "span";
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function BlurReveal({
  text,
  progress,
  windowStart,
  windowEnd,
  className,
  style,
  as = "p",
}: BlurRevealProps) {
  const span = Math.max(0.0001, windowEnd - windowStart);
  const local = clamp01((progress - windowStart) / span);
  const words = text.split(" ");
  const Tag = as;

  return (
    <Tag className={className} style={style} aria-label={text}>
      {words.map((word, wordIndex) => {
        const wordStart = wordIndex / words.length;
        const wordEnd = (wordIndex + 1) / words.length;
        const wordProgress = clamp01(
          (local - wordStart) / Math.max(0.0001, wordEnd - wordStart),
        );
        const eased = wordProgress * wordProgress * (3 - 2 * wordProgress);
        return (
          <span
            key={`${wordIndex}-${word}`}
            aria-hidden="true"
            className="inline-block whitespace-nowrap"
            style={{
              opacity: 0.08 + 0.92 * eased,
              filter: `blur(${(12 * (1 - eased)).toFixed(2)}px)`,
              transform: `translateY(${((1 - eased) * 10).toFixed(2)}px)`,
            }}
          >
            {word}
            {wordIndex < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </Tag>
  );
}
