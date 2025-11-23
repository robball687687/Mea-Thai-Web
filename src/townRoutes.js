import TownLandingPage from "./pages/TownLandingPage";

export const townConfigs = [
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
      "We are located at 39 Court St, Plymouth, MA 02360 and proudly serve guests from Kingston, Duxbury, Carver, Pembroke, Marshfield, Bourne, Sandwich, and the South Shore."
    ],
    bullets: [
      "Pad Thai with chicken, shrimp, or tofu",
      "Drunken Noodles (Pad Kee Mao)",
      "Green, Red, and Panang Curry with jasmine rice",
      "Pineapple Fried Rice",
      "Thai appetizers like spring rolls and crab rangoon",
      "Homemade ramen on select days"
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

  // 👉 Add Carver, Pembroke, Marshfield, Bourne, Sandwich here
  // using the content we already wrote; just follow the same shape.
];

export function townRoutes() {
  return townConfigs.map((cfg) => ({
    path: cfg.path,
    element: <TownLandingPage key={cfg.path} {...cfg} />,
    linkLabel: cfg.h1, // optional for internal linking
  }));
}
