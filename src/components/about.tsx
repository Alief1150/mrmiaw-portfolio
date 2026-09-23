import Image from "next/image";
import { CopyUsername } from "./copy-username";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-20 border-t border-ember"
    >
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <div className="md:col-span-4">
          <div className="overflow-hidden rounded-[10px] border border-ember">
            <Image
              src="/gfx/avatar.png"
              alt="MrMiaw avatar: a golden Roblox character wearing a top hat that reads Roblox The Classic"
              width={512}
              height={512}
              sizes="(max-width: 768px) 50vw, 300px"
              loading="lazy"
              className="h-auto w-full"
            />
          </div>
        </div>
        <div className="md:col-span-8">
          <h2
            id="about-title"
            className="font-display text-4xl leading-tight md:text-5xl"
          >
            About
          </h2>
          <div className="mt-5 max-w-[62ch] space-y-4 text-lg leading-relaxed text-cream/90">
            <p>
              MrMiaw is a Roblox GFX artist. The work covers thumbnails, game
              icons, avatar portraits, and multi-character scenes across Roman,
              sci-fi, horror, and everyday Roblox themes.
            </p>
            <p>
              This site collects the portfolio in one place. Commissions run
              through the Discord server, where formats, scope, and pricing get
              worked out per order.
            </p>
          </div>
          <p className="mt-6 flex flex-wrap items-center gap-3 text-base text-fog">
            Discord username:
            <CopyUsername />
          </p>
        </div>
      </div>
    </section>
  );
}
