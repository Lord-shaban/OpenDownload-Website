import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
const heading = localFont({
  src: "../app/fonts/Manrope-Latin.woff2",
  weight: "200 800",
  variable: "--font-heading",
  display: "swap",
});
const body = localFont({
  src: "../app/fonts/DMSans-Latin.woff2",
  weight: "100 1000",
  variable: "--font-body",
  display: "swap",
});
const arabic = localFont({
  src: "../app/fonts/ReadexPro-Arabic.woff2",
  weight: "160 700",
  variable: "--font-arabic",
  display: "swap",
  preload: false,
});
export const fontClass = `${heading.variable} ${body.variable} ${GeistMono.variable} ${arabic.variable}`;
export const themeScript = `try { const theme = localStorage.getItem('od_site_theme'); document.documentElement.classList.toggle('dark', theme === 'dark' || (!theme && matchMedia('(prefers-color-scheme: dark)').matches)); } catch {}`;
