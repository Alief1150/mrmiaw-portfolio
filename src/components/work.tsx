"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import {
  FEATURED_ITEMS,
  GALLERY_ITEMS,
  type PortfolioItem,
} from "@/data/portfolio";
import { ArtworkLightbox } from "./artwork-lightbox";
import { DraggableWorkMarquee } from "./draggable-work-marquee";

const LIGHTBOX_ITEMS: PortfolioItem[] = [...FEATURED_ITEMS, ...GALLERY_ITEMS];

const MARQUEE_SLUGS = [
  "the-red-guards",
  "star-wars",
  "cia-logo",
  "usar",
  "usar-edited",
  "roman-stuff",
  "lacrosse",
  "cop-stuff",
  "usm-g",
  "usm-m",
];

const MARQUEE_ITEMS: PortfolioItem[] = MARQUEE_SLUGS.flatMap((slug) => {
  const found = GALLERY_ITEMS.find((item) => item.slug === slug);
  return found ? [found] : [];
});

function openAt(
  item: PortfolioItem,
  setIndex: (index: number) => void,
) {
  const found = LIGHTBOX_ITEMS.findIndex((entry) => entry.slug === item.slug);
  setIndex(found === -1 ? 0 : found);
}

export function Work() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-20">
      <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-28">
        <div className="max-w-[640px]">
          <h2
            id="work-title"
            className="font-display text-4xl leading-tight md:text-5xl"
          >
            Selected work
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-fog">
            Four scenes that show the range: large multi-character staging,
            cinematic lighting, and game-icon composition. Select any piece to
            see it full size.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-14 md:gap-20">
          {FEATURED_ITEMS.map((item, position) => (
            <article
              key={item.slug}
              className={`grid items-end gap-5 md:grid-cols-12 md:gap-8 ${
                position % 2 === 1 ? "" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => openAt(item, setLightboxIndex)}
                aria-label={`Open ${item.title} full size`}
                className={`work-frame group relative block overflow-hidden rounded-[4px] border border-ember text-left md:col-span-8 ${
                  position % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 768px) 100vw, 66vw"
                  loading="lazy"
                  className="h-auto w-full object-cover"
                  style={{ objectPosition: item.objectPosition ?? "50% 50%" }}
                />
                <span className="absolute bottom-3 right-3 inline-flex h-[44px] w-[44px] items-center justify-center rounded-full bg-ink/80 text-cream opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                  <Expand size={20} aria-hidden="true" />
                </span>
              </button>
              <div
                className={`md:col-span-4 ${
                  position % 2 === 1 ? "md:order-1 md:text-right" : ""
                }`}
              >
                <h3 className="font-display text-3xl leading-tight">
                  {item.title}
                </h3>
                {item.kind && (
                  <p className="mt-2 text-[15px] text-fog">{item.kind}</p>
                )}
                <button
                  type="button"
                  onClick={() => openAt(item, setLightboxIndex)}
                  className="mt-4 inline-flex min-h-[44px] items-center rounded-full border border-ember px-5 text-[15px] font-medium text-cream transition-colors hover:border-gold hover:text-bright"
                >
                  View full size
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="border-t border-ember">
        <div className="mx-auto max-w-[1200px] px-5 pb-4 pt-20 md:px-8 md:pt-28">
          <div className="mx-auto max-w-[640px] text-center">
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              Square cuts
            </h2>
            <p className="mt-4 text-base leading-relaxed text-fog">
              Icons and square-format pieces. Drag, swipe, or use arrow keys
              to browse. Select one to see it full size.
            </p>
          </div>
        </div>
        <div className="pb-20 md:pb-28">
          <DraggableWorkMarquee
            items={MARQUEE_ITEMS}
            onOpen={(item) => openAt(item, setLightboxIndex)}
          />
        </div>
      </div>

      <div className="border-t border-ember bg-coal/40">
        <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              Full gallery
            </h2>
            <p className="max-w-[52ch] text-base leading-relaxed text-fog">
              The complete set of 26 pieces: thumbnails, icons, logos, and
              scenes across Roman, sci-fi, horror, and everyday Roblox themes.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {GALLERY_ITEMS.map((item) => (
              <li
                key={item.slug}
                className={
                  item.orientation === "landscape" ? "col-span-2" : "col-span-1"
                }
              >
                <button
                  type="button"
                  onClick={() => openAt(item, setLightboxIndex)}
                  aria-label={`Open ${item.title} full size`}
                  className="work-frame group block w-full overflow-hidden rounded-[4px] border border-ember bg-ink text-left"
                >
                  <span
                    className={`block w-full overflow-hidden ${
                      item.orientation === "landscape"
                        ? "aspect-video"
                        : "aspect-square"
                    }`}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      sizes="(max-width: 768px) 50vw, 25vw"
                      loading="lazy"
                      className="h-full w-full object-cover"
                      style={{
                        objectPosition: item.objectPosition ?? "50% 50%",
                      }}
                    />
                  </span>
                  <span className="block px-3 py-2.5 text-sm text-fog">
                    {item.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {lightboxIndex !== null && (
        <ArtworkLightbox
          items={LIGHTBOX_ITEMS}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
