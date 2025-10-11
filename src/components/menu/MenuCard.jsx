import React from "react";

const MenuCard = ({ item,onHoverItem  }) => (
  <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden"
  onMouseEnter={() => onHoverItem?.(item.name)}
   >
    <div className="relative bg-gray-50">
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={item.image}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://rmrstorage.blob.core.windows.net/measite/MeaLogoBlackTrans.png";
          }}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute bottom-2 right-2">
        <span className="inline-block bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold text-gray-800 border border-gray-200 shadow-sm">
          
        </span>
      </div>
    </div>

    <div className="p-5">
      <h4 className="text-lg font-semibold text-gray-900 leading-tight">{item.name}</h4>
      {item.description && <p className="mt-1.5 text-sm text-gray-600 line-clamp-3">{item.description}</p>}
    </div>
  </div>
);

export default MenuCard;
