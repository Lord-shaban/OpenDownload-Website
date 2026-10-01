import Link from "next/link";
import { ArrowUpRight, ArrowRight, Menu } from "lucide-react";
import { APP_URL, REPO_URL, RELEASE_URL, href, text, type Locale } from "@/lib/site";
import { ThemeToggle } from "./interactive";
import { GitHubIcon } from "./brand-icons";

export function Brand() {
  return (
    <span className="wordmark" dir="ltr">
      OpenDownload<span>.</span>
    </span>
  );
}
export function Action({ locale, secondary = false }: { locale: Locale; secondary?: boolean }) {
  return (
    <a
      className={secondary ? "button secondary" : "button primary"}
      href={secondary ? REPO_URL : APP_URL}
    >
      {secondary ? <GitHubIcon /> : null}
      {text(
        locale,
        secondary ? "View source" : "Open the app",
        secondary ? "المصدر على GitHub" : "افتح التطبيق"
      )}
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}
export function Header({ locale, path }: { locale: Locale; path: string }) {
  const t = (en: string, ar: string) => text(locale, en, ar);
  const nav = [
    { path: "docs", label: t("Docs", "التوثيق") },
    { path: "blog", label: t("Blog", "المدونة") },
    { path: "security", label: t("Security", "الأمان") },
  ];
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href={href(locale)} aria-label={t("OpenDownload home", "OpenDownload الرئيسية")}>
          <Brand />
        </Link>
        <nav className="desktop-nav" aria-label={t("Main navigation", "التنقل الرئيسي")}>
          <Link href={`${href(locale)}#sources`}>{t("Sources", "المصادر")}</Link>
          <Link href={`${href(locale)}#features`}>{t("Product", "المنتج")}</Link>
          {nav.map((item) => (
            <Link
              key={item.path}
              href={href(locale, item.path)}
              aria-current={path.startsWith(item.path) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            href={href(locale === "en" ? "ar" : "en", path)}
            className="locale-link"
            lang={locale === "en" ? "ar" : "en"}
            aria-label={t("Switch to Arabic", "Switch to English")}
          >
            {locale === "en" ? "العربية" : "EN"}
          </Link>
          <ThemeToggle locale={locale} />
          <a className="header-launch" href={APP_URL}>
            {t("Open app", "افتح التطبيق")}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <details className="mobile-menu">
            <summary aria-label={t("Navigation menu", "قائمة التنقل")}>
              <Menu size={21} aria-hidden="true" />
            </summary>
            <nav aria-label={t("Mobile navigation", "تنقل الهاتف")}>
              <Link href={`${href(locale)}#sources`}>{t("Sources", "المصادر")}</Link>
              <Link href={`${href(locale)}#features`}>{t("Product", "المنتج")}</Link>
              {nav.map((item) => (
                <Link key={item.path} href={href(locale, item.path)}>
                  {item.label}
                </Link>
              ))}
              <Link href={href(locale, "community")}>{t("Community", "المجتمع")}</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
export function Footer({ locale }: { locale: Locale }) {
  const t = (en: string, ar: string) => text(locale, en, ar);
  const groups = [
    {
      name: t("Product", "المنتج"),
      links: [
        { label: t("Workspace", "مساحة العمل"), url: APP_URL },
        { label: t("Changelog", "التحديثات"), url: href(locale, "changelog") },
        { label: t("Release v0.1.0", "الإصدار 0.1.0"), url: RELEASE_URL },
      ],
    },
    {
      name: t("Resources", "الموارد"),
      links: [
        { label: t("Documentation", "التوثيق"), url: href(locale, "docs") },
        { label: t("Blog", "المدونة"), url: href(locale, "blog") },
        { label: t("Self-hosting", "الاستضافة الذاتية"), url: href(locale, "docs/self-hosting") },
      ],
    },
    {
      name: t("Project", "المشروع"),
      links: [
        { label: t("Community", "المجتمع"), url: href(locale, "community") },
        { label: t("Security", "الأمان"), url: href(locale, "security") },
        { label: t("Privacy", "الخصوصية"), url: href(locale, "privacy") },
        { label: "GitHub", url: REPO_URL },
      ],
    },
  ];
  return (
    <footer className="site-footer container">
      <div className="footer-top">
        <div className="footer-brand">
          <Link href={href(locale)}>
            <Brand />
          </Link>
          <p>
            {t("Download public video, audio and images.", "تنزيل الفيديو والصوت والصور العامة.")}
          </p>
          <a href={`${REPO_URL}/blob/main/LICENSE`} className="license-pill">
            MIT · {t("Open source", "مفتوح المصدر")}
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
        {groups.map((group) => (
          <div key={group.name}>
            <h2>{group.name}</h2>
            <ul>
              {group.links.map((link) => (
                <li key={link.label}>
                  <a href={link.url}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© 2026 OpenDownload {t("contributors.", "والمساهمون.")}</span>
        <span>{t("MIT licensed · Public release 0.1.0", "بترخيص MIT · الإصدار العام 0.1.0")}</span>
      </div>
      <div className="footer-signature" dir="ltr" aria-hidden="true">
        OpenDownload<span>.</span>
      </div>
    </footer>
  );
}
export function TextLink({ locale, path, label }: { locale: Locale; path: string; label: string }) {
  return (
    <Link className="text-link" href={href(locale, path)}>
      {label}
      <ArrowRight size={16} aria-hidden="true" className="directional" />
    </Link>
  );
}
