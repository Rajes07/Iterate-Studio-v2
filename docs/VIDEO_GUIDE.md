# Making the project videos (10 min per project)

These are the clips that play inside the Work cards, the "videos, images, graphics" feel you liked.

## 1. Record
- Open the live project (e.g. https://nextshore-six.vercel.app/) in Chrome. Set the window to **1280 × 800**, hide the bookmarks bar and zoom to 100%.
- Record **8–10 seconds**: a slow scroll from the hero down 2–3 sections, plus one hover or click.
  - Mac: **Screen Studio** (auto-zoom, smooth cursor; best look), or `Cmd+Shift+5` for free.
  - Windows: **OBS Studio** or the Xbox Game Bar (`Win+Alt+R`).
- No audio. No mouse jitter. Scroll smoothly with the trackpad.
- For the case studies (Volt Ride, Nomad Desk, Paw & Co., Smile Studio, Tiffin Tales), record a scroll through each `/work/<slug>` page.

## 2. Compress (install ffmpeg: `brew install ffmpeg` / `winget install ffmpeg`)

```bash
# MP4 (H.264): works everywhere, target ≤ 1.5 MB
ffmpeg -i raw.mov -t 10 -vf "scale=1280:-2,fps=30" -c:v libx264 -preset slow -crf 28 \
  -pix_fmt yuv420p -movflags +faststart -an nextshore.mp4

# WebM (VP9): smaller, used first by Chrome/Firefox
ffmpeg -i raw.mov -t 10 -vf "scale=1280:-2,fps=30" -c:v libvpx-vp9 -crf 38 -b:v 0 -an nextshore.webm

# Poster image: the first frame, shown before the video loads
ffmpeg -i nextshore.mp4 -vframes 1 -q:v 80 nextshore.webp
```

If a file is over 2 MB, raise `-crf` by 2 and run it again.

## 3. Place
```
public/work/videos/nextshore.mp4 / .webm
public/work/videos/vanascape.mp4 / .webm
public/work/videos/volt-ride.mp4 ...   (one per slug)
```
Posters can replace the existing `public/work/<slug>.webp`. Keep the same names.

## Optional hero loop
A 6–8 s abstract loop (slow gradient or blurred UI montage), ≤ 1 MB, saved as `public/hero/hero-loop.mp4`. If you skip it, the site uses the animated grid and glow instead, which already looks good.
