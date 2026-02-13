// src/components/NewsSection.jsx
import React, { useEffect, useState } from "react";
import ThaiSection from "./layout/ThaiSection";
import ThaiHeading from "./layout/ThaiHeading";
import newsApi from "../api/newsApi";
import NewsCommentsModal from "./news/NewsCommentsModal";

const fmtDate = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export default function NewsSection({ take = 5 }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // controls which item is open (0 = first item)
  const [openIndex, setOpenIndex] = useState(0);

  // modal state (comments)
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [activePost, setActivePost] = useState(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const latest = await newsApi.getLatest(take);
        if (!alive) return;

        const arr = Array.isArray(latest) ? latest : [];
        setNews(arr);

        // default to first item open when new data loads
        setOpenIndex(arr.length ? 0 : -1);
      } catch (e) {
        console.error("Failed to load news:", e);
        if (!alive) return;
        setNews([]);
        setOpenIndex(-1);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [take]);

  return (
    <ThaiSection id="news" className="bg-white">
      <ThaiHeading kicker="Latest updates">News</ThaiHeading>

      <div className="mx-auto max-w-3xl rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-5 text-sm text-gray-600">Loading updates…</div>
        ) : news.length === 0 ? (
          <div className="p-5 text-sm text-gray-600">
            No updates right now — check back soon (Thai Wife is always cooking
            up something 😄).
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {news.map((p, idx) => {
              const dt = p?.publishedUtc || p?.createdUtc;
              const dateLabel = fmtDate(dt);
              const isOpen = openIndex === idx;

              return (
                <details
                  key={p.blogPostId}
                  className="group open:bg-gray-50"
                  open={isOpen} // controlled
                >
                  <summary
                    className="cursor-pointer list-none p-5 text-gray-900 flex items-start justify-between gap-4"
                    onClick={(e) => {
                      // 🔥 stop the browser from doing its own <details> toggle
                      // we control open state via React to guarantee only one open
                      e.preventDefault();
                      e.stopPropagation();

                      setOpenIndex((prev) => (prev === idx ? -1 : idx));
                    }}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {dateLabel ? (
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-black/5 text-gray-700">
                            {dateLabel}
                          </span>
                        ) : (
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-black/5 text-gray-700">
                            Update
                          </span>
                        )}

                        {!isOpen && idx > 0 && (
                          <span className="text-[11px] font-semibold uppercase tracking-wide text-red-700">
                            Expand
                          </span>
                        )}
                      </div>

                      <div className="mt-1 font-semibold group-open:text-red-700 truncate">
                        {p.title}
                      </div>

                      {!!p.excerpt && (
                        <div className="mt-1 text-sm text-gray-600 line-clamp-2">
                          {p.excerpt}
                        </div>
                      )}
                    </div>

                    <span className="ml-4 shrink-0 flex items-center gap-2">
                      {!isOpen ? (
                        <span className="text-[11px] text-red-700 font-semibold">
                          View ▾
                        </span>
                      ) : (
                        <span className="text-[11px] text-gray-500 font-semibold">
                          Close ▴
                        </span>
                      )}

                      <span className="text-red-600 transition group-open:rotate-90">
                        ›
                      </span>
                    </span>
                  </summary>

                  <div className="px-5 pb-5 -mt-2 text-gray-700">
                    {p.contentHtml ? (
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: p.contentHtml }}
                      />
                    ) : (
                      <div className="text-sm">
                        {p.excerpt || "More details coming soon…"}
                      </div>
                    )}

                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        className="text-sm font-semibold text-red-700 hover:text-red-800 underline underline-offset-4"
                        onClick={(e) => {
                          // prevent summary/details toggling
                          e.preventDefault();
                          e.stopPropagation();
                          setActivePost(p);
                          setCommentsOpen(true);
                        }}
                      >
                        Comments / Replies →
                      </button>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        )}
      </div>

      <NewsCommentsModal
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        blogPostId={activePost?.blogPostId || 0}
        title={activePost?.title || ""}
      />
    </ThaiSection>
  );
}
