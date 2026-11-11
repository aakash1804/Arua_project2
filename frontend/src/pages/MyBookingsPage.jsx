import React, { useState, useEffect } from 'react';
import { 
  CalendarCheck, 
  MapPin, 
  Clock, 
  Users, 
  XCircle, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Share2,
  Calendar,
  UtensilsCrossed
} from 'lucide-react';
import { bookingService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

export const MyBookingsPage = ({ onExploreRestaurants }) => {
  const { user } = useAuth();
  const { showToast, addNotification } = useNotification();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await bookingService.getMyBookings();
      setBookings(data);
    } catch (err) {
      showToast('Error loading reservations', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancelBooking = async (booking) => {
    if (!window.confirm(`Are you sure you want to cancel your table reservation at ${booking.restaurantName}?`)) {
      return;
    }

    setCancellingId(booking.id);
    try {
      await bookingService.cancel(booking.id);
      addNotification(
        'Reservation Cancelled',
        `Your reservation ${booking.bookingReference} at ${booking.restaurantName} was successfully cancelled.`,
        'cancelled'
      );
      showToast('Reservation cancelled successfully');
      loadBookings();
    } catch (err) {
      showToast(err.message || 'Failed to cancel reservation', 'error');
    } finally {
      setCancellingId(null);
    }
  };

  const activeBookings = bookings.filter(b => b.status === 'CONFIRMED' || b.status === 'PENDING');
  const pastBookings = bookings.filter(b => b.status === 'COMPLETED' || b.status === 'CANCELLED');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
            Guest Itinerary
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
            My Table Reservations
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Manage your upcoming dining experiences and view past visits.
          </p>
        </div>

        <button
          onClick={onExploreRestaurants}
          className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider transition-all self-start sm:self-auto cursor-pointer"
        >
          Book Another Table
        </button>
      </div>

      {loading ? (
        <div className="p-16 text-center text-stone-400">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs">Retrieving your reservations...</p>
        </div>
      ) : (
        <div className="space-y-12">
          
          {/* Section 1: Upcoming Reservations */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                Upcoming & Confirmed Seating ({activeBookings.length})
              </h2>
            </div>

            {activeBookings.length > 0 ? (
              <div className="space-y-4">
                {activeBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-6 rounded-3xl bg-[#1C1C1A] border border-stone-800 hover:border-amber-500/40 shadow-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-500/30">
                          {b.bookingReference}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800">
                          {b.status}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl font-bold text-white">
                        {b.restaurantName}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300">
                        <span className="flex items-center gap-1.5 text-stone-300">
                          <Calendar className="w-3.5 h-3.5 text-amber-500" />
                          {b.bookingDate}
                        </span>
                        <span className="flex items-center gap-1.5 text-stone-300">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          {b.bookingTime}
                        </span>
                        <span className="flex items-center gap-1.5 text-stone-300">
                          <Users className="w-3.5 h-3.5 text-amber-500" />
                          {b.guestCount} Guests
                        </span>
                        <span className="text-amber-400/90 font-medium">
                          Table {b.tableNumber} ({b.zone})
                        </span>
                      </div>

                      {b.specialRequests && (
                        <p className="text-xs text-stone-400 italic pt-1">
                          Note: {b.specialRequests}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-stone-800">
                      <button
                        type="button"
                        onClick={() => {
                          const text = `Aura Booking Confirmation: ${b.bookingReference} for ${b.guestCount} guests at ${b.restaurantName} on ${b.bookingDate} at ${b.bookingTime}`;
                          navigator.clipboard?.writeText(text);
                          showToast('Booking details copied!');
                        }}
                        className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        Share
                      </button>

                      <button
                        type="button"
                        disabled={cancellingId === b.id}
                        onClick={() => handleCancelBooking(b)}
                        className="px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-800/80 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>{cancellingId === b.id ? 'Cancelling...' : 'Cancel Reservation'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-[#181817] rounded-3xl border border-stone-800 space-y-3">
                <UtensilsCrossed className="w-8 h-8 text-amber-500/60 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-white">No upcoming reservations</h3>
                <p className="text-xs text-stone-400 max-w-sm mx-auto">
                  You do not have any active table bookings right now.
                </p>
                <button
                  onClick={onExploreRestaurants}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Discover Restaurants
                </button>
              </div>
            )}
          </div>

          {/* Section 2: Past & Cancelled History */}
          {pastBookings.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4">
                Past Visits & History ({pastBookings.length})
              </h2>

              <div className="space-y-3">
                {pastBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-5 rounded-2xl bg-[#181817]/60 border border-stone-800/60 flex items-center justify-between text-xs opacity-75 hover:opacity-100 transition-opacity"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{b.restaurantName}</span>
                        <span className="font-mono text-[11px] text-stone-500">{b.bookingReference}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          b.status === 'COMPLETED' ? 'bg-blue-950 text-blue-300' : 'bg-stone-800 text-stone-400'
                        }`}>
                          {b.status}
                        </span>
                      </div>
                      <p className="text-stone-400 text-[11px] mt-0.5">
                        {b.bookingDate} at {b.bookingTime} • {b.guestCount} Guests • Table {b.tableNumber}
                      </p>
                    </div>

                    <button
                      onClick={onExploreRestaurants}
                      className="text-amber-400 hover:underline text-xs font-medium"
                    >
                      Book Again
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

