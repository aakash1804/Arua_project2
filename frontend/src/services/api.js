import axios from 'axios';
import { INITIAL_RESTAURANTS, INITIAL_TABLES, INITIAL_BOOKINGS, INITIAL_USERS } from './seedData';

const BASE_URL = '/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Local storage state initialization for fallback/standalone mode
const getStorageItem = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error', e);
  }
};

// Seed storage on initial load if empty
if (!localStorage.getItem('rp_restaurants')) {
  setStorageItem('rp_restaurants', INITIAL_RESTAURANTS);
}
if (!localStorage.getItem('rp_tables')) {
  setStorageItem('rp_tables', INITIAL_TABLES);
}
if (!localStorage.getItem('rp_bookings')) {
  setStorageItem('rp_bookings', INITIAL_BOOKINGS);
}
if (!localStorage.getItem('rp_users')) {
  setStorageItem('rp_users', INITIAL_USERS);
}
if (!localStorage.getItem('rp_current_user')) {
  setStorageItem('rp_current_user', INITIAL_USERS[1]); // Default to Eleanor (Customer)
  localStorage.setItem('token', 'mock_jwt_customer_token_eleanor_2026');
}

// Check if backend gateway is responding
let isBackendLive = false;
export const checkBackendHealth = async () => {
  try {
    const res = await axios.get('/api/actuator/health', { timeout: 1500 });
    isBackendLive = (res.status === 200);
    return isBackendLive;
  } catch (err) {
    isBackendLive = false;
    return false;
  }
};

// Authentication Services
export const authService = {
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        setStorageItem('rp_current_user', response.data.user);
        return response.data;
      }
    } catch (err) {
      // Fallback local auth simulation
      const users = getStorageItem('rp_users', INITIAL_USERS);
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (user) {
        const token = user.role === 'ADMIN' ? 'mock_jwt_admin_token_2026' : `mock_jwt_user_token_${user.id}`;
        localStorage.setItem('token', token);
        setStorageItem('rp_current_user', user);
        return { token, user };
      }
      // Demo admin shortcut: if email starts with admin
      if (email.includes('admin')) {
        const adminUser = users.find(u => u.role === 'ADMIN') || {
          id: 1,
          fullName: 'Alexander Hamilton (Admin)',
          email,
          role: 'ADMIN',
        };
        localStorage.setItem('token', 'mock_jwt_admin_token_2026');
        setStorageItem('rp_current_user', adminUser);
        return { token: 'mock_jwt_admin_token_2026', user: adminUser };
      }
      throw new Error('Invalid email or password. Try customer@tableprime.com or admin@tableprime.com');
    }
  },

  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/register', userData);
      return response.data;
    } catch (err) {
      const users = getStorageItem('rp_users', INITIAL_USERS);
      if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
        throw new Error('An account with this email address already exists.');
      }
      const newUser = {
        id: Date.now(),
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone || '',
        role: userData.role || 'CUSTOMER',
        dietaryNotes: userData.dietaryNotes || '',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      };
      users.push(newUser);
      setStorageItem('rp_users', users);
      const token = `mock_jwt_user_token_${newUser.id}`;
      localStorage.setItem('token', token);
      setStorageItem('rp_current_user', newUser);
      return { token, user: newUser };
    }
  },

  getCurrentUser: () => {
    return getStorageItem('rp_current_user', INITIAL_USERS[1]);
  },

  updateProfile: async (profileData) => {
    try {
      const response = await axiosInstance.put('/users/profile', profileData);
      return response.data;
    } catch (err) {
      const current = getStorageItem('rp_current_user', INITIAL_USERS[1]);
      const updated = { ...current, ...profileData };
      setStorageItem('rp_current_user', updated);

      const users = getStorageItem('rp_users', INITIAL_USERS).map(u => u.id === updated.id ? updated : u);
      setStorageItem('rp_users', users);
      return updated;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rp_current_user');
  }
};

// Restaurant Services
export const restaurantService = {
  getAll: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/restaurants', { params });
      return response.data;
    } catch (err) {
      let restaurants = getStorageItem('rp_restaurants', INITIAL_RESTAURANTS);
      if (params.search) {
        const q = params.search.toLowerCase();
        restaurants = restaurants.filter(r => 
          r.name.toLowerCase().includes(q) || 
          r.location.toLowerCase().includes(q) || 
          r.cuisine.toLowerCase().includes(q)
        );
      }
      if (params.cuisine && params.cuisine !== 'All') {
        restaurants = restaurants.filter(r => r.cuisine.toLowerCase().includes(params.cuisine.toLowerCase()));
      }
      if (params.priceRange && params.priceRange !== 'All') {
        restaurants = restaurants.filter(r => r.priceRange === params.priceRange);
      }
      if (params.minRating) {
        restaurants = restaurants.filter(r => r.rating >= parseFloat(params.minRating));
      }
      return restaurants;
    }
  },

  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/restaurants/${id}`);
      return response.data;
    } catch (err) {
      const restaurants = getStorageItem('rp_restaurants', INITIAL_RESTAURANTS);
      const found = restaurants.find(r => r.id === parseInt(id));
      if (!found) throw new Error('Restaurant not found');
      return found;
    }
  },

  create: async (data) => {
    try {
      const response = await axiosInstance.post('/restaurants', data);
      return response.data;
    } catch (err) {
      const restaurants = getStorageItem('rp_restaurants', INITIAL_RESTAURANTS);
      const newRestaurant = {
        ...data,
        id: Date.now(),
        rating: 4.8,
        reviewCount: 0,
        images: [data.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"],
        facilities: data.facilities || ["Valet Parking", "Full Bar", "Wheelchair Accessible"],
        menu: data.menu || []
      };
      restaurants.unshift(newRestaurant);
      setStorageItem('rp_restaurants', restaurants);
      return newRestaurant;
    }
  },

  update: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/restaurants/${id}`, data);
      return response.data;
    } catch (err) {
      const restaurants = getStorageItem('rp_restaurants', INITIAL_RESTAURANTS);
      const index = restaurants.findIndex(r => r.id === parseInt(id));
      if (index === -1) throw new Error('Restaurant not found');
      restaurants[index] = { ...restaurants[index], ...data };
      setStorageItem('rp_restaurants', restaurants);
      return restaurants[index];
    }
  },

  delete: async (id) => {
    try {
      await axiosInstance.delete(`/restaurants/${id}`);
      return true;
    } catch (err) {
      const restaurants = getStorageItem('rp_restaurants', INITIAL_RESTAURANTS).filter(r => r.id !== parseInt(id));
      setStorageItem('rp_restaurants', restaurants);
      return true;
    }
  }
};

// Table Services
export const tableService = {
  getByRestaurant: async (restaurantId) => {
    try {
      const response = await axiosInstance.get(`/tables/restaurant/${restaurantId}`);
      return response.data;
    } catch (err) {
      const tables = getStorageItem('rp_tables', INITIAL_TABLES);
      return tables.filter(t => t.restaurantId === parseInt(restaurantId));
    }
  },

  getAvailable: async (restaurantId, date, time, guests) => {
    try {
      const response = await axiosInstance.get('/tables/available', {
        params: { restaurantId, date, time, guests }
      });
      return response.data;
    } catch (err) {
      const allTables = getStorageItem('rp_tables', INITIAL_TABLES);
      const allBookings = getStorageItem('rp_bookings', INITIAL_BOOKINGS);

      // Filter by restaurant and capacity
      const restaurantTables = allTables.filter(t => 
        t.restaurantId === parseInt(restaurantId) && 
        (!guests || t.capacity >= parseInt(guests))
      );

      // Check conflict with bookings for that date & time
      return restaurantTables.map(table => {
        const isBooked = allBookings.some(b => 
          b.restaurantId === parseInt(restaurantId) &&
          b.tableId === table.id &&
          b.bookingDate === date &&
          b.bookingTime === time &&
          b.status !== 'CANCELLED'
        );
        return {
          ...table,
          isAvailable: !isBooked,
          status: isBooked ? 'RESERVED' : 'AVAILABLE'
        };
      });
    }
  },

  create: async (tableData) => {
    try {
      const response = await axiosInstance.post('/tables', tableData);
      return response.data;
    } catch (err) {
      const tables = getStorageItem('rp_tables', INITIAL_TABLES);
      const newTable = {
        ...tableData,
        id: Date.now(),
        status: 'AVAILABLE'
      };
      tables.push(newTable);
      setStorageItem('rp_tables', tables);
      return newTable;
    }
  },

  update: async (id, tableData) => {
    try {
      const response = await axiosInstance.put(`/tables/${id}`, tableData);
      return response.data;
    } catch (err) {
      const tables = getStorageItem('rp_tables', INITIAL_TABLES);
      const idx = tables.findIndex(t => t.id === parseInt(id));
      if (idx !== -1) {
        tables[idx] = { ...tables[idx], ...tableData };
        setStorageItem('rp_tables', tables);
        return tables[idx];
      }
      throw new Error('Table not found');
    }
  },

  delete: async (id) => {
    try {
      await axiosInstance.delete(`/tables/${id}`);
      return true;
    } catch (err) {
      const tables = getStorageItem('rp_tables', INITIAL_TABLES).filter(t => t.id !== parseInt(id));
      setStorageItem('rp_tables', tables);
      return true;
    }
  }
};

// Booking Services
export const bookingService = {
  create: async (bookingPayload) => {
    try {
      const response = await axiosInstance.post('/bookings', bookingPayload);
      return response.data;
    } catch (err) {
      // Local concurrency & double-booking prevention check
      const bookings = getStorageItem('rp_bookings', INITIAL_BOOKINGS);
      
      const conflictingBooking = bookings.find(b => 
        b.restaurantId === parseInt(bookingPayload.restaurantId) &&
        b.tableId === parseInt(bookingPayload.tableId) &&
        b.bookingDate === bookingPayload.bookingDate &&
        b.bookingTime === bookingPayload.bookingTime &&
        b.status !== 'CANCELLED'
      );

      if (conflictingBooking) {
        throw new Error(`Table ${bookingPayload.tableNumber || ''} is already reserved for ${bookingPayload.bookingTime} on ${bookingPayload.bookingDate}. Please select another time or table.`);
      }

      const randomSuffix = Math.floor(10000 + Math.random() * 90000);
      const year = new Date().getFullYear();
      const uniqueReference = `BK-${year}-${randomSuffix}`;

      const newBooking = {
        id: Date.now(),
        bookingReference: uniqueReference,
        userId: bookingPayload.userId || 2,
        customerName: bookingPayload.customerName,
        customerEmail: bookingPayload.customerEmail,
        customerPhone: bookingPayload.customerPhone,
        restaurantId: parseInt(bookingPayload.restaurantId),
        restaurantName: bookingPayload.restaurantName,
        tableId: parseInt(bookingPayload.tableId),
        tableNumber: bookingPayload.tableNumber,
        zone: bookingPayload.zone,
        bookingDate: bookingPayload.bookingDate,
        bookingTime: bookingPayload.bookingTime,
        guestCount: parseInt(bookingPayload.guestCount),
        specialRequests: bookingPayload.specialRequests || 'None',
        status: 'CONFIRMED',
        createdAt: new Date().toISOString()
      };

      bookings.unshift(newBooking);
      setStorageItem('rp_bookings', bookings);
      return newBooking;
    }
  },

  getMyBookings: async () => {
    try {
      const response = await axiosInstance.get('/bookings/my-bookings');
      return response.data;
    } catch (err) {
      const user = authService.getCurrentUser();
      const bookings = getStorageItem('rp_bookings', INITIAL_BOOKINGS);
      if (!user) return [];
      return bookings.filter(b => b.userId === user.id || b.customerEmail === user.email);
    }
  },

  getAllBookings: async () => {
    try {
      const response = await axiosInstance.get('/admin/bookings');
      return response.data;
    } catch (err) {
      return getStorageItem('rp_bookings', INITIAL_BOOKINGS);
    }
  },

  cancel: async (bookingId) => {
    try {
      const response = await axiosInstance.put(`/bookings/${bookingId}/cancel`);
      return response.data;
    } catch (err) {
      const bookings = getStorageItem('rp_bookings', INITIAL_BOOKINGS);
      const idx = bookings.findIndex(b => b.id === parseInt(bookingId));
      if (idx !== -1) {
        bookings[idx].status = 'CANCELLED';
        bookings[idx].cancelledAt = new Date().toISOString();
        setStorageItem('rp_bookings', bookings);
        return bookings[idx];
      }
      throw new Error('Booking not found');
    }
  },

  updateStatus: async (bookingId, status) => {
    try {
      const response = await axiosInstance.put(`/admin/bookings/${bookingId}/status`, { status });
      return response.data;
    } catch (err) {
      const bookings = getStorageItem('rp_bookings', INITIAL_BOOKINGS);
      const idx = bookings.findIndex(b => b.id === parseInt(bookingId));
      if (idx !== -1) {
        bookings[idx].status = status;
        setStorageItem('rp_bookings', bookings);
        return bookings[idx];
      }
      throw new Error('Booking not found');
    }
  }
};

// Admin Analytics & Reports
export const adminService = {
  getDashboardStats: async () => {
    try {
      const response = await axiosInstance.get('/admin/dashboard');
      return response.data;
    } catch (err) {
      const bookings = getStorageItem('rp_bookings', INITIAL_BOOKINGS);
      const restaurants = getStorageItem('rp_restaurants', INITIAL_RESTAURANTS);
      const tables = getStorageItem('rp_tables', INITIAL_TABLES);
      const users = getStorageItem('rp_users', INITIAL_USERS);

      const totalBookings = bookings.length;
      const confirmedBookings = bookings.filter(b => b.status === 'CONFIRMED').length;
      const cancelledBookings = bookings.filter(b => b.status === 'CANCELLED').length;
      const completedBookings = bookings.filter(b => b.status === 'COMPLETED').length;
      const totalGuestsServed = bookings
        .filter(b => b.status === 'CONFIRMED' || b.status === 'COMPLETED')
        .reduce((sum, b) => sum + (b.guestCount || 2), 0);

      // Estimated revenue based on average fine dining cover of $95
      const totalEstimatedRevenue = totalGuestsServed * 95;

      return {
        totalBookings,
        confirmedBookings,
        cancelledBookings,
        completedBookings,
        totalRestaurants: restaurants.length,
        totalTables: tables.length,
        totalCustomers: users.filter(u => u.role === 'CUSTOMER').length,
        totalGuestsServed,
        totalEstimatedRevenue,
        occupancyRate: Math.round((confirmedBookings / (tables.length || 1)) * 100),
      };
    }
  },

  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get('/admin/users');
      return response.data;
    } catch (err) {
      return getStorageItem('rp_users', INITIAL_USERS);
    }
  }
};

