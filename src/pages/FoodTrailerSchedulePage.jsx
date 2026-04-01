import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import trailerScheduleApi from "../api/trailerScheduleApi";
import SiteHeader from "../components/SiteHeader";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { ThaiPaperBackground, Section } from "../components/layout/Sections";

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function formatTime(value) {
  if (!value) return "";
  return new Date(value).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function FoodTrailerSchedulePage() {
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const orderLink = "https://polite-mud-02f9f1a0f.6.azurestaticapps.net";
  const isOrderingEnabled = true;

  const range = useMemo(() => {
    const start = new Date();
    const end = new Date();
    end.setMonth(end.getMonth() + 6);

    return {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        const data = await trailerScheduleApi.getPublicSchedule(
          range.startDate,
          range.endDate
        );
        if (mounted) setDates(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load schedule:", err);
        if (mounted) setDates([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [range.endDate, range.startDate]);

  return (
    <ThaiPaperBackground>
      <Helmet>
        <title>Food Trailer Schedule | The Mea Thai Cuisine</title>
        <meta
          name="description"
          content="See where The Mea Thai Cuisine food trailer will be next. Browse upcoming dates, events, and locations."
        />
      </Helmet>

      <SiteHeader
        orderLink={orderLink}
        isOrderingEnabled={isOrderingEnabled}
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
      />

      <Section tone="warm">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-sm p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="uppercase tracking-[0.2em] text-sm text-red-600 font-semibold mb-2">
                  On the road
                </p>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                  Food Trailer Schedule
                </h1>
                <p className="text-gray-700 mt-3 max-w-2xl">
                  Find upcoming breweries, festivals, community events, and pop-up
                  locations where The Mea Thai Cuisine trailer will be serving.
                </p>
              </div>

              <Link
                to="/food-trailer/request"
                className="inline-flex items-center justify-center rounded-full bg-red-600 text-white font-bold px-6 py-3 hover:bg-red-700 transition"
              >
                Request the Trailer
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="grid gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white/80 shadow-sm p-6 animate-pulse"
                >
                  <div className="h-4 bg-stone-200 rounded w-1/4 mb-4" />
                  <div className="h-6 bg-stone-200 rounded w-1/2 mb-3" />
                  <div className="h-4 bg-stone-200 rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : dates.length === 0 ? (
            <div className="rounded-2xl bg-white/80 shadow-sm p-10 text-center">
              <h2 className="text-2xl font-bold mb-2">No upcoming public dates yet</h2>
              <p className="text-gray-600 mb-6">
                We’re updating the trailer calendar. Check back soon or request us
                for your event.
              </p>
              <Link
                to="/food-trailer/request"
                className="inline-flex items-center justify-center rounded-full bg-red-600 text-white font-bold px-6 py-3 hover:bg-red-700 transition"
              >
                Request a Date
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {dates.map((item) => (
                <div
                  key={item.meaFTScheduleId}
                  className="rounded-2xl bg-white/85 backdrop-blur-sm shadow-sm border border-stone-200 p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div>
                      <div className="text-sm font-bold uppercase tracking-wide text-red-600 mb-2">
                        {formatDate(item.eventDate)}
                      </div>

                      <h2 className="text-2xl font-bold text-gray-900">
                        {item.eventName || item.locationName}
                      </h2>

                      <p className="text-lg text-gray-800 mt-1">
                        {item.locationName}
                      </p>

                      <p className="text-gray-600 mt-1">
                        {[item.address1, item.city, item.state]
                          .filter(Boolean)
                          .join(", ")}
                      </p>

                      {(item.startTime || item.endTime) && (
                        <p className="text-sm text-gray-500 mt-2">
                          {item.startTime ? formatTime(item.startTime) : ""}
                          {item.endTime ? ` - ${formatTime(item.endTime)}` : ""}
                        </p>
                      )}

                      {item.notes && (
                        <p className="text-gray-700 mt-4 max-w-3xl">{item.notes}</p>
                      )}
                    </div>

                    <div className="shrink-0">
                      <span className="inline-flex rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold px-4 py-2 border border-emerald-200">
                        {item.status || "Scheduled"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>

      <ScrollToTopButton show />
    </ThaiPaperBackground>
  );
}