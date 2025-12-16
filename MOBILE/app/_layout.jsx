import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import { BookingsProvider } from "../context/BookingsContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <BookingsProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </BookingsProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}
