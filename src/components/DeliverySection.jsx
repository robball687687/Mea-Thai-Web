import React from "react";
import ThaiSection from "./layout/ThaiSection";
import ThaiHeading from "./layout/ThaiHeading";

const DeliverySection = () => (
  <ThaiSection id="delivery" className="bg-white">
    <ThaiHeading kicker="Order from home">Delivery</ThaiHeading>
    <p className="mx-auto max-w-2xl text-center text-gray-700 text-lg">
      Fast, fresh, and authentic Thai dishes delivered to your door.
    </p>

    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <a
        href="https://order.online/business/the-mea-thai-cuisine-13045370"
        target="_blank"
        rel="noopener noreferrer"
        className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
      >
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gray-50 grid place-content-center text-sm font-semibold">
            DD
          </div>
          <div>
            <div className="font-semibold text-gray-900">DoorDash</div>
            <div className="text-sm text-gray-600">Order for delivery</div>
          </div>
          <span className="ml-auto text-red-600 group-hover:translate-x-1 transition">→</span>
        </div>
      </a>

      <a
        href="https://themeathaicuisine.dine.online/"
        target="_blank"
        rel="noopener noreferrer"
        className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
      >
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gray-50 grid place-content-center text-sm font-semibold">
            GH
          </div>
          <div>
            <div className="font-semibold text-gray-900">Grubhub</div>
            <div className="text-sm text-gray-600">Order for delivery</div>
          </div>
          <span className="ml-auto text-red-600 group-hover:translate-x-1 transition">→</span>
        </div>
      </a>
    </div>
  </ThaiSection>
);

export default DeliverySection;
