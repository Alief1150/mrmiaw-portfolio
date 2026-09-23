"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { DISCORD_USERNAME } from "@/data/portfolio";

export function CopyUsername() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(DISCORD_USERNAME);
    } catch {
      const area = document.createElement("textarea");
      area.value = DISCORD_USERNAME;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span className="inline-flex items-center gap-2">
      <code className="rounded-[6px] border border-ember bg-ink px-3 py-1.5 text-[15px] text-cream">
        {DISCORD_USERNAME}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={
          copied ? "Discord username copied" : "Copy Discord username"
        }
        className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full border border-ember text-fog transition-colors hover:border-gold hover:text-bright"
      >
        {copied ? (
          <Check size={20} aria-hidden="true" />
        ) : (
          <Copy size={20} aria-hidden="true" />
        )}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </span>
  );
}
