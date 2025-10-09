import React from "react";
import ThaiSection from "./layout/ThaiSection";
import ThaiHeading from "./layout/ThaiHeading";

const TrailerSection = () => (
  <ThaiSection id="trailer" className="bg-white">
    <ThaiHeading kicker="On the road">Trailer</ThaiHeading>
    <p className="text-lg text-gray-800 mb-6 text-center max-w-3xl mx-auto">
      Our custom-built 18 ft food trailer is ready for festivals, private parties, and corporate events.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <img
        src="https://rmrstorage.blob.core.windows.net/bb1/MeaTrailer2.jpg"
        alt="Food Trailer Side View"
        className="rounded-xl shadow object-cover w-full h-64"
      />
      <img
        src="https://rmrstorage.blob.core.windows.net/bb1/MeaTrailer1.jpg"
        alt="Food Trailer Serving Window"
        className="rounded-xl shadow object-cover w-full h-64"
      />
    </div>
  </ThaiSection>
);

export default TrailerSection;
