import React, { useState } from 'react';
import { Utensils, Wine, Coffee, Sparkles } from 'lucide-react';

export const MenuSection = ({ menu = [] }) => {
  const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Wine & Cocktails'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredMenu = activeCategory === 'All' 
    ? menu 
    : menu.filter(item => item.category === activeCategory);

  return (
    <div className="space-y-6">
      
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-800 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Item Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMenu.map((item) => (
          <div 
            key={item.id} 
            className="p-5 rounded-2xl bg-[#1C1C1A] border border-stone-800/80 hover:border-amber-500/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <h4 className="font-serif text-base font-bold text-white">
                  {item.name}
                </h4>
                <span className="font-serif text-base font-bold text-amber-400 shrink-0">
                  ${item.price}
                </span>
              </div>
              <p className="mt-2 text-xs text-stone-400 leading-relaxed">
                {item.description}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-500">
              <span className="uppercase tracking-wider text-amber-500/80 font-medium">{item.category}</span>
              <span className="flex items-center gap-1 text-stone-400">
                <Sparkles className="w-3 h-3 text-amber-400" /> Signature Selection
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredMenu.length === 0 && (
        <p className="text-xs text-stone-500 text-center py-8">
          No menu items listed under this category.
        </p>
      )}

    </div>
  );
};

