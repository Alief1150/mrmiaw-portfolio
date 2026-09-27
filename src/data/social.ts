export const DISCORD_SERVER = "https://discord.gg/C99tjr5Txq";
export const DISCORD_USERNAME = "mr_miaw1";

export const SOCIAL_LINKS = {
  discord: "https://discord.gg/C99tjr5Txq",
  roblox: "https://www.roblox.com/users/806520926/profile",
  robloxGroup: "https://www.roblox.com/communities/8584608/unnamed",
  x: "https://x.com/whoknowsAB",
  xHandle: "@whoknowsAB",
  artstation: "https://www.artstation.com/mr_miaw",
  deviantart: "https://www.deviantart.com/mrmiaw001",
  paymentStuff: "https://www.roblox.com/games/119851121397570/Payment-Stuff#!/store",
  carrd: "https://mrmiaw1.carrd.co/",
} as const;

export const PROFILE_LINKS = [
  { label: "Roblox", href: SOCIAL_LINKS.roblox },
  { label: "Roblox Group", href: SOCIAL_LINKS.robloxGroup },
  { label: "X", href: SOCIAL_LINKS.x },
  { label: "ArtStation", href: SOCIAL_LINKS.artstation },
  { label: "DeviantArt", href: SOCIAL_LINKS.deviantart },
] as const;

export const SECONDARY_LINKS = [
  { label: "Payment Stuff", href: SOCIAL_LINKS.paymentStuff },
  { label: "Carrd", href: SOCIAL_LINKS.carrd },
] as const;

export const LATEST_TWEET_IDS: readonly string[] = [];

export const X_PROFILE_URL = SOCIAL_LINKS.x;
