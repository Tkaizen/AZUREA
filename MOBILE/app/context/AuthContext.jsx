import React, { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

// Key used to persist user data
const STORAGE_KEY = "AZUREA_USER";

export const AuthContext = createContext({
  user: null,
  setUser: () => { },
  logout: () => { },
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const raw = await SecureStore.getItemAsync(STORAGE_KEY);
        if (raw) setUser(JSON.parse(raw));
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  const saveUser = async (nextUser) => {
    setUser(nextUser);
    try {
      if (nextUser) {
        await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(nextUser));
      } else {
        await SecureStore.deleteItemAsync(STORAGE_KEY);
      }
    } catch (e) {
      // ignore
    }
  };

  const logout = async () => {
    await saveUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser: saveUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
