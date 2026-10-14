#!/usr/bin/env python3
"""
optimize_gallery.py — Chacabana Barber Shop
Optimiza las fotos crudas a WebP (full + thumbnail), genera un manifest
gallery.json y copia el resultado optimizado al proyecto para subirlo.

Uso:
  python3 tools/optimize_gallery.py
  python3 tools/optimize_gallery.py --src "/ruta/raw" --out "/ruta/optimizado"

Requisitos: sips (macOS) y cwebp (brew install webp)
"""
import argparse, json, os, re, shutil, subprocess, sys, tempfile

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
HOME = os.path.expanduser("~")

def run(cmd):
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def natural_key(s):
    return [int(t) if t.isdigit() else t.lower() for t in re.split(r"(\d+)", s)]

def slug(name):
    s = name.lower()
    s = re.sub(r"^whatsapp image\s*", "whatsapp-", s)
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s or "foto"

def dims(path):
    out = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", path],
                         capture_output=True, text=True).stdout
    w = h = 0
    for line in out.splitlines():
        if "pixelWidth" in line: w = int(line.split(":")[1])
        elif "pixelHeight" in line: h = int(line.split(":")[1])
    return w, h

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", default=os.path.join(HOME, "Downloads", "Chacabana Content"))
    ap.add_argument("--out", default=os.path.join(HOME, "Downloads", "Chacabana Content", "optimizado"))
    ap.add_argument("--full", type=int, default=1600)
    ap.add_argument("--thumb", type=int, default=700)
    args = ap.parse_args()

    src, out = args.src, args.out
    if not os.path.isdir(src):
        sys.exit("No existe la carpeta de origen: " + src)

    exts = (".jpg", ".jpeg", ".png", ".heic", ".webp", ".tif", ".tiff")
    files = [f for f in os.listdir(src)
             if os.path.isfile(os.path.join(src, f)) and f.lower().endswith(exts)]
    files.sort(key=natural_key)
    if not files:
        sys.exit("No se encontraron imágenes en " + src)

    for d in ("full", "thumb"):
        os.makedirs(os.path.join(out, d), exist_ok=True)
        os.makedirs(os.path.join(ROOT, "images", "gallery", d), exist_ok=True)

    manifest = []
    total = len(files)
    for i, f in enumerate(files, 1):
        gid = "gallery-%02d" % i
        src_path = os.path.join(src, f)
        sw, sh = dims(src_path)

        def convert(target, quality, outjpg):
            cmd = ["sips"]
            if max(sw, sh) > target:          # solo reducir, nunca ampliar
                cmd += ["-Z", str(target)]
            cmd += ["-s", "format", "jpeg", "-s", "formatOptions", str(quality),
                    src_path, "--out", outjpg]
            run(cmd)

        with tempfile.TemporaryDirectory() as tmp:
            full_jpg = os.path.join(tmp, gid + "-full.jpg")
            thumb_jpg = os.path.join(tmp, gid + "-thumb.jpg")
            convert(args.full, 85, full_jpg)
            convert(args.thumb, 80, thumb_jpg)
            full_webp = os.path.join(out, "full", gid + ".webp")
            thumb_webp = os.path.join(out, "thumb", gid + ".webp")
            run(["cwebp", "-q", "80", "-metadata", "none", full_jpg, "-o", full_webp])
            run(["cwebp", "-q", "75", "-metadata", "none", thumb_jpg, "-o", thumb_webp])
            fw, fh = dims(full_jpg)
            tw, th = dims(thumb_jpg)
        # copiar al proyecto (esto es lo que se sube)
        shutil.copy2(full_webp, os.path.join(ROOT, "images", "gallery", "full", gid + ".webp"))
        shutil.copy2(thumb_webp, os.path.join(ROOT, "images", "gallery", "thumb", gid + ".webp"))
        manifest.append({
            "id": gid,
            "thumb": "images/gallery/thumb/%s.webp" % gid,
            "full": "images/gallery/full/%s.webp" % gid,
            "width": tw, "height": th,
            "fullWidth": fw, "fullHeight": fh,
            "alt": "Chacabana Barber Shop - San Antonio, TX",
            "source": f
        })
        print("[%2d/%d] %s -> %s (thumb %dx%d, full %dx%d)" % (i, total, f, gid, tw, th, fw, fh))

    manifest_path = os.path.join(ROOT, "gallery.json")
    with open(manifest_path, "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, ensure_ascii=False, indent=2)
    # copia del manifest en la carpeta optimizada
    with open(os.path.join(out, "gallery.json"), "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, ensure_ascii=False, indent=2)

    print("\n✓ %d imágenes optimizadas" % total)
    print("  Optimizado: " + out)
    print("  Proyecto:   " + os.path.join(ROOT, "images", "gallery"))
    print("  Manifest:   " + manifest_path)

if __name__ == "__main__":
    main()
