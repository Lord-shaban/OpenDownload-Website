import { Link2 } from "lucide-react";

export type SourceId =
  | "tiktok"
  | "instagram"
  | "x"
  | "facebook"
  | "linkedin"
  | "pinterest"
  | "threads"
  | "reddit"
  | "vimeo"
  | "soundcloud"
  | "direct";
export function SourceIcon({ id, size = 26 }: { id: SourceId; size?: number }) {
  if (id === "direct") return <Link2 size={size} aria-hidden="true" />;
  return (
    <span
      className={`brand-vector brand-${id}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}
export function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <span
      className="brand-vector brand-github"
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}
