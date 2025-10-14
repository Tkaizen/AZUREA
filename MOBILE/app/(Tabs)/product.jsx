import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";

const cars = [
  {
    id: 1,
    name: "Lamborghini Aventador",
    price: "$40 / Hours",
    image: require("../../assets/images/aventador.jpg"),
  },
  {
    id: 2,
    name: "Honda City",
    price: "$28 / Hours",
    image: require("../../assets/images/honda-city.jpg"),
  },
  {
    id: 3,
    name: "Lamborghini Huracan",
    price: "$45 / Hours",
    image: require("../../assets/images/Huracan.jpg"), // case-sensitive!
  },
  {
    id: 4,
    name: "Honda Accord",
    price: "$38 / Hours",
    image: require("../../assets/images/accord.jpg"),
  },
  {
    id: 5,
    name: "Ferrari 488 Spider",
    price: "$55 / Hours",
    image: require("../../assets/images/ferrari.jpg"),
  },
  {
    id: 6,
    name: "Tesla Model S",
    price: "$50 / Hours",
    image: require("../../assets/images/tesla.jpg"),
  },
  {
    id: 7,
    name: "BMW M4",
    price: "$42 / Hours",
    image: require("../../assets/images/bmw.jpg"),
  },
  {
    id: 8,
    name: "Audi R8",
    price: "$48 / Hours",
    image: require("../../assets/images/audi.jpg"),
  },
  {
    id: 9,
    name: "Toyota Supra",
    price: "$37 / Hours",
    image: require("../../assets/images/supra.jpg"),
  },
  {
    id: 10,
    name: "Nissan GTR R35",
    price: "$46 / Hours",
    image: require("../../assets/images/gtr.jpg"),
  },
];

export function Product() {
  const renderCar = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.cardText}>
        <Text style={styles.carName}>{item.name}</Text>
        <Text style={styles.carPrice}>{item.price}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Rent Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Cars</Text>
      <FlatList
        data={cars}
        renderItem={renderCar}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A122A", // dark navy background
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#1C2541",
    borderRadius: 12,
    marginBottom: 15,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  cardText: {
    flex: 1,
  },
  carName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  carPrice: {
    color: "#B0B8C3",
    fontSize: 13,
    marginVertical: 4,
  },
  button: {
    backgroundColor: "#1E4DFE",
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 12,
  },
});
