import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useBookings } from "../context/BookingsContext";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { carData } from "../data/carData";

export default function BookCar() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { addBooking } = useBookings();

    const car = carData[id];

    const handleConfirmBooking = async () => {
        if (!car) return;

        const newBooking = {
            id: Date.now().toString(),
            carId: id, // Save the ID for routing
            carName: car.name,
            date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }),
            price: car.price,
            image: car.image,
        };

        try {
            await addBooking(newBooking);
            Alert.alert("Success", "Booking Confirmed!", [
                { text: "OK", onPress: () => router.push("/prof/booking") }
            ]);
        } catch (error) {
            Alert.alert("Error", `Failed to book car: ${error.message} `);
        }
    };

    if (!car) {
        return (
            <View style={styles.outerContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.errorText}>Car not found.</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.outerContainer}>
            <ScrollView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Confirm Booking</Text>
                    <View style={{ width: 24 }} /> {/* Spacer for centering if needed */}
                </View>

                {/* Car Image */}
                <Image source={car.image} style={styles.image} />

                {/* Car Details */}
                <View style={styles.detailsContainer}>
                    <Text style={styles.carName}>{car.name}</Text>

                    <View style={styles.priceContainer}>
                        <Text style={styles.priceLabel}>Daily Rate</Text>
                        <Text style={styles.priceValue}>{car.price}</Text>
                    </View>

                    {/* Booking Summary Section */}
                    <Text style={styles.sectionTitle}>Booking Details</Text>
                    <View style={styles.infoBox}>
                        <View style={styles.infoRow}>
                            <Ionicons name="calendar-outline" size={20} color="#33CC66" />
                            <Text style={styles.infoText}>Date: {new Date().toLocaleDateString()}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="location-outline" size={20} color="#33CC66" />
                            <Text style={styles.infoText}>Pick-up: Showroom</Text>
                        </View>
                    </View>

                    <Text style={styles.sectionTitle}>Important</Text>
                    <Text style={styles.description}>
                        You are about to book this vehicle. Payment will be processed at the counter.
                        Please ensure you have a valid driver's license upon pick-up.
                    </Text>

                    {/* Padding for floating button */}
                    <View style={{ height: 100 }} />
                </View>
            </ScrollView>

            {/* FLOATING CONFIRM BUTTON */}
            <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirmBooking}
            >
                <Text style={styles.confirmButtonText}>Confirm Booking</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: "#0B1622",
    },
    container: {
        flex: 1,
        backgroundColor: "#0B1622",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#14202E",
        paddingTop: 50, // Manual safe area for header if not using SafeAreaView
    },
    headerTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    image: {
        width: "100%",
        height: 250,
        resizeMode: "cover",
    },
    detailsContainer: {
        padding: 20,
    },
    carName: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    priceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        backgroundColor: "#14202E",
        padding: 15,
        borderRadius: 12,
    },
    priceLabel: {
        color: "#ccc",
        fontSize: 16,
    },
    priceValue: {
        color: "#00BFFF",
        fontSize: 20,
        fontWeight: "bold",
    },
    sectionTitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 15,
        marginBottom: 10,
    },
    infoBox: {
        backgroundColor: "#14202E",
        padding: 15,
        borderRadius: 12,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    infoText: {
        color: "#ccc",
        marginLeft: 10,
        fontSize: 15,
    },
    description: {
        color: "#9CA3AF",
        lineHeight: 22,
        fontSize: 14,
    },
    errorText: {
        color: "#EF4444",
        fontSize: 18,
        textAlign: "center",
        marginTop: 20,
    },
    // Floating Button
    confirmButton: {
        position: "absolute",
        bottom: 25,
        left: 20,
        right: 20,
        backgroundColor: "#00BFFF", // Blue color to match "Book Now"
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        zIndex: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    confirmButtonText: {
        color: "#0B1622",
        fontSize: 18,
        fontWeight: "bold",
        fontSize: 18,
    },
});
