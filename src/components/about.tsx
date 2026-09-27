import Image from "next/image";
import { CopyUsername } from "./copy-username";
import { PROFILE_LINKS, SOCIAL_LINKS } from "@/data/social";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-20 border-t border-ember"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-20 text-center md:px-8 md:py-28">
        <div className="mx-auto max-w-[320px]">
          <div className="overflow-hidden rounded-[10px] border border-ember">
            <Image
              src="/gfx/avatar.png"
              alt="MrMiaw avatar: a golden Roblox character wearing a top hat that reads Roblox The Classic"
              width={512}
              height={512}
              sizes="(max-width: 768px) 70vw, 320px"
              loading="lazy"
              className="h-auto w-full"
            />
          </div>
        </div>

        <h2
          id="about-title"
          className="font-display mt-8 text-4xl leading-tight md:text-5xl"
        >
          About MrMiaw
        </h2>
        <div className="mx-auto mt-5 max-w-[62ch] space-y-4 text-lg leading-relaxed text-cream/90">
          <p>
            Hey, I am Mr Miaw and I make Roblox GFX and other graphic designs
            for Roblox creators, groups, and games.
          </p>
          <p>
            My style focuses on clean, cinematic Roblox visuals with strong
            lighting, depth, and polished editing.
          </p>
        </div>

        <p className="mt-6 flex flex-wrap items-center justify-center gap-3 text-base text-fog">
          Discord username:
          <CopyUsername />
        </p>

        <nav
          aria-label="MrMiaw profiles"
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          {PROFILE_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-full border border-ember px-5 text-[15px] font-medium text-cream transition-colors hover:border-gold hover:text-bright"
            >
              {label}
            </a>
          ))}
        </nav>
        <p className="mt-4 text-sm text-fog">
          Commissions run through Discord:{" "}
          <a
            href={SOCIAL_LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-bright underline-offset-4 hover:underline"
          >
            join the server
          </a>
          .
        </p>
      </div>
    </section>
  );
}
