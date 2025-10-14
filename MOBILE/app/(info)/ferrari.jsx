import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Ferrari() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Image source={require("../../assets/images/ferrari.jpg")} style={styles.image} />

      <View style={styles.detailsContainer}>
        <Text style={styles.carName}>Ferrari 488 GTB</Text>
        <View style={styles.rating}>
          <Ionicons name="star" size={18} color="#FFD700" />
          <Text style={styles.ratingText}>4.8 (1.9k reviews)</Text>
        </View>

        <Text style={styles.sectionTitle}>Specifications</Text>
        <View style={styles.specContainer}>
          <View style={styles.specBox}>
            <Ionicons name="person" size={28} color="#FF0000" />
            <Text style={styles.specLabel}>Seats</Text>
            <Text style={styles.specValue}>2</Text>
          </View>
          <View style={styles.specBox}>
            <Ionicons name="speedometer" size={28} color="#FF0000" />
            <Text style={styles.specLabel}>Type</Text>
            <Text style={styles.specValue}>Automatic</Text>
          </View>
          <View style={styles.specBox}>
            <Ionicons name="flame" size={28} color="#FF0000" />
            <Text style={styles.specLabel}>Fuel</Text>
            <Text style={styles.specValue}>Gasoline</Text>
          </View>
        </View>

        <View style={styles.logoWrapper}>
          <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/en/d/d4/Ferrari-Logo.svg" }} style={styles.logo} />
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          The Ferrari 488 GTB delivers breathtaking performance and elegance. Designed for those who crave speed and precision,
          this car defines Italian craftsmanship and power.
        </Text>

        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.features}>
          <View>
            <Text style={styles.feature}>• GPS Navigation</Text>
            <Text style={styles.feature}>• Sports Mode</Text>
            <Text style={styles.feature}>• Dual Exhaust</Text>
          </View>
          <View>
            <Text style={styles.feature}>• Paddle Shifters</Text>
            <Text style={styles.feature}>• Premium Sound</Text>
            <Text style={styles.feature}>• Leather Seats</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1622",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#14202E",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
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
});

