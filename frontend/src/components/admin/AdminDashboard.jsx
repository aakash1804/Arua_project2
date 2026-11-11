import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Calendar, 
  UtensilsCrossed, 
  Grid, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Plus, 
  Trash2, 
  Edit3, 
  Sparkles, 
  TrendingUp,
  AlertCircle,
  Eye,
  RefreshCw,
  Search
} from 'lucide-react';
import { 
  adminService, 
  restaurantService, 
  tableService, 
  bookingService 
} from '../../services/api';
import { useNotification } from '../../context/NotificationContext';

export const AdminDashboard = () => {
  const { showToast } = useNotification();
  const [activeTab, setActiveTab] = useState('overview'); // overview, restaurants, tables, bookings, users
  
  // Data States
  const [stats, setStats] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [tables, setTables] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [bookingFilter, setBookingFilter] = useState('ALL');
  const [searchRestaurant, setSearchRestaurant] = useState('');

  // Modals
  const [showAddRestaurantModal, setShowAddRestaurantModal] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [showAddTableModal, setShowAddTableModal] = useState(false);
  const [selectedRestaurantForTables, setSelectedRestaurantForTables] = useState(1);

  // Form States
  const [restaurantForm, setRestaurantForm] = useState({
    name: '',
    cuisine: 'French Fine Dining',
    location: '',
    address: '',
    priceRange: '$$$$',
    openingHours: '5:30 PM - 11:00 PM',
    phone: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Valet Parking', 'Sommelier Service']
  });

  const [tableForm, setTableForm] = useState({
    restaurantId: 1,
    tableNumber: '',
    zone: 'Main Dining Room',
    capacity: 4
  });

  // Load all admin data
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, restData, bookData, usersData] = await Promise.all([
        adminService.getDashboardStats(),
        restaurantService.getAll(),
        bookingService.getAllBookings(),
        adminService.getAllUsers()
      ]);
      setStats(statsData);
      setRestaurants(restData);
      setBookings(bookData);
      setUsers(usersData);

      if (restData.length > 0) {
        const tableList = await tableService.getByRestaurant(restData[0].id);
        setTables(tableList);
        setSelectedRestaurantForTables(restData[0].id);
      }
    } catch (err) {
      showToast('Error loading admin metrics', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleSelectRestaurantTables = async (restId) => {
    setSelectedRestaurantForTables(restId);
    try {
      const tList = await tableService.getByRestaurant(restId);
      setTables(tList);
    } catch (err) {
      showToast('Failed to load tables', 'error');
    }
  };

  // Restaurant Actions
  const handleSaveRestaurant = async (e) => {
    e.preventDefault();
    try {
      if (editingRestaurant) {
        await restaurantService.update(editingRestaurant.id, restaurantForm);
        showToast('Restaurant updated successfully');
      } else {
        await restaurantService.create(restaurantForm);
        showToast('New restaurant added successfully');
      }
      setShowAddRestaurantModal(false);
      setEditingRestaurant(null);
      loadDashboardData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteRestaurant = async (id) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      await restaurantService.delete(id);
      showToast('Restaurant removed');
      loadDashboardData();
    }
  };

  // Table Actions
  const handleSaveTable = async (e) => {
    e.preventDefault();
    try {
      await tableService.create({
        ...tableForm,
        restaurantId: parseInt(selectedRestaurantForTables),
        capacity: parseInt(tableForm.capacity)
      });
      showToast('Table added successfully');
      setShowAddTableModal(false);
      setTableForm({ ...tableForm, tableNumber: '' });
      handleSelectRestaurantTables(selectedRestaurantForTables);
      loadDashboardData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteTable = async (id) => {
    if (window.confirm('Delete this table?')) {
      await tableService.delete(id);
      showToast('Table deleted');
      handleSelectRestaurantTables(selectedRestaurantForTables);
      loadDashboardData();
    }
  };

  // Reservation Actions
  const handleUpdateBookingStatus = async (bookingId, status) => {
    try {
      await bookingService.updateStatus(bookingId, status);
      showToast(`Booking marked as ${status}`);
      loadDashboardData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const filteredBookings = bookings.filter(b => {
    if (bookingFilter === 'ALL') return true;
    return b.status === bookingFilter;
  });

  return (
    <div className="min-h-screen bg-[#111110] text-stone-200 pb-20">
      
      {/* Top Admin Header Bar */}
      <div className="bg-[#181817] border-b border-stone-800 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>Haute Hospitality Management Suite</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-white mt-1">
              Executive Admin Console
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadDashboardData}
              className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-300 hover:text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-400' : ''}`} />
            </button>

            <button
              onClick={() => {
                setEditingRestaurant(null);
                setRestaurantForm({
                  name: '',
                  cuisine: 'French Fine Dining',
                  location: '',
                  address: '',
                  priceRange: '$$$$',
                  openingHours: '5:30 PM - 11:00 PM',
                  phone: '',
                  description: '',
                  image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
                  facilities: ['Valet Parking', 'Sommelier Service']
                });
                setShowAddRestaurantModal(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Restaurant</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto flex gap-2 mt-6 overflow-x-auto pb-1 text-xs font-bold uppercase tracking-wider">
          {[
            { id: 'overview', label: 'Overview & Analytics', icon: BarChart3 },
            { id: 'restaurants', label: 'Restaurants Directory', icon: UtensilsCrossed },
            { id: 'tables', label: 'Tables & Floor Plans', icon: Grid },
            { id: 'bookings', label: 'Reservations Master', icon: Calendar },
            { id: 'users', label: 'Customer Base', icon: Users },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
                  active 
                    ? 'bg-amber-500 text-black shadow-md' 
                    : 'bg-stone-900/80 text-stone-400 hover:text-white border border-stone-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        
        {/* ================= TAB 1: OVERVIEW & ANALYTICS ================= */}
        {activeTab === 'overview' && stats && (
          <div className="space-y-8">
            
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-6 rounded-3xl bg-[#181817] border border-stone-800 shadow-xl">
                <div className="flex items-center justify-between text-stone-400 text-xs font-semibold uppercase tracking-wider">
                  <span>Total Reservations</span>
                  <Calendar className="w-4 h-4 text-amber-400" />
                </div>
                <p className="font-serif text-3xl font-bold text-white mt-3">{stats.totalBookings}</p>
                <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18% from last month</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#181817] border border-stone-800 shadow-xl">
                <div className="flex items-center justify-between text-stone-400 text-xs font-semibold uppercase tracking-wider">
                  <span>Estimated Covers Value</span>
                  <DollarSign className="w-4 h-4 text-amber-400" />
                </div>
                <p className="font-serif text-3xl font-bold text-amber-400 mt-3">
                  ${stats.totalEstimatedRevenue.toLocaleString()}
                </p>
                <div className="mt-2 text-[11px] text-stone-400">
                  {stats.totalGuestsServed} covers @ avg $95/head
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#181817] border border-stone-800 shadow-xl">
                <div className="flex items-center justify-between text-stone-400 text-xs font-semibold uppercase tracking-wider">
                  <span>Active Tables Managed</span>
                  <Grid className="w-4 h-4 text-amber-400" />
                </div>
                <p className="font-serif text-3xl font-bold text-white mt-3">{stats.totalTables}</p>
                <div className="mt-2 text-[11px] text-amber-300">
                  Across {stats.totalRestaurants} partner dining houses
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#181817] border border-stone-800 shadow-xl">
                <div className="flex items-center justify-between text-stone-400 text-xs font-semibold uppercase tracking-wider">
                  <span>Booking Health Rate</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="font-serif text-3xl font-bold text-emerald-400 mt-3">
                  {Math.round((stats.confirmedBookings / (stats.totalBookings || 1)) * 100)}%
                </p>
                <div className="mt-2 text-[11px] text-stone-400">
                  {stats.cancelledBookings} cancellations recorded
                </div>
              </div>

            </div>

            {/* Interactive Luxury Analytics Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Daily Reservation Volume Chart */}
              <div className="p-6 rounded-3xl bg-[#181817] border border-stone-800 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      Reservation Influx by Seating Time
                    </h3>
                    <p className="text-xs text-stone-400 mt-0.5">Peak demand between 19:00 - 20:30</p>
                  </div>
                  <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/30">
                    Live Telemetry
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    { slot: '12:00 - 14:00 (Lunch)', count: 8, percentage: 40 },
                    { slot: '17:30 - 18:30 (Early Dinner)', count: 14, percentage: 65 },
                    { slot: '19:00 - 20:30 (Peak Prime)', count: 24, percentage: 95 },
                    { slot: '21:00 - Late (Nightcap)', count: 11, percentage: 50 },
                  ].map(row => (
                    <div key={row.slot} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-stone-300 font-medium">{row.slot}</span>
                        <span className="text-amber-400 font-bold">{row.count} Bookings</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-stone-900 overflow-hidden border border-stone-800">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-1000"
                          style={{ width: `${row.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cuisine Popularity Breakdown */}
              <div className="p-6 rounded-3xl bg-[#181817] border border-stone-800 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      Gastronomy Genre Distribution
                    </h3>
                    <p className="text-xs text-stone-400 mt-0.5">Guest preferences across booked tables</p>
                  </div>
                  <span className="text-xs text-stone-400">Total 100%</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'French Fine Dining', share: '32%', color: 'border-amber-500 text-amber-400' },
                    { name: 'Japanese Omakase', share: '28%', color: 'border-emerald-500 text-emerald-400' },
                    { name: 'Prime Steakhouse', share: '22%', color: 'border-blue-500 text-blue-400' },
                    { name: 'Modern Italian & Other', share: '18%', color: 'border-purple-500 text-purple-400' },
                  ].map(c => (
                    <div key={c.name} className={`p-4 rounded-2xl bg-stone-900/60 border ${c.color} flex flex-col justify-between`}>
                      <span className="text-xs text-stone-400">{c.name}</span>
                      <span className="font-serif text-2xl font-bold mt-2">{c.share}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Recent Bookings Snapshot */}
            <div className="p-6 rounded-3xl bg-[#181817] border border-stone-800 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Latest Reservation Stream
                </h3>
                <button 
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs text-amber-400 hover:underline"
                >
                  View All Master Bookings →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-stone-800 text-stone-500 uppercase tracking-wider">
                      <th className="pb-3">Reference</th>
                      <th className="pb-3">Guest</th>
                      <th className="pb-3">Restaurant</th>
                      <th className="pb-3">Table & Time</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/60">
                    {bookings.slice(0, 4).map(b => (
                      <tr key={b.id} className="hover:bg-stone-900/40">
                        <td className="py-3 font-mono text-amber-400 font-bold">{b.bookingReference}</td>
                        <td className="py-3 text-white font-medium">{b.customerName}</td>
                        <td className="py-3 text-stone-300">{b.restaurantName}</td>
                        <td className="py-3 text-stone-400">{b.tableNumber} • {b.bookingDate} {b.bookingTime}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            b.status === 'CONFIRMED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                            b.status === 'CANCELLED' ? 'bg-red-950 text-red-400 border border-red-800' :
                            'bg-blue-950 text-blue-400 border border-blue-800'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 2: RESTAURANTS DIRECTORY ================= */}
        {activeTab === 'restaurants' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                <input 
                  type="text"
                  placeholder="Search restaurants..."
                  value={searchRestaurant}
                  onChange={(e) => setSearchRestaurant(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <span className="text-xs text-stone-400">
                Showing {restaurants.length} active dining establishments
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants
                .filter(r => r.name.toLowerCase().includes(searchRestaurant.toLowerCase()) || r.cuisine.toLowerCase().includes(searchRestaurant.toLowerCase()))
                .map(r => (
                  <div key={r.id} className="p-5 rounded-3xl bg-[#181817] border border-stone-800 flex flex-col justify-between shadow-xl">
                    <div>
                      <img 
                        src={r.image} 
                        alt={r.name} 
                        className="w-full h-40 object-cover rounded-2xl mb-4"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">{r.cuisine}</span>
                        <span className="text-xs text-stone-400 font-semibold">{r.priceRange}</span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-white mt-1">{r.name}</h3>
                      <p className="text-xs text-stone-400 mt-0.5">{r.location}</p>
                      <p className="text-xs text-stone-300 mt-2 line-clamp-2">{r.description}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
                      <button
                        onClick={() => {
                          handleSelectRestaurantTables(r.id);
                          setActiveTab('tables');
                        }}
                        className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-medium"
                      >
                        <Grid className="w-3.5 h-3.5" />
                        Manage Tables
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingRestaurant(r);
                            setRestaurantForm(r);
                            setShowAddRestaurantModal(true);
                          }}
                          className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors"
                          title="Edit Restaurant"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteRestaurant(r.id)}
                          className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900/60 text-red-400 transition-colors"
                          title="Delete Restaurant"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: TABLES & FLOOR PLANS ================= */}
        {activeTab === 'tables' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#181817] border border-stone-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Select Restaurant:</span>
                <select
                  value={selectedRestaurantForTables}
                  onChange={(e) => handleSelectRestaurantTables(parseInt(e.target.value))}
                  className="px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {restaurants.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setTableForm({
                    restaurantId: selectedRestaurantForTables,
                    tableNumber: `T-0${tables.length + 1}`,
                    zone: 'Main Dining Room',
                    capacity: 4
                  });
                  setShowAddTableModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Table to Floor Plan</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {tables.map(table => (
                <div key={table.id} className="p-4 rounded-2xl bg-[#181817] border border-stone-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-amber-400">{table.tableNumber}</span>
                      <button 
                        onClick={() => handleDeleteTable(table.id)}
                        className="text-stone-500 hover:text-red-400 transition-colors"
                        title="Delete Table"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs font-bold text-white mt-1">{table.capacity} Persons</p>
                    <p className="text-[11px] text-stone-400 mt-0.5">{table.zone}</p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[10px]">
                    <span className="text-emerald-400 font-semibold uppercase">Operational</span>
                    <span className="text-stone-500">ID: {table.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: RESERVATIONS MASTER ================= */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400 uppercase tracking-wider">Status Filter:</span>
                {['ALL', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map(s => (
                  <button
                    key={s}
                    onClick={() => setBookingFilter(s)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                      bookingFilter === s 
                        ? 'bg-amber-500 text-black' 
                        : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <span className="text-xs text-stone-400">
                {filteredBookings.length} bookings shown
              </span>
            </div>

            <div className="rounded-3xl bg-[#181817] border border-stone-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-900/60 border-b border-stone-800 text-stone-400 uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Reference</th>
                      <th className="p-4">Customer Contact</th>
                      <th className="p-4">Restaurant & Table</th>
                      <th className="p-4">Date & Time</th>
                      <th className="p-4">Party</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/60">
                    {filteredBookings.map(b => (
                      <tr key={b.id} className="hover:bg-stone-900/40 transition-colors">
                        <td className="p-4 font-mono font-bold text-amber-400">{b.bookingReference}</td>
                        <td className="p-4">
                          <p className="text-white font-semibold">{b.customerName}</p>
                          <p className="text-stone-400 text-[11px]">{b.customerEmail}</p>
                          <p className="text-stone-500 text-[10px]">{b.customerPhone}</p>
                        </td>
                        <td className="p-4">
                          <p className="text-white font-medium">{b.restaurantName}</p>
                          <p className="text-stone-400 text-[11px]">{b.tableNumber} ({b.zone})</p>
                        </td>
                        <td className="p-4 text-stone-200">
                          {b.bookingDate} at {b.bookingTime}
                        </td>
                        <td className="p-4 text-stone-300 font-semibold">{b.guestCount} Guests</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            b.status === 'CONFIRMED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                            b.status === 'COMPLETED' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                            'bg-red-950 text-red-400 border border-red-800'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          {b.status === 'CONFIRMED' && (
                            <>
                              <button
                                onClick={() => handleUpdateBookingStatus(b.id, 'COMPLETED')}
                                className="px-2.5 py-1 rounded-lg bg-emerald-900/40 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 text-[11px] font-medium"
                              >
                                Complete
                              </button>
                              <button
                                onClick={() => handleUpdateBookingStatus(b.id, 'CANCELLED')}
                                className="px-2.5 py-1 rounded-lg bg-red-900/40 hover:bg-red-900/80 text-red-300 border border-red-700/60 text-[11px] font-medium"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {b.status === 'CANCELLED' && (
                            <button
                              onClick={() => handleUpdateBookingStatus(b.id, 'CONFIRMED')}
                              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px]"
                            >
                              Re-instate
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: CUSTOMER BASE ================= */}
        {activeTab === 'users' && (
          <div className="rounded-3xl bg-[#181817] border border-stone-800 overflow-hidden shadow-xl">
            <div className="p-5 border-b border-stone-800 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Registered Guest Directory
              </h3>
              <span className="text-xs text-stone-400">{users.length} registered profiles</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-900/60 border-b border-stone-800 text-stone-400 uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Dining Preferences</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-stone-900/40">
                      <td className="p-4 flex items-center gap-3">
                        <img 
                          src={u.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"} 
                          alt="" 
                          className="w-8 h-8 rounded-full object-cover border border-stone-700"
                        />
                        <span className="font-semibold text-white">{u.fullName}</span>
                      </td>
                      <td className="p-4 text-stone-300">{u.email}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-950/60 text-amber-300 border border-amber-500/30">
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 text-stone-400 italic">
                        {u.dietaryNotes || 'Standard gourmet dining preferences'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* ================= ADD / EDIT RESTAURANT MODAL ================= */}
      {showAddRestaurantModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#181817] rounded-3xl border border-stone-800 p-6 max-w-xl w-full my-8">
            <h3 className="font-serif text-xl font-bold text-white mb-4">
              {editingRestaurant ? 'Edit Restaurant Listing' : 'Add New Partner Restaurant'}
            </h3>
            <form onSubmit={handleSaveRestaurant} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-400 mb-1 font-semibold uppercase">Restaurant Name</label>
                <input 
                  type="text" 
                  required
                  value={restaurantForm.name}
                  onChange={(e) => setRestaurantForm({ ...restaurantForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1 font-semibold uppercase">Cuisine Type</label>
                  <input 
                    type="text" 
                    required
                    value={restaurantForm.cuisine}
                    onChange={(e) => setRestaurantForm({ ...restaurantForm, cuisine: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-semibold uppercase">Price Range</label>
                  <select
                    value={restaurantForm.priceRange}
                    onChange={(e) => setRestaurantForm({ ...restaurantForm, priceRange: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-white"
                  >
                    <option value="$$">$$ (Moderate)</option>
                    <option value="$$$">$$$ (Upscale)</option>
                    <option value="$$$$">$$$$ (Fine Dining / Luxury)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-semibold uppercase">City / Location</label>
                <input 
                  type="text" 
                  required
                  value={restaurantForm.location}
                  onChange={(e) => setRestaurantForm({ ...restaurantForm, location: e.target.value })}
                  placeholder="e.g. Back Bay, Boston, MA"
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-white"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-semibold uppercase">Hero Photography URL</label>
                <input 
                  type="url" 
                  value={restaurantForm.image}
                  onChange={(e) => setRestaurantForm({ ...restaurantForm, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-white"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-semibold uppercase">Editorial Description</label>
                <textarea 
                  rows={3}
                  value={restaurantForm.description}
                  onChange={(e) => setRestaurantForm({ ...restaurantForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-white"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setShowAddRestaurantModal(false)}
                  className="px-4 py-2 rounded-xl text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider"
                >
                  Save Restaurant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= ADD TABLE MODAL ================= */}
      {showAddTableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#181817] rounded-3xl border border-stone-800 p-6 max-w-sm w-full">
            <h3 className="font-serif text-lg font-bold text-white mb-4">
              Add Table to Floor Plan
            </h3>
            <form onSubmit={handleSaveTable} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-400 mb-1 font-semibold uppercase">Table Identifier / Code</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. T-15 or VIP-3"
                  value={tableForm.tableNumber}
                  onChange={(e) => setTableForm({ ...tableForm, tableNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-white"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-semibold uppercase">Zone / Area</label>
                <select
                  value={tableForm.zone}
                  onChange={(e) => setTableForm({ ...tableForm, zone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-white"
                >
                  <option value="Main Dining Room">Main Dining Room</option>
                  <option value="Romantic Window">Romantic Window</option>
                  <option value="Terrace Garden">Terrace Garden</option>
                  <option value="Private Salon VIP">Private Salon VIP</option>
                  <option value="Chef Omakase Counter">Chef Omakase Counter</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-semibold uppercase">Guest Capacity</label>
                <select
                  value={tableForm.capacity}
                  onChange={(e) => setTableForm({ ...tableForm, capacity: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-white"
                >
                  <option value="2">2 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="6">6 Guests</option>
                  <option value="8">8 Guests (Large Group)</option>
                  <option value="12">12 Guests (VIP Salon)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setShowAddTableModal(false)}
                  className="px-4 py-2 rounded-xl text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider"
                >
                  Save Table
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

