"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { DISCORD_SERVER } from "@/data/portfolio";
import { scrollToSection } from "./lenis-provider";

const LINKS = [
  { label: "Work", hash: "#work" },
  { label: "Services", hash: "#services" },
  { label: "Pricing", hash: "#pricing" },
  { label: "About", hash: "#about" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = LINKS.map(({ hash }) =>
      document.querySelector(hash),
    ).filter((el): el is Element => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const go = (hash: string) => {
    setOpen(false);
    scrollToSection(hash);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-ember bg-ink/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-4 px-5 md:px-8">
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            go("#top");
          }}
          className="flex min-h-[44px] items-center gap-3"
          aria-label="MrMiaw, back to top"
        >
          <span
            aria-hidden="true"
            className="font-display flex h-9 w-9 items-center justify-center rounded-full border border-gold/60 text-lg text-gold"
          >
            M
          </span>
          <span className="font-display text-xl tracking-wide">MrMiaw</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {LINKS.map(({ label, hash }) => (
            <a
              key={hash}
              href={hash}
              onClick={(event) => {
                event.preventDefault();
                go(hash);
              }}
              aria-current={active === hash ? "true" : undefined}
              className="relative flex min-h-[44px] items-center px-4 text-[15px] text-fog transition-colors hover:text-cream"
            >
              {label}
              <span
                aria-hidden="true"
                className={`gold-rule absolute inset-x-4 bottom-1 h-[3px] rounded-full transition-opacity ${
                  active === hash ? "opacity-100" : "opacity-0"
                }`}
              />
            </a>
          ))}
          <a
            href={DISCORD_SERVER}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 inline-flex min-h-[44px] items-center rounded-full bg-gold px-5 text-[15px] font-semibold text-ink transition-shadow hover:shadow-[0_0_0_3px_rgba(242,220,115,0.45)] focus-visible:shadow-[0_0_0_3px_rgba(242,220,115,0.7)]"
          >
            Commission
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href={DISCORD_SERVER}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center rounded-full bg-gold px-4 text-sm font-semibold text-ink"
          >
            Commission
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-md text-cream"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-ember bg-ink px-5 pb-6 pt-2 md:hidden"
        >
          {LINKS.map(({ label, hash }) => (
            <a
              key={hash}
              href={hash}
              onClick={(event) => {
                event.preventDefault();
                go(hash);
              }}
              className="flex min-h-[48px] items-center border-b border-ember/60 text-lg text-cream"
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
