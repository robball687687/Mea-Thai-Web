import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
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
    year: "numeric",
  });
}

function formatTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function normalizeDateOnly(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

function isSameDay(a, b) {
  return normalizeDateOnly(a) === normalizeDateOnly(b);
}

export default function FoodTrailerSchedulePage() {
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

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

        if (!mounted) return;

        const safeData = Array.isArray(data) ? data : [];
        setDates(safeData);

        if (safeData.length > 0) {
          const firstUpcoming =
            safeData
              .map((x) => new Date(x.eventDate))
              .filter((d) => !Number.isNaN(d.getTime()))
              .sort((a, b) => a - b)[0] || new Date();

          setSelectedDate(firstUpcoming);
        }
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

  const eventsByDay = useMemo(() => {
    return dates.reduce((acc, item) => {
      const key = normalizeDateOnly(item.eventDate);
      if (!key) return acc;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
  }, [dates]);

  const selectedDayEvents = useMemo(() => {
    const key = normalizeDateOnly(selectedDate);
    return eventsByDay[key] || [];
  }, [eventsByDay, selectedDate]);

  const upcomingEvents = useMemo(() => {
    return [...dates].sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
  }, [dates]);

  return (
    <ThaiPaperBackground>
      <Helmet>
        <title>Food Trailer Schedule | The Mea Thai Cuisine</title>
        <meta
          name="description"
          content="See where The Mea Thai Cuisine food trailer will be next. Browse upcoming dates, events, and locations on our event calendar."
        />
      </Helmet>

      <SiteHeader
        orderLink={orderLink}
        isOrderingEnabled={isOrderingEnabled}
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
      />

      <Section tone="warm">
        <div className="max-w-6xl mx-auto">
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
                  Tap a date on the calendar to see where The Mea Thai Cuisine trailer
                  will be serving next.
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
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
              <div className="rounded-3xl bg-white/85 shadow-sm p-6 animate-pulse min-h-[420px]" />
              <div className="rounded-3xl bg-white/85 shadow-sm p-6 animate-pulse min-h-[420px]" />
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
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
              <div className="rounded-3xl bg-white/85 backdrop-blur-sm shadow-sm border border-stone-200 p-4 md:p-6 overflow-hidden">
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  minDetail="month"
                  prev2Label={null}
                  next2Label={null}
                  className="w-full border-0"
                  tileClassName={({ date, view }) => {
                    if (view !== "month") return "";
                    const key = normalizeDateOnly(date);
                    return eventsByDay[key]
                      ? "!bg-red-50 !text-red-700 font-bold rounded-xl"
                      : "rounded-xl";
                  }}
                  tileContent={({ date, view }) => {
                    if (view !== "month") return null;
                    const key = normalizeDateOnly(date);
                    const count = eventsByDay[key]?.length || 0;

                    if (!count) return null;

                    return (
                      <div className="mt-1 flex justify-center">
                        <span className="inline-flex items-center justify-center min-w-[22px] h-5 px-1 rounded-full bg-red-600 text-white text-[10px] font-bold">
                          {count}
                        </span>
                      </div>
                    );
                  }}
                />

                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-600 inline-block" />
                    Event date
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-stone-300 inline-block" />
                    Select a day to view details
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white/85 backdrop-blur-sm shadow-sm border border-stone-200 p-6">
                <div className="mb-4">
                  <p className="uppercase tracking-[0.2em] text-xs text-red-600 font-semibold mb-2">
                    Selected date
                  </p>
                  <h2 className="text-2xl font-extrabold text-gray-900">
                    {formatDate(selectedDate)}
                  </h2>
                </div>

                {selectedDayEvents.length === 0 ? (
                  <div className="rounded-2xl bg-stone-50 border border-stone-200 p-5">
                    <p className="text-gray-700 font-medium">No public event on this day.</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Pick another highlighted date on the calendar.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedDayEvents.map((item) => (
                      <div
                        key={item.meaFTScheduleId}
                        className="rounded-2xl border border-stone-200 bg-stone-50 p-5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {item.eventName || item.locationName}
                            </h3>
                            <p className="text-gray-800 mt-1">{item.locationName}</p>
                          </div>

                          <span className="inline-flex rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 border border-emerald-200 whitespace-nowrap">
                            {item.status || "Scheduled"}
                          </span>
                        </div>

                        <p className="text-gray-600 mt-3">
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
                          <p className="text-gray-700 mt-4 leading-relaxed">{item.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {upcomingEvents.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-stone-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      Next upcoming dates
                    </h3>
                    <div className="space-y-3">
                      {upcomingEvents.slice(0, 4).map((item) => (
                        <button
                          key={`quick-${item.meaFTScheduleId}`}
                          type="button"
                          onClick={() => setSelectedDate(new Date(item.eventDate))}
                          className={`w-full text-left rounded-2xl border p-4 transition ${
                            isSameDay(item.eventDate, selectedDate)
                              ? "border-red-300 bg-red-50"
                              : "border-stone-200 bg-white hover:bg-stone-50"
                          }`}
                        >
                          <div className="text-sm font-bold text-red-600">
                            {formatDate(item.eventDate)}
                          </div>
                          <div className="text-gray-900 font-semibold mt-1">
                            {item.eventName || item.locationName}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {item.locationName}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Section>

      <ScrollToTopButton show />
    </ThaiPaperBackground>
  );
}