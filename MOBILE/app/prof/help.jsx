import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Help() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Help & Support</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Information</Text>

        <TouchableOpacity style={styles.link} onPress={() => router.push("/prof/about")}>
          <Ionicons name="information-circle-outline" size={22} color="#1b4de4" />
          <Text style={styles.linkText}>About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={() => router.push("/prof/privacy")}>
          <Ionicons name="lock-closed-outline" size={22} color="#1b4de4" />
          <Text style={styles.linkText}>Privacy & Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={() => router.push("/prof/term")}>
          <Ionicons name="document-text-outline" size={22} color="#1b4de4" />
          <Text style={styles.linkText}>Terms & Conditions</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1b2a",
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1b4de4",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
    shadowColor: "#1b4de4",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 6,
  },
  backButton: {
    marginRight: 15,
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 6,
    borderRadius: 8,
  },
  headerText: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  // Body
  content: {
    padding: 25,
  },
  sectionTitle: {
    color: "#9ab6ff",
    fontSize: 16,
    marginBottom: 15,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  // Link cards
  link: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1b263b",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  linkText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 12,
    fontWeight: "500",
  },
});
