import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFavorites } from "../../context/FavoritesContext";

export default function Audi() {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();
  const carId = "audi";

  return (
    <View style={styles.outerContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavorite(carId)}>
            <Ionicons
              name={isFavorite(carId) ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite(carId) ? "red" : "#fff"}
            />
          </TouchableOpacity>
        </View>

        <Image source={require("../../assets/images/audi.jpg")} style={styles.image} />

        <View style={styles.detailsContainer}>
          <Text style={styles.carName}>Audi R8</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={styles.ratingText}>4.7 (1.6k reviews)</Text>
          </View>

          <Text style={styles.sectionTitle}>Specifications</Text>
          <View style={styles.specContainer}>
            <View style={styles.specBox}>
              <Ionicons name="person" size={28} color="#00BFFF" />
              <Text style={styles.specLabel}>Seats</Text>
              <Text style={styles.specValue}>2</Text>
            </View>
            <View style={styles.specBox}>
              <Ionicons name="speedometer" size={28} color="#00BFFF" />
              <Text style={styles.specLabel}>Type</Text>
              <Text style={styles.specValue}>Automatic</Text>
            </View>
            <View style={styles.specBox}>
              <Ionicons name="flame" size={28} color="#00BFFF" />
              <Text style={styles.specLabel}>Fuel</Text>
              <Text style={styles.specValue}>Gasoline</Text>
            </View>
          </View>

          <View style={styles.logoWrapper}>
            <Image
              source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Audi_logo_detail.svg" }}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            The Audi R8 combines luxury and raw power, featuring a roaring V10 engine and iconic design.
            Perfect for high-speed enthusiasts who value comfort and precision.
          </Text>

          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.features}>
            <View>
              <Text style={styles.feature}>• Virtual Cockpit</Text>
              <Text style={styles.feature}>• Adaptive Cruise</Text>
              <Text style={styles.feature}>• LED Headlights</Text>
            </View>
            <View>
              <Text style={styles.feature}>• Leather Seats</Text>
              <Text style={styles.feature}>• Bluetooth</Text>
              <Text style={styles.feature}>• Parking Assist</Text>
            </View>
          </View>
          {/* Add padding at the bottom to ensure content doesn't get hidden by the floating button */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* FLOATING BOOK NOW BUTTON (New addition) */}
      <TouchableOpacity
        style={styles.bookNowButton}
        onPress={() => router.push("/book/audi")}
      >
        <Text style={styles.bookNowText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // New style for the outer wrapper to enable absolute positioning
  outerContainer: {
    flex: 1,
    backgroundColor: "#0B1622",
  },
  container: { flex: 1, backgroundColor: "#0B1622" },
  header: { flexDirection: "row", justifyContent: "space-between", padding: 15, backgroundColor: "#14202E" },
  image: { width: "100%", height: 200 },
  detailsContainer: { padding: 20 },
  carName: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  rating: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  ratingText: { color: "#ccc", marginLeft: 5 },
  sectionTitle: { color: "#fff", fontWeight: "bold", fontSize: 16, marginTop: 15, marginBottom: 10 },
  specContainer: { flexDirection: "row", justifyContent: "space-around" },
  specBox: { backgroundColor: "#14202E", alignItems: "center", borderRadius: 10, padding: 10, width: 90 },
  specLabel: { color: "#ccc", fontSize: 12 },
  specValue: { color: "#fff", fontWeight: "bold" },
  logoWrapper: { alignItems: "center", marginVertical: 20 },
  logo: { width: 100, height: 100, resizeMode: "contain" },
  description: { color: "#ccc", lineHeight: 20 },
  features: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  feature: { color: "#ccc", marginVertical: 3 },
  // --- NEW STYLES FOR FLOATING BUTTON ---
  bookNowButton: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    backgroundColor: "#00BFFF", // Blue color
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    zIndex: 10, // Ensure it floats above the ScrollView content
  },
  bookNowText: {
    color: "#0B1622",
    fontSize: 18,
    fontWeight: "bold",
  },
});