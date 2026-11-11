import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Reservation Confirmed",
      message: "Your table at L'Étoile Dorée for Nov 20, 2026 is confirmed.",
      time: "2 hours ago",
      read: false,
      type: "booking"
    },
    {
      id: 2,
      title: "Special Sommelier Tasting",
      message: "Sakura Omakase has introduced rare Yamahai sake pairings.",
      time: "1 day ago",
      read: true,
      type: "promo"
    }
  ]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const addNotification = (title, message, type = 'booking') => {
    const newNotif = {
      id: Date.now(),
      title,
      message,
      time: "Just now",
      read: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
    showToast(message, 'success');
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      toasts,
      showToast,
      addNotification,
      markAllAsRead,
      unreadCount
    }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-2xl border text-sm flex items-center gap-3 transition-all transform animate-bounce-subtle ${
              toast.type === 'error'
                ? 'bg-red-950/90 text-red-200 border-red-800'
                : toast.type === 'info'
                ? 'bg-blue-950/90 text-blue-200 border-blue-800'
                : 'bg-[#181817]/95 text-white border-amber-500/40 backdrop-blur-md shadow-amber-950/20'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${toast.type === 'error' ? 'bg-red-400' : 'bg-amber-400'}`}></span>
            <p className="flex-1 font-medium">{toast.message}</p>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

