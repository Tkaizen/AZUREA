import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Reusable Menu Item Component
function MenuItem({ icon, title }) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <FontAwesome
        name={icon}
        size={20}
        color="#1b4de4"
        style={styles.menuIcon}
      />
      <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
  );
}

// Main Profile Screen
export function Profile() {
  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://via.placeholder.com/100x100.png?text=User" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>STEVE DRYLLE SARINO</Text>
        <Text style={styles.email}>GWAPOKO@gmial.com</Text>
      </View>

      {/* Menu Items */}
      
      <View style={styles.menu}>
        <MenuItem icon="car" title="My Bookings" />
        <MenuItem icon="heart" title="Favorites" />
        <MenuItem icon="credit-card" title="Payment Methods" />
        <MenuItem icon="cog" title="Settings" />
        <MenuItem icon="info-circle" title="Help & Support" />
        <MenuItem icon="sign-out" title="Logout" />
      </View>
    </ScrollView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1b2a", // Dark background
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#1b263b",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#1b4de4",
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  email: {
    fontSize: 14,
    color: "#bbb",
  },
  menu: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1b263b",
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: "#fff",
  },
});
