import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle,
  FileCheck,
  Share2,
  CalendarPlus
} from 'lucide-react';
import { TableLayoutSelector } from './TableLayoutSelector';
import { TimeSlotPicker } from './TimeSlotPicker';
import { tableService, bookingService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

export const BookingModal = ({ restaurant, initialParams, onClose, onBookingCompleted }) => {
  const { user } = useAuth();
  const { addNotification, showToast } = useNotification();

  const [step, setStep] = useState(1); // 1: Schedule, 2: Table Selection, 3: Guest Info, 4: Confirmed
  const [date, setDate] = useState(initialParams?.date || new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(initialParams?.time || '19:30');
  const [guestCount, setGuestCount] = useState(initialParams?.guests || 2);
  
  const [availableTables, setAvailableTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [loadingTables, setLoadingTables] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Guest Info state
  const [guestName, setGuestName] = useState(user?.fullName || '');
  const [guestEmail, setGuestEmail] = useState(user?.email || '');
  const [guestPhone, setGuestPhone] = useState(user?.phone || '+1 (555) 019-2834');
  const [occasion, setOccasion] = useState('Casual Dining');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Confirmed booking response
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Fetch available tables whenever restaurant, date, or time changes
  useEffect(() => {
    if (!restaurant) return;
    const loadTables = async () => {
      setLoadingTables(true);
      setErrorMsg('');
      try {
        const tables = await tableService.getAvailable(restaurant.id, date, time, guestCount);
        setAvailableTables(tables);
        // Pre-select first available table that fits party if none selected
        const firstFit = tables.find(t => t.isAvailable && t.capacity >= guestCount);
        if (firstFit && !selectedTable) {
          setSelectedTable(firstFit);
        }
      } catch (err) {
        setErrorMsg('Failed to check table availability. Please try again.');
      } finally {
        setLoadingTables(false);
      }
    };
    loadTables();
  }, [restaurant, date, time, guestCount]);

  const handleNextToTables = () => {
    if (!date || !time || !guestCount) {
      setErrorMsg('Please select date, time, and number of guests.');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  const handleNextToGuestInfo = () => {
    if (!selectedTable) {
      setErrorMsg('Please choose an available table from the floor plan.');
      return;
    }
    setErrorMsg('');
    setStep(3);
  };

  const handleConfirmReservation = async (e) => {
    e.preventDefault();
    if (!guestName || !guestEmail) {
      setErrorMsg('Please enter guest name and email.');
      return;
    }

    setBookingLoading(true);
    setErrorMsg('');

    try {
      const payload = {
        userId: user?.id || 2,
        customerName: guestName,
        customerEmail: guestEmail,
        customerPhone: guestPhone,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        tableId: selectedTable.id,
        tableNumber: selectedTable.tableNumber,
        zone: selectedTable.zone,
        bookingDate: date,
        bookingTime: time,
        guestCount: parseInt(guestCount),
        specialRequests: `Occasion: ${occasion}. ${specialRequests}`.trim()
      };

      const result = await bookingService.create(payload);
      setConfirmedBooking(result);
      setStep(4);
      addNotification(
        'Table Reserved Successfully',
        `Booking ${result.bookingReference} confirmed at ${restaurant.name} for ${date} at ${time}.`
      );
      if (onBookingCompleted) {
        onBookingCompleted(result);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Unable to confirm reservation. Please select another table or time.');
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#181817] rounded-3xl border border-stone-800 shadow-2xl overflow-hidden my-8">
        
        {/* Modal Top Header */}
        <div className="p-6 bg-[#21211F] border-b border-stone-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
              {step === 4 ? 'Reservation Confirmed' : `Step ${step} of 3 • Table Booking`}
            </span>
            <h3 className="font-serif text-xl font-bold text-white mt-0.5">
              {restaurant.name}
            </h3>
            <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              {restaurant.location}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 4 && (
          <div className="grid grid-cols-3 border-b border-stone-800/80 text-xs font-medium text-stone-400">
            <div className={`py-3 text-center border-b-2 ${step >= 1 ? 'border-amber-400 text-amber-400 font-semibold' : 'border-transparent'}`}>
              1. Date & Time
            </div>
            <div className={`py-3 text-center border-b-2 ${step >= 2 ? 'border-amber-400 text-amber-400 font-semibold' : 'border-transparent'}`}>
              2. Floor & Table
            </div>
            <div className={`py-3 text-center border-b-2 ${step >= 3 ? 'border-amber-400 text-amber-400 font-semibold' : 'border-transparent'}`}>
              3. Guest Details
            </div>
          </div>
        )}

        {/* Error Notification Banner */}
        {errorMsg && (
          <div className="m-6 p-4 rounded-2xl bg-red-950/80 border border-red-800/80 text-red-200 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <p>{errorMsg}</p>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6">
          
          {/* STEP 1: Date, Time & Guests */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Date Selection */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-400/90 block mb-2">
                    Reservation Date
                  </label>
                  <div className="relative">
                    <input 
                      type="date"
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-400/90 block mb-2">
                    Party Size
                  </label>
                  <select 
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value))}
                    className="w-full px-4 py-3 rounded-2xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-amber-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'} {num >= 8 ? '(Private Suite recommended)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400/90 block mb-2">
                  Select Seating Time Slot
                </label>
                <TimeSlotPicker selectedTime={time} onSelectTime={setTime} />
              </div>

              {/* Step 1 Actions */}
              <div className="pt-4 border-t border-stone-800 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextToTables}
                  className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
                >
                  <span>Select Table & Seating</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Floor Plan & Table Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Choose Your Desired Table</h4>
                  <p className="text-xs text-stone-400">
                    Seating for <span className="text-amber-400 font-semibold">{guestCount} guests</span> on <span className="text-amber-400 font-semibold">{date}</span> at <span className="text-amber-400 font-semibold">{time}</span>
                  </p>
                </div>
                {selectedTable && (
                  <div className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-medium">
                    Selected: {selectedTable.tableNumber} ({selectedTable.zone})
                  </div>
                )}
              </div>

              {loadingTables ? (
                <div className="p-12 text-center text-stone-400">
                  <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-xs">Checking real-time table availability...</p>
                </div>
              ) : (
                <TableLayoutSelector 
                  tables={availableTables}
                  selectedTable={selectedTable}
                  onSelectTable={setSelectedTable}
                  guestCount={guestCount}
                />
              )}

              {/* Step 2 Actions */}
              <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl text-stone-400 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleNextToGuestInfo}
                  disabled={!selectedTable}
                  className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
                >
                  <span>Continue to Guest Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Guest Details & Special Requests */}
          {step === 3 && (
            <form onSubmit={handleConfirmReservation} className="space-y-6">
              
              {/* Summary Pill */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                <div>
                  <span className="text-amber-400 font-bold block">Reserved Table: {selectedTable?.tableNumber} • {selectedTable?.zone}</span>
                  <span className="text-stone-300">{date} at {time} for {guestCount} Guests</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => setStep(2)} 
                  className="text-amber-400 hover:underline text-[11px]"
                >
                  Change Table
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-400/90 block mb-1.5">
                    Lead Guest Name *
                  </label>
                  <input 
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-400/90 block mb-1.5">
                    Email Address *
                  </label>
                  <input 
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-400/90 block mb-1.5">
                    Mobile Phone *
                  </label>
                  <input 
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-400/90 block mb-1.5">
                    Dining Occasion
                  </label>
                  <select 
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-amber-500"
                  >
                    <option value="Casual Dining">Casual Fine Dining</option>
                    <option value="Anniversary">Anniversary Celebration</option>
                    <option value="Birthday">Birthday Celebration</option>
                    <option value="Business Dinner">Executive Business Meeting</option>
                    <option value="Romantic Date">Romantic Date</option>
                    <option value="Special Celebration">Special Milestone</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400/90 block mb-1.5">
                  Dietary Preferences & Special Requests
                </label>
                <textarea 
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Dietary allergies (nuts, gluten, shellfish), quiet seating, birthday dessert candle..."
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              {/* Step 3 Actions */}
              <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl text-stone-400 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-amber-600/30 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  {bookingLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Verifying & Locking Table...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm Table Reservation</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Confirmation Screen */}
          {step === 4 && confirmedBooking && (
            <div className="text-center py-6 space-y-6">
              
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/20 animate-bounce-subtle">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                  Reservation Guaranteed
                </span>
                <h3 className="font-serif text-3xl font-bold text-white mt-1">
                  We look forward to hosting you.
                </h3>
                <p className="text-xs text-stone-400 mt-2 max-w-md mx-auto">
                  A confirmation SMS and formal itinerary have been sent to <span className="text-white font-medium">{confirmedBooking.customerEmail}</span>.
                </p>
              </div>

              {/* Booking Card Details */}
              <div className="bg-[#1C1C1A] p-6 rounded-3xl border border-stone-800 text-left max-w-lg mx-auto shadow-xl space-y-4">
                
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <span className="text-xs text-stone-400">Booking Reference</span>
                  <span className="font-mono text-sm font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-500/30">
                    {confirmedBooking.bookingReference}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-stone-500 block">Restaurant</span>
                    <span className="text-white font-semibold">{confirmedBooking.restaurantName}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Table Allocated</span>
                    <span className="text-white font-semibold">{confirmedBooking.tableNumber} • {confirmedBooking.zone}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Date & Time</span>
                    <span className="text-white font-semibold">{confirmedBooking.bookingDate} at {confirmedBooking.bookingTime}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Party Size</span>
                    <span className="text-white font-semibold">{confirmedBooking.guestCount} Guests</span>
                  </div>
                </div>

                {confirmedBooking.specialRequests && (
                  <div className="pt-3 border-t border-stone-800 text-xs">
                    <span className="text-stone-500 block mb-0.5">Special Notes</span>
                    <span className="text-stone-300 italic">{confirmedBooking.specialRequests}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const text = `Booking Reference: ${confirmedBooking.bookingReference} at ${confirmedBooking.restaurantName} on ${confirmedBooking.bookingDate} at ${confirmedBooking.bookingTime}`;
                    navigator.clipboard?.writeText(text);
                    showToast('Booking details copied to clipboard!', 'info');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  Copy Confirmation
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

