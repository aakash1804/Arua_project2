import React from 'react';
import { Filter, Star, Sparkles, X, RotateCcw } from 'lucide-react';

export const RestaurantFilters = ({ filters, setFilters, onReset }) => {
  const cuisines = [
    'All',
    'French Fine Dining',
    'Japanese Omakase',
    'Steakhouse & Bar',
    'Modern Italian',
    'Pan-Asian Contemporary',
    'Contemporary Indian'
  ];

  const priceRanges = ['All', '$$$', '$$$$'];
  const ratings = [
    { label: 'All Ratings', value: '' },
    { label: '4.8 & Above ★', value: '4.8' },
    { label: '4.5 & Above ★', value: '4.5' }
  ];

  return (
    <div className="bg-[#1C1C1A] rounded-3xl p-6 border border-stone-800 text-stone-200 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-800">
        <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm uppercase tracking-wider">
          <Filter className="w-4 h-4" />
          <span>Filter Selection</span>
        </div>
        <button 
          onClick={onReset}
          className="text-xs text-stone-400 hover:text-white flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Cuisines */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-amber-400/90 block mb-3">
          Cuisine Style
        </label>
        <div className="flex flex-wrap gap-1.5">
          {cuisines.map(c => {
            const isSelected = (filters.cuisine || 'All') === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setFilters({ ...filters, cuisine: c === 'All' ? '' : c })}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-black font-semibold shadow-md shadow-amber-500/20'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-amber-400/90 block mb-3">
          Price Tier
        </label>
        <div className="grid grid-cols-3 gap-2">
          {priceRanges.map(p => {
            const isSelected = (filters.priceRange || 'All') === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setFilters({ ...filters, priceRange: p === 'All' ? '' : p })}
                className={`py-2 rounded-xl text-xs font-medium text-center transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-black font-semibold shadow-md shadow-amber-500/20'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-amber-400/90 block mb-3">
          Minimum Rating
        </label>
        <div className="space-y-1.5">
          {ratings.map(r => {
            const isSelected = (filters.minRating || '') === r.value;
            return (
              <button
                key={r.label}
                type="button"
                onClick={() => setFilters({ ...filters, minRating: r.value })}
                className={`w-full py-2 px-3 rounded-xl text-xs text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-amber-500/20 border border-amber-500/60 text-amber-300 font-semibold'
                    : 'hover:bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}
              >
                <span>{r.label}</span>
                {r.value && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

