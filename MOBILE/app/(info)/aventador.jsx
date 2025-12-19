import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // ✅ Add this for back navigation
import { useFavorites } from "../../context/FavoritesContext";

export default function Aventador() {
  const router = useRouter(); // ✅ Initialize router
  const { toggleFavorite, isFavorite } = useFavorites();
  const carId = "aventador";

  return (
    <View style={styles.outerContainer}>
      <ScrollView style={styles.container}>
        {/* Header with back + favorite */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}> {/* ✅ Back works now */}
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
          source={require("../../assets/images/aventador.jpg")}
          style={styles.image}
          resizeMode="cover"
        />


        {/* Car Name and Rating */}
        <View style={styles.detailsContainer}>
          <Text style={styles.carName}>Lamborghini Aventador</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={styles.ratingText}>4.9 (2.3k reviews)</Text>
          </View>

          {/* Specifications */}
          <Text style={styles.sectionTitle}>Specifications</Text>
          <View style={styles.specContainer}>
            <View style={styles.specBox}>
              <Ionicons name="person" size={28} color="#3366FF" />
              <Text style={styles.specLabel}>Seats</Text>
              <Text style={styles.specValue}>2</Text>
            </View>
            <View style={styles.specBox}>
              <Ionicons name="speedometer" size={28} color="#3366FF" />
              <Text style={styles.specLabel}>Type</Text>
              <Text style={styles.specValue}>Automatic</Text>
            </View>
            <View style={styles.specBox}>
              <Ionicons name="flame" size={28} color="#3366FF" />
              <Text style={styles.specLabel}>Fuel</Text>
              <Text style={styles.specValue}>Gasoline</Text>
            </View>
          </View>

          {/* Centered Logo */}
          <View style={styles.logoWrapper}>
            <Image
              source={{ uri: "https://upload.wikimedia.org/wikipedia/en/6/6d/Lamborghini_Logo.svg" }}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            Experience luxury and performance with this exceptional Lamborghini Aventador.
            Perfect for special occasions, business trips, or weekend getaways. This vehicle
            combines cutting-edge technology with superior comfort and style.
          </Text>

          {/* Features */}
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.features}>
            <View>
              <Text style={styles.feature}>• GPS Navigation</Text>
              <Text style={styles.feature}>• Bluetooth</Text>
              <Text style={styles.feature}>• Air Conditioning</Text>
            </View>
            <View>
              <Text style={styles.feature}>• Premium Sound</Text>
              <Text style={styles.feature}>• Leather Seats</Text>
              <Text style={styles.feature}>• Parking Sensors</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* FLOATING BOOK NOW BUTTON */}
      <TouchableOpacity
        style={styles.bookNowButton}
        onPress={() => router.push("/book/aventador")}
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
