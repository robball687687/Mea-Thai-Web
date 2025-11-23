// src/pages/towns/ThaiKingstonPage.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

export default function ThaiKingstonPage() {
  const siteUrl = "https://the-mea-thai-cuisine.com/thai-restaurant-kingston-ma";

  return (
    <>
      <Helmet>
        <title>Thai Restaurant Near Kingston, MA | The Mea Thai Cuisine</title>
        <meta
          name="description"
          content="Looking for Thai food near Kingston, MA? The Mea Thai Cuisine in nearby Plymouth serves Pad Thai, curries, fried rice, ramen, and more with easy online ordering and takeout."
        />
        <link rel="canonical" href={siteUrl} />
      </Helmet>

      <main className="min-h-screen bg-stone-50">
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Thai Restaurant Near Kingston, MA
          </h1>
          <p className="text-gray-700 mb-4">
            If you live in Kingston, MA and you’ve been searching for{" "}
            <strong>authentic Thai food near you</strong>, The Mea Thai
            Cuisine in downtown Plymouth is your go-to spot. We&apos;re a
            short drive from Kingston and offer fresh Thai dishes made to
            order, perfect for dine-in, takeout, or convenient online ordering.
          </p>
          <p className="text-gray-700 mb-4">
            Our kitchen focuses on bold flavors, fresh ingredients, and
            consistent quality. From classic <strong>Pad Thai</strong> and{" "}
            <strong>Drunken Noodles</strong> to rich <strong>Panang</strong>{" "}
            and <strong>Red Curry</strong>, you&apos;ll find something for
            everyone—whether you like mild, medium, or spicy.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-3">
            Popular Thai Dishes for Kingston Guests
          </h2>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Pad Thai with chicken, shrimp, or tofu</li>
            <li>Drunken Noodles (Pad Kee Mao) with extra spice</li>
            <li>Green Curry and Red Curry with jasmine rice</li>
            <li>Pineapple Fried Rice with cashews and veggies</li>
            <li>Homemade ramen on select days and specials</li>
            <li>Thai appetizers like spring rolls and crab rangoon</li>
          </ul>

          <p className="text-gray-700 mb-4">
            Many of our Kingston customers order ahead online, pick up their
            Thai food on the way home, or stop in for a relaxed dinner in
            nearby Plymouth.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-3">
            Easy Thai Takeout for Kingston, MA
          </h2>
          <p className="text-gray-700 mb-4">
            Craving Thai takeout in Kingston? You can browse our full menu,
            customize your order, and schedule pickup with just a few clicks.
            Our online ordering system is fast and easy, so your food is ready
            when you arrive.
          </p>

          <p className="text-gray-700 mb-4">
            We&apos;re proud to serve guests from Kingston, Duxbury, Carver,
            Pembroke, and the entire South Shore from our location at{" "}
            <strong>39 Court St, Plymouth, MA 02360</strong>.
          </p>

          <div className="mt-6">
            <a
              href="https://the-mea-thai-cuisine.com"
              className="inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-red-700 transition"
            >
              View Menu &amp; Order Online
            </a>
          </div>

          {/* Helpful alt text ideas for images on this page:
              - alt="Pad Thai near Kingston MA at The Mea Thai Cuisine"
              - alt="Thai curry and noodles close to Kingston Massachusetts"
              - alt="Thai takeout for Kingston MA from The Mea Thai Cuisine in Plymouth"
          */}
        </section>
      </main>
    </>
  );
}
