import React, { useState } from 'react';
import { 
  Compass, 
  CalendarCheck, 
  ShieldCheck, 
  Bell, 
  User, 
  LogOut, 
  Menu as MenuIcon, 
  X, 
  Sparkles,
  UtensilsCrossed
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

export const Navbar = ({ currentView, setCurrentView, onOpenAuth }) => {
  const { user, logout, isAdmin } = useAuth();
  const { notifications, unreadCount, markAllAsRead } = useNotification();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#141413]/95 backdrop-blur-md border-b border-[#2C2B28] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => setCurrentView('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-600/20 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-wider text-cream-50 group-hover:text-amber-400 transition-colors">
                AURA
              </span>
              <span className="block text-[10px] uppercase tracking-[0.25em] text-amber-500/80 font-medium">
                Haute Hospitality
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button 
              onClick={() => setCurrentView('home')}
              className={`transition-colors py-1 ${currentView === 'home' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-stone-300 hover:text-white'}`}
            >
              Discover
            </button>
            <button 
              onClick={() => setCurrentView('restaurants')}
              className={`transition-colors py-1 ${currentView === 'restaurants' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-stone-300 hover:text-white'}`}
            >
              Restaurants
            </button>
            <button 
              onClick={() => setCurrentView('bookings')}
              className={`transition-colors py-1 flex items-center gap-1.5 ${currentView === 'bookings' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-stone-300 hover:text-white'}`}
            >
              <CalendarCheck className="w-4 h-4 text-amber-400/80" />
              My Reservations
            </button>

            {isAdmin && (
              <button 
                onClick={() => setCurrentView('admin')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  currentView === 'admin' 
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/30' 
                    : 'bg-amber-950/60 text-amber-300 border border-amber-500/30 hover:bg-amber-900/60'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Dashboard
              </button>
            )}
          </nav>

          {/* Right Action Icons & User */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (!showNotifications) markAllAsRead();
                }}
                className="p-2 rounded-full text-stone-300 hover:text-white hover:bg-stone-800 transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse"></span>
                )}
              </button>

              {/* Notification Drawer */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-[#1E1E1C] rounded-2xl shadow-2xl border border-stone-800 py-3 z-50 text-stone-200">
                  <div className="px-4 py-2 border-b border-stone-800 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Notifications</span>
                    <button onClick={markAllAsRead} className="text-[11px] text-stone-400 hover:text-white">
                      Mark read
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-stone-800/60">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-xs text-stone-400 text-center">No notifications yet</p>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className="p-3 hover:bg-stone-800/40 transition-colors">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-white">{n.title}</span>
                            <span className="text-[10px] text-stone-400">{n.time}</span>
                          </div>
                          <p className="text-xs text-stone-300 mt-1">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Auth */}
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2.5 p-1.5 pl-3 pr-2 rounded-full bg-stone-900 border border-stone-700 hover:border-amber-500/50 transition-all"
                >
                  <span className="text-xs font-medium text-stone-200">{user.fullName.split(' ')[0]}</span>
                  <img 
                    src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"} 
                    alt={user.fullName} 
                    className="w-7 h-7 rounded-full object-cover border border-amber-500/40"
                  />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-3 w-56 bg-[#1E1E1C] rounded-2xl shadow-2xl border border-stone-800 py-2 z-50 text-stone-200">
                    <div className="px-4 py-2 border-b border-stone-800">
                      <p className="text-sm font-semibold text-white truncate">{user.fullName}</p>
                      <p className="text-xs text-stone-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/30">
                        {user.role}
                      </span>
                    </div>

                    <button 
                      onClick={() => { setCurrentView('profile'); setShowUserMenu(false); }}
                      className="w-full text-left px-4 py-2 text-xs hover:bg-stone-800 text-stone-300 hover:text-white flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-amber-400" />
                      Guest Profile & Preferences
                    </button>

                    <button 
                      onClick={() => { setCurrentView('bookings'); setShowUserMenu(false); }}
                      className="w-full text-left px-4 py-2 text-xs hover:bg-stone-800 text-stone-300 hover:text-white flex items-center gap-2"
                    >
                      <CalendarCheck className="w-4 h-4 text-amber-400" />
                      My Reservations
                    </button>

                    {isAdmin && (
                      <button 
                        onClick={() => { setCurrentView('admin'); setShowUserMenu(false); }}
                        className="w-full text-left px-4 py-2 text-xs hover:bg-stone-800 text-amber-400 flex items-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        Admin Dashboard
                      </button>
                    )}

                    <div className="border-t border-stone-800 my-1"></div>

                    <button 
                      onClick={() => { logout(); setShowUserMenu(false); }}
                      className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-stone-800 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={onOpenAuth}
                className="px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-gradient-to-r from-amber-600 to-amber-500 text-black hover:from-amber-500 hover:to-amber-400 shadow-md shadow-amber-600/30 hover:scale-[1.02] transition-all"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#181817] border-b border-stone-800 px-4 pt-2 pb-6 space-y-3">
          <button 
            onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm text-stone-200 hover:text-amber-400 font-medium"
          >
            Discover
          </button>
          <button 
            onClick={() => { setCurrentView('restaurants'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm text-stone-200 hover:text-amber-400 font-medium"
          >
            Explore Restaurants
          </button>
          <button 
            onClick={() => { setCurrentView('bookings'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm text-stone-200 hover:text-amber-400 font-medium"
          >
            My Reservations
          </button>
          {isAdmin && (
            <button 
              onClick={() => { setCurrentView('admin'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-sm text-amber-400 font-medium"
            >
              Admin Dashboard
            </button>
          )}
          {user ? (
            <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{user.fullName}</p>
                <p className="text-xs text-stone-400">{user.email}</p>
              </div>
              <button 
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="text-xs text-red-400 hover:underline"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button 
              onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
              className="w-full mt-2 py-2.5 rounded-xl bg-amber-500 text-black font-semibold text-center text-xs uppercase tracking-wider"
            >
              Sign In
            </button>
          )}
        </div>
      )}
    </header>
  );
};

