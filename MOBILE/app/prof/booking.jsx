import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // ✅ for the arrow icon

const bookings = [
  {
    id: "1",
    carName: "accord",
    date: "Oct 10, 2025",
    price: "$40 / day",
    image: require("../../assets/images/accord.jpg"),
  },
  {
    id: "2",
    carName: "supra",
    date: "Oct 12, 2025",
    price: "$45 / day",
    image: require("../../assets/images/supra.jpg"),
  },
  {
    id: "3",
    carName: "aventador",
    date: "Oct 20, 2025",
    price: "$90 / day",
    image: require("../../assets/images/aventador.jpg"),
  },
];

export default function Booking() {
  return (
    <View style={styles.container}>
      {/* ✅ Back arrow header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.push("/(Tabs)/profile")}>
          <Ionicons name="arrow-back" size={26} color="#E5E7EB" />
        </TouchableOpacity>
        <Text style={styles.header}>My Bookings</Text>
      </View>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.carName}>{item.carName}</Text>
              <Text style={styles.date}>📅 {item.date}</Text>
              <Text style={styles.price}>{item.price}</Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  router.push(`/(info)/${item.carName.toLowerCase()}`)
                }
              >
                <Text style={styles.buttonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
    resizeMode: "cover",
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
  },
  date: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#60A5FA",
    marginTop: 4,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#2563EB",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
