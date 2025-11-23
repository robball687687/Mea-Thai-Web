// src/pages/towns/ThaiDuxburyPage.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

export default function ThaiDuxburyPage() {
  const siteUrl = "https://the-mea-thai-cuisine.com/thai-food-duxbury-ma";

  return (
    <>
      <Helmet>
        <title>Thai Food Near Duxbury, MA | The Mea Thai Cuisine</title>
        <meta
          name="description"
          content="Searching for Thai food near Duxbury, MA? The Mea Thai Cuisine in Plymouth offers authentic Thai noodles, curries, fried rice, and appetizers, with easy takeout and online ordering."
        />
        <link rel="canonical" href={siteUrl} />
      </Helmet>

      <main className="min-h-screen bg-stone-50">
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Thai Food Near Duxbury, MA
          </h1>
          <p className="text-gray-700 mb-4">
            Residents of <strong>Duxbury, MA</strong> looking for{" "}
            <strong>authentic Thai food</strong> are just a short drive away
            from The Mea Thai Cuisine in Plymouth. Our family-owned restaurant
            serves classic Thai dishes with fresh vegetables, quality meats, and
            house-made sauces.
          </p>
          <p className="text-gray-700 mb-4">
            Whether you&apos;re coming from Duxbury Beach, heading home after
            work, or planning a dinner out, our Thai restaurant in nearby
            Plymouth is a convenient spot for dine-in, takeout, and online
            orders.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-3">
            What Our Duxbury Guests Love to Order
          </h2>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Pad Thai with shrimp or tofu</li>
            <li>Massaman and Panang Curry with tender meats</li>
            <li>Fresh spring rolls and crispy crab rangoon</li>
            <li>Spicy Drunken Noodles and Basil Fried Rice</li>
            <li>Warm, comforting Thai soups and seasonal ramen</li>
          </ul>

          <p className="text-gray-700 mb-4">
            We can adjust spice levels and accommodate many dietary needs,
            including vegetarian options and some gluten-friendly choices.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-3">
            Thai Takeout &amp; Online Ordering for Duxbury
          </h2>
          <p className="text-gray-700 mb-4">
            Our online ordering makes it easy for Duxbury customers to place
            Thai takeout orders in advance. Browse the menu, choose your
            favorite dishes, and pick up your order in Plymouth when it&apos;s
            ready.
          </p>

          <p className="text-gray-700 mb-4">
            The Mea Thai Cuisine is located at <strong>39 Court St, Plymouth,
            MA 02360</strong>, serving guests from Duxbury, Kingston,
            Marshfield, and the surrounding South Shore communities.
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
