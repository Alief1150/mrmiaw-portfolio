"use client";

import { BlurReveal } from "../ui/blur-reveal";

const LINES = [
  { text: "Start with the parts.", start: 0.02, end: 0.16 },
  { text: "Set the stance.", start: 0.16, end: 0.36 },
  { text: "Build the pose.", start: 0.36, end: 0.58 },
  { text: "Add the identity.", start: 0.58, end: 0.76 },
  { text: "Finish the look.", start: 0.76, end: 0.92 },
] as const;

export function R6ScrollCopy({
  progress,
  staticMode,
}: {
  progress: number;
  staticMode: boolean;
}) {
  if (staticMode) {
    return (
      <div className="pointer-events-none text-center">
        <p className="font-display text-4xl leading-tight text-cream md:text-5xl">
          MrMiaw
        </p>
        <p className="mt-2 text-lg text-bright">Roblox GFX Artist</p>
      </div>
    );
  }

  const showFinale = progress >= 0.92;
  const showHint = progress < 0.03;

  return (
    <div className="pointer-events-none relative flex min-h-[120px] items-center justify-center text-center">
      {LINES.map((line) => {
        const active = progress >= line.start && progress < line.end;
        return (
          <div
            key={line.text}
            className="absolute inset-x-0 flex justify-center transition-opacity duration-150"
            style={{ opacity: active ? 1 : 0 }}
            aria-hidden={!active}
          >
            <BlurReveal
              text={line.text}
              progress={progress}
              windowStart={line.start}
              windowEnd={line.end}
              className="font-display text-3xl leading-tight text-cream md:text-4xl"
            />
          </div>
        );
      })}
      <div
        className="absolute inset-x-0 flex flex-col items-center transition-opacity duration-200"
        style={{ opacity: showFinale ? 1 : 0 }}
      >
        <p className="font-display text-4xl leading-tight text-cream md:text-5xl">
          MrMiaw
        </p>
        <p className="mt-2 text-lg text-bright">Roblox GFX Artist</p>
      </div>
      <p
        className="absolute -bottom-2 text-sm text-fog transition-opacity duration-300"
        style={{ opacity: showHint && !showFinale ? 1 : 0 }}
      >
        Scroll to build the character
      </p>
      <span className="sr-only">
        Scrolling down assembles the Roblox character from separated parts.
        Scrolling up reverses the assembly.
      </span>
    </div>
  );
}
