import React from "react";

export default function VirtualTour() {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-sm">
      <div className="aspect-video bg-black/5 flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-xl font-semibold mb-2">Step inside our dining room</p>
          <p className="text-neutral-600 mb-4">(Embed a 360° panorama or virtual tour here)</p>
          <a
            href="https://www.youtube.com/watch?v=LXb3EKWsInQ" // sample 360
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700"
          >
            Open 360° Tour
          </a>
        </div>
      </div>
    </div>
  );
}
