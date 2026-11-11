import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider, useNotification } from './context/NotificationContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { RestaurantsPage } from './pages/RestaurantsPage';
import { RestaurantDetailPage } from './pages/RestaurantDetailPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { CustomerProfilePage } from './pages/CustomerProfilePage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AuthModal } from './pages/AuthModal';
import { BookingModal } from './components/booking/BookingModal';
import { restaurantService } from './services/api';

const AppContent = () => {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'restaurants' | 'detail' | 'bookings' | 'profile' | 'admin'
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [bookingRestaurant, setBookingRestaurant] = useState(null);
  const [bookingInitialParams, setBookingInitialParams] = useState(null);
  const [searchFilters, setSearchFilters] = useState({});
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await restaurantService.getAll();
        setRestaurants(data);
      } catch (err) {
        console.error('Failed to load restaurants', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickBook = (restaurant, params = null) => {
    setBookingRestaurant(restaurant);
    setBookingInitialParams(params);
  };

  const handleHeroSearch = (searchData) => {
    setSearchFilters(searchData);
    setCurrentView('restaurants');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#111110] text-[#EBE7DF] flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Top Navbar */}
      <Navbar 
        currentView={currentView} 
        setCurrentView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage 
            restaurants={restaurants}
            onSelectRestaurant={handleSelectRestaurant}
            onQuickBook={(r) => handleQuickBook(r)}
            onSearch={handleHeroSearch}
            onViewAll={() => {
              setCurrentView('restaurants');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'restaurants' && (
          <RestaurantsPage 
            restaurants={restaurants}
            onSelectRestaurant={handleSelectRestaurant}
            onQuickBook={(r) => handleQuickBook(r)}
            initialFilters={searchFilters}
          />
        )}

        {currentView === 'detail' && selectedRestaurant && (
          <RestaurantDetailPage 
            restaurant={selectedRestaurant}
            onBack={() => setCurrentView('restaurants')}
            onOpenBooking={(r) => handleQuickBook(r)}
          />
        )}

        {currentView === 'bookings' && (
          <MyBookingsPage 
            onExploreRestaurants={() => {
              setCurrentView('restaurants');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'profile' && (
          <CustomerProfilePage />
        )}

        {currentView === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Global Booking Modal */}
      {bookingRestaurant && (
        <BookingModal
          restaurant={bookingRestaurant}
          initialParams={bookingInitialParams}
          onClose={() => setBookingRestaurant(null)}
          onBookingCompleted={() => {
            // modal handles completion view
          }}
        />
      )}

      {/* Global Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />

      {/* Luxury Footer */}
      <Footer />

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </AuthProvider>
  );
}

