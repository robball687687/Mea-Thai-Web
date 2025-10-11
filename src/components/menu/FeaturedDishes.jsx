import React, { useMemo } from "react";
import MenuItemCard from "./MenuItemCard";

export default function FeaturedDishes({ menuData = [], onItemInView }) {
  // Flatten some items out of the first few categories
  const items = useMemo(() => {
    const out = [];
    for (const cat of menuData) {
      for (const m of cat.items || []) {
        out.push({
          name: m.name,
          price: m.price,          // string like "$12.99" handled in card
          description: m.description,
          image: m.image,
          spice: undefined,
        });
        if (out.length >= 6) return out;
      }
    }
    return out;
  }, [menuData]);

  if (!items.length) return null;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((d, i) => (
        <MenuItemCard key={`${d.name}-${i}`} item={d} onObserve={onItemInView} />
      ))}
    </div>
  );
}
