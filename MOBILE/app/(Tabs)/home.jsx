import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router"; // ✅ added this import
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const router = useRouter(); // ✅ initialize router for navigation
  const [activeTab, setActiveTab] = useState("Service");
  const { user } = useContext(AuthContext);

  const cars = [
    {
      id: 1,
      name: "Lamborghini Aventador",
      price: "$40 / Hours",
      image: require("../../assets/images/aventador.jpg"),
      link: "/(info)/aventador",
    },
    {
      id: 2,
      name: "Honda City",
      price: "$28 / Hours",
      image: require("../../assets/images/honda-city.jpg"),
      link: "/(info)/city",
    },
    {
      id: 3,
      name: "Lamborghini Huracan",
      price: "$45 / Hours",
      image: require("../../assets/images/Huracan.jpg"),
      link: "/(info)/huracan",
    },
    {
      id: 4,
      name: "Honda Accord",
      price: "$38 / Hours",
      image: require("../../assets/images/accord.jpg"),
      link: "/(info)/accord",
    },
    {
      id: 5,
      name: "Ferrari 488 Spider",
      price: "$55 / Hours",
      image: require("../../assets/images/ferrari.jpg"),
      link: "/(info)/ferrari",
    },
    {
      id: 6,
      name: "Tesla Model S",
      price: "$50 / Hours",
      image: require("../../assets/images/tesla.jpg"),
      link: "/(info)/tesla",
    },
    {
      id: 7,
      name: "BMW M4",
      price: "$42 / Hours",
      image: require("../../assets/images/bmw.jpg"),
      link: "/(info)/bmw",
    },
    {
      id: 8,
      name: "Audi R8",
      price: "$48 / Hours",
      image: require("../../assets/images/audi.jpg"),
      link: "/(info)/audi",
    },
    {
      id: 9,
      name: "Toyota Supra",
      price: "$37 / Hours",
      image: require("../../assets/images/supra.jpg"),
      link: "/(info)/supra",
    },
    {
      id: 10,
      name: "Nissan GTR R35",
      price: "$46 / Hours",
      image: require("../../assets/images/gtr.jpg"),
      link: "/(info)/nissan",
    },
  ];


  const handleCarPress = (car) => {
    if (car.link) {
      router.push(car.link); // ✅ goes to Aventador info page
    } else {
      Alert.alert("Car Selected", `${car.name} \nPrice: ${car.price} `);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: user?.avatar || "https://i.pravatar.cc/100" }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.welcome}>Welcome!</Text>
          <Text style={styles.username}>{user?.username || "USER"}</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* Promo Card */}
      <View style={styles.promoCard}>
        <Text style={styles.promoTitle}>Get Special Discount</Text>
        <Text style={styles.promoSubtitle}>50% Only Today</Text>
        <Text style={styles.promoText}>
          For First 100 Customer Only, Buy Now.
        </Text>
        <TouchableOpacity style={styles.promoButton}>
          <Text style={styles.promoButtonText}>Get Now</Text>
        </TouchableOpacity>
      </View>

      {/* Category Tabs */}
      <View style={styles.categories}>
        {["New Model", "Renting"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.category,
              activeTab === tab && styles.categoryActive,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.categoryText,
                activeTab === tab && styles.categoryActiveText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Cars Section */}
      <View style={styles.cars}>
        {cars.map((car) => (
          <TouchableOpacity
            key={car.id}
            style={styles.carCard}
            onPress={() => handleCarPress(car)}
          >
            <Image source={car.image} style={styles.carImage} />
            <Text style={styles.carName}>{car.name}</Text>
            <Text style={styles.carPrice}>{car.price}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1b2a",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  welcome: {
    color: "#aaa",
    fontSize: 14,
  },
  username: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  searchContainer: {
    backgroundColor: "#1b263b",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    color: "#fff",
  },
  promoCard: {
    backgroundColor: "#1b4de4",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  promoTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  promoSubtitle: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 8,
  },
  promoText: {
    color: "#eee",
    fontSize: 12,
    marginBottom: 12,
  },
  promoButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  promoButtonText: {
    color: "#1b4de4",
    fontWeight: "bold",
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  category: {
    backgroundColor: "#1b263b",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  categoryText: {
    color: "#aaa",
  },
  categoryActive: {
    backgroundColor: "#fff",
  },
  categoryActiveText: {
    color: "#1b263b",
    fontWeight: "bold",
  },
  cars: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  carCard: {
    backgroundColor: "#1b263b",
    borderRadius: 12,
    padding: 10,
    width: "48%",
    marginBottom: 12,
  },
  carImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  carName: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 4,
  },
  carPrice: {
    color: "#aaa",
  },
});
