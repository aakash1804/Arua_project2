import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Check, 
  Calendar, 
  Users, 
  ArrowLeft, 
  Award, 
  Share2, 
  Heart,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { MenuSection } from '../components/restaurant/MenuSection';
import { BookingModal } from '../components/booking/BookingModal';

export const RestaurantDetailPage = ({ 
  restaurant, 
  onBack, 
  onOpenBooking 
}) => {
  const [activeTab, setActiveTab] = useState('overview'); // overview, menu, reviews
  const [selectedPhoto, setSelectedPhoto] = useState(restaurant?.image);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  if (!restaurant) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Breadcrumb & Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs text-stone-400 hover:text-white flex items-center gap-1.5 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Restaurants</span>
        </button>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: restaurant.name, url: window.location.href });
              } else {
                navigator.clipboard?.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }
            }}
            className="p-2.5 rounded-full bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Header & Gallery */}
      <div className="space-y-4">
        
        {/* Title & Key Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
                {restaurant.cuisine}
              </span>
              <span className="text-xs font-semibold text-stone-400">
                {restaurant.priceRange}
              </span>
              {restaurant.featured && (
                <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-black text-[10px] font-extrabold uppercase tracking-wider">
                  Michelin Recognized
                </span>
              )}
            </div>
            
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              {restaurant.name}
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-stone-400 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>{restaurant.address || restaurant.location}</span>
            </p>
          </div>

          {/* Reserve CTA Pill */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="flex items-center justify-end gap-1 text-amber-400 font-bold text-lg">
                <Star className="w-5 h-5 fill-amber-400" />
                <span>{restaurant.rating}</span>
              </div>
              <span className="text-xs text-stone-400">{restaurant.reviewCount} verified dining reviews</span>
            </div>

            <button
              onClick={() => setIsBookModalOpen(true)}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-amber-600/30 transition-all hover:scale-105 cursor-pointer"
            >
              Reserve a Table
            </button>
          </div>
        </div>

        {/* Photography Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="md:col-span-2 h-96 sm:h-[450px] rounded-3xl overflow-hidden bg-stone-900 border border-stone-800">
            <img 
              src={selectedPhoto || restaurant.image} 
              alt={restaurant.name} 
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 h-full">
            {(restaurant.images || [restaurant.image]).slice(0, 3).map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedPhoto(img)}
                className={`h-28 sm:h-[138px] rounded-2xl overflow-hidden cursor-pointer border transition-all ${
                  selectedPhoto === img ? 'border-amber-400 ring-2 ring-amber-400/40' : 'border-stone-800 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Tabs & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left 2 Cols: Details & Menu */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Tab Navigation */}
          <div className="flex border-b border-stone-800 gap-8 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 transition-colors ${
                activeTab === 'overview' 
                  ? 'text-amber-400 border-b-2 border-amber-400' 
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Overview & Atmosphere
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`pb-3 transition-colors ${
                activeTab === 'menu' 
                  ? 'text-amber-400 border-b-2 border-amber-400' 
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              A La Carte & Tasting Menu
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white mb-3">
                  About the Establishment
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed font-light">
                  {restaurant.description}
                </p>
              </div>

              {/* Facilities Grid */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4">
                  Hospitality Amenities & Facilities
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {restaurant.facilities?.map((f, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-[#1C1C1A] border border-stone-800 text-xs text-stone-300 flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hours & Contact */}
              <div className="p-6 rounded-3xl bg-[#181817] border border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4" />
                    Operating Service Hours
                  </h4>
                  <p className="text-xs text-stone-300 font-medium">{restaurant.openingHours}</p>
                  <p className="text-[11px] text-stone-500 mt-1">Kitchen closes 45 minutes prior to closing time.</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4" />
                    Direct Maître D' Contact
                  </h4>
                  <p className="text-xs text-stone-300 font-medium">{restaurant.phone || '+1 (800) 555-AURA'}</p>
                  <p className="text-[11px] text-stone-500 mt-1">Inquiries for parties exceeding 8 guests welcomed.</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Menu */}
          {activeTab === 'menu' && (
            <MenuSection menu={restaurant.menu} />
          )}

        </div>

        {/* Right 1 Col: Quick Reservation Sticky Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 p-6 rounded-3xl bg-[#181817] border border-stone-800 shadow-2xl space-y-6">
            
            <div className="pb-4 border-b border-stone-800">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Instant Reservation</span>
              <h3 className="font-serif text-xl font-bold text-white mt-1">Book a Table Online</h3>
              <p className="text-xs text-stone-400 mt-0.5">Real-time table lock with immediate confirmation.</p>
            </div>

            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-900 border border-stone-800">
                <span className="text-stone-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" /> Date
                </span>
                <span className="font-semibold text-white">Today / Any Date</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-900 border border-stone-800">
                <span className="text-stone-400 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" /> Time
                </span>
                <span className="font-semibold text-white">Lunch & Dinner Slots</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-900 border border-stone-800">
                <span className="text-stone-400 flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" /> Seating
                </span>
                <span className="font-semibold text-white">Window, Terrace, Salon</span>
              </div>
            </div>

            <button
              onClick={() => setIsBookModalOpen(true)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-600/30 transition-all hover:scale-[1.02] cursor-pointer"
            >
              Reserve Table Now
            </button>

            <div className="pt-2 text-center">
              <p className="text-[11px] text-stone-500">
                No booking fee • Free cancellation up to 2 hours prior
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Booking Modal */}
      {isBookModalOpen && (
        <BookingModal
          restaurant={restaurant}
          onClose={() => setIsBookModalOpen(false)}
          onBookingCompleted={() => {
            // Can redirect or refresh
          }}
        />
      )}

    </div>
  );
};

