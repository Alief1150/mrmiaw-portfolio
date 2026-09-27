import Image from "next/image";
import { AppWindow, Image as ImageIcon, User, Users } from "lucide-react";
import { DISCORD_SERVER, GALLERY_ITEMS } from "@/data/portfolio";

const SERVICES = [
  {
    name: "Roblox avatar GFX",
    text: "Single-character portraits built around an avatar, outfit, and pose.",
    Icon: User,
  },
  {
    name: "Game thumbnails",
    text: "Click-ready artwork for game pages, staged and lit for small sizes.",
    Icon: ImageIcon,
  },
  {
    name: "Group icons",
    text: "Square-format marks that stay readable everywhere a group shows them.",
    Icon: Users,
  },
  {
    name: "Game icons",
    text: "Storefront icons composed to read clearly at every platform size.",
    Icon: AppWindow,
  },
];

const preview =
  GALLERY_ITEMS.find((item) => item.slug === "zombie-attack") ??
  GALLERY_ITEMS[0];

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="scroll-mt-20 border-t border-ember"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[640px] text-center">
          <h2
            id="services-title"
            className="font-display text-4xl leading-tight md:text-5xl"
          >
            Services
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-fog">
            I mainly create:
          </p>
        </div>

        <ul className="mx-auto mt-10 max-w-[720px]">
          {SERVICES.map(({ name, text, Icon }) => (
            <li
              key={name}
              className="flex items-start gap-5 border-t border-ember py-7 text-left last:border-b"
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] border border-gold/40 text-gold"
              >
                <Icon size={22} />
              </span>
              <span>
                <h3 className="font-display text-2xl leading-snug">{name}</h3>
                <p className="mt-2 max-w-[52ch] leading-relaxed text-fog">
                  {text}
                </p>
              </span>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-10 max-w-[720px]">
          <div className="overflow-hidden rounded-[4px] border border-ember">
            <Image
              src={preview.src}
              alt={preview.alt}
              width={preview.width}
              height={preview.height}
              sizes="(max-width: 768px) 100vw, 720px"
              loading="lazy"
              className="h-auto w-full object-cover"
              style={{ objectPosition: preview.objectPosition ?? "50% 50%" }}
            />
          </div>
          <p className="mt-3 text-center text-sm text-fog">
            {preview.title}, thumbnail format
          </p>
          <p className="mt-6 text-center">
            <a
              href={DISCORD_SERVER}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center rounded-full bg-gold px-7 text-base font-semibold text-ink transition-shadow hover:shadow-[0_0_0_3px_rgba(242,220,115,0.45)]"
            >
              See commission details on Discord
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
