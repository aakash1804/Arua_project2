import React, { useState, useMemo } from 'react';
import { Search, MapPin, SlidersHorizontal, Sparkles, RotateCcw } from 'lucide-react';
import { RestaurantCard } from '../components/restaurant/RestaurantCard';
import { RestaurantFilters } from '../components/restaurant/RestaurantFilters';

export const RestaurantsPage = ({ 
  restaurants, 
  onSelectRestaurant, 
  onQuickBook,
  initialFilters = {}
}) => {
  const [searchTerm, setSearchTerm] = useState(initialFilters.search || '');
  const [selectedLocation, setSelectedLocation] = useState(initialFilters.location || '');
  const [filters, setFilters] = useState({
    cuisine: initialFilters.cuisine || '',
    priceRange: initialFilters.priceRange || '',
    minRating: initialFilters.minRating || ''
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter logic
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(r => {
      // Search term
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matchesName = r.name.toLowerCase().includes(q);
        const matchesCuisine = r.cuisine.toLowerCase().includes(q);
        const matchesLoc = r.location.toLowerCase().includes(q);
        if (!matchesName && !matchesCuisine && !matchesLoc) return false;
      }
      // Location
      if (selectedLocation && !r.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }
      // Cuisine
      if (filters.cuisine && !r.cuisine.toLowerCase().includes(filters.cuisine.toLowerCase())) {
        return false;
      }
      // Price
      if (filters.priceRange && r.priceRange !== filters.priceRange) {
        return false;
      }
      // Rating
      if (filters.minRating && r.rating < parseFloat(filters.minRating)) {
        return false;
      }
      return true;
    });
  }, [restaurants, searchTerm, selectedLocation, filters]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedLocation('');
    setFilters({ cuisine: '', priceRange: '', minRating: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
            Find Your Dining Experience
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
            Explore Restaurants
          </h1>
        </div>

        {/* Search Bar & Location dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="w-4 h-4 text-stone-500 absolute left-3 top-3.5" />
            <input 
              type="text"
              placeholder="Search by name or style..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-[#1C1C1A] border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden p-2.5 rounded-2xl bg-[#1C1C1A] border border-stone-800 text-stone-300"
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Restaurant Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28">
            <RestaurantFilters 
              filters={filters} 
              setFilters={setFilters} 
              onReset={handleResetFilters} 
            />
          </div>
        </div>

        {/* Mobile Filters Drawer */}
        {showMobileFilters && (
          <div className="lg:hidden col-span-1">
            <RestaurantFilters 
              filters={filters} 
              setFilters={setFilters} 
              onReset={handleResetFilters} 
            />
          </div>
        )}

        {/* Restaurant Cards Grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>
              Showing <span className="text-amber-400 font-semibold">{filteredRestaurants.length}</span> establishments
            </span>

            {(searchTerm || filters.cuisine || filters.priceRange || filters.minRating) && (
              <button 
                onClick={handleResetFilters}
                className="text-amber-400 hover:underline flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                Clear Active Filters
              </button>
            )}
          </div>

          {filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onSelect={onSelectRestaurant}
                  onQuickBook={onQuickBook}
                />
              ))}
            </div>
          ) : (
            <div className="p-16 text-center bg-[#181817] rounded-3xl border border-stone-800 space-y-3">
              <Sparkles className="w-8 h-8 text-amber-400/60 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-white">No dining houses match your filter criteria</h3>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                Try loosening your cuisine or price tier filters to browse our full culinary collection.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

