// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import HomePage from "./pages/HomePage";
import TownLandingPage from "./pages/TownLandingPage";

// all your town SEO configs
const townConfigs = [
  {
    path: "/thai-restaurant-kingston-ma",
    town: "Kingston, MA",
    title: "Thai Restaurant Near Kingston, MA | The Mea Thai Cuisine",
    description:
      "Looking for Thai food near Kingston, MA? The Mea Thai Cuisine in nearby Plymouth serves Pad Thai, curries, fried rice, ramen, and more with easy online ordering and takeout.",
    h1: "Thai Restaurant Near Kingston, MA",
    intro:
      "If you live in Kingston, MA and you’ve been searching for authentic Thai food near you, The Mea Thai Cuisine in downtown Plymouth is your go-to spot. We’re a short drive from Kingston and offer fresh Thai dishes made to order for dine-in, takeout, or online ordering.",
    paragraphs: [
      "Our kitchen focuses on bold flavors, fresh ingredients, and consistent quality. From classic Pad Thai and Drunken Noodles to rich Panang and Red Curry, you’ll find something for everyone—whether you like mild, medium, or spicy.",
      "Many of our Kingston customers order ahead online, pick up their Thai food on the way home, or stop in for a relaxed dinner in nearby Plymouth.",
      "We are located at 39 Court St, Plymouth, MA 02360 and proudly serve guests from Kingston, Duxbury, Carver, Pembroke, Marshfield, Bourne, Sandwich, and the South Shore.",
    ],
    bullets: [
      "Pad Thai with chicken, shrimp, or tofu",
      "Drunken Noodles (Pad Kee Mao)",
      "Green, Red, and Panang Curry with jasmine rice",
      "Pineapple Fried Rice",
      "Thai appetizers like spring rolls and crab rangoon",
      "Homemade ramen on select days",
    ],
    ctaLabel: "View Menu & Order Online",
  },
  {
    path: "/thai-food-duxbury-ma",
    town: "Duxbury, MA",
    title: "Thai Food Near Duxbury, MA | The Mea Thai Cuisine",
    description:
      "Searching for Thai food near Duxbury, MA? The Mea Thai Cuisine in Plymouth offers authentic Thai noodles, curries, fried rice, and appetizers, with easy takeout and online ordering.",
    h1: "Thai Food Near Duxbury, MA",
    intro:
      "Residents of Duxbury, MA looking for authentic Thai food are just a short drive away from The Mea Thai Cuisine in Plymouth. Our family-owned restaurant serves classic Thai dishes with fresh vegetables, quality meats, and house-made sauces.",
    paragraphs: [
      "Whether you’re coming from Duxbury Beach, heading home after work, or planning a dinner out, our Thai restaurant in nearby Plymouth is a convenient spot for dine-in, takeout, and online orders.",
      "We can adjust spice levels and offer vegetarian-friendly options, so everyone in your group can find something they love.",
    ],
    bullets: [
      "Pad Thai with shrimp or tofu",
      "Massaman and Panang Curry",
      "Fresh spring rolls and crispy crab rangoon",
      "Spicy Drunken Noodles and Basil Fried Rice",
      "Warm Thai soups and occasional ramen specials",
    ],
    ctaLabel: "View Thai Menu & Order Online",
  },
  {
    path: "/thai-restaurant-carver-ma",
    town: "Carver, MA",
    title: "Thai Restaurant Near Carver, MA | The Mea Thai Cuisine",
    description:
      "Looking for a Thai restaurant near Carver, MA? The Mea Thai Cuisine in Plymouth serves Pad Thai, curries, fried rice, noodles, and appetizers with easy takeout and online ordering.",
    h1: "Thai Restaurant Near Carver, MA",
    intro:
      "If you live in Carver, MA and you’re craving Thai food, The Mea Thai Cuisine in Plymouth is your nearby destination for flavorful curries, noodle dishes, and Thai appetizers.",
    paragraphs: [
      "We prepare every dish fresh to order, using authentic Thai seasonings, herbs, and sauces. From mild, comforting dishes to bold and spicy plates, there’s a flavor profile for everyone.",
      "Many customers from Carver order online, then pick up their food at our convenient Plymouth location. It’s an easy way to bring Thai restaurant quality home without a long wait.",
    ],
    bullets: [
      "Pad Thai and Pad See Ew",
      "Red, Green, and Massaman Curries",
      "Thai fried rice and Basil Fried Rice",
      "Spring rolls, gyoza, and crispy appetizers",
      "Specials like ramen and seasonal Thai dishes",
    ],
    ctaLabel: "Browse Thai Menu & Order",
  },
  {
    path: "/thai-takeout-pembroke-ma",
    town: "Pembroke, MA",
    title: "Thai Takeout Near Pembroke, MA | The Mea Thai Cuisine",
    description:
      "Need Thai takeout near Pembroke, MA? The Mea Thai Cuisine in Plymouth has Pad Thai, curries, noodles, and appetizers with convenient online ordering and pickup.",
    h1: "Thai Takeout Near Pembroke, MA",
    intro:
      "If you’re in Pembroke, MA and looking for Thai takeout, The Mea Thai Cuisine in Plymouth is a convenient option for fresh, flavorful Thai food.",
    paragraphs: [
      "We offer a wide range of Thai dishes—noodles, curries, fried rice, soups, and appetizers—so everyone at your table can find a favorite.",
      "Place your Thai takeout order online, choose your pickup time, and we’ll have your food ready at 39 Court St, Plymouth, MA 02360.",
    ],
    bullets: [
      "Pad Thai and Drunken Noodles",
      "Chicken, beef, shrimp, or tofu curries",
      "Pineapple Fried Rice and Basil Fried Rice",
      "Thai wings, dumplings, and crispy appetizers",
      "Comforting soups and seasonal ramen bowls",
    ],
    ctaLabel: "Order Thai Takeout Online",
  },
  {
    path: "/thai-food-marshfield-ma",
    town: "Marshfield, MA",
    title: "Thai Food Near Marshfield, MA | The Mea Thai Cuisine",
    description:
      "Craving Thai food near Marshfield, MA? The Mea Thai Cuisine in Plymouth serves Pad Thai, curries, noodles, fried rice, and appetizers with dine-in and takeout options.",
    h1: "Thai Food Near Marshfield, MA",
    intro:
      "The Mea Thai Cuisine is a popular spot for guests coming from Marshfield, MA who want flavorful Thai food without going into the city.",
    paragraphs: [
      "Located in nearby Plymouth, we serve classic Thai dishes made with fresh ingredients and authentic seasonings.",
      "Stop in for a relaxed dine-in experience or order Thai takeout and pick it up on your way home from work or the beach.",
    ],
    bullets: [
      "Pad Thai and Pad See Ew",
      "Red, Green, and Panang Curry",
      "Thai fried rice and Basil Fried Rice",
      "Spring rolls, dumplings, and Thai appetizers",
      "Ramen and seasonal special dishes",
    ],
    ctaLabel: "See Thai Menu & Order Online",
  },
  {
    path: "/thai-restaurant-bourne-ma",
    town: "Bourne, MA",
    title: "Thai Restaurant Near Bourne, MA | The Mea Thai Cuisine",
    description:
      "Looking for a Thai restaurant near Bourne, MA? The Mea Thai Cuisine in Plymouth offers Thai curries, noodles, fried rice, and appetizers, with dine-in and takeout available.",
    h1: "Thai Restaurant Near Bourne, MA",
    intro:
      "Coming from Bourne, MA and craving Thai food? The Mea Thai Cuisine in Plymouth is a nearby Thai restaurant where you can enjoy noodles, curries, fried rice, and appetizers in a warm, welcoming atmosphere.",
    paragraphs: [
      "Whether you’re heading over the canal or planning a trip to the South Shore, our restaurant is a convenient stop for lunch, dinner, or Thai takeout.",
      "Many Bourne customers order ahead online and pick up their Thai food at our Plymouth location so it’s hot and ready right when they arrive.",
    ],
    bullets: [
      "Pad Thai, Drunken Noodles, and other Thai noodle dishes",
      "Red, Green, and Massaman curries with jasmine rice",
      "Thai fried rice, Pineapple Fried Rice, and Basil Fried Rice",
      "Appetizers like spring rolls, wings, and dumplings",
      "Ramen specials and seasonal Thai comfort food",
    ],
    ctaLabel: "View Thai Dishes & Order",
  },
  {
    path: "/thai-food-sandwich-ma",
    town: "Sandwich, MA",
    title: "Thai Food Near Sandwich, MA | The Mea Thai Cuisine",
    description:
      "Searching for Thai food near Sandwich, MA? The Mea Thai Cuisine in Plymouth serves Pad Thai, curries, noodles, fried rice, and Thai appetizers for dine-in and takeout.",
    h1: "Thai Food Near Sandwich, MA",
    intro:
      "If you’re in Sandwich, MA and looking for Thai food, The Mea Thai Cuisine in nearby Plymouth is a great option for dine-in or Thai takeout.",
    paragraphs: [
      "Our family-owned Thai restaurant focuses on flavor, consistency, and friendly service. It’s a comfortable place to sit down for a meal or pick up dinner on your way through the South Shore.",
      "We’re located at 39 Court St, Plymouth, MA 02360, serving guests from Sandwich, Bourne, Kingston, Duxbury, and beyond.",
    ],
    bullets: [
      "Pad Thai and Pad See Ew",
      "Coconut-based curries like Panang and Green Curry",
      "Thai fried rice, Pineapple Fried Rice, and Basil Fried Rice",
      "Appetizers such as spring rolls, crab rangoon, and wings",
      "Soup specials and occasional ramen offerings",
    ],
    ctaLabel: "View Thai Menu & Order Online",
  },
];

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* Home SPA (your full restaurant page) */}
          <Route path="/" element={<HomePage />} />

          {/* Town SEO landing pages */}
          {townConfigs.map((cfg) => (
            <Route
              key={cfg.path}
              path={cfg.path}
              element={<TownLandingPage {...cfg} />}
            />
          ))}

          {/* Optional: 404 route could go here */}
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
