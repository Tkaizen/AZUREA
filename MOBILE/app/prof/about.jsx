import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function About() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>About Us</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.text}>
          Welcome to AZURIA, your trusted online destination for buying and selling cars with ease
          and confidence. Our platform connects car buyers, sellers, and dealers in one convenient
          digital marketplace — making the car shopping experience faster, safer, and more transparent.
        </Text>

        <Text style={styles.text}>
          Our mission is to redefine the car trading experience through technology — offering a
          user-friendly interface, secure transactions, and detailed vehicle information, all in one place.
        </Text>

        <Text style={styles.text}>
          Drive your next journey with us — where convenience meets confidence.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d1b2a" 

  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1b4de4",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  backButton: { marginRight: 15 

  },
  headerText: { color: "#fff", fontSize: 18, fontWeight: "bold" 

  },
  content: { padding: 20 

  },
  text: { color: "#fff", fontSize: 15, lineHeight: 24, marginBottom: 15 
    
  },
});
