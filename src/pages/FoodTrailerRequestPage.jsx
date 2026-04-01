import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import SiteHeader from "../components/SiteHeader";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { ThaiPaperBackground, Section } from "../components/layout/Sections";
import trailerScheduleApi from "../api/trailerScheduleApi";

const initialForm = {
  requestedDate: "",
  requestedStartTime: "",
  requestedEndTime: "",
  locationName: "",
  address1: "",
  address2: "",
  city: "",
  state: "MA",
  zipCode: "",
  requesterName: "",
  requesterPhone: "",
  requesterEmail: "",
  organizationName: "",
  eventName: "",
  guestCount: "",
  message: "",
};

export default function FoodTrailerRequestPage() {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const orderLink = "https://polite-mud-02f9f1a0f.6.azurestaticapps.net";
  const isOrderingEnabled = true;

  const updateField = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setSaving(true);

      await trailerScheduleApi.requestDate({
        requestedDate: form.requestedDate,
        requestedStartTime: form.requestedStartTime || null,
        requestedEndTime: form.requestedEndTime || null,
        locationName: form.locationName,
        address1: form.address1 || null,
        address2: form.address2 || null,
        city: form.city || null,
        state: form.state || null,
        zipCode: form.zipCode || null,
        requesterName: form.requesterName,
        requesterPhone: form.requesterPhone || null,
        requesterEmail: form.requesterEmail,
        organizationName: form.organizationName || null,
        eventName: form.eventName || null,
        guestCount: form.guestCount ? parseInt(form.guestCount, 10) : null,
        message: form.message || null,
      });

      setSuccess("Your trailer request has been submitted. We’ll review it and get back to you.");
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      setError("Sorry, we couldn’t submit your request right now. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ThaiPaperBackground>
      <Helmet>
        <title>Request the Food Trailer | The Mea Thai Cuisine</title>
        <meta
          name="description"
          content="Request The Mea Thai Cuisine food trailer for your private event, festival, party, brewery, or corporate gathering."
        />
      </Helmet>

      <SiteHeader
        orderLink={orderLink}
        isOrderingEnabled={isOrderingEnabled}
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
      />

      <Section tone="warm">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl bg-white/85 backdrop-blur-sm shadow-sm p-8">
            <p className="uppercase tracking-[0.2em] text-sm text-red-600 font-semibold mb-2">
              Book the trailer
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Request The Mea Thai Cuisine Food Trailer
            </h1>

            <p className="text-gray-700 mb-8">
              Planning a private party, employee appreciation event, community
              gathering, brewery night, or festival? Send us your event details
              and we’ll review the request.
            </p>

            {success && (
              <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-800 px-4 py-3">
                {success}
              </div>
            )}

            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 text-red-700 px-4 py-3">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Requested Date
                  </label>
                  <input
                    type="date"
                    value={form.requestedDate}
                    onChange={updateField("requestedDate")}
                    required
                    className="w-full rounded-xl border border-stone-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Event Name
                  </label>
                  <input
                    type="text"
                    value={form.eventName}
                    onChange={updateField("eventName")}
                    placeholder="Example: Summer Concert Series"
                    className="w-full rounded-xl border border-stone-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Requested Start Time
                  </label>
                  <input
                    type="datetime-local"
                    value={form.requestedStartTime}
                    onChange={updateField("requestedStartTime")}
                    className="w-full rounded-xl border border-stone-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Requested End Time
                  </label>
                  <input
                    type="datetime-local"
                    value={form.requestedEndTime}
                    onChange={updateField("requestedEndTime")}
                    className="w-full rounded-xl border border-stone-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Location Name
                  </label>
                  <input
                    type="text"
                    value={form.locationName}
                    onChange={updateField("locationName")}
                    required
                    className="w-full rounded-xl border border-stone-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    value={form.organizationName}
                    onChange={updateField("organizationName")}
                    className="w-full rounded-xl border border-stone-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Address 1
                </label>
                <input
                  type="text"
                  value={form.address1}
                  onChange={updateField("address1")}
                  className="w-full rounded-xl border border-stone-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={updateField("city")}
                    className="w-full rounded-xl border border-stone-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={form.state}
                    onChange={updateField("state")}
                    className="w-full rounded-xl border border-stone-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    value={form.zipCode}
                    onChange={updateField("zipCode")}
                    className="w-full rounded-xl border border-stone-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={form.requesterName}
                    onChange={updateField("requesterName")}
                    required
                    className="w-full rounded-xl border border-stone-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.requesterEmail}
                    onChange={updateField("requesterEmail")}
                    required
                    className="w-full rounded-xl border border-stone-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={form.requesterPhone}
                    onChange={updateField("requesterPhone")}
                    className="w-full rounded-xl border border-stone-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Estimated Guest Count
                  </label>
                  <input
                    type="number"
                    value={form.guestCount}
                    onChange={updateField("guestCount")}
                    className="w-full rounded-xl border border-stone-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Event Details / Message
                </label>
                <textarea
                  value={form.message}
                  onChange={updateField("message")}
                  rows={5}
                  className="w-full rounded-xl border border-stone-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center rounded-full bg-red-600 text-white font-bold px-8 py-3 hover:bg-red-700 transition disabled:opacity-60"
                >
                  {saving ? "Submitting..." : "Submit Trailer Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Section>

      <ScrollToTopButton show />
    </ThaiPaperBackground>
  );
}