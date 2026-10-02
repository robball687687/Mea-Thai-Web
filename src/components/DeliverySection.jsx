import React, { useState } from "react";
import ThaiSection from "./layout/ThaiSection";
import ThaiHeading from "./layout/ThaiHeading";

const DeliverySection = () => {
  const [deliveryUrl, setDeliveryUrl] = useState("");
  const [deliveryName, setDeliveryName] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeliveryClick = (name, url) => {
    setDeliveryName(name);
    setDeliveryUrl(url);
    setShowConfirm(true);
  };

  const handleConfirmDelivery = () => {
    window.open(deliveryUrl, "_blank", "noopener,noreferrer");
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setDeliveryUrl("");
    setDeliveryName("");
  };

  return (
    <>
      <ThaiSection id="delivery" className="bg-white">
        <ThaiHeading kicker="Order online">
          Pickup or Delivery
        </ThaiHeading>

        <p className="mx-auto max-w-3xl text-center text-gray-700 text-lg">
          Ordering for pickup? Order directly through The Mea Thai Cuisine to
          avoid third-party fees. DoorDash and Grubhub are available for
          delivery only.
        </p>

        {/* Direct Pickup Ordering */}
        <div className="mt-8">
          <a
            href="https://polite-mud-02f9f1a0f.6.azurestaticapps.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border-2 border-red-500 bg-red-50 p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-red-600 text-white grid place-content-center text-sm font-bold">
                MEA
              </div>

              <div>
                <div className="text-lg font-bold text-gray-900">
                  Order Directly from The Mea Thai Cuisine
                </div>

                <div className="text-sm text-gray-700 mt-1">
                  Pickup orders • No third-party ordering fees
                </div>
              </div>

              <span className="ml-auto text-red-600 text-xl group-hover:translate-x-1 transition">
                →
              </span>
            </div>
          </a>
        </div>

        {/* Third Party Delivery */}
        <div className="mt-10 text-center">
          <h3 className="text-xl font-bold text-gray-900">
            Need Delivery?
          </h3>

          <p className="mt-2 mx-auto max-w-2xl text-gray-600">
            DoorDash and Grubhub are third-party delivery services.
            Prices may be approximately 25% higher, and additional delivery
            and service fees may apply.
          </p>

          <p className="mt-2 text-sm font-semibold text-red-600">
            DoorDash and Grubhub are for delivery only. Pickup orders placed
            through a third-party service will be canceled.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() =>
              handleDeliveryClick(
                "DoorDash",
                "https://order.online/store/30396475?delivery=true&redirected=true"
              )
            }
            className="group text-left rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-50 grid place-content-center text-sm font-semibold">
                DD
              </div>

              <div>
                <div className="font-semibold text-gray-900">
                  DoorDash
                </div>
                <div className="text-sm text-gray-600">
                  Delivery only
                </div>
              </div>

              <span className="ml-auto text-red-600 group-hover:translate-x-1 transition">
                →
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() =>
              handleDeliveryClick(
                "Grubhub",
                "https://themeathaicuisine.dine.online/locations/8051832?fulfillment=delivery"
              )
            }
            className="group text-left rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-50 grid place-content-center text-sm font-semibold">
                GH
              </div>

              <div>
                <div className="font-semibold text-gray-900">
                  Grubhub
                </div>
                <div className="text-sm text-gray-600">
                  Delivery only
                </div>
              </div>

              <span className="ml-auto text-red-600 group-hover:translate-x-1 transition">
                →
              </span>
            </div>
          </button>
        </div>
      </ThaiSection>

      {/* Delivery Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl">
                🚗
              </div>

              <h2 className="text-2xl font-bold text-gray-900">
                Delivery Only
              </h2>

              <p className="mt-3 text-gray-700">
                You are about to order through{" "}
                <strong>{deliveryName}</strong>.
              </p>

              <p className="mt-3 text-gray-700">
                This service is for <strong>delivery orders only</strong>.
                Third-party prices may be approximately 25% higher, and
                additional service and delivery fees may apply.
              </p>

              <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
                Pickup orders placed through DoorDash or Grubhub will be
                canceled.
              </div>

              <p className="mt-4 text-sm text-gray-600">
                Want pickup instead? Order directly through The Mea Thai
                Cuisine to avoid third-party ordering fees.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleConfirmDelivery}
                className="w-full rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 transition"
              >
                Yes, Continue to {deliveryName} for Delivery
              </button>

              <a
                href="https://polite-mud-02f9f1a0f.6.azurestaticapps.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900 hover:bg-gray-50 transition"
                onClick={() => setShowConfirm(false)}
              >
                I Want Pickup — Order Directly
              </a>

              <button
                type="button"
                onClick={handleCancel}
                className="text-sm font-medium text-gray-500 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeliverySection;