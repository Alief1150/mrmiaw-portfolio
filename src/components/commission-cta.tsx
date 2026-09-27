import { DISCORD_SERVER } from "@/data/portfolio";

export function CommissionCta() {
  return (
    <section
      id="commission"
      aria-labelledby="commission-title"
      className="scroll-mt-20 border-t border-ember"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-20 text-center md:px-8 md:py-28">
        <div
          aria-hidden="true"
          className="gold-rule mx-auto h-[3px] w-24 rounded-full"
        />
        <h2
          id="commission-title"
          className="font-display mx-auto mt-8 max-w-[16ch] text-4xl leading-tight md:text-6xl"
        >
          Commissions are open
        </h2>
        <p className="mx-auto mt-5 max-w-[52ch] text-lg leading-relaxed text-fog">
          Need an avatar GFX, thumbnail, group icon, or game icon?
        </p>
        <a
          href={DISCORD_SERVER}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex min-h-[52px] items-center rounded-full bg-gold px-9 text-lg font-semibold text-ink transition-shadow hover:shadow-[0_0_0_4px_rgba(242,220,115,0.4)]"
        >
          Commission on Discord
        </a>
      </div>
    </section>
  );
}
