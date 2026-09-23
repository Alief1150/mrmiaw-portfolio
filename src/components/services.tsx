import Image from "next/image";
import { AppWindow, Image as ImageIcon, User, Users } from "lucide-react";
import { DISCORD_SERVER, GALLERY_ITEMS } from "@/data/portfolio";

const SERVICES = [
  {
    name: "Roblox Thumbnail",
    text: "Click-ready artwork for game pages and videos, staged and lit for small sizes.",
    Icon: ImageIcon,
  },
  {
    name: "Game Icon",
    text: "Square-format icons that stay readable at every size the platform shows them.",
    Icon: AppWindow,
  },
  {
    name: "Avatar GFX",
    text: "Single-character portraits built around an avatar, outfit, and pose.",
    Icon: User,
  },
  {
    name: "Extra Character",
    text: "Additional characters added to a scene, so multi-avatar orders stay coherent.",
    Icon: Users,
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
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <div className="md:col-span-5">
          <h2
            id="services-title"
            className="font-display text-4xl leading-tight md:text-5xl"
          >
            Services
          </h2>
          <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-fog">
            Four order types. Every commission is scoped individually, so the
            format here stays simple and the details live where orders happen.
          </p>
          <div className="mt-8 overflow-hidden rounded-[4px] border border-ember">
            <Image
              src={preview.src}
              alt={preview.alt}
              width={preview.width}
              height={preview.height}
              sizes="(max-width: 768px) 100vw, 40vw"
              loading="lazy"
              className="h-auto w-full object-cover"
              style={{ objectPosition: preview.objectPosition ?? "50% 50%" }}
            />
          </div>
          <p className="mt-3 text-sm text-fog">
            {preview.title}, thumbnail format
          </p>
        </div>

        <div className="md:col-span-7">
          <ul>
            {SERVICES.map(({ name, text, Icon }) => (
              <li
                key={name}
                className="flex gap-5 border-t border-ember py-7 last:border-b"
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
          <a
            href={DISCORD_SERVER}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex min-h-[48px] items-center rounded-full bg-gold px-7 text-base font-semibold text-ink transition-shadow hover:shadow-[0_0_0_3px_rgba(242,220,115,0.45)]"
          >
            See commission details on Discord
          </a>
        </div>
      </div>
    </section>
  );
}
