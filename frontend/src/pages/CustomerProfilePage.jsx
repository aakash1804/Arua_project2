import React, { useState } from 'react';
import { User, Mail, Phone, Heart, Award, Shield, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

export const CustomerProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useNotification();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '+1 (555) 234-5678',
    dietaryNotes: user?.dietaryNotes || 'Pescatarian, prefers sparkling water, romantic window seating.'
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(formData);
      showToast('Profile preferences updated successfully');
    } catch (err) {
      showToast('Failed to update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="pb-6 border-b border-stone-800">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
          Guest Membership
        </span>
        <h1 className="font-serif text-3xl font-bold text-white mt-1">
          Guest Profile & Dining Preferences
        </h1>
        <p className="text-xs text-stone-400 mt-1">
          Your dining preferences are automatically shared with host restaurants for bespoke hospitality.
        </p>
      </div>

      {/* Member Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#222220] to-[#181817] border border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img 
            src={user?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"} 
            alt={user?.fullName} 
            className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/40"
          />
          <div>
            <h3 className="font-serif text-xl font-bold text-white">{user?.fullName || 'Distinguished Guest'}</h3>
            <p className="text-xs text-stone-400">{user?.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-black">
                VIP Tier Status
              </span>
              <span className="text-[11px] text-stone-400 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Priority Seating Access
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="p-8 rounded-3xl bg-[#1C1C1A] border border-stone-800 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-amber-400/90 block mb-2">
                Full Name
              </label>
              <input 
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-amber-400/90 block mb-2">
                Email Address
              </label>
              <input 
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-amber-400/90 block mb-2">
              Mobile Contact Number
            </label>
            <input 
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-amber-400/90 block mb-2">
              Dietary Restrictions & Seating Notes
            </label>
            <textarea 
              rows={4}
              value={formData.dietaryNotes}
              onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-amber-500"
              placeholder="Allergies (nuts, shellfish, dairy), preferred seating zones, sparkling or still water..."
            ></textarea>
            <p className="text-[11px] text-stone-500 mt-1.5">
              These notes are automatically pre-filled into all future restaurant reservation itineraries.
            </p>
          </div>

          <div className="pt-4 border-t border-stone-800 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              {saving ? 'Saving...' : 'Update Preferences'}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

