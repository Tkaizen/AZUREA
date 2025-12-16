// ProductDetails.js or ProductDetails.jsx

import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router"; // Assuming you are using Expo Router
import { AuthContext } from "../../context/AuthContext"; // Adjust path if needed
import { getProduct, deleteProduct } from "../../services/api"; // Adjust path if needed

const DEFAULT_IMAGE = 'https://via.placeholder.com/300/0000FF/808080?text=No+Image';

export default function ProductDetails() {
    const { id } = useLocalSearchParams();
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id && user?.token) {
            fetchProductDetails();
        } else {
            setLoading(false);
        }
    }, [id, user]);

    const fetchProductDetails = async () => {
        try {
            const data = await getProduct(id, user.token);
            setProduct(data);
        } catch (err) {
            console.error("Fetch Product Error:", err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = () => {
        Alert.alert("Booking", `Feature coming soon for ${product?.name}!`);
    };

    const handleDelete = () => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this car?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        // This is where the actual API call happens
                        try {
                            if (!user?.token) return;
                            await deleteProduct(id, user.token);
                            Alert.alert("Success", "Car deleted successfully");
                            router.replace("/(Tabs)/product");
                        } catch (err) {
                            Alert.alert("Error", "Failed to delete car: " + err.message);
                        }
                    }
                }
            ]
        );
    };

    if (loading) {
        return (<View style={[styles.container, styles.center]}><ActivityIndicator size="large" color="#1b4de4" /></View>);
    }

    if (error || !product) {
        return (<View style={[styles.container, styles.center]}><Text style={styles.errorText}>Failed to load product details.</Text><TouchableOpacity style={styles.backButton} onPress={() => router.back()}><Text style={styles.buttonText}>Go Back</Text></TouchableOpacity></View>);
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <Image source={{ uri: product.image || DEFAULT_IMAGE }} style={styles.image} resizeMode="cover" />

                <View style={styles.detailsContainer}>
                    <View style={styles.headerRow}>
                        <Text style={styles.title}>{product.name}</Text>
                        <Text style={styles.price}>${product.price} / {product.unit || 'hr'}</Text>
                    </View>

                    <Text style={styles.category}>{product.category}</Text>
                    <View style={styles.divider} />
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{product.description || "No description available."}</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
                            <Text style={styles.bookButtonText}>Book Now</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.bookButton, styles.deleteButton]} onPress={handleDelete}>
                            <Text style={styles.bookButtonText}>Delete Car</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Floating Return Button */}
            <TouchableOpacity style={styles.floatingBackButton} onPress={() => router.back()}>
                <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
        </View>
    );
}

// --- Styles (Same as provided previously) ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0d1b2a', },
    center: { justifyContent: 'center', alignItems: 'center', },
    image: { width: '100%', height: 300, },
    detailsContainer: { padding: 20, backgroundColor: '#0d1b2a', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30, minHeight: 500, },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, },
    title: { fontSize: 28, fontWeight: 'bold', color: '#fff', flex: 1, },
    price: { fontSize: 20, fontWeight: '600', color: '#4cc9f0', },
    category: { fontSize: 16, color: '#aaa', marginBottom: 20, textTransform: 'uppercase', letterSpacing: 1, },
    divider: { height: 1, backgroundColor: '#1b263b', marginVertical: 15, },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 10, },
    description: { fontSize: 16, color: '#ccc', lineHeight: 24, marginBottom: 40, },
    buttonContainer: { marginTop: 'auto', marginBottom: 20, },
    bookButton: { backgroundColor: '#1b4de4', paddingVertical: 15, borderRadius: 12, alignItems: 'center', elevation: 5, marginBottom: 15, },
    deleteButton: { backgroundColor: '#dc3545', },
    bookButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', },
    errorText: { color: '#ff6b6b', fontSize: 18, marginBottom: 20, },
    backButton: { padding: 10, backgroundColor: '#333', borderRadius: 8, },
    buttonText: { color: '#fff', },
    floatingBackButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(27, 38, 59, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1b4de4',
        zIndex: 100,
        elevation: 5,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: -4,
    }
});