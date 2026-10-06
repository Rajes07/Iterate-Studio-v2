/**
 * Build-time check for optional project videos.
 * Drop files into public/work/videos/<slug>.mp4 (+ .webm) and public/hero/hero-loop.mp4 and they are picked up on the next build.
 * Only the glob KEYS are read, so nothing is bundled: the files stay in /public and are fetched lazily by <AutoVideo>.
 */
const files = new Set([
  ...Object.keys(import.meta.glob("/public/work/videos/*.{mp4,webm}")),
  ...Object.keys(import.meta.glob("/public/hero/*.{mp4,webm}")),
].map((p) => p.replace(/^\/public/, "")));

export type VideoSources = { mp4?: string; webm?: string };

/** Files that do not match the project slug. */
const alias: Record<string, string> = { "vanascape-garden-studio": "vanascape" };

export function videoFor(slug: string): VideoSources | undefined {
  slug = alias[slug] ?? slug;
  const mp4 = `/work/videos/${slug}.mp4`, webm = `/work/videos/${slug}.webm`;
  const out: VideoSources = {};
  if (files.has(mp4)) out.mp4 = mp4;
  if (files.has(webm)) out.webm = webm;
  return out.mp4 || out.webm ? out : undefined;
}

export const heroLoop: VideoSources | undefined = files.has("/hero/hero-loop.mp4") ? { mp4: "/hero/hero-loop.mp4" } : undefined;
