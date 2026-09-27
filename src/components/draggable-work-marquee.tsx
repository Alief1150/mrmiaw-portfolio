"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import type { PortfolioItem } from "@/data/portfolio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

interface DraggableWorkMarqueeProps {
  items: PortfolioItem[];
  onOpen: (item: PortfolioItem) => void;
}

const REPEAT_COUNT = 3;

export function DraggableWorkMarquee({ items, onOpen }: DraggableWorkMarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const duplicatedItems = useMemo(
    () => Array.from({ length: REPEAT_COUNT }).flatMap(() => items),
    [items],
  );

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track || items.length === 0) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      let singleSetWidth = 0;
      let x = 0;
      let throwVelocity = 0;
      let isDragging = false;
      let lastDragX = 0;
      let lastDragTime = 0;
      let wrapValue = (value: number) => value;
      let resizeRaf = 0;
      const observers: ResizeObserver[] = [];
      const setX = gsap.quickSetter(track, "x", "px");
      const speed = 0.6;

      const getGap = () => {
        const styles = window.getComputedStyle(track);
        return parseFloat(styles.columnGap || styles.gap || "0");
      };

      const buildWrap = () => {
        wrapValue = gsap.utils.wrap(-singleSetWidth * 1.02, 0);
      };

      const measure = () => {
        const children = Array.from(track.children);
        const setSize = Math.floor(children.length / REPEAT_COUNT);
        const firstSet = children.slice(0, setSize);
        if (firstSet.length === 0) return;
        const gap = getGap();
        const widths = firstSet.reduce(
          (sum, child) => sum + child.getBoundingClientRect().width,
          0,
        );
        singleSetWidth = widths + gap * Math.max(0, firstSet.length - 1);
        buildWrap();
        x = wrapValue(x);
        setX(x);
      };

      const scheduleMeasure = () => {
        cancelAnimationFrame(resizeRaf);
        resizeRaf = requestAnimationFrame(measure);
      };

      const update = () => {
        if (!isDragging) {
          x -= speed;
          x += throwVelocity;
          throwVelocity *= 0.975;
          if (Math.abs(throwVelocity) < 0.01) throwVelocity = 0;
        }
        x = wrapValue(x);
        setX(x);
      };

      measure();

      const dragInstance = Draggable.create(track, {
        type: "x",
        allowContextMenu: true,
        dragClickables: true,
        onPress(this: Draggable) {
          isDragging = true;
          throwVelocity = 0;
          this.x = x;
          lastDragX = this.x;
          lastDragTime = performance.now();
        },
        onDrag(this: Draggable) {
          const now = performance.now();
          const dx = this.x - lastDragX;
          const dt = now - lastDragTime;
          x = wrapValue(this.x);
          setX(x);
          this.x = x;
          if (dt > 0) {
            const sampled = (dx / dt) * 36.67;
            throwVelocity = gsap.utils.clamp(-60, 60, sampled * 2.8);
          }
          lastDragX = this.x;
          lastDragTime = now;
        },
        onRelease() {
          isDragging = false;
        },
      })[0];

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        x = wrapValue(x + (event.key === "ArrowLeft" ? 1 : -1) * root.clientWidth * 0.35);
        throwVelocity = 0;
        setX(x);
      };
      root.addEventListener("keydown", handleKeyDown);
      window.addEventListener("resize", scheduleMeasure);

      const trackObserver = new ResizeObserver(scheduleMeasure);
      trackObserver.observe(track);
      observers.push(trackObserver);
      const children = Array.from(track.children);
      const setSize = Math.floor(children.length / REPEAT_COUNT);
      children.slice(0, setSize).forEach((child) => {
        const ro = new ResizeObserver(scheduleMeasure);
        ro.observe(child);
        observers.push(ro);
        child.querySelectorAll("img").forEach((img) => {
          if (!img.complete) img.addEventListener("load", scheduleMeasure);
        });
      });

      gsap.ticker.add(update);

      return () => {
        root.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("resize", scheduleMeasure);
        cancelAnimationFrame(resizeRaf);
        gsap.ticker.remove(update);
        observers.forEach((observer) => observer.disconnect());
        Array.from(track.children).forEach((child) => {
          child.querySelectorAll("img").forEach((img) => {
            img.removeEventListener("load", scheduleMeasure);
          });
        });
        dragInstance?.kill();
      };
    });
    return () => media.revert();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      role="region"
      aria-label="Square artwork marquee. Drag, swipe, or use the left and right arrow keys to browse."
      className="relative w-full cursor-grab overflow-hidden active:cursor-grabbing"
    >
      <div ref={trackRef} className="flex w-max items-center gap-4">
        {duplicatedItems.map((item, index) => {
          const isDuplicate = index >= items.length;
          if (isDuplicate) {
            return (
              <div
                key={`${item.slug}-${index}`}
                aria-hidden="true"
                inert={!isDuplicate ? undefined : true}
                className="w-[220px] shrink-0 overflow-hidden rounded-[4px] border border-ember md:w-[280px]"
              >
                <span className="block aspect-square w-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt=""
                    width={item.width}
                    height={item.height}
                    sizes="280px"
                    loading="lazy"
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </span>
              </div>
            );
          }
          return (
            <button
              key={`${item.slug}-${index}`}
              type="button"
              onClick={() => onOpen(item)}
              aria-label={`Open ${item.title} full size`}
              className="w-[220px] shrink-0 cursor-pointer overflow-hidden rounded-[4px] border border-ember bg-ink text-left md:w-[280px]"
            >
              <span className="block aspect-square w-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="280px"
                  loading="lazy"
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </span>
              <span className="block px-3 py-2.5 text-sm text-fog">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
