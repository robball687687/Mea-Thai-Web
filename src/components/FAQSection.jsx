import React from "react";
import ThaiSection from "./layout/ThaiSection";
import ThaiHeading from "./layout/ThaiHeading";

const FAQS = [
  ["What are your hours?",
   "We are open from 11:30AM to 3PM. We then close for a one hour break and reopen at 4PM. On Monday through Thursday we close at 9PM (Last order 8:30PM). On Friday and Saturday we close at 9:30PM (Last order 9PM)."],
  ["Do you take reservations?",
   "We do not take reservations but we do accept call ahead seating. Please call thirty minutes before you’d like to dine in."],
  ["Do you serve beer and wine?",
   "Yes. We offer Thai beers (Singha/Leo), local brews, wine curated by a third-party expert, and select mixed drinks."],
  ["Do you have gluten free options?",
   "Yes. Pad Thai and all curries are gluten-free as is. Many other dishes can be made GF—please inform your server."],
  ["Can I customize dishes?",
   "We cook to order and can accommodate reasonable changes or allergies. We don’t create fully off-menu items."],
  ["Do you deliver?",
   "Yes—via Grubhub and DoorDash."],
  ["Do you offer catering?",
   "Yes. Please call a few days in advance and we’ll plan the perfect menu."],
  ["Do you offer coupons?",
   "Join our mailing list to receive weekly coupons and specials."],
];

const FAQSection = () => (
  <ThaiSection id="faq" className="bg-white">
    <ThaiHeading kicker="Good to know">FAQ</ThaiHeading>
    <div className="mx-auto max-w-3xl divide-y divide-gray-200 rounded-2xl border border-gray-100 bg-white overflow-hidden">
      {FAQS.map(([q, a], idx) => (
        <details key={idx} className="group open:bg-gray-50">
          <summary className="cursor-pointer list-none p-5 text-gray-900 font-medium flex items-start justify-between">
            <span>{q}</span>
            <span className="ml-4 text-red-600 transition group-open:rotate-90">›</span>
          </summary>
          <div className="px-5 pb-5 -mt-2 text-gray-700">{a}</div>
        </details>
      ))}
    </div>
  </ThaiSection>
);

export default FAQSection;
