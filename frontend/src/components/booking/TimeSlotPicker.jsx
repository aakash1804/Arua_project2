import React from 'react';
import { Sun, Moon, Clock } from 'lucide-react';

export const TimeSlotPicker = ({ selectedTime, onSelectTime }) => {
  const lunchSlots = [
    '12:00', '12:30', '13:00', '13:30', '14:00'
  ];

  const dinnerSlots = [
    '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  const formatSlot = (time) => {
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };

  return (
    <div className="space-y-5">
      
      {/* Lunch Section */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-amber-400">
          <Sun className="w-4 h-4 text-amber-400" />
          <span>Afternoon Seating</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {lunchSlots.map((slot) => {
            const isSelected = selectedTime === slot;
            return (
              <button
                key={slot}
                type="button"
                onClick={() => onSelectTime(slot)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30 scale-105'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-800'
                }`}
              >
                {formatSlot(slot)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dinner Section */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-amber-400">
          <Moon className="w-4 h-4 text-amber-400" />
          <span>Evening Service</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {dinnerSlots.map((slot) => {
            const isSelected = selectedTime === slot;
            return (
              <button
                key={slot}
                type="button"
                onClick={() => onSelectTime(slot)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30 scale-105'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-800'
                }`}
              >
                {formatSlot(slot)}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

