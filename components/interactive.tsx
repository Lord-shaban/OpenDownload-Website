"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Check, Copy, Moon, Sun, Search, ArrowUpRight } from "lucide-react";
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

export function Motion() {
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
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
      name: text(locale, "Light", "فاتح"),
      src: "/images/workspace-light.jpg",
      width: 1280,
      height: 720,
      alt: text(
        locale,
        "Actual OpenDownload v0.1 light workspace",
        "مساحة عمل OpenDownload 0.1 الحقيقية بالمظهر الفاتح"
      ),
    },
    {
      name: text(locale, "Dark", "داكن"),
      src: "/images/workspace-dark.jpg",
      width: 1239,
      height: 873,
      alt: text(
        locale,
        "Actual dark workspace analyzing an owned sample video",
        "مساحة العمل الحقيقية الداكنة أثناء تحليل فيديو تجريبي مملوك"
      ),
    },
    {
      name: text(locale, "Arabic", "العربية"),
      src: "/images/workspace-arabic.jpg",
      width: 1239,
      height: 873,
      alt: text(
        locale,
        "Actual Arabic right-to-left workspace analyzing the same owned sample",
        "مساحة العمل العربية الحقيقية باتجاه RTL أثناء تحليل نفس العينة المملوكة"
      ),
    },
  ];
  return (
    <figure className="showcase reveal" id="preview">
      <div className="showcase-toolbar">
        <span className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="showcase-address" dir="ltr">
          OpenDownload <span>/ workspace</span>
        </span>
        <a
          href={views[view].src}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={text(locale, "Open full screenshot", "فتح السكرين كاملة")}
        >
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
      <div className="showcase-image" data-view={view}>
        <Image
          key={views[view].src}
          src={views[view].src}
          alt={views[view].alt}
          width={views[view].width}
          height={views[view].height}
          sizes="(max-width: 800px) 94vw, 1000px"
          preload={view === 0}
        />
      </div>
      <figcaption>
        <div
          className="preview-switch"
          role="group"
          aria-label={text(locale, "Screenshot appearance", "مظهر السكرين")}
        >
          {views.map((item, i) => (
            <button key={item.src} aria-pressed={view === i} onClick={() => setView(i)}>
              {item.name}
            </button>
          ))}
        </div>
        <span>{text(locale, "Real interface · v0.1.0", "الواجهة الحقيقية · 0.1.0")}</span>
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
