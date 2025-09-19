import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";

const cars = [
  { id: "1", name: "Toyota Corolla", price: "$30 / day", img: "https://via.placeholder.com/150x100.png?text=Toyota+Corolla" },
  { id: "2", name: "Honda Civic", price: "$35 / day", img: "https://via.placeholder.com/150x100.png?text=Honda+Civic" },
  { id: "3", name: "Ford Focus", price: "$28 / day", img: "https://via.placeholder.com/150x100.png?text=Ford+Focus" },
  { id: "4", name: "Hyundai Elantra", price: "$32 / day", img: "https://via.placeholder.com/150x100.png?text=Hyundai+Elantra" },
  { id: "5", name: "Nissan Sentra", price: "$27 / day", img: "https://via.placeholder.com/150x100.png?text=Nissan+Sentra" },
  { id: "6", name: "Chevrolet Malibu", price: "$40 / day", img: "https://via.placeholder.com/150x100.png?text=Chevy+Malibu" },
  { id: "7", name: "Kia Forte", price: "$29 / day", img: "https://via.placeholder.com/150x100.png?text=Kia+Forte" },
  { id: "8", name: "Volkswagen Jetta", price: "$36 / day", img: "https://via.placeholder.com/150x100.png?text=VW+Jetta" },
  { id: "9", name: "Mazda 3", price: "$31 / day", img: "https://via.placeholder.com/150x100.png?text=Mazda+3" },
  { id: "10", name: "Subaru Impreza", price: "$34 / day", img: "https://via.placeholder.com/150x100.png?text=Subaru+Impreza" },
];

export function Product() {
  const renderCar = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.img }} style={styles.image} />
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
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1b2a", // dark background
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#1b263b",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 120,
    height: 90,
  },
  cardText: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  carName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  carPrice: {
    fontSize: 14,
    color: "#bbb",
    marginVertical: 5,
  },
  button: {
    marginTop: 5,
    backgroundColor: "#1b4de4",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
