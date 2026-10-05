"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { href, text, type Locale } from "@/lib/site";
import { SourceIcon, type SourceId } from "./brand-icons";

const sources: {
  id: SourceId;
  name: string;
  en: string;
  ar: string;
  tested: boolean;
  current?: boolean;
}[] = [
  {
    id: "tiktok",
    name: "TikTok",
    en: "Public video posts. A real sample was downloaded on v0.1; availability varies by link and region.",
    ar: "منشورات الفيديو العامة. تم تنزيل عينة فعلية على 0.1؛ التوفر يختلف حسب الرابط والمنطقة.",
    tested: true,
  },
  {
    id: "instagram",
    name: "Instagram",
    en: "Public video posts and reels through the available extractor. Login restrictions can prevent downloads. Dedicated photo galleries are not included.",
    ar: "منشورات الفيديو وReels العامة عبر أداة الاستخراج المتاحة. قيود تسجيل الدخول قد تمنع التنزيل. معارض الصور المتخصصة ليست ضمن الإصدار.",
    tested: false,
  },
  {
    id: "x",
    name: "X / Twitter",
    en: "Public posts containing media. Source restrictions can vary; this release does not guarantee every post.",
    ar: "المنشورات العامة التي تحتوي على وسائط. تختلف قيود المصدر؛ لا يضمن الإصدار تنزيل كل منشور.",
    tested: false,
  },
  {
    id: "facebook",
    name: "Facebook",
    en: "Public video links through the available extractor. Private posts and content requiring login are excluded.",
    ar: "روابط الفيديو العامة عبر أداة الاستخراج المتاحة. المنشورات الخاصة والمحتوى الذي يتطلب تسجيل الدخول غير متاحين.",
    tested: false,
  },
  {
    id: "reddit",
    name: "Reddit",
    en: "Public media posts. Available video and audio depend on the source formats and host access.",
    ar: "منشورات الوسائط العامة. يعتمد الفيديو والصوت المتاحان على صيغ المصدر وإمكانية وصول المضيف.",
    tested: false,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    en: "Public video posts and activity links, including lnkd.in redirects. Learning courses, private posts and sign-in-only videos are excluded. Build from current source for this addition.",
    ar: "منشورات الفيديو العامة وروابط النشاط، بما فيها اختصارات lnkd.in. دورات Learning والمنشورات الخاصة والفيديوهات التي تتطلب تسجيل الدخول غير متاحة. شغّل أحدث كود للاستفادة من الإضافة.",
    tested: true,
    current: true,
  },
  {
    id: "pinterest",
    name: "Pinterest",
    en: "Public video pins and original single-image pins, including pin.it links and regional Pinterest domains. Full boards and story galleries are excluded. Build from current source for this addition.",
    ar: "دبابيس الفيديو العامة ودبابيس الصور المفردة الأصلية، بما فيها روابط pin.it ونطاقات Pinterest الإقليمية. اللوحات الكاملة ومعارض القصص غير متاحة. شغّل أحدث كود للاستفادة من الإضافة.",
    tested: true,
    current: true,
  },
  {
    id: "threads",
    name: "Threads",
    en: "Public posts on threads.com and threads.net with media exposed in page data. Single videos, images and image-only collections up to 20 items. Login-gated posts and mixed/video carousels are excluded. Build from current source for this addition.",
    ar: "المنشورات العامة على threads.com وthreads.net التي تتيح بيانات الوسائط في الصفحة. فيديو مفرد وصور ومجموعات صور فقط حتى 20 صورة. المنشورات التي تتطلب تسجيل الدخول والمجموعات المختلطة أو متعددة الفيديوهات غير متاحة. شغّل أحدث كود للاستفادة من الإضافة.",
    tested: true,
    current: true,
  },
  {
    id: "vimeo",
    name: "Vimeo",
    en: "Public, unrestricted videos. Private, paid and DRM-protected content are excluded.",
    ar: "الفيديوهات العامة غير المقيّدة. المحتوى الخاص والمدفوع والمحمي بـDRM غير متاح.",
    tested: false,
  },
  {
    id: "soundcloud",
    name: "SoundCloud",
    en: "Public audio tracks. A NASA sample was downloaded on v0.1; source and regional restrictions still apply.",
    ar: "المقاطع الصوتية العامة. تم تنزيل عينة من NASA على 0.1؛ تظل قيود المصدر والمنطقة قائمة.",
    tested: true,
  },
  {
    id: "direct",
    name: "Direct links",
    en: "Direct public video, audio and image URLs. Owned samples were tested, including MP3 conversion and image saving.",
    ar: "روابط عامة مباشرة للفيديو والصوت والصور. اختُبرت عينات مملوكة، بما فيها تحويل MP3 وحفظ الصور.",
    tested: true,
  },
];

export function SourceExplorer({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState<SourceId>("tiktok");
  const source = sources.find((item) => item.id === selected)!;
  const t = (en: string, ar: string) => text(locale, en, ar);
  return (
    <section className="sources-section container" id="sources">
      <div className="split-heading reveal">
        <div>
          <span className="eyebrow">{t("AVAILABLE SOURCES", "المصادر المتاحة")}</span>
          <h2>
            {t("Your media lives everywhere.", "المحتوى في أماكن كثيرة.")}
            <br />
            <span className="muted">{t("Start with its link.", "ابدأ برابطه.")}</span>
          </h2>
        </div>
        <p className="sources-intro">
          {t(
            "LinkedIn, Pinterest and Threads join the source guide. Public content only; new adapters require the latest application source.",
            "LinkedIn وPinterest وThreads تنضم إلى دليل المصادر. للمحتوى العام فقط؛ الأدوات الجديدة تحتاج أحدث كود للتطبيق."
          )}
        </p>
      </div>
      <div
        className="source-grid"
        role="group"
        aria-label={t("Choose a media source", "اختر مصدر الوسائط")}
      >
        {sources.map((item) => (
          <button
            key={item.id}
            className={`source-card source-${item.id}`}
            aria-pressed={selected === item.id}
            aria-controls="source-detail"
            onClick={() => setSelected(item.id)}
          >
            <span className="source-logo">
              <SourceIcon id={item.id} size={26} />
            </span>
            <span className="source-card-copy">
              <strong>
                {item.id === "direct" ? t("Direct links", "روابط مباشرة") : item.name}
              </strong>
              <span className="source-content-type">
                {item.id === "soundcloud"
                  ? t("Public audio", "صوت عام")
                  : item.id === "pinterest" || item.id === "threads"
                    ? t("Video & images", "فيديو وصور")
                    : item.id === "direct"
                      ? t("Video, audio & images", "فيديو وصوت وصور")
                      : t("Public video", "فيديو عام")}
              </span>
              <small>
                <i className={item.tested ? "tested-dot" : "conditional-dot"} />
                {item.tested
                  ? t("Sample tested", "عينة مختبرة")
                  : t("Link dependent", "حسب الرابط")}
              </small>
            </span>
            <span className="source-card-indicator" aria-hidden="true">
              {selected === item.id ? (
                <Check size={16} />
              ) : (
                <ArrowRight size={16} className="directional" />
              )}
            </span>
          </button>
        ))}
      </div>
      <div className="source-detail" id="source-detail" aria-live="polite" aria-atomic="true">
        <div className="source-detail-inner" key={selected}>
          <div className="source-detail-title">
            <SourceIcon id={source.id} size={23} />
            <strong>
              {source.id === "direct" ? t("Direct links", "روابط مباشرة") : source.name}
            </strong>
            <span className={source.tested ? "source-status tested" : "source-status"}>
              {source.tested
                ? source.current
                  ? t("Current source tested", "اختُبر الكود الجديد")
                  : t("Sample tested on v0.1", "عينة مختبرة على 0.1")
                : t("Adapter available", "أداة استخراج متاحة")}
            </span>
          </div>
          <p>{t(source.en, source.ar)}</p>
          <Link className="text-link" href={href(locale, "docs/capabilities")}>
            {t("Full capability guide", "دليل الإمكانات الكامل")}
            <ArrowRight size={15} className="directional" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <p className="source-disclaimer">
        {t(
          "YouTube is not available in v0.1. Platform logos identify sources; no affiliation is implied.",
          "YouTube غير متاح في 0.1. الشعارات للتعريف بالمصادر، ولا تعني وجود شراكة."
        )}
      </p>
    </section>
  );
}
