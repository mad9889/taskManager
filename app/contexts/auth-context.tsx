import React, { createContext, useContext, useState, useEffect } from "react";
import { Platform } from "react-native";
import { router } from "expo-router";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { getToken, saveToken, deleteToken } from "../utils/tokenManager";
import { BASE_URL } from "../utils/config";

const AuthContext = createContext({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await getToken();
        const userData = await SecureStore.getItemAsync("user_data");

        if (token && userData) {
          const isValid = await verifyTokenWithBackend(token);
          if (isValid) {
            setUser({ ...JSON.parse(userData), token });
          } else {
            await clearAuthStorage();
            router.push("/login");
          }
        }
      } catch (error) {
        console.log("Error loading user:", error);
        await clearAuthStorage();
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const verifyTokenWithBackend = async (token) => {
    try {
      const res = await axios.get(`${BASE_URL}/validate-token`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.valid;
    } catch {
      return false;
    }
  };

  const clearAuthStorage = async () => {
    await deleteToken();
    setUser(null);
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/login`, { email, password });
      const { token, user } = res.data;

      if (!token || !user) throw new Error("Invalid login response");

      await saveToken(token);
      await SecureStore.setItemAsync("user_data", JSON.stringify(user));

      setUser({ ...user, token });
    } catch (err) {
      await clearAuthStorage();

      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || "Login failed";
        throw new Error(message);
      } else {
        throw new Error("Unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/register`, { name, email, password });
      const { token, user } = res.data;

      if (!token || !user) throw new Error("Invalid registration response");

      await saveToken(token);
      await SecureStore.setItemAsync("user_data", JSON.stringify(user));

      setUser({ ...user, token });
    } catch (err) {
      await clearAuthStorage();
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || "Registration failed";
        throw new Error(message);
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const token = await getToken();
      if (token) {
        await axios.post(`${BASE_URL}/logout`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      await clearAuthStorage();
      router.push("/login");
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
