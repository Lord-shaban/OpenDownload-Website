import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  ShieldCheck,
  Languages,
  Film,
  Music2,
  ImageIcon,
  Terminal,
  Plus,
  Check,
  SlidersHorizontal,
} from "lucide-react";
import { REPO_URL, RELEASE_URL, href, text, type Locale } from "@/lib/site";
import { Showcase, CopyCode } from "./interactive";
import { Action, TextLink, Brand } from "./site-shell";
import { GitHubIcon } from "./brand-icons";
import { MediaScene, SourceExplorer } from "./product-scenes";

export function Landing({ locale }: { locale: Locale }) {
  const t = (en: string, ar: string) => text(locale, en, ar);
  const steps = [
    {
      title: t("Paste the public link.", "ألصق الرابط العام."),
      body: t(
        "Use the post itself or a direct media URL.",
        "استخدم رابط المنشور نفسه أو رابط الملف المباشر."
      ),
    },
    {
      title: t("Choose video, audio or image.", "اختر الفيديو أو الصوت أو الصورة."),
      body: t(
        "See the formats the source provides. Convert available audio to MP3.",
        "شاهد صيغ المصدر المتاحة. وحوّل الصوت المتاح إلى MP3."
      ),
    },
    {
      title: t("Download the file.", "نزّل الملف."),
      body: t(
        "Follow progress, then save to your device before the file expires.",
        "تابع التقدم، ثم احفظ على جهازك قبل انتهاء صلاحية الملف."
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
        "No. A platform can restrict its content by region, login or host access. The source selector shows available adapters and tested samples. YouTube and dedicated social photo galleries are not included in v0.1.",
        "لا. قد يقيّد المصدر المحتوى بحسب المنطقة أو تسجيل الدخول أو المضيف. يوضح قسم المصادر أدوات الاستخراج والعينات المختبرة. YouTube ومعارض الصور الاجتماعية المتخصصة ليست ضمن 0.1."
      ),
    ],
    [
      t("Where do my files go?", "أين تذهب ملفاتي؟"),
      t(
        "The app temporarily stores files on its host. The public instance removes them after 15 minutes. Save them to your device before expiry. This website does not process downloads.",
        "يخزن التطبيق الملفات مؤقتًا على مضيفه. تحذفها النسخة العامة بعد 15 دقيقة. احفظها على جهازك قبل انتهاء الصلاحية. هذا الموقع لا يعالج التنزيلات."
      ),
    ],
    [
      t("Can I run my own instance?", "هل يمكنني تشغيل نسختي الخاصة؟"),
      t(
        "Yes. Use the versioned Docker images and self-hosting guide. Keep the guarded network boundary, and configure HTTPS and abuse controls before public exposure.",
        "نعم. استخدم صور Docker المحددة بالإصدار ودليل الاستضافة الذاتية. حافظ على حدود الشبكة المحمية واضبط HTTPS والحد من إساءة الاستخدام قبل الإتاحة للعامة."
      ),
    ],
  ];
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <Link href={href(locale, "changelog")} className="release-badge">
            <span className="badge-dot" />
            <span>OpenDownload 0.1</span>
            <span className="badge-divider" />
            <span>{t("First public release", "الإصدار العام الأول")}</span>
            <ArrowRight size={14} aria-hidden="true" className="directional" />
          </Link>
          <h1>
            {t("From a public link.", "من رابط عام.")}
            <br />
            <span>{t("To your device.", "إلى جهازك.")}</span>
          </h1>
          <p className="hero-description">
            {t(
              "Download videos, audio and images from supported public sources. Choose the available format, follow progress, and keep the file.",
              "نزّل الفيديو والصوت والصور من المصادر العامة المتاحة. اختر الصيغة، تابع التقدم، واحفظ الملف على جهازك."
            )}
          </p>
          <div className="actions">
            <Action locale={locale} />
            <Action locale={locale} secondary />
          </div>
          <p className="hero-footnote">
            <Check size={13} aria-hidden="true" />
            {t("Free · Open source · No account required", "مجاني · مفتوح المصدر · بلا حساب")}
          </p>
          <div className="hero-media-types">
            <span>
              <Film size={16} /> {t("Video", "فيديو")}
            </span>
            <span>
              <Music2 size={16} /> {t("Audio", "صوت")}
            </span>
            <span>
              <ImageIcon size={16} /> {t("Images", "صور")}
            </span>
          </div>
        </div>
        <MediaScene locale={locale} />
      </section>
      <SourceExplorer locale={locale} />
      <section className="workspace-section section" id="features">
        <div className="container">
          <div className="split-heading reveal">
            <div>
              <span className="eyebrow">{t("INSIDE THE APP", "داخل التطبيق")}</span>
              <h2>{t("See the file. Choose the format.", "شاهد الملف. واختر الصيغة.")}</h2>
            </div>
            <a className="text-link" href="#preview">
              {t("Explore the interface", "استعرض الواجهة")}
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
          <p className="workspace-intro">
            {t(
              "An actual look at OpenDownload 0.1. Switch between light, dark and Arabic views.",
              "نظرة فعلية على OpenDownload 0.1. بدّل بين المظهر الفاتح والداكن والواجهة العربية."
            )}
          </p>
          <Showcase locale={locale} />
          <div className="trust-strip">
            <span>
              <GitHubIcon size={17} />
              {t("MIT licensed", "بترخيص MIT")}
            </span>
            <span>
              <ShieldCheck size={17} aria-hidden="true" />
              {t("Public media only", "وسائط عامة فقط")}
            </span>
            <span>
              <Languages size={17} aria-hidden="true" />
              {t("English & Arabic", "إنجليزية وعربية")}
            </span>
            <span>
              <Terminal size={17} aria-hidden="true" />
              {t("Self-hostable", "قابل للاستضافة الذاتية")}
            </span>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading reveal">
          <span className="eyebrow">{t("WHAT YOU CAN DO", "ما يمكنك إنجازه")}</span>
          <h2>{t("One workspace. Different files.", "مساحة واحدة. وملفات مختلفة.")}</h2>
          <p>
            {t(
              "Keep a video, extract its available audio, or save a direct image. The source decides which formats are offered.",
              "احفظ فيديو، أو استخرج صوته المتاح، أو نزّل صورة مباشرة. الصيغ المعروضة هي ما يتيحه المصدر."
            )}
          </p>
        </div>
        <div className="media-bento">
          <article className="bento-video reveal">
            <div className="bento-photo">
              <Image
                src="/images/coast-editorial.png"
                alt={t(
                  "Generated lighthouse photograph used as a media illustration",
                  "صورة منارة مولّدة مستخدمة لتوضيح الوسائط"
                )}
                fill
                sizes="(max-width: 800px) 94vw, 580px"
              />
              <div className="bento-file glass-material">
                <Film size={22} />
                <div>
                  <strong>coast.mp4</strong>
                  <small>{t("Illustrative media preview", "تصوّر لعرض الوسائط")}</small>
                </div>
                <span>MP4</span>
              </div>
            </div>
            <div className="bento-copy">
              <span className="eyebrow">01 / {t("VIDEO", "فيديو")}</span>
              <h3>{t("The format comes from the source.", "الصيغة من المصدر نفسه.")}</h3>
              <p>
                {t(
                  "Review the available video and audio formats before starting. No invented quality options.",
                  "راجع صيغ الفيديو والصوت المتاحة قبل البدء. خيارات الجودة المعروضة متاحة فعلًا."
                )}
              </p>
            </div>
          </article>
          <article className="bento-audio reveal">
            <div className="audio-study">
              <div className="audio-disc">
                <Music2 size={42} />
              </div>
              <div className="format-pills">
                <span>M4A</span>
                <ArrowRight size={18} />
                <span>MP3</span>
              </div>
            </div>
            <div className="bento-copy">
              <span className="eyebrow">02 / {t("AUDIO", "صوت")}</span>
              <h3>{t("Keep just the sound.", "احفظ الصوت وحده.")}</h3>
              <p>
                {t(
                  "Save available audio or convert it to MP3. Useful for tracks, talks and your own recordings.",
                  "احفظ الصوت المتاح أو حوّله إلى MP3. للمقاطع الصوتية والمحاضرات وتسجيلاتك."
                )}
              </p>
            </div>
          </article>
          <article className="bento-controls reveal">
            <div className="control-visual">
              <SlidersHorizontal size={24} />
              <span>{t("Progress · Cancel · Retry", "تقدم · إلغاء · إعادة محاولة")}</span>
              <div className="static-progress">
                <i />
                <Check size={15} />
              </div>
            </div>
            <div className="bento-copy">
              <h3>{t("Know what happens next.", "اعرف الخطوة التالية.")}</h3>
              <p>
                {t(
                  "Follow each job, retry a failed download, and see when temporary files expire.",
                  "تابع كل مهمة، وأعد محاولة التنزيل المتعثر، واعرف موعد انتهاء الملفات المؤقتة."
                )}
              </p>
            </div>
          </article>
          <article className="bento-image reveal">
            <div className="image-study">
              <Image
                src="/images/earthrise-nasa.jpg"
                alt={t(
                  "Earthrise photographed by NASA's Lunar Orbiter 1",
                  "شروق الأرض كما صوّره Lunar Orbiter 1 التابع لـNASA"
                )}
                fill
                sizes="300px"
              />
              <a href="https://science.nasa.gov/resource/earthrise/">
                Earthrise · NASA <ArrowUpRight size={12} />
              </a>
            </div>
            <div className="bento-copy">
              <span className="eyebrow">03 / {t("IMAGES", "صور")}</span>
              <h3>{t("A direct link. The original image.", "رابط مباشر. والصورة الأصلية.")}</h3>
              <p>
                {t(
                  "Save public image URLs. Dedicated social photo-gallery support is planned for a later release.",
                  "احفظ روابط الصور العامة المباشرة. دعم معارض صور المواقع الاجتماعية مخطط لإصدار لاحق."
                )}
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className="steps-section section container">
        <div className="section-heading reveal">
          <span className="eyebrow">{t("HOW IT WORKS", "كيف يعمل")}</span>
          <h2>{t("Three steps to a local file.", "ثلاث خطوات للملف على جهازك.")}</h2>
        </div>
        <div className="steps-grid">
          {steps.map((step, i) => (
            <article className="step reveal" key={step.title}>
              <span className="step-number">0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
        <TextLink
          locale={locale}
          path="docs/getting-started"
          label={t("Read the quick start", "اقرأ دليل البداية")}
        />
      </section>
      <section className="open-section container reveal">
        <div className="open-art">
          <Image src="/images/open-glass.png" alt="" fill sizes="(max-width: 800px) 100vw, 600px" />
        </div>
        <div className="open-content">
          <span className="eyebrow">{t("SOURCE INCLUDED", "المصدر متاح")}</span>
          <h2>
            {t("Download it.", "نزّله.")}
            <br />
            {t("Run it. Improve it.", "شغّله. وطوّره.")}
          </h2>
          <p>
            {t(
              "The app is MIT licensed. Inspect the code, deploy your own Docker instance, or contribute a fix on GitHub.",
              "التطبيق بترخيص MIT. افحص الكود، شغّل نسختك باستخدام Docker، أو ساهم بإصلاح على GitHub."
            )}
          </p>
          <div className="actions">
            <a className="button light" href={REPO_URL}>
              <GitHubIcon />
              GitHub
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <Link className="open-text-link" href={href(locale, "docs/self-hosting")}>
              {t("Self-hosting guide", "دليل الاستضافة الذاتية")}
              <ArrowRight size={16} aria-hidden="true" className="directional" />
            </Link>
          </div>
          <CopyCode
            code="git clone --branch v0.1.0 https://github.com/Lord-shaban/OpenDownload.git"
            locale={locale}
          />
          <span className="open-note">MIT · Next.js · Go · yt-dlp · FFmpeg</span>
        </div>
      </section>
      <section className="journal-section section container">
        <div className="split-heading reveal">
          <div>
            <span className="eyebrow">{t("PROJECT JOURNAL", "مدونة المشروع")}</span>
            <h2>
              {t("Releases, decisions, and what follows.", "الإصدارات والقرارات وما يأتي بعدها.")}
            </h2>
          </div>
          <TextLink locale={locale} path="blog" label={t("All articles", "كل المقالات")} />
        </div>
        <div className="journal-grid">
          <Link className="journal-card reveal" href={href(locale, "blog/introducing-0-1")}>
            <div className="journal-image">
              <Image
                src="/images/open-glass.png"
                alt=""
                width={1536}
                height={1024}
                sizes="(max-width: 800px) 94vw, 550px"
              />
              <span className="image-wordmark" dir="ltr">
                OpenDownload<span>.</span>
                <small>0.1</small>
              </span>
            </div>
            <div className="journal-meta">
              <span>{t("Release notes", "إصدارات")}</span>
              <time dateTime="2026-10-01">{t("Oct 1, 2026", "1 أكتوبر 2026")}</time>
            </div>
            <h3>
              {t(
                "OpenDownload 0.1: downloads, formats and release boundaries.",
                "OpenDownload 0.1: التنزيل والصيغ وحدود الإصدار."
              )}
            </h3>
            <span className="read-story">
              {t("Read article", "اقرأ المقال")}
              <ArrowRight size={16} aria-hidden="true" className="directional" />
            </span>
          </Link>
          <Link className="journal-card reveal" href={href(locale, "blog/a-quieter-workspace")}>
            <div className="journal-image pale">
              <Image
                src="/images/liquid-glass.png"
                alt=""
                width={1672}
                height={941}
                sizes="(max-width: 800px) 94vw, 550px"
              />
              <span className="design-cover">
                {t("Link.", "رابط.")}
                <em>{t("Format. File.", "صيغة. ملف.")}</em>
              </span>
            </div>
            <div className="journal-meta">
              <span>{t("Design notes", "ملاحظات التصميم")}</span>
              <time dateTime="2026-10-01">{t("Oct 1, 2026", "1 أكتوبر 2026")}</time>
            </div>
            <h3>
              {t("Designing the path from a link to a file.", "تصميم الرحلة من الرابط إلى الملف.")}
            </h3>
            <span className="read-story">
              {t("Read article", "اقرأ المقال")}
              <ArrowRight size={16} aria-hidden="true" className="directional" />
            </span>
          </Link>
        </div>
      </section>
      <section className="faq-section section container">
        <div className="section-heading reveal">
          <span className="eyebrow">FAQ</span>
          <h2>{t("Before your first download.", "قبل أول تنزيل.")}</h2>
        </div>
        <div className="faq-list reveal">
          {faq.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <Plus size={20} aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
        <TextLink locale={locale} path="docs" label={t("Open the documentation", "افتح التوثيق")} />
      </section>
      <section className="final-cta container reveal">
        <div className="cta-art">
          <Image src="/images/liquid-glass.png" alt="" fill sizes="100vw" />
        </div>
        <div className="cta-content glass-material">
          <Brand />
          <h2>{t("Your next download starts here.", "ابدأ تنزيلك التالي من هنا.")}</h2>
          <p>
            {t(
              "Open the app and paste a public link you have permission to download.",
              "افتح التطبيق وألصق رابطًا عامًا لديك إذن بتنزيل محتواه."
            )}
          </p>
          <Action locale={locale} />
          <a className="release-text" href={RELEASE_URL}>
            {t("What's included in v0.1", "ما يتضمنه الإصدار 0.1")}
          </a>
        </div>
      </section>
    </>
  );
}
