import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/site-shell";
import { Landing } from "@/components/landing";
import {
  DocPage,
  BlogIndex,
  BlogPost,
  ResourcePage,
  resourceArticle,
} from "@/components/resources";
import { docArticles, posts } from "@/lib/content";
import { isLocale, locales, routes, href, text, SITE_URL } from "@/lib/site";
type Params = Promise<{ locale: string; slug?: string[] }>;
// Known content is prerendered; unknown paths reach the explicit notFound guard.
export const dynamicParams = true;
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    routes.map((path) => ({ locale, slug: path ? path.split("/") : [] }))
  );
}
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const path = slug?.join("/") ?? "";
  const t = (en: string, ar: string) => text(locale, en, ar);
  const article = path.startsWith("docs/")
    ? docArticles(locale).find((item) => item.slug === slug?.[1])
    : path.startsWith("blog/")
      ? posts(locale).find((item) => item.slug === slug?.[1])
      : ["security", "privacy", "changelog", "community"].includes(path)
        ? resourceArticle(locale, path)
        : undefined;
  const title =
    article?.title ??
    (path === "docs"
      ? t("Documentation", "التوثيق")
      : path === "blog"
        ? t("Building in the open", "نبني في العلن")
        : t("Download public video, audio and images", "تنزيل الفيديو والصوت والصور العامة"));
  const description =
    article?.description ??
    t(
      "A free, open-source media workspace. Paste a public link, choose a real format, save it. No ads or accounts. YouTube is excluded from v0.1.",
      "مساحة وسائط مجانية ومفتوحة المصدر. ألصق رابطًا عامًا واختر صيغة فعلية واحفظه. بلا إعلانات أو حسابات. YouTube غير مدعوم في 0.1."
    );
  const post = path.startsWith("blog/")
    ? posts(locale).find((item) => item.slug === slug?.[1])
    : undefined;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: href(locale, path),
      languages: { en: href("en", path), ar: href("ar", path), "x-default": href("en", path) },
    },
    openGraph: {
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "OpenDownload. Public video, audio and images.",
        },
      ],
      title: `${title} · OpenDownload`,
      description,
      url: href(locale, path),
      locale: locale === "ar" ? "ar" : "en_US",
      ...(post
        ? {
            type: "article" as const,
            publishedTime: `${post.publishedAt}T00:00:00Z`,
            authors: ["OpenDownload project"],
          }
        : { type: "website" as const }),
    },
    twitter: {
      card: "summary_large_image",
      images: [`${SITE_URL}/opengraph-image`],
      title: `${title} · OpenDownload`,
      description,
    },
  };
}
export default async function Page({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const path = slug?.join("/") ?? "";
  if (!routes.includes(path)) notFound();
  let content: React.ReactNode;
  if (!path) content = <Landing locale={locale} />;
  else if (path === "docs" || path.startsWith("docs/"))
    content = <DocPage locale={locale} slug={slug?.[1]} />;
  else if (path === "blog") content = <BlogIndex locale={locale} />;
  else if (path.startsWith("blog/")) {
    const article = posts(locale).find((item) => item.slug === slug?.[1]);
    if (!article) notFound();
    content = <BlogPost locale={locale} article={article} />;
  } else content = <ResourcePage locale={locale} path={path} />;
  return (
    <>
      <a className="skip-link" href="#main">
        {text(locale, "Skip to content", "انتقل إلى المحتوى")}
      </a>
      <Header locale={locale} path={path} />
      <main id="main">{content}</main>
      <Footer locale={locale} />
    </>
  );
}
