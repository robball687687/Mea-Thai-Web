// src/pages/towns/ThaiBournePage.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

export default function ThaiBournePage() {
  const siteUrl = "https://the-mea-thai-cuisine.com/thai-restaurant-bourne-ma";

  return (
    <>
      <Helmet>
        <title>Thai Restaurant Near Bourne, MA | The Mea Thai Cuisine</title>
        <meta
          name="description"
          content="Looking for a Thai restaurant near Bourne, MA? The Mea Thai Cuisine in Plymouth offers Thai curries, noodles, fried rice, and appetizers, with dine-in and takeout available."
        />
        <link rel="canonical" href={siteUrl} />
      </Helmet>

      <main className="min-h-screen bg-stone-50">
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Thai Restaurant Near Bourne, MA
          </h1>
          <p className="text-gray-700 mb-4">
            Coming from <strong>Bourne, MA</strong> and craving Thai food?
            The Mea Thai Cuisine in Plymouth is a nearby Thai restaurant where
            you can enjoy noodles, curries, fried rice, and appetizers in a
            warm, welcoming atmosphere.
          </p>
          <p className="text-gray-700 mb-4">
            Whether you&apos;re heading over the canal or planning a trip to
            the South Shore, our restaurant is a convenient stop for lunch,
            dinner, or Thai takeout.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-3">
            What We Serve Our Bourne Guests
          </h2>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Pad Thai, Drunken Noodles, and other Thai noodle dishes</li>
            <li>Red, Green, and Massaman curries with jasmine rice</li>
            <li>Thai fried rice, Pineapple Fried Rice, and Basil Fried Rice</li>
            <li>Appetizers like spring rolls, wings, and dumplings</li>
            <li>Ramen specials and seasonal Thai comfort food</li>
          </ul>

          <p className="text-gray-700 mb-4">
            Many Bourne customers order ahead online and pick up their Thai food
            at our Plymouth location so it&apos;s hot and ready right when they
            arrive.
          </p>

          <p className="text-gray-700 mb-4">
            Find us at <strong>39 Court St, Plymouth, MA 02360</strong>.
          </p>

          <div className="mt-6">
            <a
              href="https://the-mea-thai-cuisine.com"
              className="inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-red-700 transition"
            >
              View Thai Dishes &amp; Order
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
