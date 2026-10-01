import type { Metadata } from "next";
import { fontClass, themeScript } from "@/lib/fonts";
import { SITE_URL } from "@/lib/site";
import "../globals.css";
export const metadata: Metadata = { metadataBase: new URL(SITE_URL) };
export default function EntryLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontClass} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
