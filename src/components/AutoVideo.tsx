import { useEffect, useRef, useState } from "react";
import type { VideoSources } from "@/data/videos";

type Props = { sources: VideoSources; poster: string; alt: string; width: number; height: number; className?: string; objectPosition?: string };

/**
 * Muted looping video that only downloads/plays while ≥40% visible.
 * Falls back to the poster image for reduced motion, Save-Data, or if the video fails.
 */
export function AutoVideo({ sources, poster, alt, width, height, className, objectPosition = "top" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || nav.connection?.saveData) { setStill(true); return; }
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e) return;
      if (e.isIntersecting) { void v.play().catch(() => setStill(true)); } else v.pause();
    }, { threshold: 0.4 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const style = { aspectRatio: `${width} / ${height}`, objectFit: "cover" as const, objectPosition };
  if (still) return <img src={poster} alt={alt} width={width} height={height} loading="lazy" decoding="async" draggable={false} className={className} style={style} />;
  return (
    <video ref={ref} muted playsInline loop preload="none" poster={poster} aria-label={alt} width={width} height={height} className={className} style={style} onError={() => setStill(true)}>
      {sources.webm && <source src={sources.webm} type="video/webm" />}
      {sources.mp4 && <source src={sources.mp4} type="video/mp4" />}
    </video>
  );
}
