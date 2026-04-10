import React from "react";

const CategoryTabs = ({ categories, active, onChange }) => (
  <div className="bg-white/90 backdrop-blur rounded-full border border-red-100 p-2 mx-auto w-full max-w-5xl shadow-sm">
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
            active === cat
              ? "bg-red-600 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-red-50 border border-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  </div>
);

export default CategoryTabs;