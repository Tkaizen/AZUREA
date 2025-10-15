import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // ✅ useRouter for Expo navigation

export default function Setting() {
  const router = useRouter(); // ✅ initialize router
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      {/* Preferences Section */}
      <Text style={styles.sectionTitle}>Preferences</Text>

      <View style={styles.settingBox}>
        <Ionicons name="notifications-outline" size={22} color="#4D7CFE" />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>Notifications</Text>
          <Text style={styles.settingDesc}>Enable push notifications</Text>
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: "#767577", true: "#4D7CFE" }}
          thumbColor={notificationsEnabled ? "#fff" : "#f4f3f4"}
        />
      </View>

      <View style={styles.settingBox}>
        <Ionicons name="moon-outline" size={22} color="#4D7CFE" />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>Dark Mode</Text>
          <Text style={styles.settingDesc}>Use dark theme</Text>
        </View>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: "#767577", true: "#4D7CFE" }}
          thumbColor={darkMode ? "#fff" : "#f4f3f4"}
        />
      </View>

      <View style={styles.settingBox}>
        <Ionicons name="language-outline" size={22} color="#4D7CFE" />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>Language</Text>
          <Text style={styles.settingDesc}>English</Text>
        </View>
      </View>

      {/* Security Section */}
      <Text style={styles.sectionTitle}>Security</Text>

      <TouchableOpacity style={styles.settingBox}>
        <Ionicons name="lock-closed-outline" size={22} color="#4D7CFE" />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>Change Password</Text>
          <Text style={styles.settingDesc}>Update your password</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingBox}>
        <Ionicons name="shield-checkmark-outline" size={22} color="#4D7CFE" />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>Privacy & Security</Text>
          <Text style={styles.settingDesc}>Manage your privacy setting</Text>
        </View>
      </TouchableOpacity>

      {/* About Section */}
      <Text style={styles.sectionTitle}>About</Text>

      <View style={styles.settingBox}>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>Version</Text>
          <Text style={styles.settingDesc}>1.0.0</Text>
        </View>
        <TouchableOpacity>
          <Text style={{ color: "#4D7CFE" }}>View</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1B2A",
    padding: 20,
  },
  darkContainer: {
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
  },
  sectionTitle: {
    color: "#B0B8C1",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 8,
  },
  settingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1B263B",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  settingText: {
    flex: 1,
    marginLeft: 10,
  },
  settingTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  settingDesc: {
    color: "#9BA4B5",
    fontSize: 13,
  },
});
