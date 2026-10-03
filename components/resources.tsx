import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ShieldCheck,
  Code2,
  GitPullRequest,
  FileText,
  LockKeyhole,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { APP_URL, REPO_URL, RELEASE_URL, href, text, type Locale } from "@/lib/site";
import { docArticles, posts, postDate, type Article, type Post } from "@/lib/content";
import { JournalCard, PostCover } from "./journal-card";
import { CopyCode, DocsSearch } from "./interactive";

export function ArticleBody({ article, locale }: { article: Article; locale: Locale }) {
  return (
    <div className="prose">
      {article.sections.map((section) => (
        <section id={section.id} key={section.id}>
          <h2>
            <a href={`#${section.id}`}>{section.title}</a>
          </h2>
          {section.paragraphs?.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {section.bullets && (
            <ul>
              {section.bullets.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          )}
          {section.code && <CopyCode code={section.code} locale={locale} />}{" "}
          {section.note && (
            <aside className="callout">
              <BookOpen size={18} aria-hidden="true" />
              <p>{section.note}</p>
            </aside>
          )}
        </section>
      ))}
    </div>
  );
}
export function PageIntro({
  locale,
  kicker,
  title,
  description,
}: {
  locale: Locale;
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-intro">
      <Link className="breadcrumb" href={href(locale)}>
        {text(locale, "Home", "الرئيسية")}
        <span aria-hidden="true">/</span>
        {kicker}
      </Link>
      <span className="eyebrow">{kicker}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
export function DocPage({ locale, slug }: { locale: Locale; slug?: string }) {
  const articles = docArticles(locale);
  const article = articles.find((item) => item.slug === slug);
  const t = (en: string, ar: string) => text(locale, en, ar);
  const index = article ? articles.indexOf(article) : -1;
  return (
    <div className="container docs-shell">
      <aside className="docs-sidebar">
        <Link href={href(locale, "docs")} className="sidebar-title">
          <BookOpen size={19} aria-hidden="true" />
          {t("Documentation", "التوثيق")}
        </Link>
        <DocsSearch
          locale={locale}
          active={slug ?? ""}
          items={articles.map(({ slug, title, description }) => ({ slug, title, description }))}
        />
        <div className="sidebar-note">
          <span className="version-tag">v0.1.0</span>
          <a href={`${REPO_URL}/tree/v0.1.0/docs`}>
            {t("Full repository docs", "توثيق المستودع الكامل")}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </aside>
      <div className="docs-main">
        {article ? (
          <>
            <PageIntro
              locale={locale}
              kicker={article.category}
              title={article.title}
              description={article.description}
            />
            <div className="article-meta">
              <span>OpenDownload 0.1</span>
              <span>{t("Updated Oct 1, 2026", "تحديث 1 أكتوبر 2026")}</span>
            </div>
            <ArticleBody article={article} locale={locale} />
            <div className="article-source">
              <a href={`${REPO_URL}/tree/v0.1.0/docs`}>
                {t("Read the full engineering guides", "اقرأ الأدلة الهندسية الكاملة")}
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            </div>
            <nav
              className="doc-pagination"
              aria-label={t("Previous and next guide", "الدليل السابق والتالي")}
            >
              {index > 0 && (
                <Link href={href(locale, `docs/${articles[index - 1].slug}`)}>
                  <small>{t("Previous", "السابق")}</small>
                  <span>{articles[index - 1].title}</span>
                </Link>
              )}
              {index < articles.length - 1 && (
                <Link href={href(locale, `docs/${articles[index + 1].slug}`)}>
                  <small>{t("Next", "التالي")}</small>
                  <span>
                    {articles[index + 1].title}
                    <ArrowRight size={16} aria-hidden="true" className="directional" />
                  </span>
                </Link>
              )}
            </nav>
          </>
        ) : (
          <>
            <PageIntro
              locale={locale}
              kicker={t("Documentation", "التوثيق")}
              title={t(
                "Use OpenDownload. Run your own instance.",
                "استخدم OpenDownload. وشغّل نسختك."
              )}
              description={t(
                "Get started, run your own instance, or understand how it works.",
                "ابدأ الاستخدام، شغّل نسختك، أو افهم كيف يعمل المشروع."
              )}
            />
            <div className="docs-index">
              {articles.map((item, i) => (
                <Link href={href(locale, `docs/${item.slug}`)} key={item.slug}>
                  <span className="doc-index-number">0{i + 1}</span>
                  <div>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                  <ArrowUpRight size={20} aria-hidden="true" />
                </Link>
              ))}
            </div>
            <aside className="callout">
              <ShieldCheck size={20} aria-hidden="true" />
              <p>
                {t(
                  "YouTube is not supported in v0.1. Only public content you own or have permission to save is in scope.",
                  "YouTube غير مدعوم في 0.1. النطاق يشمل فقط المحتوى العام الذي تملكه أو لديك إذن بحفظه."
                )}
              </p>
            </aside>
          </>
        )}
      </div>
      {article && (
        <aside className="table-of-contents">
          <span>{t("On this page", "في هذه الصفحة")}</span>
          <nav aria-label={t("On this page", "في هذه الصفحة")}>
            {article.sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.title}
              </a>
            ))}
          </nav>
        </aside>
      )}
    </div>
  );
}
export function BlogIndex({ locale }: { locale: Locale }) {
  const t = (en: string, ar: string) => text(locale, en, ar);
  return (
    <div className="container resource-page">
      <PageIntro
        locale={locale}
        kicker={t("The blog", "المدونة")}
        title={t("Updates from OpenDownload.", "أخبار OpenDownload.")}
        description={t(
          "Release notes, design decisions, and a look inside the project.",
          "أخبار الإصدارات، قرارات التصميم، ونظرة من داخل المشروع."
        )}
      />
      <div className="journal-grid blog-grid">
        {posts(locale).map((post) => (
          <JournalCard key={post.slug} post={post} locale={locale} />
        ))}
      </div>
      <div className="blog-bottom">
        <p>
          {t(
            "Follow versioned releases and changes on GitHub.",
            "تابع الإصدارات والتغييرات الموثقة على GitHub."
          )}
        </p>
        <a href={`${REPO_URL}/releases`}>
          {t("Follow the project", "تابع المشروع")}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
export function BlogPost({ locale, article }: { locale: Locale; article: Post }) {
  const t = (en: string, ar: string) => text(locale, en, ar);
  return (
    <article className="blog-article container">
      <Link className="breadcrumb" href={href(locale, "blog")}>
        {t("← All stories", "كل المقالات ←")}
      </Link>
      <div className="article-heading">
        <span className="eyebrow">{article.category}</span>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <div className="article-meta">
          <span>{t("OpenDownload project", "مشروع OpenDownload")}</span>
          <time dateTime={article.publishedAt}>{postDate(article.publishedAt, locale)}</time>
        </div>
      </div>
      <div className="article-cover">
        <PostCover post={article} locale={locale} />
      </div>
      <ArticleBody locale={locale} article={article} />
      <div className="article-source">
        <a href={article.source}>
          {t("Explore the source behind this story", "استكشف المصدر وراء هذا المقال")}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
      <div className="article-bottom">
        <Link href={href(locale, "blog")}>{t("Back to the blog", "العودة للمدونة")}</Link>
        <a className="button primary" href={APP_URL}>
          {t("Try OpenDownload", "جرّب OpenDownload")}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export function resourceArticle(locale: Locale, path: string): Article {
  const t = (en: string, ar: string) => text(locale, en, ar);
  const pages: Record<string, Article> = {
    security: {
      slug: "security",
      category: t("Security", "الأمان"),
      title: t("Clear boundaries. Open engineering.", "حدود واضحة. هندسة مفتوحة."),
      description: t(
        "How the application limits risk, and how to report an issue responsibly.",
        "كيف يحد التطبيق من المخاطر، وكيف تبلغ عن مشكلة بشكل مسؤول."
      ),
      sections: [
        {
          id: "report",
          title: t("Report privately", "أبلغ بشكل خاص"),
          paragraphs: [
            t(
              "Use GitHub's private vulnerability reporting for OpenDownload. Include the affected version, deployment mode, impact and a minimal reproduction. Do not put exploit links, session cookies, credentials or sensitive logs in public issues. There is no response-time guarantee for this volunteer project.",
              "استخدم الإبلاغ الخاص عن الثغرات في GitHub لمشروع OpenDownload. أرفق الإصدار المتأثر ونوع الاستضافة والأثر وخطوات تكرار مختصرة. لا تنشر روابط استغلال أو ملفات جلسة أو بيانات دخول أو سجلات حساسة في Issues العامة. لا يقدم المشروع التطوعي ضمانًا لزمن الاستجابة."
            ),
          ],
        },
        {
          id: "boundary",
          title: t("Guarded public-only networking", "اتصالات محمية للمصادر العامة"),
          paragraphs: [
            t(
              "The supported topology routes extractor requests through a guarded egress proxy. It validates destinations and pins public IPs, rejecting private targets and unsafe DNS answers. The cloud profile checks its required namespaces at startup and refuses to open a public listener if isolation is unavailable.",
              "يوجه الإعداد المدعوم طلبات الاستخراج عبر وكيل خروج محمي. يتحقق من الوجهات ويثبت الاتصال بعناوين IP عامة ويرفض الأهداف الخاصة ونتائج DNS غير الآمنة. يتحقق ملف السحابة من مساحات الأسماء المطلوبة عند التشغيل ويرفض فتح الواجهة العامة إذا لم يتوفر العزل."
            ),
          ],
        },
        {
          id: "limits",
          title: t("Ownership and resource limits", "ملكية الملفات وحدود الموارد"),
          paragraphs: [
            t(
              "Files belong to the browser session that created the job. Same-origin mutations, bounded queues, scratch/output limits and temporary retention limit common abuse paths. The public cloud profile uses one worker, three queued/active jobs, a 128 MiB job limit and 15-minute retention. These limits do not establish arbitrary public-traffic capacity.",
              "ترتبط الملفات بجلسة المتصفح التي أنشأت المهمة. تقلل العمليات من نفس الأصل والطوابير المحدودة وحدود ملفات المعالجة والتخزين المؤقت من مسارات الإساءة الشائعة. تستخدم النسخة السحابية العامة عاملًا واحدًا وثلاث مهام نشطة أو منتظرة وحدًا قدره 128 MiB للمهمة واحتفاظًا لمدة 15 دقيقة. لا تثبت هذه الحدود القدرة على تحمل أي حجم من الزيارات العامة."
            ),
          ],
        },
        {
          id: "support",
          title: t("Support and limitations", "الدعم والحدود"),
          paragraphs: [
            t(
              "The latest 0.1.x patch is the supported release line. Experimental branches are not supported releases. The cloud profile shares a container and filesystem between components; it is not a separate VM per download. No independent audit or security certification is claimed. Read the full threat model before operating a public instance.",
              "أحدث تحديث ضمن 0.1.x هو خط الإصدار المدعوم. الفروع التجريبية ليست إصدارات مدعومة. تشترك مكونات ملف السحابة في حاوية ونظام ملفات؛ ولا توجد آلة افتراضية منفصلة لكل تنزيل. لا ندعي تدقيقًا أمنيًا مستقلًا أو شهادة أمان. اقرأ نموذج التهديد الكامل قبل تشغيل نسخة عامة."
            ),
          ],
        },
      ],
    },
    privacy: {
      slug: "privacy",
      category: t("Privacy", "الخصوصية"),
      title: t("Understand what is stored.", "اعرف ما يُحفظ."),
      description: t(
        "A practical description of this website and the separate download application.",
        "وصف عملي لهذا الموقع وتطبيق التنزيل المنفصل."
      ),
      sections: [
        {
          id: "website",
          title: t("This product website", "موقع المنتج هذا"),
          paragraphs: [
            t(
              "This site serves product pages, documentation and articles. It has no account system, newsletter form or added analytics/tracking scripts. The color-theme preference is stored locally in your browser. Language is represented in the page URL. Vercel processes requests to serve the site and may keep platform access and operational logs under its own policies.",
              "يقدم هذا الموقع صفحات المنتج والتوثيق والمقالات. لا يحتوي على نظام حسابات أو نموذج نشرة بريدية أو سكربتات تتبع وتحليلات مضافة. يُحفظ اختيار المظهر محليًا في متصفحك، وتظهر اللغة في رابط الصفحة. تعالج Vercel الطلبات لتقديم الموقع وقد تحتفظ بسجلات الوصول والتشغيل وفق سياساتها."
            ),
          ],
        },
        {
          id: "app",
          title: t("The download application", "تطبيق التنزيل"),
          paragraphs: [
            t(
              "Opening the app takes you to a separate host. It receives the media URL you submit, retrieves public source metadata and processes the selected file. SQLite stores job information and files are kept temporarily on that host. A browser session cookie identifies ownership; it is not an account. Infrastructure providers and media sources receive network requests necessary for processing.",
              "فتح التطبيق ينقلك إلى مضيف منفصل. يستقبل رابط الوسائط الذي ترسله ويجلب بيانات المصدر العام ويعالج الملف المختار. تحفظ SQLite معلومات المهام، وتُحفظ الملفات مؤقتًا على المضيف. يحدد ملف جلسة المتصفح الملكية؛ ولا يمثل حسابًا. تستقبل خدمات الاستضافة ومصادر الوسائط طلبات الشبكة اللازمة للمعالجة."
            ),
          ],
        },
        {
          id: "retention",
          title: t("Temporary files and deletion", "الملفات المؤقتة والحذف"),
          paragraphs: [
            t(
              "The public app retains downloaded media for 15 minutes and supports deleting a job and its attachments. Save files to your device before expiry. Self-hosted instances can have different settings, backups and logging policies. File expiry is not a claim that all infrastructure logs or backups are erased at the same moment.",
              "تحتفظ النسخة العامة بالوسائط لمدة 15 دقيقة وتتيح حذف المهمة وملفاتها. احفظ الملفات على جهازك قبل انتهاء الصلاحية. قد تختلف الإعدادات والنسخ الاحتياطية وسياسات السجلات في النسخ ذاتية الاستضافة. انتهاء صلاحية الملف لا يعني حذف كل سجلات البنية التحتية أو النسخ الاحتياطية في نفس اللحظة."
            ),
          ],
        },
        {
          id: "choices",
          title: t("Your choices", "اختياراتك"),
          paragraphs: [
            t(
              "Use links you are comfortable sending to the host. Never submit private links, credentials or account cookies. For control over storage and operating policies, run your own instance. Follow the source platform's access restrictions and use content you own or have permission to save.",
              "استخدم روابط تقبل إرسالها إلى المضيف. لا ترسل روابط خاصة أو بيانات دخول أو ملفات جلسة حسابات. للتحكم في التخزين وسياسات التشغيل، شغّل نسختك الخاصة. احترم قيود الوصول للمصدر واستخدم محتوى تملكه أو لديك إذن بحفظه."
            ),
          ],
        },
      ],
    },
    changelog: {
      slug: "changelog",
      category: t("Changelog", "التحديثات"),
      title: t("The project, moving forward.", "المشروع، خطوة للأمام."),
      description: t(
        "A clear record of shipped work. The first release is v0.1.0.",
        "سجل واضح لما نُشر فعلًا. الإصدار الأول هو 0.1.0."
      ),
      sections: [
        {
          id: "social-sources",
          title: t("Current source · October 3, 2026", "أحدث كود · 3 أكتوبر 2026"),
          bullets: [
            t(
              "LinkedIn public videos, Pinterest video and single-image pins, and Threads public page media.",
              "فيديوهات LinkedIn العامة، ودبابيس فيديو Pinterest وصوره المفردة، ووسائط صفحات Threads العامة."
            ),
            t(
              "Short-link resolution, regional Pinterest domains, and original progressive video formats with incomplete codec metadata.",
              "حل الروابط المختصرة ونطاقات Pinterest الإقليمية وصيغ الفيديو الأصلية التي تفتقد بعض معلومات الكودك."
            ),
          ],
          note: t(
            "Requires the current application source. Published v0.1.0 images retain their original scope; the website does not deploy the engine. Samples establish those links, not universal platform availability.",
            "يتطلب أحدث كود للتطبيق. تحتفظ صور 0.1.0 بنطاقها الأصلي؛ لا ينشر الموقع المحرك. تثبت العينات تلك الروابط فقط، وليست ضمانًا لإتاحة كل منصة."
          ),
        },
        {
          id: "v010",
          title: "v0.1.0 · 2026-10-01",
          paragraphs: [
            t(
              "First release. A minimal glass download workspace with English/Arabic, RTL, persistent light/dark themes, public-link analysis and real format selection.",
              "الإصدار الأول. مساحة تنزيل زجاجية مينمال بالإنجليزية والعربية وRTL ومظهر فاتح وداكن مستمر، مع تحليل الروابط العامة واختيار صيغ فعلية."
            ),
          ],
          bullets: [
            t(
              "Source video/audio, MP3 conversion, direct images and available sidecars.",
              "فيديو وصوت المصدر، تحويل MP3، صور مباشرة وملفات مرافقة متاحة."
            ),
            t(
              "Persistent jobs, progress, cancel/retry, expiry, deletion and range downloads.",
              "مهام مستمرة، تقدم، إلغاء وإعادة محاولة، صلاحية وحذف وتنزيل جزئي."
            ),
            t(
              "Guarded egress, owner-scoped files, same-origin operations and bounded cloud limits.",
              "اتصالات خروج محمية، ملفات مرتبطة بصاحب الجلسة، عمليات من نفس الأصل وحدود سحابية."
            ),
            t(
              "Versioned Docker images with provenance/SBOM and uploaded-image runtime checks.",
              "صور Docker بإصدارات وبيانات منشأ وقوائم مكونات واختبارات تشغيل للصور المنشورة."
            ),
          ],
          note: t(
            "YouTube and dedicated social photo galleries remain deferred. Other adapters vary by link and hosting environment.",
            "YouTube ومعارض الصور المتخصصة مؤجلان. تختلف أدوات المصادر الأخرى حسب الرابط والاستضافة."
          ),
        },
        {
          id: "next",
          title: t("What comes next", "ما يأتي بعد ذلك"),
          paragraphs: [
            t(
              "Future work is tracked publicly in GitHub issues and the roadmap. Planned features are not shipped capabilities. Bug fixes and measured reliability improvements come before expanding the supported scope.",
              "يُتابع العمل المستقبلي علنًا في GitHub وخارطة الطريق. الميزات المخطط لها ليست إمكانات منشورة. تأتي إصلاحات الأخطاء والتحسينات القابلة للقياس قبل توسيع النطاق المدعوم."
            ),
          ],
        },
      ],
    },
    community: {
      slug: "community",
      category: t("Community", "المجتمع"),
      title: t("A small project. An open invitation.", "مشروع صغير. دعوة مفتوحة."),
      description: t(
        "Help make public media downloads a little simpler.",
        "ساهم في جعل تنزيل الوسائط العامة أبسط قليلًا."
      ),
      sections: [
        {
          id: "issues",
          title: t("Useful feedback is welcome", "الملاحظات المفيدة مرحب بها"),
          paragraphs: [
            t(
              "Report reproducible bugs, suggest a focused improvement or help clarify a guide. GitHub issues are the public place for project discussions. There is no separate community chat or support SLA at this stage.",
              "أبلغ عن أخطاء قابلة للتكرار، أو اقترح تحسينًا محددًا، أو ساعد في توضيح دليل. GitHub Issues هي مساحة النقاش العامة للمشروع. لا توجد دردشة مجتمع منفصلة أو اتفاقية زمن استجابة في هذه المرحلة."
            ),
          ],
        },
        {
          id: "contribute",
          title: t("Many ways to contribute", "طرق عديدة للمساهمة"),
          bullets: [
            t("Improve a translation or RTL interaction.", "حسّن ترجمة أو تفاعلًا باتجاه RTL."),
            t(
              "Test a permitted public link and share sanitized evidence.",
              "اختبر رابطًا عامًا مسموحًا وشارك أدلة منقحة."
            ),
            t(
              "Fix an accessibility problem or a reproducible bug.",
              "أصلح مشكلة في الإتاحة أو خطأ قابلًا للتكرار."
            ),
            t(
              "Make the docs shorter, clearer or more accurate.",
              "اجعل التوثيق أقصر أو أوضح أو أدق."
            ),
          ],
        },
        {
          id: "kind",
          title: t("Keep it considerate", "حافظ على الاحترام"),
          paragraphs: [
            t(
              "Follow the repository's code of conduct. Keep reports specific, protect other people's privacy and respect content ownership and source access restrictions. Report vulnerabilities privately, rather than posting exploit material in a public discussion.",
              "اتبع مدونة السلوك في المستودع. اجعل البلاغات محددة، واحمِ خصوصية الآخرين واحترم ملكية المحتوى وقيود الوصول للمصدر. أبلغ عن الثغرات بشكل خاص بدل نشر مواد استغلال في النقاش العام."
            ),
          ],
        },
      ],
    },
  };
  return pages[path];
}
export function ResourcePage({ locale, path }: { locale: Locale; path: string }) {
  const article = resourceArticle(locale, path);
  const t = (en: string, ar: string) => text(locale, en, ar);
  const actions =
    path === "security"
      ? [
          {
            icon: LockKeyhole,
            label: t("Report a vulnerability privately", "أبلغ عن ثغرة بشكل خاص"),
            url: `${REPO_URL}/security/advisories/new`,
          },
          {
            icon: ShieldCheck,
            label: t("Read the threat model", "اقرأ نموذج التهديد"),
            url: `${REPO_URL}/blob/v0.1.0/docs/THREAT_MODEL.md`,
          },
        ]
      : path === "community"
        ? [
            {
              icon: MessageCircle,
              label: t("Open an issue", "افتح Issue"),
              url: `${REPO_URL}/issues/new/choose`,
            },
            {
              icon: GitPullRequest,
              label: t("Contribution guide", "دليل المساهمة"),
              url: `${REPO_URL}/blob/main/CONTRIBUTING.md`,
            },
          ]
        : path === "changelog"
          ? [
              { icon: Code2, label: t("Release v0.1.0", "الإصدار 0.1.0"), url: RELEASE_URL },
              {
                icon: FileText,
                label: t("Roadmap", "خارطة الطريق"),
                url: `${REPO_URL}/blob/main/docs/ROADMAP.md`,
              },
            ]
          : [
              {
                icon: FileText,
                label: t("Application security policy", "سياسة أمان التطبيق"),
                url: `${REPO_URL}/blob/main/SECURITY.md`,
              },
              {
                icon: BookOpen,
                label: t("Self-hosting guide", "دليل الاستضافة الذاتية"),
                url: href(locale, "docs/self-hosting"),
              },
            ];
  return (
    <div className="container resource-page narrow">
      <PageIntro
        locale={locale}
        kicker={article.category}
        title={article.title}
        description={article.description}
      />
      <div className="resource-actions">
        {actions.map(({ icon: Icon, label, url }) => (
          <a key={url} href={url}>
            <Icon size={19} aria-hidden="true" />
            {label}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        ))}
      </div>
      <ArticleBody article={article} locale={locale} />
      <div className="article-source">
        <span>{t("Last updated October 1, 2026", "آخر تحديث 1 أكتوبر 2026")}</span>
        {path === "community" && (
          <a href={`${REPO_URL}/blob/main/CODE_OF_CONDUCT.md`}>
            {t("Code of conduct", "مدونة السلوك")}
          </a>
        )}
      </div>
    </div>
  );
}
