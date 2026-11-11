import React from 'react';
import { UtensilsCrossed, Award, Shield, HeartHandshake, Phone, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#0F0F0E] text-stone-400 border-t border-stone-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-stone-800/60 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Michelin & Luxury Partners</h4>
              <p className="text-xs text-stone-500 mt-0.5">Direct reservations at premier culinary houses</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Guaranteed Table Seating</h4>
              <p className="text-xs text-stone-500 mt-0.5">Real-time table lock & instant booking confirmation</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">VIP Concierge Service</h4>
              <p className="text-xs text-stone-500 mt-0.5">Dedicated dining coordinators for special events</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4 text-black" />
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-wider">AURA</span>
            </div>
            <p className="text-xs leading-relaxed text-stone-400">
              Curating unforgettable culinary moments across the world's most distinguished dining destinations. Effortless reservations, tailored experiences.
            </p>
            <div className="text-xs space-y-1.5 text-stone-400">
              <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-amber-400" /> 5th Avenue, New York, NY</p>
              <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-amber-400" /> +1 (800) 822-5389</p>
              <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-amber-400" /> concierge@auratables.com</p>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-4 text-amber-400">
              Destinations
            </h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#newyork" className="hover:text-amber-400 transition-colors">New York City</a></li>
              <li><a href="#boston" className="hover:text-amber-400 transition-colors">Boston Back Bay</a></li>
              <li><a href="#chicago" className="hover:text-amber-400 transition-colors">Chicago Loop</a></li>
              <li><a href="#miami" className="hover:text-amber-400 transition-colors">Miami South Beach</a></li>
              <li><a href="#sanfrancisco" className="hover:text-amber-400 transition-colors">San Francisco Marina</a></li>
            </ul>
          </div>

          {/* Cuisines */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-4 text-amber-400">
              Culinary Genres
            </h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#french" className="hover:text-amber-400 transition-colors">French Haute Cuisine</a></li>
              <li><a href="#omakase" className="hover:text-amber-400 transition-colors">Japanese Edomae Omakase</a></li>
              <li><a href="#italian" className="hover:text-amber-400 transition-colors">Artisanal Italian</a></li>
              <li><a href="#steakhouse" className="hover:text-amber-400 transition-colors">Dry-Aged Steakhouses</a></li>
              <li><a href="#contemporary" className="hover:text-amber-400 transition-colors">Contemporary Pan-Asian</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-4 text-amber-400">
              Private Dining Club
            </h5>
            <p className="text-xs text-stone-400 mb-3">
              Receive secret off-menu access and invitations to chef collaborations.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to Aura Private Dining Club.'); }} className="space-y-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
              <button 
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Join Invitation List
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800/60 pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-stone-500">
          <p>© 2026 AURA Hospitality Technologies Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-stone-400 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-stone-400 cursor-pointer">Terms of Hospitality</span>
            <span className="hover:text-stone-400 cursor-pointer">Table Cancellation Policy</span>
            <span className="hover:text-stone-400 cursor-pointer">Sommelier Inquiries</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

