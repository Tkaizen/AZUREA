import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Supra() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Car Image */}
      <Image
        source={require("../../assets/images/supra.jpg")}
        style={styles.image}
      />

      {/* Car Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.carName}>Toyota Supra</Text>
        <View style={styles.rating}>
          <Ionicons name="star" size={18} color="#FFD700" />
          <Text style={styles.ratingText}>4.8 (2.8k reviews)</Text>
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
            source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg" }}
            style={styles.logo}
          />
        </View>

        {/* Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          The Toyota Supra blends style and power with precision engineering.
          Known for its sleek design and turbocharged performance, the Supra is
          the ultimate sports coupe that turns heads wherever it goes.
        </Text>

        {/* Features */}
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.features}>
          <View>
            <Text style={styles.feature}>• Turbocharged Engine</Text>
            <Text style={styles.feature}>• Adaptive Suspension</Text>
            <Text style={styles.feature}>• Apple CarPlay & Android Auto</Text>
          </View>
          <View>
            <Text style={styles.feature}>• Sports Mode</Text>
            <Text style={styles.feature}>• Leather Interior</Text>
            <Text style={styles.feature}>• Advanced Safety Suite</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
