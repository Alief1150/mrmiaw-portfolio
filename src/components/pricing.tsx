import { DISCORD_SERVER } from "@/data/portfolio";

export function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="scroll-mt-20 border-t border-ember bg-coal/40"
    >
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <div className="md:col-span-5">
          <h2
            id="pricing-title"
            className="font-display text-4xl leading-tight md:text-5xl"
          >
            Pricing
          </h2>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-2 text-sm font-medium text-bright">
            <span
              aria-hidden="true"
              className="gold-rule inline-block h-2.5 w-2.5 rounded-full"
            />
            Commissions open
          </p>
        </div>

        <div className="md:col-span-7">
          <dl className="overflow-hidden rounded-[10px] border border-ember bg-ink">
            <div className="grid gap-2 border-b border-ember px-6 py-7 sm:grid-cols-2">
              <dt className="text-[15px] text-fog">Typical range</dt>
              <dd className="font-display text-3xl text-cream">
                250-3,000 Robux
              </dd>
            </div>
            <div className="grid gap-2 border-b border-ember px-6 py-7 sm:grid-cols-2">
              <dt className="text-[15px] text-fog">USD</dt>
              <dd className="font-display text-3xl text-cream">
                US$2.50-US$37.50
              </dd>
            </div>
            <div className="grid gap-2 border-b border-ember px-6 py-7 sm:grid-cols-2">
              <dt className="text-[15px] text-fog">Payment</dt>
              <dd className="leading-relaxed text-cream">
                Wise preferred. PayPal accepted. Robux payment available.
              </dd>
            </div>
            <div className="px-6 py-7">
              <p className="max-w-[56ch] leading-relaxed text-fog">
                Final price depends on the order, scope, and complexity. For
                exact pricing on a specific idea, ask in the Discord server.
              </p>
              <a
                href={DISCORD_SERVER}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-[48px] items-center rounded-full border border-gold/70 px-7 text-base font-semibold text-bright transition-colors hover:bg-gold hover:text-ink"
              >
                Ask about a commission on Discord
              </a>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
