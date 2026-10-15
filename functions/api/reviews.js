/* ==========================================================================
   Cloudflare Pages Function — /api/reviews
   Trae reseñas reales de Google vía Places API (New).
   La llave vive en la variable de entorno GOOGLE_PLACES_KEY (nunca en el navegador).

   Configura en Cloudflare Pages → Settings → Environment variables:
     GOOGLE_PLACES_KEY  = (llave de Google Cloud con "Places API (New)")
     GOOGLE_PLACE_IDS   = (opcional) ids separados por coma; si no, usa los de abajo
   ========================================================================== */

const DEFAULT_PLACE_IDS = [
  "ChIJqatzb2bzXIYRgaB4iY4gjX0", // Chacabana Barber Shop (Eisenhauer)
  "ChIJjbWYgNbtXIYRx1GVxrRM7NU"  // Chacabana Barber Shop 2 (Schaefer)
];

export async function onRequestGet(context) {
  const { env } = context;
  const key = env.GOOGLE_PLACES_KEY;
  const placeIds = (env.GOOGLE_PLACE_IDS ? env.GOOGLE_PLACE_IDS.split(",") : DEFAULT_PLACE_IDS)
    .map((s) => s.trim())
    .filter(Boolean);

  // Sin llave configurada: la web usa su fallback (config.js)
  if (!key) return json({ configured: false }, 200, 60);

  try {
    const places = await Promise.all(placeIds.map((id) => fetchPlace(id, key)));
    const reviews = [];
    let ratingSum = 0, countSum = 0;

    places.forEach((p) => {
      if (!p) return;
      if (p.rating && p.userRatingCount) {
        ratingSum += p.rating * p.userRatingCount;
        countSum += p.userRatingCount;
      }
      (p.reviews || []).forEach((rev) => {
        reviews.push({
          author: (rev.authorAttribution && rev.authorAttribution.displayName) || "Google",
          photo: (rev.authorAttribution && rev.authorAttribution.photoUri) || "",
          rating: rev.rating || 5,
          text: (rev.text && rev.text.text) || (rev.originalText && rev.originalText.text) || "",
          time: rev.relativePublishTimeDescription || ""
        });
      });
    });

    reviews.sort((a, b) => b.rating - a.rating);
    const top = reviews.filter((r) => r.text).slice(0, 6);
    const rating = countSum ? Number((ratingSum / countSum).toFixed(1)) : null;

    return json({ configured: true, rating, count: countSum, reviews: top }, 200, 21600);
  } catch (e) {
    return json({ configured: false, error: String(e) }, 200, 60);
  }
}

async function fetchPlace(id, key) {
  const url = "https://places.googleapis.com/v1/places/" + encodeURIComponent(id);
  const res = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews",
      "Accept-Language": "en"
    },
    cf: { cacheTtl: 21600, cacheEverything: true }
  });
  if (!res.ok) return null;
  return res.json();
}

function json(obj, status, maxAge) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=" + maxAge
    }
  });
}
