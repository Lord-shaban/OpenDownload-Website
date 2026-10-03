import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { postDate, type Post } from "@/lib/content";
import { href, text, type Locale } from "@/lib/site";
import { SourceIcon } from "./brand-icons";

export function PostCover({
  post,
  locale,
  eager = false,
}: {
  post: Post;
  locale: Locale;
  eager?: boolean;
}) {
  const t = (en: string, ar: string) => text(locale, en, ar);
  return (
    <div className={`journal-image ${post.cover === "release" ? "" : "pale"}`}>
      <Image
        src={post.cover === "release" ? "/images/open-glass.png" : "/images/liquid-glass.png"}
        alt=""
        width={1536}
        height={1024}
        sizes="(max-width: 800px) 94vw, 560px"
        loading={eager ? "eager" : "lazy"}
      />
      {post.cover === "release" ? (
        <span className="image-wordmark" dir="ltr">
          OpenDownload<span>.</span>
          <small>0.1</small>
        </span>
      ) : post.cover === "sources" ? (
        <span className="sources-cover" dir="ltr">
          <span>
            <SourceIcon id="linkedin" size={32} /> LinkedIn
          </span>
          <span>
            <SourceIcon id="pinterest" size={32} /> Pinterest
          </span>
          <span>
            <SourceIcon id="threads" size={32} /> Threads
          </span>
        </span>
      ) : (
        <span className="design-cover">
          {t("Link.", "رابط.")}
          <em>{t("Format. File.", "صيغة. ملف.")}</em>
        </span>
      )}
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
