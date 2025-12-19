import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { API_URL, deleteBooking } from '../services/api';

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
        console.log("📍 BookingsContext.addBooking called");
        console.log("📍 User:", user ? "Logged in" : "Not logged in");
        console.log("📍 Token:", user?.token ? "Exists" : "Missing");

        if (!user || !user.token) {
            console.error("❌ User not logged in");
            throw new Error("You must be logged in to book a car.");
        }

        // Optimistic update
        const tempId = Date.now().toString();
        const tempBooking = { ...bookingData, id: tempId, _id: tempId };
        console.log("📍 Adding optimistic booking:", tempBooking);
        setBookings((prev) => [...prev, tempBooking]);

        try {
            console.log("📍 Making POST request to:", `${API_URL}/bookings`);
            console.log("📍 Request body:", JSON.stringify(bookingData, null, 2));

            const response = await fetch(`${API_URL}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(bookingData),
            });

            console.log("📍 Response status:", response.status);
            console.log("📍 Response ok:", response.ok);

            if (response.ok) {
                const newBooking = await response.json();
                console.log("✅ Booking saved to backend:", newBooking);
                // Replace temp booking with actual one from DB
                setBookings((prev) => prev.map(b => b.id === tempId ? { ...newBooking, id: newBooking._id } : b));
                // Reload to be sure
                fetchBookings();
                console.log("✅ addBooking completed successfully");
            } else {
                // Revert on failure
                setBookings((prev) => prev.filter(b => b.id !== tempId));
                const errData = await response.json();
                console.error("❌ Failed to add booking:", errData.message);
                throw new Error(errData.message || "Failed to add booking");
            }
        } catch (error) {
            console.error("❌ Error adding booking:", error);
            setBookings((prev) => prev.filter(b => b.id !== tempId));
            throw error;
        }
    };

    const removeBooking = async (id) => {
        if (!user || !user.token) return;

        // Optimistic update
        const oldBookings = [...bookings];
        setBookings((prev) => prev.filter((item) => item._id !== id));

        try {
            await deleteBooking(id, user.token);
            console.log("✅ Booking deleted successfully");
        } catch (error) {
            console.error("Error deleting booking:", error);
            // Revert
            setBookings(oldBookings);
            alert("Failed to delete booking: " + error.message);
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
