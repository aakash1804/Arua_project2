import React, { useState } from 'react';
import { Search, MapPin, Calendar, Clock, Users, Sparkles, ArrowRight } from 'lucide-react';

export const HeroSection = ({ onSearch, onExploreClick }) => {
  const [location, setLocation] = useState('All Locations');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('19:30');
  const [guests, setGuests] = useState('2');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch({
      location: location === 'All Locations' ? '' : location,
      date,
      time,
      guests: parseInt(guests),
      search: searchTerm
    });
  };

  return (
    <div className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center text-white overflow-hidden">
      {/* Background Photography with Warm Luxury Tint & Vignette */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=85')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#141413] via-[#141413]/70 to-[#141413]/40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-black/60"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 pb-16">
        
        {/* Sub-badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-md animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Exclusive Culinary Tables & Private Dining</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-cream-50 leading-[1.15]">
          Your Perfect Table <br className="hidden sm:inline" />
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
            Awaits.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-xl text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
          Discover restaurants and reserve your table effortlessly.
        </p>

        {/* Search & Reservation Bar Form */}
        <div className="mt-10 max-w-4xl mx-auto">
          <form 
            onSubmit={handleSearchSubmit}
            className="bg-[#181817]/90 backdrop-blur-xl border border-stone-700/80 p-3 sm:p-4 rounded-3xl shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-left"
          >
            {/* 1. Keyword / Restaurant Name */}
            <div className="flex flex-col px-3 py-2 rounded-2xl bg-stone-900/60 border border-stone-800/80">
              <label className="text-[10px] uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1.5 mb-1">
                <Search className="w-3 h-3" /> Restaurant / Cuisine
              </label>
              <input 
                type="text"
                placeholder="e.g. L'Étoile, Omakase"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-sm text-white placeholder-stone-500 focus:outline-none"
              />
            </div>

            {/* 2. Location */}
            <div className="flex flex-col px-3 py-2 rounded-2xl bg-stone-900/60 border border-stone-800/80">
              <label className="text-[10px] uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1.5 mb-1">
                <MapPin className="w-3 h-3" /> Location
              </label>
              <select 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent text-sm text-stone-200 focus:outline-none cursor-pointer"
              >
                <option value="All Locations" className="bg-stone-900 text-white">All Metros</option>
                <option value="Manhattan" className="bg-stone-900 text-white">New York, NY</option>
                <option value="Boston" className="bg-stone-900 text-white">Boston, MA</option>
                <option value="Chicago" className="bg-stone-900 text-white">Chicago, IL</option>
                <option value="Miami" className="bg-stone-900 text-white">Miami, FL</option>
                <option value="San Francisco" className="bg-stone-900 text-white">San Francisco, CA</option>
                <option value="Washington" className="bg-stone-900 text-white">Washington, DC</option>
              </select>
            </div>

            {/* 3. Date */}
            <div className="flex flex-col px-3 py-2 rounded-2xl bg-stone-900/60 border border-stone-800/80">
              <label className="text-[10px] uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1.5 mb-1">
                <Calendar className="w-3 h-3" /> Date
              </label>
              <input 
                type="date"
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent text-sm text-stone-200 focus:outline-none cursor-pointer"
              />
            </div>

            {/* 4. Time & Guests */}
            <div className="flex flex-col px-3 py-2 rounded-2xl bg-stone-900/60 border border-stone-800/80">
              <label className="text-[10px] uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1.5 mb-1">
                <Users className="w-3 h-3" /> Guests & Time
              </label>
              <div className="flex items-center gap-2">
                <select 
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="bg-transparent text-sm text-stone-200 focus:outline-none cursor-pointer"
                >
                  <option value="1" className="bg-stone-900 text-white">1 Guest</option>
                  <option value="2" className="bg-stone-900 text-white">2 Guests</option>
                  <option value="4" className="bg-stone-900 text-white">4 Guests</option>
                  <option value="6" className="bg-stone-900 text-white">6 Guests</option>
                  <option value="8" className="bg-stone-900 text-white">8+ Guests (VIP)</option>
                </select>
                <span className="text-stone-500">|</span>
                <select 
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="bg-transparent text-sm text-stone-200 focus:outline-none cursor-pointer"
                >
                  <option value="17:30" className="bg-stone-900 text-white">5:30 PM</option>
                  <option value="18:00" className="bg-stone-900 text-white">6:00 PM</option>
                  <option value="18:30" className="bg-stone-900 text-white">6:30 PM</option>
                  <option value="19:00" className="bg-stone-900 text-white">7:00 PM</option>
                  <option value="19:30" className="bg-stone-900 text-white">7:30 PM</option>
                  <option value="20:00" className="bg-stone-900 text-white">8:00 PM</option>
                  <option value="20:30" className="bg-stone-900 text-white">8:30 PM</option>
                  <option value="21:00" className="bg-stone-900 text-white">9:00 PM</option>
                </select>
              </div>
            </div>

            {/* 5. CTA Button */}
            <div className="flex items-center">
              <button 
                type="submit"
                className="w-full h-full min-h-[50px] rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-600/30 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>Find Table</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Filter Tags */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-stone-300">
            <span className="text-stone-500 text-[11px] uppercase tracking-wider">Popular Searches:</span>
            {['French Gastronomy', 'Tokyo Omakase', 'Prime Steakhouse', 'Modern Italian', 'Rooftop Lounge'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSearchTerm(tag);
                  onSearch({ search: tag });
                }}
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer text-stone-300 hover:text-white"
              >
                {tag}
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

