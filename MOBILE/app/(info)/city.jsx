import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFavorites } from "../../context/FavoritesContext";

export default function City() {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();
  const carId = "city";

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
          source={require("../../assets/images/honda-city.jpg")}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Car Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.carName}>Honda City</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={styles.ratingText}>4.8 (1.9k reviews)</Text>
          </View>

          {/* Specifications */}
          <Text style={styles.sectionTitle}>Specifications</Text>
          <View style={styles.specContainer}>
            <View style={styles.specBox}>
              <Ionicons name="person" size={28} color="#33CC66" />
              <Text style={styles.specLabel}>Seats</Text>
              <Text style={styles.specValue}>5</Text>
            </View>
            <View style={styles.specBox}>
              <Ionicons name="speedometer" size={28} color="#33CC66" />
              <Text style={styles.specLabel}>Type</Text>
              <Text style={styles.specValue}>Automatic</Text>
            </View>
            <View style={styles.specBox}>
              <Ionicons name="flame" size={28} color="#33CC66" />
              <Text style={styles.specLabel}>Fuel</Text>
              <Text style={styles.specValue}>Gasoline</Text>
            </View>
          </View>

          {/* Centered Logo */}
          <View style={styles.logoWrapper}>
            <Image
              source={{ uri: "https://upload.wikimedia.org/wikipedia/en/7/7b/Honda_logo.svg" }}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            The Honda City is a stylish and fuel-efficient sedan that delivers exceptional comfort
            and performance. With a spacious cabin, advanced technology, and sleek design, the City
            is ideal for both daily commuting and long drives.
          </Text>

          {/* Features */}
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.features}>
            <View>
              <Text style={styles.feature}>• Push Start Button</Text>
              <Text style={styles.feature}>• Multi-Angle Rearview Camera</Text>
              <Text style={styles.feature}>• Touchscreen Infotainment</Text>
            </View>
            <View>
              <Text style={styles.feature}>• Apple CarPlay / Android Auto</Text>
              <Text style={styles.feature}>• Cruise Control</Text>
              <Text style={styles.feature}>• LED Headlights</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* FLOATING BOOK NOW BUTTON */}
      <TouchableOpacity
        style={styles.bookNowButton}
        onPress={() => router.push("/book/city")}
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
    resizeMode: "contain",
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
