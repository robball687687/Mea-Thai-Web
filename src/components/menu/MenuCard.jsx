import React, { useEffect, useMemo, useState } from "react";

const FALLBACK_IMAGE =
  "https://rmrstorage.blob.core.windows.net/measite/MeaLogoBlackTrans.png";

const getImageUrl = (img) => {
  if (!img) return null;
  if (typeof img === "string") return img;

  return (
    img.displayImage ||
    img.imageUrl ||
    img.url ||
    img.thumbnailUrl ||
    img.src ||
    null
  );
};

const MenuCard = ({ item, onHoverItem }) => {
  const price = Number(item.basePrice || 0);
  const hasOptions = Array.isArray(item.options) && item.options.length > 0;

  const priceLabel =
    price > 0
      ? `$${price.toFixed(2)}`
      : hasOptions
        ? "Customizable"
        : "Ask for Price";

  const images = useMemo(() => {
    const rawImages = [
      ...(Array.isArray(item.images) ? item.images : []),
      ...(Array.isArray(item.menuItemImages) ? item.menuItemImages : []),
      ...(Array.isArray(item.imageUrls) ? item.imageUrls : []),
      item.displayImage,
    ];

    const normalized = rawImages
      .map(getImageUrl)
      .filter(Boolean)
      .filter((url, index, arr) => arr.indexOf(url) === index);

    return normalized.length ? normalized : [FALLBACK_IMAGE];
  }, [item]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [item?.menuItemId, item?.name]);

  const currentImage = images[activeImageIndex] || FALLBACK_IMAGE;
  const hasMultipleImages = images.length > 1;

  const goPrev = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goNext = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div
      className="group bg-white rounded-3xl border border-red-100/60 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
      onMouseEnter={() => onHoverItem?.(item.name)}
    >
      <div className="relative bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="aspect-[4/3] w-full overflow-hidden relative">
          <img
            src={currentImage}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_IMAGE;
            }}
            alt={item.name || "Menu item"}
            loading="lazy"
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          />

          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur border border-red-100 shadow hover:bg-white text-gray-700 flex items-center justify-center transition opacity-0 group-hover:opacity-100"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur border border-red-100 shadow hover:bg-white text-gray-700 flex items-center justify-center transition opacity-0 group-hover:opacity-100"
              >
                ›
              </button>
            </>
          )}
        </div>

        <div className="absolute bottom-3 right-3">
          <span className="inline-block bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-sm font-semibold text-gray-800 border border-red-100 shadow-sm">
            {priceLabel}
          </span>
        </div>

        {hasMultipleImages && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/85 backdrop-blur px-2 py-1 rounded-full border border-red-100 shadow-sm">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`View image ${idx + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex(idx);
                }}
                className={`w-2.5 h-2.5 rounded-full transition ${
                  idx === activeImageIndex
                    ? "bg-red-600 scale-110"
                    : "bg-red-200 hover:bg-red-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-5">
        <h4 className="text-lg md:text-xl font-semibold text-gray-900 leading-tight group-hover:text-red-700 transition-colors">
          {item.name}
        </h4>

        {item.description && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-3 leading-6">
            {item.description}
          </p>
        )}

        {hasMultipleImages && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-red-200">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`shrink-0 rounded-xl overflow-hidden border-2 transition ${
                  idx === activeImageIndex
                    ? "border-red-500 shadow-md"
                    : "border-transparent hover:border-red-200"
                }`}
                aria-label={`Select image ${idx + 1}`}
              >
                <img
                  src={img}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                  alt={`${item.name || "Menu item"} thumbnail ${idx + 1}`}
                  className="w-14 h-14 object-cover bg-white"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuCard;