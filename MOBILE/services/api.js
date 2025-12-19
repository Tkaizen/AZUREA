import Constants from 'expo-constants';
import { Platform } from 'react-native';

// The host detection logic is bypassed when using tethering.
const getDevHost = () => {
    // Tries to get the host from Expo's manifest/packager settings.
    const debuggerHost = Constants.manifest?.debuggerHost || Constants.manifest?.packagerOpts?.host || null;
    if (debuggerHost) return debuggerHost.split(':').shift();
    return 'localhost';
};

const host = getDevHost();

// --- START OF REQUIRED FIX FOR TETHERING ---
// NOTE: You MUST replace this placeholder with your computer's actual IP
// address assigned by the phone's hotspot (e.g., '192.168.43.10').
// --- END OF REQUIRED FIX FOR TETHERING ---
const resolvedHost = '10.90.60.91';

// Use your confirmed backend port: 3002
export const API_URL = `http://${resolvedHost}:3002/api`;

export const login = async (username, password) => {
    try {
        // Correctly using the API_URL variable
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export const register = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }


        return data;
    } catch (error) {
        throw error;
    }
};

// --- Product API ---

export const getProducts = async (token) => {
    try {
        const response = await fetch(`${API_URL}/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch products');
        return data;
    } catch (error) {
        throw error;
    }
};

export const getProduct = async (id, token) => {
    try {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch product');
        return data;
    } catch (error) {
        throw error;
    }
};

export const createProduct = async (productData, token) => {
    try {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(productData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to create product');
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateProduct = async (id, productData, token) => {
    try {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(productData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to update product');
        return data;
    } catch (error) {
        throw error;
    }
};

export const deleteProduct = async (id, token) => {
    try {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Status ${response.status}: ${errorData.message || 'Failed to delete product'}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const deleteBooking = async (id, token) => {
    try {
        const response = await fetch(`${API_URL}/bookings/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Status ${response.status}: ${errorData.message || 'Failed to delete booking'}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};