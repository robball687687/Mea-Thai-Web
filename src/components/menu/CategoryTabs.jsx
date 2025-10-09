import React from "react";

const CategoryTabs = ({ categories, active, onChange }) => (
  <div className="bg-white rounded-full border border-gray-200 p-2 mx-auto w-full max-w-4xl">
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition
            ${active === cat
              ? "bg-red-600 text-white shadow"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  </div>
);

export default CategoryTabs;
