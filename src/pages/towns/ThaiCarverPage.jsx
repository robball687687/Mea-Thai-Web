// src/pages/towns/ThaiCarverPage.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

export default function ThaiCarverPage() {
  const siteUrl = "https://the-mea-thai-cuisine.com/thai-restaurant-carver-ma";

  return (
    <>
      <Helmet>
        <title>Thai Restaurant Near Carver, MA | The Mea Thai Cuisine</title>
        <meta
          name="description"
          content="Looking for a Thai restaurant near Carver, MA? The Mea Thai Cuisine in Plymouth serves Pad Thai, curries, fried rice, noodles, and appetizers with easy takeout and online ordering."
        />
        <link rel="canonical" href={siteUrl} />
      </Helmet>

      <main className="min-h-screen bg-stone-50">
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Thai Restaurant Near Carver, MA
          </h1>
          <p className="text-gray-700 mb-4">
            If you live in <strong>Carver, MA</strong> and you&apos;re craving
            Thai food, The Mea Thai Cuisine in Plymouth is your nearby
            destination for flavorful curries, noodle dishes, and Thai
            appetizers. Our family-run restaurant is a favorite stop for Carver
            guests looking for something more exciting than the usual takeout.
          </p>
          <p className="text-gray-700 mb-4">
            We prepare every dish fresh to order, using authentic Thai seasonings,
            herbs, and sauces. From mild, comforting dishes to bold and spicy
            plates, there&apos;s a flavor profile for everyone.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-3">
            Favorite Thai Dishes for Carver Guests
          </h2>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Pad Thai and Pad See Ew with your choice of protein</li>
            <li>Red, Green, and Massaman Curries with jasmine rice</li>
            <li>Thai fried rice and Basil Fried Rice</li>
            <li>Spring rolls, gyoza, and crispy appetizers</li>
            <li>Specials like ramen and seasonal Thai dishes</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-3">
            Easy Thai Takeout From Carver to Plymouth
          </h2>
          <p className="text-gray-700 mb-4">
            Many customers from Carver order online, then pick up their food at
            our convenient Plymouth location. It&apos;s an easy way to bring
            Thai restaurant quality home without a long wait.
          </p>

          <p className="text-gray-700 mb-4">
            Visit us at <strong>39 Court St, Plymouth, MA 02360</strong> and
            enjoy Thai food that&apos;s worth the short drive from Carver.
          </p>

          <div className="mt-6">
            <a
              href="https://the-mea-thai-cuisine.com"
              className="inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-red-700 transition"
            >
              Browse Thai Menu &amp; Order
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
