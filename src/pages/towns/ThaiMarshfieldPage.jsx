// src/pages/towns/ThaiMarshfieldPage.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

export default function ThaiMarshfieldPage() {
  const siteUrl = "https://the-mea-thai-cuisine.com/thai-food-marshfield-ma";

  return (
    <>
      <Helmet>
        <title>Thai Food Near Marshfield, MA | The Mea Thai Cuisine</title>
        <meta
          name="description"
          content="Craving Thai food near Marshfield, MA? The Mea Thai Cuisine in Plymouth serves Pad Thai, curries, noodles, fried rice, and appetizers with dine-in and takeout options."
        />
        <link rel="canonical" href={siteUrl} />
      </Helmet>

      <main className="min-h-screen bg-stone-50">
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Thai Food Near Marshfield, MA
          </h1>
          <p className="text-gray-700 mb-4">
            The Mea Thai Cuisine is a popular spot for guests coming from{" "}
            <strong>Marshfield, MA</strong> who want flavorful Thai food without
            going into the city. Located in nearby Plymouth, we serve classic
            Thai dishes made with fresh ingredients and authentic seasonings.
          </p>
          <p className="text-gray-700 mb-4">
            Stop in for a relaxed dine-in experience or order Thai takeout and
            pick it up on your way home from work or the beach.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-3">
            Thai Favorites for Marshfield Guests
          </h2>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Pad Thai and Pad See Ew</li>
            <li>Red, Green, and Panang Curry</li>
            <li>Thai fried rice and Basil Fried Rice</li>
            <li>Spring rolls, dumplings, and Thai appetizers</li>
            <li>Ramen and seasonal special dishes</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-3">
            Visit Us From Marshfield
          </h2>
          <p className="text-gray-700 mb-4">
            Our Thai restaurant is located at{" "}
            <strong>39 Court St, Plymouth, MA 02360</strong>. Many Marshfield
            customers make The Mea Thai Cuisine their regular Thai spot for
            date nights, family dinners, and weekend takeout.
          </p>

          <div className="mt-6">
            <a
              href="https://the-mea-thai-cuisine.com"
              className="inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-red-700 transition"
            >
              See Thai Menu &amp; Order Online
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
