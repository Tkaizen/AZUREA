import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Terms() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Terms & Conditions</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.text}>
          By using AZURIA, you agree to these terms:
        </Text>

        <Text style={styles.text}>
          1. Account Use{'\n'}
          • You must provide accurate information when signing up.{'\n'}
          • You are responsible for keeping your account secure.
        </Text>

        <Text style={styles.text}>
          2. Buying and Selling{'\n'}
          • Listings must be truthful and legal.{'\n'}
          • AZURIA is a platform only — we’re not directly part of any sale or payment.
        </Text>

        <Text style={styles.text}>
          3. Prohibited Actions{'\n'}
          • No fake or misleading listings.{'\n'}
          • Don’t use the app for scams or illegal activity.
        </Text>

        <Text style={styles.text}>
          4. Payments and Fees{'\n'}
          • All payments must use authorized methods only.{'\n'}
          • Some services may include fees shown before confirmation.
        </Text>

        <Text style={styles.text}>
          5. Liability{'\n'}
          • We’re not responsible for user-to-user transactions or issues after a deal is made.
        </Text>

        <Text style={styles.text}>
          6. Updates to Terms{'\n'}
          • Continued use means you agree to the latest version.{'\n'}
          • For questions, contact us at Azur.ia@gmail.com
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
