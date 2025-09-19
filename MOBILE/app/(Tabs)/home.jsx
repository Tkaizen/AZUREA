import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";

export function Home() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/10" }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.welcome}>Welcome!</Text>
          <Text style={styles.username}>STEVE DRYLLE SARINO</Text>
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
          Lorem ipsum dolor sit amet, Duis sit non nunc.
        </Text>
        <TouchableOpacity style={styles.promoButton}>
          <Text style={styles.promoButtonText}>Get Now</Text>
        </TouchableOpacity>
      </View>

      {/* Category Tabs */}
      <View style={styles.categories}>
        <TouchableOpacity style={styles.categoryActive}>
          <Text style={styles.categoryActiveText}>Service</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category}>
          <Text style={styles.categoryText}>Rent</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category}>
          <Text style={styles.categoryText}>Selling</Text>
        </TouchableOpacity>
      </View>

      {/* Cars */}
      <View style={styles.cars}>
        <View style={styles.carCard}>
          <Image
            source={{ uri: "" }}
            style={styles.carImage}
          />
          <Text style={styles.carName}>Lamborghini</Text>
          <Text style={styles.carPrice}>$40 / Hours</Text>
        </View>

        <View style={styles.carCard}>
          <Image
            source={{ uri: "" }}
            style={styles.carImage}
          />
          <Text style={styles.carName}>Honda Cityzan</Text>
          <Text style={styles.carPrice}>$70 / Hours</Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default Home;

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
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  categoryActiveText: {
    color: "#1b263b",
    fontWeight: "bold",
  },
  cars: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  carCard: {
    backgroundColor: "#1b263b",
    borderRadius: 12,
    padding: 10,
    width: "48%",
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
