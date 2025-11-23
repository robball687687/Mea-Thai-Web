// src/pages/towns/ThaiSandwichPage.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

export default function ThaiSandwichPage() {
  const siteUrl = "https://the-mea-thai-cuisine.com/thai-food-sandwich-ma";

  return (
    <>
      <Helmet>
        <title>Thai Food Near Sandwich, MA | The Mea Thai Cuisine</title>
        <meta
          name="description"
          content="Searching for Thai food near Sandwich, MA? The Mea Thai Cuisine in Plymouth serves Pad Thai, curries, noodles, fried rice, and Thai appetizers for dine-in and takeout."
        />
        <link rel="canonical" href={siteUrl} />
      </Helmet>

      <main className="min-h-screen bg-stone-50">
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Thai Food Near Sandwich, MA
          </h1>
          <p className="text-gray-700 mb-4">
            If you&apos;re in <strong>Sandwich, MA</strong> and you&apos;re
            looking for Thai food, The Mea Thai Cuisine in nearby Plymouth is a
            great option for dine-in or Thai takeout. We serve a full menu of
            Thai noodles, curries, fried rice, and appetizers.
          </p>
          <p className="text-gray-700 mb-4">
            Our family-owned Thai restaurant focuses on flavor, consistency, and
            friendly service. It&apos;s a comfortable place to sit down for a
            meal or pick up dinner on your way through the South Shore.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-3">
            Thai Favorites for Sandwich Guests
          </h2>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Pad Thai and Pad See Ew with your choice of protein</li>
            <li>Coconut-based curries like Panang and Green Curry</li>
            <li>Thai fried rice, Pineapple Fried Rice, and Basil Fried Rice</li>
            <li>Appetizers such as spring rolls, crab rangoon, and wings</li>
            <li>Soup specials and occasional ramen offerings</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-3">
            Easy Drive From Sandwich to Plymouth
          </h2>
          <p className="text-gray-700 mb-4">
            We&apos;re located at <strong>39 Court St, Plymouth, MA 02360</strong>,
            serving guests from Sandwich, Bourne, Kingston, Duxbury, and beyond.
            Order online, then pick up your Thai food on your way through
            Plymouth.
          </p>

          <div className="mt-6">
            <a
              href="https://www.themeathaicuisine.com/"
              className="inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-red-700 transition"
            >
              View Thai Menu &amp; Order Online
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
