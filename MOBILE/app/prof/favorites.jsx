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
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../../context/FavoritesContext";

// Mapping car IDs to images and names (since context only stores IDs)
import { carData } from "../../data/carData";

export default function Favorites() {
    const { favorites, toggleFavorite } = useFavorites();

    const favoriteCars = favorites.map(id => ({ id, ...carData[id] })).filter(item => item.name);

    return (
        <View style={styles.container}>
            {/* Back Arrow Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => router.push("/(Tabs)/profile")}>
                    <Ionicons name="arrow-back" size={26} color="#E5E7EB" />
                </TouchableOpacity>
                <Text style={styles.header}>My Favorites</Text>
            </View>

            {favoriteCars.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No favorites yet.</Text>
                </View>
            ) : (
                <FlatList
                    data={favoriteCars}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={item.image} style={styles.image} resizeMode="cover" />
                            <View style={styles.details}>
                                <Text style={styles.carName}>{item.name}</Text>
                                <Text style={styles.price}>{item.price}</Text>

                                <View style={styles.actionButtons}>
                                    <TouchableOpacity
                                        style={styles.viewButton}
                                        onPress={() => router.push(`/(info)/${item.id}`)}
                                    >
                                        <Text style={styles.buttonText}>View</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.removeButton}
                                        onPress={() => toggleFavorite(item.id)}
                                    >
                                        <Ionicons name="trash-outline" size={20} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
            )}
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
    },
    price: {
        fontSize: 16,
        fontWeight: "600",
        color: "#60A5FA",
        marginTop: 4,
    },
    actionButtons: {
        flexDirection: "row",
        marginTop: 10,
        gap: 10,
    },
    viewButton: {
        backgroundColor: "#2563EB",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignItems: "center",
        flex: 1,
    },
    removeButton: {
        backgroundColor: "#EF4444",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        color: "#9CA3AF",
        fontSize: 18,
    },
});
