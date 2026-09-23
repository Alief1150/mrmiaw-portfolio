"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { PortfolioItem } from "@/data/portfolio";

interface ArtworkLightboxProps {
  items: PortfolioItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ArtworkLightbox({
  items,
  index,
  onClose,
  onNavigate,
}: ArtworkLightboxProps) {
  const item = items[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = items.length;

  const go = useCallback(
    (next: number) => {
      onNavigate((next + count) % count);
    },
    [count, onNavigate],
  );

  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(index + 1);
      if (event.key === "ArrowLeft") go(index - 1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.__lenis?.start();
      document.removeEventListener("keydown", onKey);
    };
  }, [go, index, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title}, artwork ${index + 1} of ${count}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4"
      onClick={onClose}
    >
      <div
        className="lightbox-panel flex max-h-full w-full max-w-[1100px] flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-sm text-fog">
            {item.title} ({index + 1} of {count})
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close artwork viewer"
            className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full border border-ember text-cream transition-colors hover:border-gold"
          >
            <X size={22} />
          </button>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous artwork"
            className="absolute left-0 z-10 inline-flex h-[48px] w-[48px] items-center justify-center rounded-full border border-ember bg-ink/80 text-cream transition-colors hover:border-gold md:-left-2"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="relative max-h-[74svh] w-full">
            <Image
              key={item.src}
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              sizes="(max-width: 1100px) 100vw, 1100px"
              className="mx-auto max-h-[74svh] w-auto max-w-full rounded-[4px] object-contain"
              priority
            />
          </div>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next artwork"
            className="absolute right-0 z-10 inline-flex h-[48px] w-[48px] items-center justify-center rounded-full border border-ember bg-ink/80 text-cream transition-colors hover:border-gold md:-right-2"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <p className="mt-3 text-center text-[15px] text-fog">
          {item.kind ? `${item.kind}, ` : ""}by MrMiaw
        </p>
      </div>
    </div>
  );
}
