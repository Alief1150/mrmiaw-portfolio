import {
  PROFILE_LINKS,
  SECONDARY_LINKS,
  SOCIAL_LINKS,
} from "@/data/social";

export function SiteFooter() {
  return (
    <footer className="border-t border-ember bg-coal/40">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-8 px-5 py-12 text-center md:px-8">
        <div>
          <p className="font-display text-2xl">MrMiaw</p>
          <p className="mt-1 text-[15px] text-fog">Roblox GFX Artist</p>
        </div>

        <nav
          aria-label="Profiles"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[15px]"
        >
          <a
            href={SOCIAL_LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center font-medium text-bright underline-offset-4 hover:underline"
          >
            Discord
          </a>
          {PROFILE_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center text-fog transition-colors hover:text-cream"
            >
              {label}
            </a>
          ))}
        </nav>

        <nav
          aria-label="Secondary links"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-fog"
        >
          {SECONDARY_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center underline-offset-4 hover:underline"
            >
              {label}
            </a>
          ))}
        </nav>

        <p className="text-sm text-fog">&copy; 2026 MrMiaw</p>
      </div>
    </footer>
  );
}
