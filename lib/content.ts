import { text, type Locale } from "./site";

export type Section = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  code?: string;
  note?: string;
};
export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  sections: Section[];
};
export type Post = Article & {
  publishedAt: string;
  cover: "release" | "design" | "sources";
  source: string;
};
export function postDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
const install = `git clone --branch v0.1.0 https://github.com/Lord-shaban/OpenDownload.git
cd OpenDownload
cp .env.example .env
docker compose -f compose.yaml -f compose.release.yaml pull
docker compose -f compose.yaml -f compose.release.yaml up --no-build -d --wait`;
export function docArticles(l: Locale): Article[] {
  const t = (en: string, ar: string) => text(l, en, ar);
  return [
    {
      slug: "getting-started",
      category: t("Start here", "ابدأ هنا"),
      title: t("Your first download", "أول تنزيل لك"),
      description: t(
        "A link, a format, a file. Here is the whole flow.",
        "رابط، صيغة، ملف. هذه هي الرحلة كاملة."
      ),
      sections: [
        {
          id: "open",
          title: t("01. Open the workspace", "01. افتح مساحة العمل"),
          paragraphs: [
            t(
              "Open the public app. No account is required. You can switch language or theme in the header. The free host may need a moment to wake up.",
              "افتح التطبيق العام. لا تحتاج إلى حساب. يمكنك تغيير اللغة والمظهر من الشريط العلوي. قد تحتاج الاستضافة المجانية إلى قليل من الوقت للاستيقاظ."
            ),
          ],
        },
        {
          id: "link",
          title: t("02. Paste a public link", "02. ألصق رابطًا عامًا"),
          paragraphs: [
            t(
              "Use the post itself or a direct media URL, for content you own or have permission to save. Paste to analyze, or type a link and press Enter. YouTube is excluded from v0.1.",
              "استخدم رابط المنشور نفسه أو رابط الوسائط المباشر، لمحتوى تملكه أو لديك إذن بحفظه. ألصق الرابط لتحليله، أو اكتبه واضغط Enter. YouTube غير مدعوم في الإصدار 0.1."
            ),
          ],
        },
        {
          id: "format",
          title: t("03. Choose what is available", "03. اختر مما هو متاح"),
          paragraphs: [
            t(
              "The app offers formats actually returned for that link. Choose source video or audio, MP3 conversion, and available images or sidecars. Quality and file type vary by source.",
              "يعرض التطبيق الصيغ التي أعادها المصدر بالفعل لهذا الرابط. اختر الفيديو أو الصوت أو التحويل إلى MP3، والصور أو الملفات المرافقة عند توفرها. الجودة ونوع الملف يختلفان حسب المصدر."
            ),
          ],
        },
        {
          id: "save",
          title: t("04. Process and save", "04. عالج واحفظ"),
          paragraphs: [
            t(
              "Start processing, follow progress in Downloads, then save the completed file to your device. You can cancel, retry a failed job or delete a file. Files on the public instance expire after 15 minutes.",
              "ابدأ المعالجة، وتابع التقدم في التنزيلات، ثم احفظ الملف المكتمل على جهازك. يمكنك الإلغاء أو إعادة محاولة مهمة فاشلة أو حذف ملف. تنتهي صلاحية الملفات على النسخة العامة بعد 15 دقيقة."
            ),
          ],
          note: t(
            "Save before expiry. A browser session identifies your jobs; losing it can make those jobs inaccessible.",
            "احفظ قبل انتهاء الصلاحية. جلسة المتصفح تحدد مهامك؛ فقدانها قد يمنع الوصول إليها."
          ),
        },
      ],
    },
    {
      slug: "self-hosting",
      category: t("Run it yourself", "استضفه بنفسك"),
      title: t("Self-host with Docker", "الاستضافة الذاتية بـDocker"),
      description: t(
        "Deploy the app with versioned images and your own storage.",
        "شغّل التطبيق بصور محددة بالإصدار وتخزينك الخاص."
      ),
      sections: [
        {
          id: "requirements",
          title: t("Before you start", "قبل البداية"),
          paragraphs: [
            t(
              "Use a current Docker Engine with Compose on a supported Linux host. Keep data volumes backed up, allow outbound public media traffic, and leave storage headroom. The default web listener is local to the host.",
              "استخدم Docker Engine حديثًا مع Compose على مضيف Linux مدعوم. احتفظ بنسخ احتياطية للبيانات، واسمح باتصالات الوسائط العامة الصادرة، واترك مساحة تخزين كافية. واجهة الويب الافتراضية متاحة محليًا على المضيف."
            ),
          ],
        },
        {
          id: "install",
          title: t("Install the release", "ثبّت الإصدار"),
          code: install,
          paragraphs: [
            t(
              "Open http://localhost:3000. The versioned override pulls the released API, web and egress images; --no-build uses those images. Keep the .env file and volumes outside version control.",
              "افتح http://localhost:3000. ملف الإصدار يجلب صور API والويب ووكيل الاتصال؛ الخيار --no-build يستخدم تلك الصور. احتفظ بملف .env ومجلدات البيانات خارج Git."
            ),
          ],
        },
        {
          id: "network",
          title: t("Keep the network boundary", "حافظ على حدود الشبكة"),
          paragraphs: [
            t(
              "The API and extractor share an internal network. Public traffic leaves through the guarded egress proxy. Do not expose the API directly or remove this boundary. Public ingress needs HTTPS, exact origin configuration and abuse controls.",
              "تعمل API وأداة الاستخراج على شبكة داخلية. تمر الاتصالات العامة عبر وكيل خروج محمي. لا تكشف API مباشرة ولا تزل هذه الحدود. الإتاحة العامة تحتاج إلى HTTPS وضبط أصل الطلبات وإجراءات للحد من إساءة الاستخدام."
            ),
          ],
        },
        {
          id: "cloud",
          title: t("Cloud profile", "ملف الاستضافة السحابية"),
          paragraphs: [
            t(
              "The separate single-container cloud image requires nested unprivileged Linux namespaces and persistent /data. Startup refuses incompatible runtimes. Vercel hosts this product website; the download engine runs separately and cannot be deployed as a static site.",
              "صورة السحابة المنفصلة تحتاج إلى Linux يدعم مساحات أسماء داخلية دون صلاحيات مرتفعة وتخزين دائم في /data. يرفض التشغيل البيئات غير المتوافقة. تستضيف Vercel موقع المنتج هذا؛ محرك التنزيل يعمل منفصلًا ولا يعمل كموقع ثابت."
            ),
          ],
          note: t(
            "Read the repository's full self-hosting and fenced-cloud guides before exposing an instance.",
            "اقرأ أدلة الاستضافة الذاتية والعزل السحابي الكاملة في المستودع قبل إتاحة نسختك للعامة."
          ),
        },
      ],
    },
    {
      slug: "capabilities",
      category: t("Understand the scope", "تعرّف على النطاق"),
      title: t("Sources & formats", "المصادر والصيغ"),
      description: t(
        "Clear about what works. Honest about what varies.",
        "وضوح فيما يعمل، وصدق فيما يتغير."
      ),
      sections: [
        {
          id: "sources",
          title: t("Available source adapters", "أدوات المصادر المتاحة"),
          paragraphs: [
            t(
              "The app lists Instagram, TikTok, X / Twitter, Facebook, Reddit, Vimeo and SoundCloud, plus public direct media links. Current application source adds LinkedIn, Pinterest and Threads. Build from source for the additions; the published v0.1.0 images retain their original scope. Availability depends on the post, region, upstream changes and hosting access.",
              "يعرض التطبيق Instagram وTikTok وX / Twitter وFacebook وReddit وVimeo وSoundCloud والروابط المباشرة. يضيف أحدث كود للتطبيق LinkedIn وPinterest وThreads. شغّل نسخة مبنية من الكود لهذه الإضافات؛ صور 0.1.0 المنشورة تحتفظ بنطاقها الأصلي. يعتمد التوفر على المنشور والمنطقة وتغييرات المصدر وإمكانية الوصول من الاستضافة."
            ),
          ],
        },
        {
          id: "new-sources",
          title: t("LinkedIn, Pinterest and Threads", "LinkedIn وPinterest وThreads"),
          bullets: [
            t(
              "LinkedIn: public video posts and activity links, including lnkd.in redirects. Learning courses and authenticated content are excluded.",
              "LinkedIn: منشورات الفيديو العامة وروابط النشاط، بما فيها اختصارات lnkd.in. دورات Learning والمحتوى الذي يتطلب حسابًا غير متاحة."
            ),
            t(
              "Pinterest: public video pins and original single-image pins, including pin.it and regional domains. Boards and story galleries are excluded.",
              "Pinterest: دبابيس الفيديو العامة والصور المفردة الأصلية، بما فيها pin.it والنطاقات الإقليمية. اللوحات ومعارض القصص غير متاحة."
            ),
            t(
              "Threads: public post links on threads.com or threads.net with media in page JSON. Single videos, images and image-only collections up to 20 items. Login walls and mixed/video carousels are unsupported.",
              "Threads: روابط منشورات عامة على threads.com أو threads.net تتيح الوسائط في بيانات الصفحة. فيديو مفرد وصور ومجموعات صور فقط حتى 20 صورة. صفحات تسجيل الدخول والمجموعات المختلطة أو متعددة الفيديوهات غير مدعومة."
            ),
          ],
          note: t(
            "Public video samples downloaded from all three sources on the current application code. LinkedIn MP3 conversion, a Pinterest original image and a Threads four-image ZIP also passed real file, range and deletion checks. The source guide does not certify platform uptime or a deployed application version.",
            "نُزّلت عينات فيديو عامة من المصادر الثلاثة على كود التطبيق الجديد. نجحت أيضًا اختبارات تحويل LinkedIn إلى MP3 وصورة Pinterest الأصلية وملف ZIP من أربع صور على Threads، مع التحقق من الملفات والتنزيل الجزئي والحذف. دليل المصادر لا يضمن إتاحة المنصة أو نسخة التطبيق المنشورة."
          ),
        },
        {
          id: "verified",
          title: t("Real download evidence", "أدلة تنزيل فعلية"),
          bullets: [
            t(
              "TikTok: the submitted public sample completed a 2,178,061-byte video download on v0.1.0.",
              "TikTok: اكتمل تنزيل العينة العامة المقدمة كفيديو بحجم 2,178,061 بايت على 0.1.0."
            ),
            t(
              "SoundCloud: a public NASA audio sample was downloaded on the cloud instance.",
              "SoundCloud: نُزّلت عينة صوتية عامة من NASA على النسخة السحابية."
            ),
            t(
              "Direct media: owned video, images, MP3 conversion, ranges and deletion have actual checks.",
              "الوسائط المباشرة: اختُبرت فعليًا ملفات فيديو وصور مملوكة، وتحويل MP3 والتنزيل الجزئي والحذف."
            ),
          ],
        },
        {
          id: "formats",
          title: t("Let the source decide", "المصدر يحدد المتاح"),
          paragraphs: [
            t(
              "MP4 is offered when codecs are compatible; WebM or MKV can appear too. Audio, thumbnails and subtitles appear only when available. Direct images and bounded image collections returned by an extractor are supported. Dedicated Instagram/TikTok photo-gallery extraction remains deferred.",
              "تُعرض MP4 عندما تتوافق برامج الترميز؛ وقد تظهر WebM أو MKV. يظهر الصوت والصور المصغرة والترجمات عند توفرها فقط. تُدعم الصور المباشرة والمجموعات المحدودة التي تعيدها أداة الاستخراج. دعم معارض صور Instagram وTikTok المتخصص مؤجل."
            ),
          ],
        },
        {
          id: "excluded",
          title: t("Outside v0.1", "خارج الإصدار 0.1"),
          bullets: [
            t("YouTube downloads.", "تنزيلات YouTube."),
            t(
              "Private, paid, authenticated or DRM-protected media.",
              "الوسائط الخاصة أو المدفوعة أو المحمية بتسجيل دخول أو DRM."
            ),
            t(
              "Live streams, full playlists, bulk downloads and watermark removal.",
              "البث المباشر وقوائم التشغيل الكاملة والتنزيل الجماعي وإزالة العلامات المائية."
            ),
          ],
        },
      ],
    },
    {
      slug: "troubleshooting",
      category: t("Need a hand?", "تحتاج مساعدة؟"),
      title: t("When a link does not work", "عندما لا يعمل الرابط"),
      description: t(
        "A few useful checks before you try again.",
        "خطوات مفيدة قبل المحاولة مرة أخرى."
      ),
      sections: [
        {
          id: "public",
          title: t("No public media found", "لم يُعثر على وسائط عامة"),
          paragraphs: [
            t(
              "Try the individual post URL instead of a profile or search page. Check that it opens publicly without signing in. A source may refuse the cloud host or require verification; the app does not bypass these restrictions.",
              "جرّب رابط المنشور نفسه بدل صفحة الحساب أو البحث. تأكد أنه يفتح للعامة دون تسجيل دخول. قد يرفض المصدر المضيف السحابي أو يطلب تحققًا؛ التطبيق لا يتجاوز هذه القيود."
            ),
          ],
        },
        {
          id: "busy",
          title: t("Queue full or host waking", "الطابور ممتلئ أو المضيف يستيقظ"),
          paragraphs: [
            t(
              "The public instance shares one worker and three queued/active jobs. Wait for capacity and retry. A sleeping free host can take a moment to start. Repeated submissions do not make a busy source faster.",
              "تشترك النسخة العامة في عامل معالجة واحد وثلاث مهام نشطة أو منتظرة. انتظر توفر السعة وحاول مجددًا. قد تحتاج الاستضافة المجانية النائمة إلى وقت للتشغيل. إرسال الطلب مرارًا لا يسرّع المصدر المشغول."
            ),
          ],
        },
        {
          id: "expired",
          title: t("File expired or missing", "ملف منتهي الصلاحية أو مفقود"),
          paragraphs: [
            t(
              "Public files expire after 15 minutes. Download again if the source is still available. Deleted jobs stop serving their files. Your browser session owns your jobs; another session cannot retrieve them.",
              "تنتهي صلاحية الملفات العامة بعد 15 دقيقة. أعد التنزيل إذا كان المصدر لا يزال متاحًا. تتوقف المهام المحذوفة عن تقديم ملفاتها. جلسة المتصفح تملك مهامك؛ لا تستطيع جلسة أخرى استرجاعها."
            ),
          ],
        },
        {
          id: "report",
          title: t("Report a reproducible problem", "أبلغ عن مشكلة قابلة للتكرار"),
          paragraphs: [
            t(
              "Use a GitHub bug report with the version, deployment mode, public source URL if safe to share, expected result and sanitized error. Never attach session cookies, credentials or private links. Use private reporting for security issues.",
              "استخدم بلاغ GitHub مع الإصدار ونوع الاستضافة والرابط العام إذا كان آمنًا مشاركته والنتيجة المتوقعة والخطأ بعد تنقيحه. لا ترفق ملفات جلسة أو بيانات دخول أو روابط خاصة. استخدم الإبلاغ الخاص للمشكلات الأمنية."
            ),
          ],
        },
      ],
    },
    {
      slug: "contributing",
      category: t("Build together", "نبني معًا"),
      title: t("Contribute to OpenDownload", "ساهم في OpenDownload"),
      description: t(
        "Small, thoughtful improvements are welcome.",
        "التحسينات الصغيرة والمدروسة مرحب بها."
      ),
      sections: [
        {
          id: "choose",
          title: t("Pick a useful change", "اختر تحسينًا مفيدًا"),
          paragraphs: [
            t(
              "Start with a reproducible issue, a documentation correction or a localization improvement. Discuss larger changes in an issue before implementation. YouTube and dedicated galleries remain deferred beyond the first release.",
              "ابدأ بمشكلة قابلة للتكرار أو تصحيح للتوثيق أو تحسين للترجمة. ناقش التغييرات الأكبر في Issue قبل تنفيذها. يظل YouTube ودعم المعارض المتخصص مؤجلين إلى ما بعد الإصدار الأول."
            ),
          ],
        },
        {
          id: "workflow",
          title: t("Open a focused pull request", "افتح Pull Request محددًا"),
          bullets: [
            t(
              "Work on a separate branch and explain the problem and approach.",
              "اعمل على فرع منفصل واشرح المشكلة وطريقة الحل."
            ),
            t(
              "Include meaningful evidence and tests for behavior that changes.",
              "أرفق أدلة واختبارات مفيدة للسلوك الذي يتغير."
            ),
            t(
              "Let protected-branch CI complete; do not bypass its gates.",
              "انتظر فحوص الفرع المحمي ولا تتجاوزها."
            ),
            t(
              "Follow the repository's contribution guide and code of conduct.",
              "اتبع دليل المساهمة ومدونة السلوك في المستودع."
            ),
          ],
        },
        {
          id: "website",
          title: t("This website is a separate project", "هذا الموقع مشروع مستقل"),
          paragraphs: [
            t(
              "The product website has its own source, static pages and Vercel deployment. The Go service, extractor sandbox and media storage remain in the OpenDownload application repository. Website changes do not update the download engine.",
              "لموقع المنتج مصدر وصفحات ثابتة ونشر مستقل على Vercel. تظل خدمة Go وعزل الاستخراج وتخزين الوسائط في مستودع تطبيق OpenDownload. تغييرات الموقع لا تحدّث محرك التنزيل."
            ),
          ],
        },
      ],
    },
  ];
}
export function posts(l: Locale): Post[] {
  const t = (en: string, ar: string) => text(l, en, ar);
  return [
    {
      slug: "linkedin-pinterest-threads",
      publishedAt: "2026-10-03",
      cover: "sources",
      source: "https://github.com/Lord-shaban/OpenDownload/blob/main/docs/SOCIAL_SOURCES.md",
      category: t("Source update", "تحديث المصادر"),
      title: t(
        "LinkedIn, Pinterest and Threads join OpenDownload.",
        "لينكدإن وبينترست وثريدز تنضم إلى أوبن داونلود."
      ),
      description: t(
        "Three new sources in the application code, with public access, real format choices and clear limits.",
        "ثلاثة مصادر جديدة في كود التطبيق، بروابط عامة وصيغ فعلية وحدود واضحة."
      ),
      sections: [
        {
          id: "sources",
          title: t("More places for your media", "مصادر أكثر لوسائطك"),
          paragraphs: [
            t(
              "The current OpenDownload source adds LinkedIn public video posts, Pinterest video and single-image pins, and Threads posts whose public page includes media data. They appear in the workspace's supported-sites list and this website's source guide in both languages.",
              "يضيف أحدث كود لـOpenDownload منشورات فيديو LinkedIn العامة ودبابيس الفيديو والصور المفردة على Pinterest ومنشورات Threads التي تتضمن صفحاتها العامة بيانات الوسائط. تظهر المصادر في قائمة المواقع المدعومة داخل التطبيق ودليل المصادر في الموقع باللغتين."
            ),
          ],
        },
        {
          id: "links",
          title: t("Use the post's own link", "استخدم رابط المنشور نفسه"),
          bullets: [
            t(
              "LinkedIn accepts public /posts/ and /feed/update/ links, plus lnkd.in redirects. Paid Learning courses and account-only content stay outside scope.",
              "يقبل LinkedIn روابط /posts/ و/feed/update/ العامة واختصارات lnkd.in. تظل دورات Learning المدفوعة والمحتويات التي تتطلب حسابًا خارج النطاق."
            ),
            t(
              "Pinterest accepts individual /pin/ URLs on regional domains and pin.it redirects. Video formats come from the extractor; single-image pins use the original image returned by Pinterest. Full boards are excluded.",
              "يقبل Pinterest روابط /pin/ المفردة على النطاقات الإقليمية واختصارات pin.it. تأتي صيغ الفيديو من المستخرج؛ وتستخدم دبابيس الصور المفردة الصورة الأصلية التي يعيدها Pinterest. اللوحات الكاملة غير متاحة."
            ),
            t(
              "Threads accepts @user/post links on threads.com and threads.net, and share links that redirect to a post. Single videos and images are supported; image-only collections are capped at 20. Mixed or multiple-video carousels are excluded.",
              "يقبل Threads روابط @user/post على threads.com وthreads.net وروابط المشاركة التي تحوّل إلى منشور. تُدعم الفيديوهات والصور المفردة، ومجموعات الصور فقط حتى 20 صورة. المجموعات المختلطة أو متعددة الفيديوهات غير متاحة."
            ),
          ],
        },
        {
          id: "formats",
          title: t("Keep the source honest", "الصيغ كما يتيحها المصدر"),
          paragraphs: [
            t(
              "Some sources provide MP4 files without reporting codecs or dimensions. OpenDownload now preserves these original files. It shows a resolution only when reported, and describes MP3 conversion as requiring an audio track when audio metadata is missing. A missing field no longer hides an available video.",
              "تتيح بعض المصادر ملفات MP4 دون معلومات الكودك أو الأبعاد. يحتفظ OpenDownload الآن بخيار الملف الأصلي. يعرض الدقة عندما يذكرها المصدر فقط، ويوضح أن تحويل MP3 يتطلب مسارًا صوتيًا عند غياب معلومات الصوت. لم يعد غياب حقل يخفي فيديو متاحًا."
            ),
          ],
        },
        {
          id: "access",
          title: t("Public access remains the boundary", "الوصول العام يظل الحد"),
          paragraphs: [
            t(
              "The adapters use the existing guarded outbound proxy and bounded metadata reads. Threads requests the public search-preview representation with a crawler-compatible User-Agent and matches the requested post's code. This representation can change. No login cookies, challenge solving or watermark removal is added. A public URL can still be inaccessible from a particular host.",
              "تستخدم الأدوات وكيل الشبكة المحمي الحالي وحدودًا لحجم بيانات المصدر. يطلب Threads نسخة المعاينة العامة لمحركات البحث بترويسة User-Agent متوافقة مع الزواحف، ويطابق رمز المنشور المطلوب. قد تتغير هذه النسخة. لا نضيف ملفات جلسات تسجيل الدخول أو حل تحديات التحقق أو إزالة العلامات المائية. قد يظل الرابط العام غير متاح من مضيف معين."
            ),
          ],
          note: t(
            "Real public video downloads passed on the current source: LinkedIn (5,602,080 bytes), Pinterest (18,403,864 bytes) and Threads (4,366,338 bytes). LinkedIn MP3 conversion, a Pinterest original image and a Threads four-image ZIP also passed. FFprobe verified media files; archive contents, HTTP ranges and deletion were checked through the guarded proxy. See the repository's verification record for samples, hashes and exact limits.",
            "نجحت تنزيلات فيديو عامة فعلية على الكود الجديد: LinkedIn بحجم 5,602,080 بايت وPinterest بحجم 18,403,864 بايت وThreads بحجم 4,366,338 بايت. نجح أيضًا تحويل LinkedIn إلى MP3 وتنزيل صورة Pinterest الأصلية وملف ZIP من أربع صور على Threads. تحقّق FFprobe من ملفات الوسائط، وفُحصت محتويات الأرشيف والتنزيل الجزئي والحذف عبر الوكيل المحمي. راجع سجل التحقق في المستودع للعينات والبصمات والحدود الدقيقة."
          ),
        },
        {
          id: "source",
          title: t("Run the current application source", "شغّل أحدث كود للتطبيق"),
          paragraphs: [
            t(
              "These additions belong to the current source, not the immutable v0.1.0 container release. Build the application from main to use them. Updating this website does not deploy the download engine or certify the public app's running revision.",
              "هذه الإضافات موجودة في أحدث كود، وليست ضمن حاويات إصدار 0.1.0 الثابتة. ابنِ التطبيق من main لاستخدامها. تحديث الموقع لا ينشر محرك التنزيل ولا يثبت نسخة الكود التي يشغّلها التطبيق العام."
            ),
          ],
          code: "git clone https://github.com/Lord-shaban/OpenDownload.git\ncd OpenDownload\ncp .env.example .env\ndocker compose up --build",
        },
      ],
    },
    {
      slug: "introducing-0-1",
      publishedAt: "2026-10-01",
      cover: "release",
      source: "https://github.com/Lord-shaban/OpenDownload/releases/tag/v0.1.0",
      category: t("Release notes", "إصدارات"),
      title: t(
        "OpenDownload 0.1: downloads, formats and release boundaries.",
        "OpenDownload 0.1: التنزيل والصيغ وحدود الإصدار."
      ),
      description: t(
        "The first OpenDownload release, its real capabilities, and what comes next.",
        "الإصدار الأول من OpenDownload، إمكاناته الفعلية، وما يأتي بعده."
      ),
      sections: [
        {
          id: "release",
          title: t("A small tool, a complete flow", "أداة صغيرة، رحلة كاملة"),
          paragraphs: [
            t(
              "OpenDownload v0.1.0 was released on October 1, 2026. It brings a public link through analysis, format selection, processing and saving, in a minimal glass workspace. English and Arabic, RTL, light and dark themes are part of that first release.",
              "صدر OpenDownload 0.1.0 في 1 أكتوبر 2026. يأخذ الرابط العام عبر التحليل واختيار الصيغة والمعالجة والحفظ، داخل مساحة عمل زجاجية مينمال. الإنجليزية والعربية وRTL والمظهران الفاتح والداكن جزء من الإصدار الأول."
            ),
          ],
        },
        {
          id: "included",
          title: t("More than a download button", "أكثر من زر تنزيل"),
          paragraphs: [
            t(
              "Jobs persist across restarts, with cancellation, retries, explicit expiry and owner-scoped files. Source formats are reported honestly. MP3 conversion, direct images, available sidecars and range streaming are included. Network egress is guarded and the cloud profile refuses to start without its required isolation.",
              "تستمر المهام عبر إعادة التشغيل، مع الإلغاء وإعادة المحاولة وصلاحية واضحة وملفات مرتبطة بصاحب الجلسة. تُعرض صيغ المصدر بصدق. يشمل الإصدار تحويل MP3 والصور المباشرة والملفات المرافقة المتاحة والتنزيل الجزئي. الاتصالات الصادرة محمية، ويرفض ملف السحابة التشغيل دون العزل المطلوب."
            ),
          ],
        },
        {
          id: "scope",
          title: t("A release with clear boundaries", "إصدار بحدود واضحة"),
          paragraphs: [
            t(
              "YouTube is not supported in v0.1. The investigation is deferred, and the experimental implementation was not merged. Dedicated social photo-gallery adapters are also future work. Tested TikTok, SoundCloud and direct-media samples demonstrate those downloads; they do not guarantee every public URL.",
              "YouTube غير مدعوم في 0.1. أُجّل البحث فيه ولم تُدمج النسخة التجريبية. أدوات معارض الصور المتخصصة أيضًا عمل مستقبلي. تثبت عينات TikTok وSoundCloud والوسائط المباشرة المختبرة تلك التنزيلات؛ ولا تضمن كل رابط عام."
            ),
          ],
        },
        {
          id: "open",
          title: t("Open, inspectable, yours to run", "مفتوح، قابل للفحص، ويمكنك تشغيله"),
          paragraphs: [
            t(
              "The source is published under MIT. Release images include provenance and SBOMs, and the publication pipeline pulls and tests the uploaded containers. Exact release evidence is public. This is volunteer-maintained software with solo maintainer review, not an independent security audit.",
              "نُشر المصدر بترخيص MIT. تتضمن صور الإصدار بيانات المنشأ وقوائم المكونات، وتجلب عملية النشر الحاويات المنشورة وتختبرها. أدلة الإصدار الدقيقة عامة. هذا برنامج يديره متطوع بمراجعة المشرف نفسه، وليس تدقيقًا أمنيًا مستقلًا."
            ),
          ],
        },
      ],
    },
    {
      slug: "a-quieter-workspace",
      publishedAt: "2026-10-01",
      cover: "design",
      source:
        "https://github.com/Lord-shaban/OpenDownload/blob/main/design-system/opendownload/pages/workspace.md",
      category: t("Design notes", "ملاحظات التصميم"),
      title: t("Designing the path from a link to a file.", "تصميم الرحلة من الرابط إلى الملف."),
      description: t(
        "Why the workspace stays small, and shows detail only when it helps.",
        "لماذا تبقى مساحة العمل بسيطة، وتعرض التفاصيل عندما تكون مفيدة."
      ),
      sections: [
        {
          id: "start",
          title: t("Start with one thing", "ابدأ بشيء واحد"),
          paragraphs: [
            t(
              "The first action is a link. The workspace gives that action room, rather than asking you to understand every format, platform and setting first. Available formats arrive after analysis, when they can actually answer your question.",
              "أول خطوة هي الرابط. تعطي مساحة العمل لهذه الخطوة مساحة، بدل مطالبتك بفهم كل صيغة ومصدر وإعداد من البداية. تظهر الصيغ المتاحة بعد التحليل، حين تستطيع الإجابة عن احتياجك فعليًا."
            ),
          ],
        },
        {
          id: "glass",
          title: t("Glass as a material, not a distraction", "الزجاج كخامة، لا كمشتت"),
          paragraphs: [
            t(
              "A muted lavender accent, soft surfaces and restrained transparency give the app its identity. Text, focus and controls still need contrast. The interface respects reduced-motion and reduced-transparency preferences; decorative effects never decide whether an action is usable.",
              "لمسة لافندر هادئة وأسطح ناعمة وشفافية محدودة تمنح التطبيق هويته. تظل النصوص والتركيز وأدوات التحكم بحاجة إلى تباين. تحترم الواجهة تفضيلات تقليل الحركة والشفافية؛ المؤثرات الزخرفية لا تحدد قابلية استخدام أي خطوة."
            ),
          ],
        },
        {
          id: "honest",
          title: t("Feedback should help you recover", "الرسائل تساعدك على المتابعة"),
          paragraphs: [
            t(
              "A unavailable source should lead to a clear next step. A full queue should ask you to wait. An expired file should explain why it disappeared. The same care applies in Arabic: layout, reading direction and messages are part of the experience.",
              "المصدر غير المتاح ينبغي أن يقود إلى خطوة واضحة. الطابور الممتلئ يطلب الانتظار. والملف المنتهي يشرح سبب اختفائه. ينطبق نفس الاهتمام على العربية: التخطيط واتجاه القراءة والرسائل جزء من التجربة."
            ),
          ],
        },
      ],
    },
  ];
}
