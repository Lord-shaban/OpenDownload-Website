"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Check,
  Copy,
  Moon,
  Sun,
  Search,
  ArrowUpRight,
  Film,
  Music2,
  ImageIcon,
  Languages,
} from "lucide-react";
import { href, text, type Locale } from "@/lib/site";

export function ThemeToggle({ locale }: { locale: Locale }) {
  return (
    <button
      className="icon-button theme-toggle"
      aria-label={text(locale, "Switch color theme", "تغيير المظهر")}
      onClick={() => {
        const dark = !document.documentElement.classList.contains("dark");
        document.documentElement.classList.toggle("dark", dark);
        try {
          localStorage.setItem("od_site_theme", dark ? "dark" : "light");
        } catch {
          /* A theme can still work without storage. */
        }
      }}
    >
      <Sun className="sun" size={18} aria-hidden="true" />
      <Moon className="moon" size={18} aria-hidden="true" />
    </button>
  );
}

export function CopyCode({ code, locale }: { code: string; locale: Locale }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );
  async function copy() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(code);
      setState("copied");
      timer.current = setTimeout(() => setState("idle"), 4000);
    } catch {
      setState("failed");
    }
  }
  return (
    <div className="code-block" dir="ltr">
      <div className="code-header">
        <span>Terminal</span>
        <button onClick={copy} aria-label={text(locale, "Copy command", "نسخ الأمر")}>
          {state === "copied" ? (
            <Check size={16} aria-hidden="true" />
          ) : (
            <Copy size={16} aria-hidden="true" />
          )}
          <span>
            {state === "copied" ? text(locale, "Copied", "تم النسخ") : text(locale, "Copy", "نسخ")}
          </span>
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
      <span className="sr-only" role="status">
        {state === "copied"
          ? text(locale, "Command copied", "تم نسخ الأمر")
          : state === "failed"
            ? text(
                locale,
                "Copy unavailable. Select the command manually.",
                "تعذر النسخ. حدد الأمر يدويًا."
              )
            : ""}
      </span>
      {state === "failed" && (
        <p className="copy-error">
          {text(locale, "Select the command to copy it manually.", "حدد الأمر لنسخه يدويًا.")}
        </p>
      )}
    </div>
  );
}

export function Showcase({ locale }: { locale: Locale }) {
  const [view, setView] = useState(0);
  const views = [
    {
      name: text(locale, "Video", "فيديو"),
      icon: Film,
      src: "/images/workspace-video-v2.jpg",
      mobile: "/images/workspace-video-mobile-v2.jpg",
      width: 1065,
      height: 927,
      alt: text(
        locale,
        "Actual OpenDownload workspace with a public Threads video and its available format",
        "واجهة OpenDownload الحقيقية تعرض فيديو Threads عامًا وصيغته المتاحة"
      ),
      caption: text(locale, "A public post. Its actual format.", "منشور عام. وصيغته الفعلية."),
    },
    {
      name: text(locale, "Audio", "صوت"),
      icon: Music2,
      src: "/images/workspace-audio-v2.jpg",
      mobile: "/images/workspace-audio-mobile-v2.jpg",
      width: 1065,
      height: 927,
      alt: text(
        locale,
        "Actual OpenDownload workspace selecting MP3 audio from a public LinkedIn video",
        "واجهة OpenDownload الحقيقية تعرض اختيار MP3 من فيديو LinkedIn عام"
      ),
      caption: text(locale, "Keep the audio. Convert to MP3.", "احفظ الصوت. وحوّله إلى MP3."),
    },
    {
      name: text(locale, "Images", "صور"),
      icon: ImageIcon,
      src: "/images/workspace-images-v2.jpg",
      mobile: "/images/workspace-images-mobile-v2.jpg",
      width: 1065,
      height: 927,
      alt: text(
        locale,
        "Actual OpenDownload workspace selecting an original WebP image from a public project URL",
        "واجهة OpenDownload الحقيقية تعرض اختيار صورة WebP أصلية من رابط عام للمشروع"
      ),
      caption: text(locale, "The original image. The actual file.", "الصورة الأصلية. والملف نفسه."),
    },
    {
      name: text(locale, "Arabic", "العربية"),
      icon: Languages,
      src: "/images/workspace-arabic-v2.jpg",
      mobile: "/images/workspace-arabic-mobile-v2.jpg",
      width: 1065,
      height: 927,
      alt: text(
        locale,
        "Actual Arabic right-to-left OpenDownload workspace in dark mode",
        "مساحة عمل OpenDownload العربية الحقيقية باتجاه RTL والمظهر الداكن"
      ),
      caption: text(locale, "A workspace that speaks your language.", "مساحة عمل تتحدث لغتك."),
    },
  ];
  return (
    <figure className="showcase reveal" id="preview">
      <div className="showcase-tabs">
        <div
          className="preview-switch"
          role="group"
          aria-label={text(locale, "Product workflows", "مسارات الاستخدام")}
        >
          {views.map((item, i) => (
            <button key={item.src} aria-pressed={view === i} onClick={() => setView(i)}>
              <item.icon size={15} aria-hidden="true" />
              {item.name}
            </button>
          ))}
        </div>
        <a
          href={views[view].src}
          target="_blank"
          rel="noopener noreferrer"
          className="screenshot-link"
          aria-label={text(locale, "Open full screenshot", "فتح السكرين كاملة")}
        >
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
      <div className="showcase-image" data-view={view}>
        <picture>
          <source media="(max-width: 600px)" srcSet={views[view].mobile} />
          <Image
            key={views[view].src}
            src={views[view].src}
            alt={views[view].alt}
            width={views[view].width}
            height={views[view].height}
            sizes="(max-width: 800px) 94vw, 1200px"
            unoptimized
          />
        </picture>
      </div>
      <figcaption>
        <div>
          <strong>{views[view].caption}</strong>
          {text(locale, "The live workspace", "مساحة العمل الفعلية")}
        </div>
        <span>OpenDownload · {text(locale, "October 2026", "أكتوبر 2026")}</span>
      </figcaption>
    </figure>
  );
}

export function DocsSearch({
  locale,
  active,
  items,
}: {
  locale: Locale;
  active: string;
  items: { slug: string; title: string; description: string }[];
}) {
  const [query, setQuery] = useState("");
  const matches = items.filter((item) =>
    `${item.title} ${item.description}`
      .toLocaleLowerCase()
      .includes(query.toLocaleLowerCase().trim())
  );
  return (
    <>
      <label className="doc-search">
        <Search size={16} aria-hidden="true" />
        <span className="sr-only">{text(locale, "Search documentation", "بحث في التوثيق")}</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={text(locale, "Find a guide…", "ابحث عن دليل…")}
        />
      </label>
      <nav aria-label={text(locale, "Documentation guides", "أدلة التوثيق")}>
        {matches.map((item) => (
          <a
            key={item.slug}
            href={href(locale, `docs/${item.slug}`)}
            aria-current={active === item.slug ? "page" : undefined}
          >
            {item.title}
          </a>
        ))}
      </nav>
      <span className="sr-only" role="status">
        {query && text(locale, `${matches.length} guides found`, `${matches.length} أدلة متاحة`)}
      </span>
      {matches.length === 0 && (
        <p className="muted">
          {text(
            locale,
            "No guides match. Try another word.",
            "لا توجد أدلة مطابقة. جرّب كلمة أخرى."
          )}
        </p>
      )}
    </>
  );
}
