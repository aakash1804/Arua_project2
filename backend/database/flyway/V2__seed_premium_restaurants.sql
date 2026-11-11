-- V2__seed_premium_restaurants.sql
-- Seed Fine Dining Establishments, Menus, Tables, and Test Personas

-- Users (Password is 'password123' and 'admin123' bcrypt encoded)
INSERT INTO users (id, full_name, email, password, phone, role, dietary_notes, avatar) VALUES
(1, 'Alexander Hamilton (Admin)', 'admin@tableprime.com', '$2a$10$w0uSgU8QJz6rVb2Ym8yqveaM3.v/s5BcmVz1z7e1E4s9z4.5P7qKG', '+1 (555) 000-0001', 'ADMIN', 'Executive Admin Account', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'),
(2, 'Eleanor Vance', 'customer@tableprime.com', '$2a$10$w0uSgU8QJz6rVb2Ym8yqveaM3.v/s5BcmVz1z7e1E4s9z4.5P7qKG', '+1 (555) 234-5678', 'CUSTOMER', 'Pescatarian, prefers sparkling water, romantic window seating.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80');

-- Restaurants
INSERT INTO restaurants (id, name, cuisine, location, address, rating, review_count, price_range, featured, opening_hours, phone, description, image) VALUES
(1, 'L\'Étoile Dorée', 'French Fine Dining', 'Downtown, Manhattan, NY', '452 Lexington Avenue, New York, NY 10017', 4.9, 342, '$$$$', true, 'Tue-Sun: 5:30 PM - 11:00 PM', '+1 (212) 555-0198', 'Three Michelin-starred contemporary French gastronomy masterminded by Chef Antoine Moreau.', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80'),
(2, 'Sakura Omakase & Bar', 'Japanese Omakase', 'West End, Boston, MA', '188 Newbury St, Boston, MA 02116', 4.8, 289, '$$$$', true, 'Mon-Sat: 6:00 PM - 10:30 PM', '+1 (617) 555-0812', 'An intimate 14-seat Hinoki wood counter experience curated by Master Itamae Kenji Takahashi.', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80'),
(3, 'The Charcoal & Prime Grill', 'Steakhouse & Bar', 'Financial District, Chicago, IL', '210 S LaSalle St, Chicago, IL 60604', 4.7, 512, '$$$', true, 'Daily: 4:30 PM - Midnight', '+1 (312) 555-0341', 'Dry-aged heritage steaks grilled over Argentine quebracho charcoal coals.', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80');

-- Tables for Restaurant 1
INSERT INTO restaurant_tables (id, restaurant_id, table_number, zone, capacity, status, x, y) VALUES
(101, 1, 'T-01', 'Romantic Window', 2, 'AVAILABLE', 1, 1),
(102, 1, 'T-02', 'Romantic Window', 2, 'AVAILABLE', 2, 1),
(103, 1, 'T-03', 'Main Hall', 4, 'AVAILABLE', 1, 2),
(104, 1, 'T-04', 'Main Hall', 4, 'AVAILABLE', 2, 2),
(105, 1, 'T-05', 'Main Hall', 6, 'AVAILABLE', 3, 2),
(106, 1, 'T-06', 'Terrace Garden', 4, 'AVAILABLE', 1, 3),
(107, 1, 'VIP-1', 'Private Salon VIP', 8, 'AVAILABLE', 3, 3);

-- Sample Bookings
INSERT INTO bookings (id, booking_reference, user_id, customer_name, customer_email, customer_phone, restaurant_id, restaurant_name, table_id, table_number, zone, booking_date, booking_time, guest_count, special_requests, status) VALUES
(1, 'BK-2026-90421', 2, 'Eleanor Vance', 'customer@tableprime.com', '+1 (555) 234-5678', 1, 'L\'Étoile Dorée', 101, 'T-01', 'Romantic Window', '2026-11-20', '19:30:00', 2, 'Celebrating 5th anniversary. Quiet corner appreciated.', 'CONFIRMED');

