import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fontClass, themeScript } from "@/lib/fonts";
import { isLocale, SITE_URL } from "@/lib/site";
import "../globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OpenDownload. — Download public video, audio and images",
    template: "%s · OpenDownload",
  },
  description:
    "An open-source media workspace. Paste a public link, choose a real format, save it. No ads, no accounts. English and Arabic.",
  openGraph: {
    siteName: "OpenDownload",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "OpenDownload. Download public video, audio and images.",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg" },
};
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={fontClass}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
