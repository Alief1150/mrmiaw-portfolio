import { DEVIANTART, DISCORD_SERVER, DISCORD_USERNAME } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="border-t border-ember bg-coal/40">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-5 py-12 md:flex-row md:items-start md:justify-between md:px-8">
        <div>
          <p className="font-display text-2xl">MrMiaw</p>
          <p className="mt-1 text-[15px] text-fog">Roblox GFX artist</p>
        </div>
        <nav aria-label="Contact" className="flex flex-col gap-3 text-[15px]">
          <p className="text-fog">
            Discord:{" "}
            <span className="text-cream">{DISCORD_USERNAME}</span>
          </p>
          <a
            href={DISCORD_SERVER}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit min-h-[44px] py-2 font-medium text-bright underline-offset-4 hover:underline"
          >
            Discord server
          </a>
          <a
            href={DEVIANTART}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit min-h-[44px] py-2 font-medium text-bright underline-offset-4 hover:underline"
          >
            DeviantArt
          </a>
        </nav>
        <p className="text-sm text-fog md:text-right">
          &copy; 2026 MrMiaw
        </p>
      </div>
    </footer>
  );
}
