import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Privacy() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Privacy & Policy</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.text}>
          At AZURIA, we respect your privacy. Any personal information you provide such as your
          name, contact details, or payment information is collected only to process transactions
          and improve our services. We never sell or share your data with unauthorized parties.
        </Text>

        <Text style={styles.text}>
          By using our platform, you agree to our data practices and security measures designed
          to keep your information safe.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d1b2a" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1b4de4",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  backButton: { marginRight: 15 },
  headerText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  content: { padding: 20 },
  text: { color: "#fff", fontSize: 15, lineHeight: 24, marginBottom: 15 },
});
