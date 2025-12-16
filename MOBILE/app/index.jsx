import { Link, useRouter } from "expo-router";
import React, { useState, useContext } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { login } from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setUser } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      // Assuming the backend expects 'username' but the UI asks for 'email'.
      // Adjusting based on backend authRoutes.js which expects 'username' and 'password'.
      // If the user enters an email as username, we might need to adjust backend or frontend.
      // For now, passing email as username to match typical flows, or I should check if backend supports email login.
      // Looking at authRoutes.js: const user = await User.findOne({username}); 
      // It only looks for username. I should probably change the frontend to ask for Username or change backend to allow email.
      // Given the UI says "Email", I will assume the user might want to login with email.
      // BUT, the backend strictly checks `username`. 
      // I will stick to passing the input as 'username' for now, but I should probably update the placeholder to "Username" or "Email/Username" later if needed.
      // Actually, let's just pass the email state as the username argument for now, assuming the user registered with email as username or I'll fix the backend later.
      // Wait, registration asks for Name, Email, Password. 
      // Backend register expects: username, password, email.
      // Backend login expects: username, password.
      // So if I register with Name="John", Email="john@example.com", I must login with "John".
      // But the Login UI asks for "Email". This is a mismatch.
      // I will update the Login UI to ask for "Username" instead of "Email" to match the backend for now.

      const data = await login(email, password); // sending 'email' state variable as 'username' argument
      // data should include token, _id, username, email from backend
      if (data) {
        setUser(data);
        alert("Login Successful!");
        router.replace("/(Tabs)/home");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Image */}
      <View style={styles.topImageContainer}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.topImage}
          resizeMode="contain"
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
          placeholder="Username"
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
