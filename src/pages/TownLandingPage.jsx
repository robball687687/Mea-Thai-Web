import React from "react";
import { Helmet } from "react-helmet-async";

export default function TownLandingPage({
  pathUrl,
  town,
  title,
  description,
  h1,
  intro,
  paragraphs,
  bullets,
  ctaLabel,
  mainSiteUrl = "https://www.themeathaicuisine.com/",
}) {
  const canonicalUrl = `${mainSiteUrl}${pathUrl}`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <main className="min-h-screen bg-stone-50">
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{h1}</h1>

          {/* Intro */}
          <p className="text-gray-700 mb-4">{intro}</p>

          {/* Body paragraphs */}
          {paragraphs.map((p, idx) => (
            <p key={idx} className="text-gray-700 mb-4">
              {p}
            </p>
          ))}

          {/* Bullets (if any) */}
          {bullets?.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mt-6 mb-3">
                Popular Thai Dishes for {town} Guests
              </h2>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                {bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-6">
            <a
              href={mainSiteUrl}
              className="inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-red-700 transition"
            >
              {ctaLabel}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
