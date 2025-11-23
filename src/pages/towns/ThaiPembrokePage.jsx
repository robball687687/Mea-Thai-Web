// src/pages/towns/ThaiPembrokePage.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

export default function ThaiPembrokePage() {
  const siteUrl = "https://the-mea-thai-cuisine.com/thai-takeout-pembroke-ma";

  return (
    <>
      <Helmet>
        <title>Thai Takeout Near Pembroke, MA | The Mea Thai Cuisine</title>
        <meta
          name="description"
          content="Need Thai takeout near Pembroke, MA? The Mea Thai Cuisine in Plymouth has Pad Thai, curries, noodles, and appetizers with convenient online ordering and pickup."
        />
        <link rel="canonical" href={siteUrl} />
      </Helmet>

      <main className="min-h-screen bg-stone-50">
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Thai Takeout Near Pembroke, MA
          </h1>
          <p className="text-gray-700 mb-4">
            If you&apos;re in <strong>Pembroke, MA</strong> and looking for{" "}
            <strong>Thai takeout</strong>, The Mea Thai Cuisine in Plymouth is
            a convenient option for fresh, flavorful Thai food. Order online,
            swing by our downtown Plymouth location, and bring home hot Thai
            dishes the whole family can enjoy.
          </p>
          <p className="text-gray-700 mb-4">
            We offer a wide range of Thai dishes—noodles, curries, fried rice,
            soups, and appetizers—so everyone at your table can find a favorite.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-3">
            Thai Dishes Our Pembroke Guests Love
          </h2>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Pad Thai and Drunken Noodles</li>
            <li>Chicken, beef, shrimp, or tofu curries</li>
            <li>Pineapple Fried Rice and Basil Fried Rice</li>
            <li>Thai wings, dumplings, and crispy appetizers</li>
            <li>Comforting soups and seasonal ramen bowls</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-3">
            Simple Online Ordering from Pembroke
          </h2>
          <p className="text-gray-700 mb-4">
            Place your Thai takeout order online, choose your pickup time, and
            we&apos;ll have your food ready at{" "}
            <strong>39 Court St, Plymouth, MA 02360</strong>. It&apos;s an
            easy way to enjoy Thai food near Pembroke without having to cook.
          </p>

          <div className="mt-6">
            <a
              href="https://the-mea-thai-cuisine.com"
              className="inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-red-700 transition"
            >
              Order Thai Takeout Online
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
