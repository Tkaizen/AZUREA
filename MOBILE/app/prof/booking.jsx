import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useBookings } from "../../context/BookingsContext";
import { carData } from "../../data/carData";

export default function Booking() {
  const { bookings, removeBooking } = useBookings();

  const handleDone = (id) => {
    removeBooking(id);
  };

  const getCarDetails = (item) => {
    // 1. Try explicit carId
    if (item.carId && carData[item.carId]) {
      return { ...carData[item.carId], id: item.carId };
    }

    // 2. Fallback: try mapping lowercase name to ID
    const lowerId = item.carName?.toLowerCase();
    if (lowerId && carData[lowerId]) {
      return { ...carData[lowerId], id: lowerId };
    }

    // 3. Last resort: return DB data as-is (might have broken image)
    return {
      name: item.carName,
      image: null,
      price: item.price,
      id: lowerId
    };
  };

  return (
    <View style={styles.container}>
      {/* ✅ Back arrow header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.push("/(Tabs)/profile")}>
          <Ionicons name="arrow-back" size={26} color="#E5E7EB" />
        </TouchableOpacity>
        <Text style={styles.header}>My Bookings</Text>
      </View>

      {bookings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No bookings yet.</Text>
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            const carDetails = getCarDetails(item);

            return (
              <View style={styles.card}>
                {carDetails.image ? (
                  <Image source={carDetails.image} style={styles.image} resizeMode="cover" />
                ) : (
                  <View style={[styles.image, { backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' }]}>
                    <Ionicons name="car-sport" size={40} color="#666" />
                  </View>
                )}
                <View style={styles.details}>
                  <Text style={styles.carName}>{carDetails.name || item.carName}</Text>
                  <Text style={styles.date}>📅 {item.date}</Text>
                  <Text style={styles.price}>{carDetails.price || item.price}</Text>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.viewButton}
                      onPress={() => router.push(`/(info)/${carDetails.id}`)}
                    >
                      <Text style={styles.buttonText}>Details</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.doneButton}
                      onPress={() => removeBooking(item._id)}
                    >
                      <Text style={styles.buttonText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F19",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#E5E7EB",
    marginLeft: 10,
  },
  card: {
    backgroundColor: "#1A1F2E",
    borderRadius: 16,
    flexDirection: "row",
    marginBottom: 18,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  image: {
    width: 110,
    height: 80,
    borderRadius: 12,
  },
  details: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  carName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F3F4F6",
    textTransform: "capitalize",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#60A5FA",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  viewButton: {
    flex: 1,
    backgroundColor: "#2563EB",
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  doneButton: {
    flex: 1,
    backgroundColor: "#10B981", // Green color for Done
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#9CA3AF",
    fontSize: 18,
  },
});
