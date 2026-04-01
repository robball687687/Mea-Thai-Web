import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ThaiSection from "./layout/ThaiSection";
import ThaiHeading from "./layout/ThaiHeading";
import trailerScheduleApi from "../api/trailerScheduleApi";

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  return d.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatTime(value) {
  if (!value) return "";
  const d = new Date(value);
  return d.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function TrailerSection() {
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);

  const range = useMemo(() => {
    const start = new Date();
    const end = new Date();
    end.setMonth(end.getMonth() + 3);

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
        if (mounted) {
          setDates(Array.isArray(data) ? data.slice(0, 6) : []);
        }
      } catch (err) {
        console.error("Failed to load public trailer schedule:", err);
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
    <ThaiSection id="trailer" className="bg-white">
      <ThaiHeading kicker="On the road">Food Trailer</ThaiHeading>

      <p className="text-lg text-gray-800 mb-8 text-center max-w-3xl mx-auto">
        Our custom-built food trailer is available for festivals, private
        parties, breweries, neighborhood events, and corporate gatherings.
        Check out where we’ll be next — or request a date for your event.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <img
              src="https://rmrstorage.blob.core.windows.net/bb1/MeaTrailer2.jpg"
              alt="The Mea Thai Cuisine food trailer side view"
              className="rounded-2xl shadow object-cover w-full h-64"
            />
            <img
              src="https://rmrstorage.blob.core.windows.net/bb1/MeaTrailer1.jpg"
              alt="The Mea Thai Cuisine food trailer serving window"
              className="rounded-2xl shadow object-cover w-full h-64"
            />
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 text-white p-6 shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Book the trailer</h3>
            <p className="text-white/90 mb-4">
              Want The Mea Thai Cuisine at your event? We cater private parties,
              brewery pop-ups, community events, employee appreciation days, and
              more.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/food-trailer/request"
                className="inline-flex items-center justify-center rounded-full bg-white text-red-700 font-bold px-6 py-3 hover:bg-red-50 transition"
              >
                Request the Trailer
              </Link>

              <Link
                to="/food-trailer/schedule"
                className="inline-flex items-center justify-center rounded-full border border-white/70 text-white font-semibold px-6 py-3 hover:bg-white/10 transition"
              >
                View Full Schedule
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-stone-50 border border-stone-200 shadow-sm p-6">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Upcoming Stops</h3>
              <p className="text-sm text-gray-600">
                Where the trailer will be over the next few months
              </p>
            </div>
            <Link
              to="/food-trailer/schedule"
              className="text-red-600 hover:text-red-700 font-semibold text-sm"
            >
              See all →
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-white border border-stone-200 p-4 animate-pulse"
                >
                  <div className="h-4 bg-stone-200 rounded w-1/3 mb-3" />
                  <div className="h-5 bg-stone-200 rounded w-2/3 mb-2" />
                  <div className="h-4 bg-stone-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : dates.length === 0 ? (
            <div className="rounded-xl bg-white border border-dashed border-stone-300 p-6 text-center">
              <p className="text-gray-700 font-medium mb-2">
                New stops coming soon
              </p>
              <p className="text-sm text-gray-500 mb-4">
                We’re adding more trailer dates. Check back soon or request your
                own event date.
              </p>
              <Link
                to="/food-trailer/request"
                className="inline-flex items-center justify-center rounded-full bg-red-600 text-white font-semibold px-5 py-2.5 hover:bg-red-700 transition"
              >
                Request a Date
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {dates.map((item) => (
                <div
                  key={item.meaFTScheduleId}
                  className="rounded-xl bg-white border border-stone-200 p-4 hover:shadow-md transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-wide text-red-600 mb-1">
                        {formatDate(item.eventDate)}
                      </div>

                      <h4 className="text-lg font-bold text-gray-900">
                        {item.eventName || item.locationName}
                      </h4>

                      <p className="text-gray-700">
                        {item.locationName}
                        {item.city ? ` • ${item.city}` : ""}
                        {item.state ? `, ${item.state}` : ""}
                      </p>

                      {(item.startTime || item.endTime) && (
                        <p className="text-sm text-gray-500 mt-1">
                          {item.startTime ? formatTime(item.startTime) : ""}
                          {item.endTime ? ` - ${formatTime(item.endTime)}` : ""}
                        </p>
                      )}

                      {item.notes && (
                        <p className="text-sm text-gray-600 mt-2">{item.notes}</p>
                      )}
                    </div>

                    <div>
                      <span className="inline-flex rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 border border-emerald-200">
                        {item.status || "Scheduled"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ThaiSection>
  );
}