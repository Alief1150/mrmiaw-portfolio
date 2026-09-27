import Image from "next/image";
import { DISCORD_SERVER, HERO_ITEM } from "@/data/portfolio";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative">
      <div className="relative min-h-[92svh] w-full overflow-hidden">
        <Image
          src={HERO_ITEM.src}
          alt={HERO_ITEM.alt}
          fill
          priority
          sizes="100vw"
          className="hero-entrance object-cover"
          style={{ objectPosition: "50% 30%" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-ink/35"
        />

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[1200px] px-5 pb-14 pt-40 text-center md:px-8 md:pb-20">
            <div className="hero-entrance-late mx-auto max-w-[680px]">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-ink/70 px-4 py-2 text-sm font-medium text-bright">
                <span
                  aria-hidden="true"
                  className="gold-rule inline-block h-2.5 w-2.5 rounded-full"
                />
                Commissions open
              </p>
              <h1
                id="hero-title"
                className="font-display text-[clamp(3.5rem,10vw,7rem)] leading-[0.95] text-cream"
              >
                MrMiaw
              </h1>
              <p className="mt-3 text-xl font-medium text-bright md:text-2xl">
                Roblox GFX artist
              </p>
              <p className="mt-4 text-base leading-relaxed text-cream/90 md:text-lg">
                Roblox avatar GFX, game thumbnails, group icons, and game
                icons.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={DISCORD_SERVER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center rounded-full bg-gold px-7 text-base font-semibold text-ink transition-shadow hover:shadow-[0_0_0_3px_rgba(242,220,115,0.45)]"
                >
                  Commission on Discord
                </a>
                <a
                  href="#work"
                  className="inline-flex min-h-[48px] items-center rounded-full border border-cream/40 px-7 text-base font-semibold text-cream transition-colors hover:border-cream"
                >
                  View work
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
