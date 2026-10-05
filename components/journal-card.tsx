import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { postDate, type Post } from "@/lib/content";
import { href, text, type Locale } from "@/lib/site";

export function PostCover({
  post,
  locale,
  eager = false,
}: {
  post: Post;
  locale: Locale;
  eager?: boolean;
}) {
  const covers = {
    release: {
      src: "/images/video-studio-v2.webp",
      alt: text(locale, "A cinema camera and film strips", "كاميرا سينمائية وشرائط فيلم"),
    },
    design: {
      src: "/images/design-desk-v2.webp",
      alt: text(
        locale,
        "An open design notebook and color swatches",
        "دفتر تصميم مفتوح وعينات ألوان"
      ),
    },
    sources: {
      src: "/images/sources-collection-v2.webp",
      alt: text(
        locale,
        "Three photographic collections connected to one archival box",
        "ثلاث مجموعات صور متصلة بصندوق أرشفة واحد"
      ),
    },
  };
  const cover = covers[post.cover];
  return (
    <div className="journal-image">
      <Image
        src={cover.src}
        alt={cover.alt}
        width={1536}
        height={1024}
        sizes={eager ? "(max-width: 800px) 94vw, 960px" : "(max-width: 700px) 94vw, 380px"}
        loading={eager ? "eager" : "lazy"}
      />
    </div>
  );
}

export function JournalCard({
  post,
  locale,
  reveal = false,
}: {
  post: Post;
  locale: Locale;
  reveal?: boolean;
}) {
  return (
    <Link
      className={`journal-card${reveal ? " reveal" : ""}`}
      href={href(locale, `blog/${post.slug}`)}
    >
      <PostCover post={post} locale={locale} />
      <div className="journal-meta">
        <span>{post.category}</span>
        <time dateTime={post.publishedAt}>{postDate(post.publishedAt, locale)}</time>
      </div>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
      <span className="read-story">
        {text(locale, "Read article", "اقرأ المقال")}
        <ArrowRight size={16} aria-hidden="true" className="directional" />
      </span>
    </Link>
  );
}
