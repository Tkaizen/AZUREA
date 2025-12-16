import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { API_URL } from '../services/api';

const BookingsContext = createContext();

export function BookingsProvider({ children }) {
    const [bookings, setBookings] = useState([]);
    const { user } = useContext(AuthContext);

    // Fetch bookings when user logs in
    useEffect(() => {
        if (user && user.token) {
            fetchBookings();
        } else {
            setBookings([]);
        }
    }, [user]);

    const fetchBookings = async () => {
        if (!user || !user.token) return;
        try {
            const response = await fetch(`${API_URL}/bookings`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setBookings(data);
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    const addBooking = async (bookingData) => {
        if (!user || !user.token) {
            console.error("User not logged in");
            throw new Error("You must be logged in to book a car.");
        }

        // Optimistic update
        const tempId = Date.now().toString();
        const tempBooking = { ...bookingData, id: tempId, _id: tempId };
        setBookings((prev) => [...prev, tempBooking]);

        try {
            const response = await fetch(`${API_URL}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(bookingData),
            });

            if (response.ok) {
                const newBooking = await response.json();
                // Replace temp booking with actual one from DB
                setBookings((prev) => prev.map(b => b.id === tempId ? { ...newBooking, id: newBooking._id } : b));
                // Reload to be sure
                fetchBookings();
            } else {
                // Revert on failure
                setBookings((prev) => prev.filter(b => b.id !== tempId));
                const errData = await response.json();
                console.error("Failed to add booking:", errData.message);
                throw new Error(errData.message || "Failed to add booking");
            }
        } catch (error) {
            console.error("Error adding booking:", error);
            setBookings((prev) => prev.filter(b => b.id !== tempId));
            throw error;
        }
    };

    const removeBooking = async (id) => {
        if (!user || !user.token) return;

        // Optimistic update
        const oldBookings = [...bookings];
        setBookings((prev) => prev.filter((item) => item.id !== id && item._id !== id));

        try {
            const response = await fetch(`${API_URL}/bookings/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (!response.ok) {
                // Revert
                setBookings(oldBookings);
                console.error("Failed to delete booking");
            }
        } catch (error) {
            console.error("Error deleting booking:", error);
            setBookings(oldBookings);
        }
    };

    return (
        <BookingsContext.Provider value={{ bookings, addBooking, removeBooking }}>
            {children}
        </BookingsContext.Provider>
    );
}

export function useBookings() {
    return useContext(BookingsContext);
}
