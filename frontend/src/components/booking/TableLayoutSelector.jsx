import React from 'react';
import { Users, Lock, CheckCircle, ShieldAlert } from 'lucide-react';

export const TableLayoutSelector = ({ tables, selectedTable, onSelectTable, guestCount }) => {
  // Group tables by zone
  const tablesByZone = tables.reduce((acc, t) => {
    const zoneName = t.zone || 'Main Dining Room';
    if (!acc[zoneName]) acc[zoneName] = [];
    acc[zoneName].push(t);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      
      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-stone-900/80 border border-stone-800 text-xs">
        <span className="text-stone-400 font-medium">Floor Plan Live Status:</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-lg bg-emerald-950 border border-emerald-500/50"></span>
            <span className="text-emerald-400 font-medium">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-lg bg-amber-500 shadow-sm shadow-amber-500/50"></span>
            <span className="text-amber-400 font-medium">Selected Table</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-lg bg-stone-800 border border-stone-700 opacity-60"></span>
            <span className="text-stone-500 font-medium">Reserved / Booked</span>
          </div>
        </div>
      </div>

      {/* Interactive Zones */}
      {Object.entries(tablesByZone).map(([zone, zoneTables]) => (
        <div key={zone} className="p-5 rounded-2xl bg-[#181817] border border-stone-800">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400">
              {zone}
            </h4>
            <span className="text-[11px] text-stone-500">
              {zoneTables.filter(t => t.isAvailable).length} of {zoneTables.length} available
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {zoneTables.map((table) => {
              const isSelected = selectedTable?.id === table.id;
              const isAvailable = table.isAvailable;
              const fitsParty = !guestCount || table.capacity >= guestCount;

              return (
                <button
                  key={table.id}
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => onSelectTable(table)}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-200 relative flex flex-col justify-between min-h-[100px] cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-black border-amber-400 shadow-lg shadow-amber-500/30 scale-[1.02] ring-2 ring-amber-300 ring-offset-2 ring-offset-stone-900'
                      : !isAvailable
                      ? 'bg-stone-900/40 border-stone-800/60 text-stone-600 cursor-not-allowed opacity-50'
                      : fitsParty
                      ? 'bg-stone-900/90 border-emerald-500/30 text-stone-200 hover:border-emerald-400 hover:bg-stone-850 hover:scale-[1.01]'
                      : 'bg-stone-900/60 border-amber-900/40 text-stone-400 hover:border-amber-700'
                  }`}
                >
                  {/* Top Bar: Table Number & Status Icon */}
                  <div className="flex items-center justify-between w-full">
                    <span className={`font-mono text-xs font-bold ${isSelected ? 'text-black' : isAvailable ? 'text-white' : 'text-stone-500'}`}>
                      {table.tableNumber}
                    </span>
                    {isSelected ? (
                      <CheckCircle className="w-4 h-4 text-black fill-white" />
                    ) : !isAvailable ? (
                      <Lock className="w-3.5 h-3.5 text-stone-600" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    )}
                  </div>

                  {/* Middle: Seats Capacity */}
                  <div className="my-2">
                    <div className="flex items-center gap-1.5 text-xs">
                      <Users className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-amber-400/90'}`} />
                      <span className="font-semibold">{table.capacity} Seats</span>
                    </div>
                  </div>

                  {/* Bottom: Sub-badge */}
                  <div className="text-[10px]">
                    {isSelected ? (
                      <span className="font-bold uppercase tracking-wider text-black">Chosen</span>
                    ) : !isAvailable ? (
                      <span className="text-stone-500 uppercase tracking-wider">Booked</span>
                    ) : (
                      <span className="text-emerald-400/90 font-medium">Available</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {tables.length === 0 && (
        <div className="p-8 text-center text-stone-400 bg-stone-900/50 rounded-2xl border border-stone-800">
          <ShieldAlert className="w-8 h-8 text-amber-500/60 mx-auto mb-2" />
          <p className="text-sm font-medium">No tables found matching criteria for this time slot.</p>
          <p className="text-xs text-stone-500 mt-1">Please try choosing an earlier or later time slot.</p>
        </div>
      )}

    </div>
  );
};

