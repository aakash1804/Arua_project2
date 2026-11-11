import React from 'react';
import { Star, MapPin, Clock, DollarSign, Sparkles, ArrowRight, Utensils } from 'lucide-react';

export const RestaurantCard = ({ restaurant, onSelect, onQuickBook }) => {
  return (
    <div className="bg-[#1C1C1A] rounded-3xl overflow-hidden border border-stone-800/80 hover:border-amber-500/40 shadow-xl hover:shadow-2xl hover:shadow-amber-950/20 transition-all duration-300 flex flex-col group">
      
      {/* Image & Badges */}
      <div className="relative h-60 w-full overflow-hidden bg-stone-900 cursor-pointer" onClick={() => onSelect(restaurant)}>
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A] via-transparent to-black/30"></div>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-xs font-bold text-amber-400">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span>{restaurant.rating}</span>
          <span className="text-stone-400 font-normal text-[11px]">({restaurant.reviewCount})</span>
        </div>

        {/* Price & Featured Tag */}
        <div className="absolute top-4 left-4 flex gap-2">
          {restaurant.featured && (
            <span className="px-3 py-1 rounded-full bg-amber-500 text-black text-[10px] font-extrabold uppercase tracking-widest shadow-md">
              Featured
            </span>
          )}
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-stone-200 text-xs font-semibold">
            {restaurant.priceRange}
          </span>
        </div>

        {/* Cuisine Tag Bottom Left of Image */}
        <div className="absolute bottom-3 left-4">
          <span className="inline-block px-3 py-1 rounded-full bg-stone-900/85 backdrop-blur-md text-amber-300 text-xs font-medium border border-stone-700/60">
            {restaurant.cuisine}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 
            onClick={() => onSelect(restaurant)}
            className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer"
          >
            {restaurant.name}
          </h3>

          <p className="mt-1 flex items-center gap-1.5 text-xs text-stone-400">
            <MapPin className="w-3.5 h-3.5 text-amber-500/80 shrink-0" />
            <span className="truncate">{restaurant.location}</span>
          </p>

          <p className="mt-3 text-xs text-stone-300 line-clamp-2 leading-relaxed">
            {restaurant.description}
          </p>

          {/* Facilities / Highlights */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {restaurant.facilities?.slice(0, 3).map((f, idx) => (
              <span key={idx} className="text-[11px] px-2.5 py-0.5 rounded-md bg-stone-800/80 text-stone-400 border border-stone-800">
                {f}
              </span>
            ))}
            {restaurant.facilities?.length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 text-stone-500">
                +{restaurant.facilities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between gap-3">
          <button 
            type="button"
            onClick={() => onSelect(restaurant)}
            className="text-xs font-medium text-stone-400 hover:text-white transition-colors"
          >
            View Details
          </button>

          <button 
            type="button"
            onClick={() => onQuickBook(restaurant)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-amber-600/20 transition-all hover:scale-[1.02]"
          >
            <span>Reserve</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};

