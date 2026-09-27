"use client";

import { useState } from "react";
import {
  enrichTweet,
  useTweet,
  type EnrichedTweet,
} from "react-tweet";
import { Check, Link2 } from "lucide-react";
import { SiX } from "@icons-pack/react-simple-icons";

const VerifiedBadge = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 22 22"
    className={className}
    fill="currentColor"
    aria-label="Verified account"
    role="img"
  >
    <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
  </svg>
);

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return num.toString();
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${hour12}:${minutes.toString().padStart(2, "0")} ${ampm} · ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

const cardClass =
  "w-full max-w-[620px] rounded-[10px] border border-ember bg-coal p-5";

function TweetSkeleton({ className }: { className?: string }) {
  return (
    <div className={`${cardClass} ${className ?? ""}`} aria-hidden="true">
      <div className="flex items-center gap-3">
        <div className="h-[38px] w-[38px] shrink-0 animate-pulse rounded-full bg-ember" />
        <div className="flex flex-col gap-1.5">
          <div className="h-4 w-24 animate-pulse rounded bg-ember" />
          <div className="h-3 w-16 animate-pulse rounded bg-ember" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-ember" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-ember" />
      </div>
    </div>
  );
}

function TweetNotFound({ className }: { className?: string }) {
  return (
    <div className={`${cardClass} ${className ?? ""}`}>
      <p className="text-center text-sm text-fog">Post unavailable</p>
    </div>
  );
}

function TweetHeader({ tweet }: { tweet: EnrichedTweet }) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-2.5">
        <img
          src={tweet.user.profile_image_url_https}
          alt=""
          loading="lazy"
          width={38}
          height={38}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <span className="flex items-center gap-1 text-[15px] font-semibold text-cream">
            {tweet.user.name}
            {(tweet.user.verified || tweet.user.is_blue_verified) && (
              <VerifiedBadge className="h-4 w-4 text-[#1C9BF1]" />
            )}
          </span>
          <span className="-mt-0.5 text-[13px] text-fog">
            @{tweet.user.screen_name}
          </span>
        </div>
      </div>
      <a
        href={tweet.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open post on X"
        className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full text-fog transition-colors hover:text-bright"
      >
        <SiX className="h-5 w-5" />
      </a>
    </div>
  );
}

function TweetBody({ tweet }: { tweet: EnrichedTweet }) {
  return (
    <p className="mt-3 leading-6 text-cream">
      {tweet.entities.map((entity, idx) => {
        switch (entity.type) {
          case "url":
          case "symbol":
          case "hashtag":
          case "mention":
            return (
              <a
                key={idx}
                href={entity.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-bright hover:underline"
              >
                {entity.text}
              </a>
            );
          case "text":
            return (
              <span
                key={idx}
                dangerouslySetInnerHTML={{ __html: entity.text }}
              />
            );
          default:
            return null;
        }
      })}
    </p>
  );
}

function TweetMedia({ tweet }: { tweet: EnrichedTweet }) {
  if (!tweet.video && !tweet.photos) return null;
  const mp4 = tweet.video?.variants
    ?.filter((v) => v.type === "video/mp4")
    .at(0);
  return (
    <div className="mt-4">
      {tweet.video && mp4 && (
        <video
          poster={tweet.video.poster}
          loop
          muted
          playsInline
          preload="none"
          controls
          className="w-full rounded-lg"
        >
          <source src={mp4.src} type="video/mp4" />
        </video>
      )}
      {tweet.photos && (
        <div
          className={`grid gap-1 ${
            tweet.photos.length === 1 ? "grid-cols-1" : "grid-cols-2"
          }`}
        >
          {tweet.photos.map((photo, idx) => (
            <img
              key={photo.url}
              src={photo.url}
              alt={`Post image ${idx + 1}`}
              loading="lazy"
              className={`w-full rounded-lg object-cover ${
                tweet.photos && tweet.photos.length === 3 && idx === 0
                  ? "row-span-2"
                  : ""
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TweetFooter({
  tweet,
  showDate = true,
}: {
  tweet: EnrichedTweet;
  showDate?: boolean;
}) {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyLink = () => {
    navigator.clipboard.writeText(tweet.url).catch(() => {});
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 1500);
  };
  return (
    <>
      {showDate && (
        <div className="mt-4">
          <time className="text-sm text-fog" dateTime={tweet.created_at}>
            {formatDate(tweet.created_at)}
          </time>
        </div>
      )}
      <div className="mt-2.5 flex gap-5 border-t border-ember pt-3.5">
        <a
          href={`https://x.com/intent/like?tweet_id=${tweet.id_str}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[44px] items-center gap-1.5 text-fog transition-colors hover:text-cream"
          aria-label={`Like this post, ${formatNumber(tweet.favorite_count)} likes`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            aria-hidden="true"
          >
            <g fill="currentColor">
              <path d="M12.164,2c-1.195,.015-2.324,.49-3.164,1.306-.84-.815-1.972-1.291-3.178-1.306-2.53,.015-4.582,2.084-4.572,4.609,0,5.253,5.306,8.429,6.932,9.278,.256,.133,.537,.2,.818,.2s.562-.067,.817-.2c1.626-.848,6.933-4.024,6.933-9.275,.009-2.528-2.042-4.597-4.586-4.612Z" />
            </g>
          </svg>
          <span className="text-sm">
            {formatNumber(tweet.favorite_count)}
          </span>
        </a>
        <button
          type="button"
          onClick={handleCopyLink}
          className="flex min-h-[44px] items-center gap-1.5 text-fog transition-colors hover:text-cream"
          aria-label={isCopied ? "Post link copied" : "Copy post link"}
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-gold" aria-hidden="true" />
          ) : (
            <Link2 className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="text-sm">Copy link</span>
        </button>
      </div>
      <span aria-live="polite" className="sr-only">
        {isCopied ? "Copied" : ""}
      </span>
    </>
  );
}

export function Tweet({ id, className }: { id: string; className?: string }) {
  const { data: tweet, isLoading, error } = useTweet(id);

  if (isLoading) {
    return <TweetSkeleton className={className} />;
  }
  if (error || !tweet) {
    return <TweetNotFound className={className} />;
  }

  let enrichedTweet: EnrichedTweet;
  try {
    const entities = (tweet.entities ?? {}) as {
      hashtags?: never[];
      urls?: never[];
      user_mentions?: never[];
      symbols?: never[];
    };
    enrichedTweet = enrichTweet({
      ...tweet,
      entities: {
        ...entities,
        hashtags: entities.hashtags ?? [],
        urls: entities.urls ?? [],
        user_mentions: entities.user_mentions ?? [],
        symbols: entities.symbols ?? [],
      },
    });
  } catch {
    return <TweetNotFound className={className} />;
  }

  return (
    <div className={`${cardClass} ${className ?? ""}`}>
      <TweetHeader tweet={enrichedTweet} />
      <TweetBody tweet={enrichedTweet} />
      <TweetMedia tweet={enrichedTweet} />
      <TweetFooter tweet={enrichedTweet} />
    </div>
  );
}
