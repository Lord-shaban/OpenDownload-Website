export const PRODUCT = "OpenDownload";
export const APP_URL = "https://opendownload.lord.blitz.cloud/";
export const REPO_URL = "https://github.com/Lord-shaban/OpenDownload";
export const RELEASE_URL = `${REPO_URL}/releases/tag/v0.1.0`;
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://opendownload-website.vercel.app";
export type Locale = "en" | "ar";
export const locales: Locale[] = ["en", "ar"];
export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
export function text(locale: Locale, en: string, ar: string) {
  return locale === "ar" ? ar : en;
}
export function href(locale: Locale, path = "") {
  return `/${locale}${path ? `/${path}` : ""}`;
}
export const routes = [
  "",
  "docs",
  "docs/getting-started",
  "docs/self-hosting",
  "docs/capabilities",
  "docs/troubleshooting",
  "docs/contributing",
  "blog",
  "blog/linkedin-pinterest-threads",
  "blog/introducing-0-1",
  "blog/a-quieter-workspace",
  "security",
  "privacy",
  "changelog",
  "community",
];
