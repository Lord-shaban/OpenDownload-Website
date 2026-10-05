import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Languages,
  Film,
  Music2,
  ImageIcon,
  Terminal,
  Plus,
  Check,
} from "lucide-react";
import { REPO_URL, href, text, type Locale } from "@/lib/site";
import { Showcase, CopyCode } from "./interactive";
import { Action, TextLink } from "./site-shell";
import { GitHubIcon } from "./brand-icons";
import { SourceExplorer } from "./product-scenes";
import { posts } from "@/lib/content";
import { JournalCard } from "./journal-card";

export function Landing({ locale }: { locale: Locale }) {
  const t = (en: string, ar: string) => text(locale, en, ar);
  const media = [
    {
      image: "video-studio-v2",
      icon: Film,
      label: t("VIDEO", "فيديو"),
      title: t("Keep the whole moment.", "احفظ اللحظة كاملة."),
      body: t(
        "Choose from the video qualities the source actually provides. Keep the original format or an available compatible option.",
        "اختر من جودات الفيديو التي يتيحها المصدر فعلًا. احفظ الصيغة الأصلية أو أحد الخيارات المتوافقة المتاحة."
      ),
      alt: t("A cinema camera and ocean film strips", "كاميرا سينمائية وشرائط فيلم لصور البحر"),
      formats: "MP4 / WEBM",
    },
    {
      image: "audio-studio-v2",
      icon: Music2,
      label: t("AUDIO", "صوت"),
      title: t("Just the sound you need.", "الصوت الذي تحتاجه فقط."),
      body: t(
        "Save an available audio track, or convert it to MP3. For your recordings, talks and music you have permission to keep.",
        "احفظ المسار الصوتي المتاح، أو حوّله إلى MP3. لتسجيلاتك والمحاضرات والموسيقى المسموح لك بحفظها."
      ),
      alt: t(
        "Black headphones, a red record sleeve and an audio recorder",
        "سماعات سوداء وغلاف أسطوانة أحمر ومسجل صوت"
      ),
      formats: "MP3 / M4A",
    },
    {
      image: "photo-studio-v2",
      icon: ImageIcon,
      label: t("IMAGES", "صور"),
      title: t("One image. Or a collection.", "صورة واحدة. أو مجموعة."),
      body: t(
        "Save original single-image Pinterest pins, public direct images, or an image-only Threads collection as a ZIP. No screenshots of your photos.",
        "احفظ صورة Pinterest الأصلية، أو الصور العامة المباشرة، أو مجموعة صور Threads في ملف ZIP. الصورة نفسها، وليس لقطة شاشة منها."
      ),
      alt: t(
        "Photographic prints of red stairs and a green leaf",
        "صورتان مطبوعتان لدرج أحمر وورقة خضراء"
      ),
      formats: "JPG / PNG / ZIP",
    },
  ];
  const steps = [
    {
      title: t("Bring the link.", "أضف الرابط."),
      body: t(
        "Paste a public post or a direct media URL you have permission to download.",
        "ألصق رابط منشور عام أو ملف وسائط لديك إذن بتنزيله."
      ),
    },
    {
      title: t("Make it yours.", "اختر ما تحتاجه."),
      body: t(
        "Pick video, available audio or images. The formats come from the source.",
        "اختر الفيديو أو الصوت المتاح أو الصور. الصيغ تأتي من المصدر نفسه."
      ),
    },
    {
      title: t("Save it locally.", "احفظه على جهازك."),
      body: t(
        "Follow the download, then save the file before its 15-minute expiry on the public app.",
        "تابع التنزيل ثم احفظ الملف قبل انتهاء صلاحيته بعد 15 دقيقة في التطبيق العام."
      ),
    },
  ];
  const faq = [
    [
      t("Is OpenDownload free?", "هل OpenDownload مجاني؟"),
      t(
        "Yes. The source is MIT licensed and the public app does not require an account. Self-hosting has the costs of the host you choose.",
        "نعم. المصدر بترخيص MIT، والتطبيق العام لا يحتاج إلى حساب. للاستضافة الذاتية تكاليف المضيف الذي تختاره."
      ),
    ],
    [
      t("Does it download every public link?", "هل ينزّل كل رابط عام؟"),
      t(
        "No. Availability depends on the source, region and host access. YouTube, private posts, paywalled and DRM-protected media are excluded. Pinterest single images and image-only Threads collections are available in the current source and public app; Instagram photo galleries are not.",
        "لا. يعتمد التوفر على المصدر والمنطقة وإمكانية وصول المضيف. YouTube والمنشورات الخاصة والمحتوى المدفوع والمحمي بـDRM غير متاح. صور Pinterest المفردة ومجموعات صور Threads متاحة في الكود الحالي والتطبيق العام؛ معارض صور Instagram غير متاحة."
      ),
    ],
    [
      t("Where do my files go?", "أين تذهب ملفاتي؟"),
      t(
        "Downloads are temporarily stored on the application host. The public instance deletes them after 15 minutes. Save them to your device before expiry, or delete them earlier from the queue. This website does not process downloads.",
        "تُخزّن التنزيلات مؤقتًا على مضيف التطبيق. تحذفها النسخة العامة بعد 15 دقيقة. احفظها على جهازك قبل انتهاء الصلاحية، أو احذفها مبكرًا من قائمة التنزيلات. هذا الموقع لا يعالج التنزيلات."
      ),
    ],
    [
      t("Can I run my own instance?", "هل يمكنني تشغيل نسختي الخاصة؟"),
      t(
        "Yes. Build from main for the latest source adapters, or use the versioned Docker images for the original v0.1.0 scope. Follow the self-hosting guide and preserve the guarded network boundary.",
        "نعم. ابنِ من main للحصول على أدوات المصادر الجديدة، أو استخدم صور Docker المحددة بالإصدار للنطاق الأصلي لـv0.1.0. اتبع دليل الاستضافة الذاتية وحافظ على حدود الشبكة المحمية."
      ),
    ],
  ];
  return (
    <>
      <section className="hero">
        <div className="hero-art-wrap" aria-hidden="true">
          <Image
            className="hero-art"
            src="/images/media-desk-v2.webp"
            alt=""
            fill
            sizes="100vw"
            preload
          />
        </div>
        <div className="container hero-inner">
          <div className="hero-copy">
            <Link href={href(locale, "blog/linkedin-pinterest-threads")} className="release-badge">
              <span className="badge-dot" />
              <span>LinkedIn · Pinterest · Threads</span>
              <ArrowRight size={15} className="directional" aria-hidden="true" />
            </Link>
            <h1 dir="ltr">
              OpenDownload<span>.</span>
            </h1>
            <h2>{t("Good media.\nWorth keeping.", "محتوى يستحق\nأن يبقى معك.")}</h2>
            <p className="hero-description">
              {t(
                "Your public videos, audio and images. One place to choose a format and save the actual file.",
                "فيديوهاتك وصوتياتك وصورك العامة. مكان واحد لاختيار الصيغة وحفظ الملف نفسه على جهازك."
              )}
            </p>
            <div className="actions">
              <Action locale={locale} />
              <Action locale={locale} secondary />
            </div>
            <p className="hero-footnote">
              <Check size={15} aria-hidden="true" />
              {t("Free. Open source. No account.", "مجاني. مفتوح المصدر. بلا حساب.")}
            </p>
          </div>
        </div>
      </section>
      <div className="trust-band">
        <div className="container trust-strip">
          <span>
            <Film size={17} />
            {t("Video, audio & images", "فيديو وصوت وصور")}
          </span>
          <span>
            <ShieldCheck size={17} />
            {t("Public media only", "وسائط عامة فقط")}
          </span>
          <span>
            <Languages size={17} />
            {t("English & Arabic", "إنجليزية وعربية")}
          </span>
          <span>
            <GitHubIcon size={17} />
            {t("MIT licensed", "بترخيص MIT")}
          </span>
        </div>
      </div>
      <section className="workspace-section section" id="features">
        <div className="container">
          <div className="split-heading">
            <div>
              <span className="eyebrow">{t("THE WORKSPACE", "مساحة العمل")}</span>
              <h2>{t("The link is only the beginning.", "الرابط هو البداية فقط.")}</h2>
            </div>
            <p>
              {t(
                "See the available formats. Choose what you need. Watch the progress, then keep the file.",
                "شاهد الصيغ المتاحة. اختر ما تحتاجه. تابع التقدم، ثم احفظ الملف."
              )}
            </p>
          </div>
          <Showcase locale={locale} />
        </div>
      </section>
      <SourceExplorer locale={locale} />
      <section className="section media-section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">{t("A FILE THAT FITS", "الملف الذي يناسبك")}</span>
            <h2>{t("Not everything needs to be a video.", "ليس كل ما تحتاجه فيديو.")}</h2>
          </div>
          <div className="media-grid">
            {media.map(({ image, icon: Icon, label, title, body, alt, formats }) => (
              <article className="media-item" key={image}>
                <div className="media-photo">
                  <Image
                    src={`/images/${image}.webp`}
                    alt={alt}
                    width={1536}
                    height={1024}
                    sizes="(max-width: 700px) 94vw, (max-width: 1000px) 45vw, 380px"
                  />
                </div>
                <div className="media-label">
                  <span>
                    <Icon size={16} />
                    {label}
                  </span>
                  <span dir="ltr">{formats}</span>
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="steps-section section container">
        <div className="split-heading">
          <div>
            <span className="eyebrow">{t("THREE SMALL STEPS", "ثلاث خطوات بسيطة")}</span>
            <h2>{t("From a link to your library.", "من الرابط إلى مكتبتك.")}</h2>
          </div>
          <TextLink
            locale={locale}
            path="docs/getting-started"
            label={t("Quick start", "دليل البداية")}
          />
        </div>
        <div className="steps-grid">
          {steps.map((step, i) => (
            <article className="step" key={step.title}>
              <span className="step-number">0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="open-section section">
        <div className="container open-layout">
          <div className="open-content">
            <span className="eyebrow">
              <Terminal size={16} />
              {t("OPEN BY DESIGN", "مفتوح من الأساس")}
            </span>
            <h2>{t("Your files.\nYour own instance.", "ملفاتك.\nونسختك الخاصة.")}</h2>
            <p>
              {t(
                "Use the public app today. Or run the same workspace on your own hardware. Read the code, change it, make it better.",
                "استخدم التطبيق العام الآن. أو شغّل مساحة العمل نفسها على جهازك. اقرأ الكود، عدّله، وساهم في تطويره."
              )}
            </p>
            <div className="actions">
              <a className="button primary" href={REPO_URL}>
                <GitHubIcon />
                GitHub
                <ArrowUpRight size={16} />
              </a>
              <TextLink
                locale={locale}
                path="docs/self-hosting"
                label={t("Self-hosting guide", "دليل الاستضافة الذاتية")}
              />
            </div>
            <CopyCode
              code="git clone https://github.com/Lord-shaban/OpenDownload.git"
              locale={locale}
            />
            <span className="open-note">MIT · Next.js · Go · yt-dlp · FFmpeg</span>
          </div>
          <Image
            className="open-photo"
            src="/images/design-desk-v2.webp"
            alt={t(
              "A notebook, color swatches and a pencil on a designer's desk",
              "دفتر تصميم وعينات ألوان وقلم على مكتب"
            )}
            width={1536}
            height={1024}
            sizes="(max-width: 800px) 94vw, 580px"
          />
        </div>
      </section>
      <section className="journal-section section container">
        <div className="split-heading">
          <div>
            <span className="eyebrow">{t("FROM THE JOURNAL", "من المدونة")}</span>
            <h2>{t("A project that keeps moving.", "مشروع يتطور باستمرار.")}</h2>
          </div>
          <TextLink locale={locale} path="blog" label={t("All articles", "كل المقالات")} />
        </div>
        <div className="journal-grid">
          {posts(locale).map((post) => (
            <JournalCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      </section>
      <section className="faq-section section container">
        <div className="split-heading">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2>{t("A few things worth knowing.", "أسئلة تستحق الإجابة.")}</h2>
          </div>
          <TextLink locale={locale} path="docs" label={t("Documentation", "التوثيق")} />
        </div>
        <div className="faq-list">
          {faq.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <Plus size={20} aria-hidden="true" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="final-cta">
        <div className="container cta-layout">
          <div>
            <span className="eyebrow">OpenDownload</span>
            <h2>{t("Found something worth keeping?", "وجدت محتوى يستحق الحفظ؟")}</h2>
            <p>
              {t(
                "Bring a public link you have permission to download.",
                "ابدأ برابط عام لديك إذن بتنزيل محتواه."
              )}
            </p>
          </div>
          <Action locale={locale} />
        </div>
      </section>
    </>
  );
}
