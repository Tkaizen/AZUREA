import { Tabs } from "expo-router";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#0d1b2a",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#1b4de4",
        tabBarInactiveTintColor: "#aaa",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="product"
        options={{
          title: "Product",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="tags" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
