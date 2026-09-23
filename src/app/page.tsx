import { SiteHeader } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Work } from "@/components/work";
import { Services } from "@/components/services";
import { Pricing } from "@/components/pricing";
import { About } from "@/components/about";
import { CommissionCta } from "@/components/commission-cta";
import { SiteFooter } from "@/components/footer";

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:font-semibold focus:text-ink"
      >
        Skip to work
      </a>
      <SiteHeader />
      <main>
        <Hero />
        <Work />
        <Services />
        <Pricing />
        <About />
        <CommissionCta />
      </main>
      <SiteFooter />
    </>
  );
}
