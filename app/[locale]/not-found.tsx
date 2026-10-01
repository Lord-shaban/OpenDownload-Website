import Link from "next/link";
export default function NotFound() {
  return (
    <main className="not-found">
      <span className="eyebrow">404</span>
      <h1>This page took a wrong turn.</h1>
      <p>هذه الصفحة غير موجودة.</p>
      <Link href="/en" className="button primary">
        Back to OpenDownload · العودة للرئيسية
      </Link>
    </main>
  );
}
