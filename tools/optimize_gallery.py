#!/usr/bin/env python3
"""
optimize_gallery.py — Chacabana Barber Shop
Pipeline completo:
  - Optimiza TODAS las fotos a WebP (full + thumbnail).
  - Optimiza los videos a MP4 Web (sin audio, H.264, faststart) + poster.
  - Genera los assets del HERO (imagen + video de fondo con poster).
  - Escribe gallery.json y copia todo al proyecto para subirlo.

Uso:
  python3 tools/optimize_gallery.py
  python3 tools/optimize_gallery.py --hero chacabana-3 --hero-video video1

Requisitos: sips (macOS), cwebp (brew install webp), ffmpeg (brew install ffmpeg)
"""
import argparse, json, os, re, shutil, subprocess, sys, tempfile

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
HOME = os.path.expanduser("~")
IMG_EXT = (".jpg", ".jpeg", ".png", ".heic", ".webp", ".tif", ".tiff")
VID_EXT = (".mp4", ".mov", ".m4v", ".webm", ".avi", ".mkv")

def run(cmd):
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def natural_key(s):
    return [int(t) if t.isdigit() else t.lower() for t in re.split(r"(\d+)", s)]

def slug(name):
    s = re.sub(r"^whatsapp image\s*", "whatsapp-", name.lower())
    s = re.sub(r"^photo[-\s]", "photo-", s)
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s or "asset"

def dims_img(path):
    out = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", path],
                         capture_output=True, text=True).stdout
    w = h = 0
    for line in out.splitlines():
        if "pixelWidth" in line: w = int(line.split(":")[1])
        elif "pixelHeight" in line: h = int(line.split(":")[1])
    return w, h

def dims_video(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0",
                          "-show_entries", "stream=width,height", "-of", "csv=p=0", path],
                         capture_output=True, text=True).stdout.strip()
    try:
        w, h = out.split(",")[:2]
        return int(w), int(h)
    except Exception:
        return 0, 0

def ensure(*dirs):
    for d in dirs:
        os.makedirs(d, exist_ok=True)

def convert_image(src_path, target, quality, outjpg, sw, sh):
    cmd = ["sips"]
    if max(sw, sh) > target:
        cmd += ["-Z", str(target)]
    cmd += ["-s", "format", "jpeg", "-s", "formatOptions", str(quality), src_path, "--out", outjpg]
    run(cmd)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", default=os.path.join(HOME, "Downloads", "Chacabana Content"))
    ap.add_argument("--out", default=os.path.join(HOME, "Downloads", "Chacabana Content", "optimizado"))
    ap.add_argument("--full", type=int, default=1600)
    ap.add_argument("--thumb", type=int, default=700)
    ap.add_argument("--hero", default="chacabana-3", help="nombre base de la foto de portada")
    ap.add_argument("--hero-video", default="video1", help="nombre base del video de portada")
    args = ap.parse_args()

    src, out = args.src, args.out
    if not os.path.isdir(src):
        sys.exit("No existe la carpeta de origen: " + src)

    allfiles = [f for f in os.listdir(src) if os.path.isfile(os.path.join(src, f))]
    images = sorted([f for f in allfiles if f.lower().endswith(IMG_EXT)], key=natural_key)
    videos = sorted([f for f in allfiles if f.lower().endswith(VID_EXT)], key=natural_key)

    ensure(os.path.join(out, "full"), os.path.join(out, "thumb"),
           os.path.join(ROOT, "images", "gallery", "full"),
           os.path.join(ROOT, "images", "gallery", "thumb"),
           os.path.join(ROOT, "videos"))

    manifest = []

    # ---------- IMÁGENES ----------
    for i, f in enumerate(images, 1):
        gid = "gallery-%02d" % i
        src_path = os.path.join(src, f)
        sw, sh = dims_img(src_path)
        with tempfile.TemporaryDirectory() as tmp:
            full_jpg = os.path.join(tmp, gid + "-full.jpg")
            thumb_jpg = os.path.join(tmp, gid + "-thumb.jpg")
            convert_image(src_path, args.full, 85, full_jpg, sw, sh)
            convert_image(src_path, args.thumb, 80, thumb_jpg, sw, sh)
            full_webp = os.path.join(out, "full", gid + ".webp")
            thumb_webp = os.path.join(out, "thumb", gid + ".webp")
            run(["cwebp", "-q", "80", "-metadata", "none", full_jpg, "-o", full_webp])
            run(["cwebp", "-q", "75", "-metadata", "none", thumb_jpg, "-o", thumb_webp])
            fw, fh = dims_img(full_jpg)
            tw, th = dims_img(thumb_jpg)
        shutil.copy2(full_webp, os.path.join(ROOT, "images", "gallery", "full", gid + ".webp"))
        shutil.copy2(thumb_webp, os.path.join(ROOT, "images", "gallery", "thumb", gid + ".webp"))
        manifest.append({
            "type": "image", "id": gid,
            "thumb": "images/gallery/thumb/%s.webp" % gid,
            "full": "images/gallery/full/%s.webp" % gid,
            "width": tw, "height": th, "fullWidth": fw, "fullHeight": fh,
            "alt": "Chacabana Barber Shop - San Antonio, TX", "source": f
        })
        print("[img %2d/%d] %s -> %s" % (i, len(images), f, gid))

    # ---------- VIDEOS ----------
    for j, f in enumerate(videos, 1):
        vid = "video-%02d" % j
        name = os.path.splitext(f)[0]
        src_path = os.path.join(src, f)
        vw, vh = dims_video(src_path)
        mp4 = os.path.join(out, vid + ".mp4")
        poster_jpg = os.path.join(out, vid + "-poster.jpg")
        # video web: sin audio, h264, escalado, faststart
        run(["ffmpeg", "-y", "-i", src_path, "-an",
             "-vf", "scale='min(1280,iw)':-2",
             "-c:v", "libx264", "-preset", "slow", "-crf", "28", "-pix_fmt", "yuv420p",
             "-movflags", "+faststart", mp4])
        run(["ffmpeg", "-y", "-i", src_path, "-an", "-ss", "1", "-frames:v", "1",
             "-vf", "scale='min(1280,iw)':-2", poster_jpg])
        poster_webp = os.path.join(out, vid + "-poster.webp")
        thumb_webp = os.path.join(out, vid + "-thumb.webp")
        run(["cwebp", "-q", "80", "-metadata", "none", poster_jpg, "-o", poster_webp])
        with tempfile.TemporaryDirectory() as tmp:
            tjpg = os.path.join(tmp, "t.jpg")
            convert_image(poster_jpg, args.thumb, 78, tjpg, *dims_img(poster_jpg))
            run(["cwebp", "-q", "75", "-metadata", "none", tjpg, "-o", thumb_webp])
        shutil.copy2(mp4, os.path.join(ROOT, "videos", vid + ".mp4"))
        shutil.copy2(poster_webp, os.path.join(ROOT, "videos", vid + "-poster.webp"))
        shutil.copy2(thumb_webp, os.path.join(ROOT, "videos", vid + "-thumb.webp"))
        manifest.append({
            "type": "video", "id": vid, "source": f,
            "thumb": "videos/%s-thumb.webp" % vid,
            "poster": "videos/%s-poster.webp" % vid,
            "sources": [{"src": "videos/%s.mp4" % vid, "type": "video/mp4"}],
            "width": vw, "height": vh,
            "alt": "Video - Chacabana Barber Shop, San Antonio, TX"
        })
        print("[vid %d/%d] %s -> %s" % (j, len(videos), f, vid))

    # ---------- HERO ----------
    hero = None
    hero_src = [f for f in images if os.path.splitext(f)[0].lower() == args.hero.lower()]
    if hero_src:
        f = hero_src[0]
        # genera hero 1920 ancho (más grande que la galería) para fondo
        with tempfile.TemporaryDirectory() as tmp:
            hj = os.path.join(tmp, "hero.jpg")
            convert_image(os.path.join(src, f), 1920, 82, hj, *dims_img(os.path.join(src, f)))
            run(["cwebp", "-q", "78", "-metadata", "none", hj, "-o", os.path.join(ROOT, "images", "hero.webp")])
        hero = {"image": "images/hero.webp", "poster": "images/hero.webp", "source": f}
        print("[hero] imagen <- %s" % f)
    else:
        print("[hero] ⚠ no encontré la foto '%s'" % args.hero)

    hv = [f for f in videos if os.path.splitext(f)[0].lower() == args.hero_video.lower()]
    if hv:
        f = hv[0]
        src_path = os.path.join(src, f)
        hmp4 = os.path.join(ROOT, "videos", "hero.mp4")
        hposter = os.path.join(ROOT, "videos", "hero-poster.webp")
        with tempfile.TemporaryDirectory() as tmp:
            pjpg = os.path.join(tmp, "p.jpg")
            run(["ffmpeg", "-y", "-i", src_path, "-an", "-t", "15",
                 "-vf", "scale='min(1280,iw)':-2",
                 "-c:v", "libx264", "-preset", "slow", "-crf", "30", "-pix_fmt", "yuv420p",
                 "-movflags", "+faststart", hmp4])
            run(["ffmpeg", "-y", "-i", src_path, "-an", "-ss", "0.5", "-frames:v", "1",
                 "-vf", "scale='min(1280,iw)':-2", pjpg])
            run(["cwebp", "-q", "80", "-metadata", "none", pjpg, "-o", hposter])
        if hero:
            hero["video"] = "videos/hero.mp4"
        print("[hero] video  <- %s (15s, sin audio)" % f)
    else:
        print("[hero] ⚠ no encontré el video '%s'" % args.hero_video)

    # ---------- MANIFEST ----------
    with open(os.path.join(ROOT, "gallery.json"), "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, ensure_ascii=False, indent=2)
    with open(os.path.join(out, "gallery.json"), "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, ensure_ascii=False, indent=2)
    if hero:
        with open(os.path.join(ROOT, "hero.json"), "w", encoding="utf-8") as fh:
            json.dump(hero, fh, ensure_ascii=False, indent=2)

    print("\n✓ %d imágenes + %d videos" % (len(images), len(videos)))
    print("  Hero: " + (hero["image"] if hero else "—"))
    print("  Proyecto: " + os.path.join(ROOT, "images", "gallery"))

if __name__ == "__main__":
    main()
