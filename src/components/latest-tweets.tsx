import { SiX } from "@icons-pack/react-simple-icons";
import { Tweet } from "./ui/tweet";
import { LATEST_TWEET_IDS, X_PROFILE_URL, SOCIAL_LINKS } from "@/data/social";

export function LatestTweets() {
  return (
    <section
      aria-labelledby="latest-title"
      className="scroll-mt-20 border-t border-ember"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[680px] text-center">
          <h2
            id="latest-title"
            className="font-display text-4xl leading-tight md:text-5xl"
          >
            Latest on X
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-fog">
            MrMiaw posts on X as {SOCIAL_LINKS.xHandle}.
          </p>
        </div>

        {LATEST_TWEET_IDS.length > 0 ? (
          <div className="mx-auto mt-10 flex max-w-[680px] flex-col items-center gap-6">
            {LATEST_TWEET_IDS.map((id) => (
              <Tweet key={id} id={id} />
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-[620px] rounded-[10px] border border-ember bg-coal p-6 text-center">
            <span
              aria-hidden="true"
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-[10px] border border-gold/40 text-gold"
            >
              <SiX className="h-5 w-5" />
            </span>
            <p className="mt-4 leading-relaxed text-cream">
              Recent posts live on the X profile. Open it to see what is new.
            </p>
            <a
              href={X_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-[48px] items-center rounded-full bg-gold px-7 text-base font-semibold text-ink transition-shadow hover:shadow-[0_0_0_3px_rgba(242,220,115,0.45)]"
            >
              Follow {SOCIAL_LINKS.xHandle}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
