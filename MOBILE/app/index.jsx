import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Link, useRouter } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    router.replace("/(Tabs)/home")
  };

  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Image */}
      <View style={styles.topImageContainer}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.topImage}
        />
      </View>

      {/* Logo / Title */}
      <Text style={styles.logoText}>
        AZUR<Text style={{ color: "#fff" }}>EA</Text>
      </Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={18} color="#ccc" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#ccc" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Signup Link */}
      <Text style={styles.signupText}>
        Don’t have an account?{" "}
        <Link href="/registration" style={styles.signupLink}>
          Sign up Now
        </Link>
      </Text>

      {/* Divider */}
      <Text style={styles.orText}>Sign up with</Text>

      {/* Social Icons */}
      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialBtn}>
          <Icon name="facebook" size={22} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn}>
          <Icon name="google" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  topImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  topImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%",
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 14,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  signupText: {
    color: "#aaa",
    marginTop: 20,
  },
  signupLink: {
    color: "#007BFF",
    fontWeight: "600",
  },
  orText: {
    color: "#aaa",
    marginVertical: 20,
    fontSize: 14,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  socialBtn: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 50,
    marginHorizontal: 10,
  },
});
