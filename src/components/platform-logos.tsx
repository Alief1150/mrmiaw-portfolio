import {
  SiDiscord,
  SiPaypal,
  SiRoblox,
  SiWise,
  SiX,
} from "@icons-pack/react-simple-icons";
import { Brush } from "lucide-react";
import { LogosCarousel } from "./ui/logos-carousel";
import { GradientChapter } from "./ui/gradient-chapter";

function PhotoshopMark({ className }: { className?: string }) {
  return <Brush className={className} aria-hidden="true" />;
}

const LOGOS = [
  { label: "Roblox", Icon: SiRoblox },
  { label: "Wise", Icon: SiWise },
  { label: "PayPal", Icon: SiPaypal },
  { label: "Discord", Icon: SiDiscord },
  { label: "X", Icon: SiX },
  { label: "Photoshop", Icon: PhotoshopMark },
];

export function PlatformLogos() {
  return (
    <GradientChapter label="Platforms, tools, and payments">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center px-5 py-20 text-center md:px-8 md:py-24">
        <h2 className="font-display text-3xl leading-tight text-cream md:text-4xl">
          Platforms, tools, payments
        </h2>
        <p className="mt-3 max-w-[56ch] text-base leading-relaxed text-cream/85">
          The ecosystem around the work: where games live, how USD orders are
          paid, where to reach MrMiaw, and what the editing is finished in.
        </p>
        <div className="mt-10 flex justify-center">
          <LogosCarousel count={3} interval={3200}>
            {LOGOS.map(({ label, Icon }) => (
              <span
                key={label}
                className="flex min-h-[64px] min-w-[120px] flex-col items-center justify-center gap-2 text-cream"
              >
                <Icon className="h-8 w-8" aria-hidden="true" />
                <span className="text-sm font-medium">{label}</span>
              </span>
            ))}
          </LogosCarousel>
        </div>
      </div>
    </GradientChapter>
  );
}
