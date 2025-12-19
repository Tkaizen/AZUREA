import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFavorites } from "../../context/FavoritesContext";

export default function Tesla() {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();
  const carId = "tesla";

  return (
    <View style={styles.outerContainer}>
      <ScrollView style={styles.container}>
        {/* Header */}
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

        {/* Car Image */}
        <Image
          source={require("../../assets/images/tesla.jpg")}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Car Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.carName}>Tesla Model S</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={styles.ratingText}>4.9 (3.4k reviews)</Text>
          </View>

          {/* Specifications */}
          <Text style={styles.sectionTitle}>Specifications</Text>
          <View style={styles.specContainer}>
            <View style={styles.specBox}>
              <Ionicons name="person" size={28} color="#00BFFF" />
              <Text style={styles.specLabel}>Seats</Text>
              <Text style={styles.specValue}>5</Text>
            </View>
            <View style={styles.specBox}>
              <Ionicons name="speedometer" size={28} color="#00BFFF" />
              <Text style={styles.specLabel}>Type</Text>
              <Text style={styles.specValue}>Automatic</Text>
            </View>
            <View style={styles.specBox}>
              <Ionicons name="battery-charging" size={28} color="#00BFFF" />
              <Text style={styles.specLabel}>Fuel</Text>
              <Text style={styles.specValue}>Electric</Text>
            </View>
          </View>

          {/* Centered Logo */}
          <View style={styles.logoWrapper}>
            <Image
              source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png" }}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            The Tesla Model S redefines electric luxury. With its long range, instant torque,
            and cutting-edge Autopilot features, the Model S offers both performance and sustainability.
          </Text>

          {/* Features */}
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.features}>
            <View>
              <Text style={styles.feature}>• Autopilot Driving</Text>
              <Text style={styles.feature}>• 0–60 mph in 1.99s</Text>
              <Text style={styles.feature}>• Long-Range Battery</Text>
            </View>
            <View>
              <Text style={styles.feature}>• Minimalist Interior</Text>
              <Text style={styles.feature}>• Full Self-Driving Ready</Text>
              <Text style={styles.feature}>• Smart Summon & Parking</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* FLOATING BOOK NOW BUTTON */}
      <TouchableOpacity
        style={styles.bookNowButton}
        onPress={() => router.push("/book/tesla")}
      >
        <Text style={styles.bookNowText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#0B1622",
  },
  container: { flex: 1, backgroundColor: "#0B1622" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#14202E",
  },
  image: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    padding: 20,
  },
  carName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  ratingText: {
    color: "#ccc",
    marginLeft: 5,
  },
  sectionTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 15,
    marginBottom: 10,
  },
  specContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  specBox: {
    backgroundColor: "#14202E",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    width: 90,
  },
  specLabel: {
    color: "#ccc",
    fontSize: 12,
  },
  specValue: {
    color: "#fff",
    fontWeight: "bold",
  },
  logoWrapper: {
    alignItems: "center",
    marginVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  description: {
    color: "#ccc",
    lineHeight: 20,
  },
  features: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  feature: {
    color: "#ccc",
    marginVertical: 3,
  },
  bookNowButton: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    backgroundColor: "#00BFFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    zIndex: 10,
  },
  bookNowText: {
    color: "#0B1622",
    fontSize: 18,
    fontWeight: "bold",
  },
});
