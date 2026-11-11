import React from 'react';
import { HeroSection } from '../components/restaurant/HeroSection';
import { RestaurantCard } from '../components/restaurant/RestaurantCard';
import { 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Wine, 
  Compass, 
  Users 
} from 'lucide-react';

export const HomePage = ({ 
  restaurants, 
  onSelectRestaurant, 
  onQuickBook, 
  onSearch, 
  onViewAll 
}) => {
  const featuredRestaurants = restaurants.filter(r => r.featured);

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. Hero Section with Search Functionality */}
      <HeroSection onSearch={onSearch} onExploreClick={onViewAll} />

      {/* 2. Featured Haute Cuisine Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Curated Selection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
              Featured Michelin & Fine Dining
            </h2>
            <p className="mt-2 text-sm text-stone-400 max-w-xl">
              Handcrafted gastronomy, bespoke wine cellars, and world-renowned master chefs.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="self-start md:self-auto text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors group"
          >
            <span>Explore All Establishments</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Restaurant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onSelect={onSelectRestaurant}
              onQuickBook={onQuickBook}
            />
          ))}
        </div>
      </section>

      {/* 3. The Aura Hospitality Standards */}
      <section className="bg-[#181817] border-y border-stone-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
              Unrivaled Dining Assurance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
              The Table Booking Experience Reimagined
            </h2>
            <p className="mt-3 text-sm text-stone-400">
              Direct table reservations without telephone waitlists, queues, or uncertain seating.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#21211F] border border-stone-800/80 hover:border-amber-500/30 transition-all text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">
                Guaranteed Table Seating
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Direct integration with restaurant floor management prevents double-bookings with transactional database locking.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#21211F] border border-stone-800/80 hover:border-amber-500/30 transition-all text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-6">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">
                Live Interactive Floor Plan
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                View the physical restaurant layout, select romantic window booths, terrace tables, or private VIP salons.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#21211F] border border-stone-800/80 hover:border-amber-500/30 transition-all text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-6">
                <Wine className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">
                Bespoke Dietary & Sommelier Notes
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Communicate allergies, anniversaries, and wine preferences directly to the Maître d’ before your arrival.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Guest Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-[#21211F] to-[#181817] border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
              Guest Testimonial
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
              “Reserving a table for our anniversary at L'Étoile Dorée was completely seamless. The romantic window booth was waiting for us precisely on time.”
            </h3>
            <p className="text-xs text-stone-400">
              — <span className="text-stone-200 font-semibold">Julian & Claire Vance</span>, Verified Guests
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onViewAll}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-amber-600/30 transition-all hover:scale-105 cursor-pointer"
            >
              Explore Restaurants Now
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

