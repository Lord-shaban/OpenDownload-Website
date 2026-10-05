import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const root = new URL("../public/images/", import.meta.url);
const art = [
  "media-desk",
  "sources-collection",
  "video-studio",
  "audio-studio",
  "photo-studio",
  "design-desk",
];
const captures = ["video", "audio", "images", "arabic", "dark"];
const phones = ["video", "audio", "images", "arabic"];
let total = 0;
for (const name of [
  ...art.map((name) => `${name}-v2.webp`),
  ...captures.map((name) => `workspace-${name}-v2.jpg`),
  ...phones.map((name) => `workspace-${name}-mobile-v2.jpg`),
]) {
  const path = fileURLToPath(new URL(name, root));
  const metadata = await sharp(path).metadata();
  const info = await stat(path);
  const artwork = name.endsWith(".webp");
  const phone = name.includes("-mobile-");
  assert.equal(
    metadata.format,
    artwork ? "webp" : "jpeg",
    `${name}: file extension must match its actual encoding`
  );
  assert.equal(metadata.width, artwork ? 1536 : phone ? 375 : 1065, `${name}: unexpected width`);
  assert.equal(metadata.height, artwork ? 1024 : phone ? 811 : 927, `${name}: unexpected height`);
  assert.ok(info.size < (artwork ? 350_000 : 150_000), `${name}: image budget exceeded`);
  const { channels, stdev } = (await sharp(await readFile(path)).stats()).channels.reduce(
    (sum, channel) => ({ channels: sum.channels + 1, stdev: sum.stdev + channel.stdev }),
    { channels: 0, stdev: 0 }
  );
  assert.ok(stdev / channels > 8, `${name}: image must not be blank`);
  total += info.size;
  console.log(`${name}: ${metadata.width}x${metadata.height}, ${info.size} bytes`);
}
assert.ok(total < 1_700_000, "Combined image budget exceeded");
console.log(
  `Verified ${art.length + captures.length + phones.length} assets; ${total} bytes total.`
);
