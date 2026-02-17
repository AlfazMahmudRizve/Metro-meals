"use client";

import { useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import LoyaltyBanner from "@/components/home/LoyaltyBanner";
import InfoSection from "@/components/home/InfoSection";
import MenuCard from "@/components/ui/MenuCard";
import CartSheet from "@/components/cart/CartSheet";
import menuData from "@/lib/data/menu.json";

// Typed Menu Item
type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  tags: string[];
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(menuData.map((item) => item.category)))];

  const filteredMenu = activeCategory === "All"
    ? menuData
    : menuData.filter((item) => item.category === activeCategory);

  // Group by category for the display if "All" is selected, or just list them? 
  // User req: "Sticky Category Nav: Rice Meals | Pizza... Behavior: Clicking Pizza smooth-scrolls"
  // Implementing scroll-to architecture is better.

  const scrollToCategory = (cat: string) => {
    const element = document.getElementById(cat);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveCategory(cat);
    }
  };

  return (
    <main className="min-h-screen pb-32 md:pb-0">
      <HeroSection />

      {/* Loyalty Banner - Unique Positioning */}
      <LoyaltyBanner />

      {/* Info Section - Hours & Services */}
      <InfoSection />

      {/* Sticky Nav */}
      <div id="menu-start" className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 py-4 px-4 overflow-x-auto no-scrollbar">
        <div className="flex gap-4 md:justify-center min-w-max">
          {categories.filter(c => c !== "All").map((cat) => (
            <button
              key={cat}
              onClick={() => scrollToCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold transition-all whitespace-nowrap ${activeCategory === cat
                ? "bg-metro text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Render sections based on categories */}
        {categories.filter(c => c !== "All").map((cat) => {
          const items = menuData.filter(item => item.category === cat);
          if (items.length === 0) return null;

          return (
            <section key={cat} id={cat} className="scroll-mt-24">
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl mb-6 flex items-center gap-2">
                {cat}
                <div className="h-1 bg-cheese flex-1 ml-4 rounded-full opacity-50" />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <MenuCard
                    key={item.id}
                    {...(item as MenuItem)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <CartSheet />
    </main>
  );
}
