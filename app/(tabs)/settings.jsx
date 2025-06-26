import { useState, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import Constants from 'expo-constants';
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../theme";
import { useContext } from "react";
import { useAuth } from "../contexts/auth-context";
import axios from "axios";
import { getToken } from '../utils/tokenManager';
import * as Notifications from 'expo-notifications';
import { BASE_URL } from "../utils/config";


export default function SettingsPage() {
  const { logout, user } = useAuth();
  const router = useRouter();
  const { colors, isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState(null);

  // fetch status from API if stored
    useEffect(() => {
    const fetchNotificationStatus = async () => {
      try {
        const token = await getToken();
        if (!user || !user.id) return;

        const response = await axios.get(
          `${BASE_URL}/api/notification-status/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          }
        );

        setNotificationsEnabled(response.data.enabled_notification);
      } catch (error) {
        console.log('Error fetching notification status:', error.message);
      }
    };

    fetchNotificationStatus();
  }, []);

    const registerForPushNotifications = async () => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        alert('Permission not granted');
        return null;
      }

      if (Platform.OS === 'web') {
        const vapidKey = Constants.manifest?.extra?.vapidNotiKey;

        if (!vapidKey) {
          console.warn('VAPID key is missing');
          return null;
        }

        const tokenData = await Notifications.getExpoPushTokenAsync({
          web: {
            vapidPublicKey: vapidKey,
          },
        });

        return tokenData.data;
      }

      const tokenData = await Notifications.getExpoPushTokenAsync();
      return tokenData.data;
    } catch (err) {
      console.log('❌ Error in push registration:', err.message);
      return null;
    }
  };

  const handleToggle = async (val) => {
    setNotificationsEnabled(val);

    try {
      const authToken = await getToken();

      if (val) {
        const token = await registerForPushNotifications();
        if (!token) {
          console.log('❌ No Expo token received');
          return;
        }

        console.log('✅ Got Expo token: ', token);
        setExpoPushToken(token);

        await axios.post(
          `${BASE_URL}/notification/enable`,
          {
            expo_token: token,
            enabled_notification: true,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              Accept: 'application/json',
            },
          }
        );
      }
    } catch (error) {
      console.log('Error updating notification setting:', error.message);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 16,
      backgroundColor: colors.background,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    content: {
      padding: 20,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.text,
    },
    section: {
      backgroundColor: colors.card.background,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 12,
    },
    settingItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#999",
    },
    settingText: {
      flex: 1,
      marginLeft: 12,
      fontSize: 16,
      color: colors.text,
    },
    versionText: {
      fontSize: 14,
      color: colors.text,
      opacity: 0.7,
    },
    logoutButton: {
      backgroundColor: colors.card.background,
      borderRadius: 12,
      padding: 16,
      alignItems: "center",
      marginTop: 8,
      borderWidth: 1,
      borderColor: "#ff3b30",
    },
    logoutText: {
      color: "#ff3b30",
      fontSize: 16,
      fontWeight: "500",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.icon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.content}>
        {/* User Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="person-outline" size={20} color={colors.icon} />
            <Text style={styles.settingText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="key-outline" size={20} color={colors.icon} />
            <Text style={styles.settingText}>Change Password</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.icon} />
          </TouchableOpacity>
        </View>

        {/* App Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <View style={styles.settingItem}>
            <Ionicons name="moon-outline" size={20} color={colors.icon} />
            <Text style={styles.settingText}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: "#ddd", true: colors.primary }}
            />
          </View>

          <View style={styles.settingItem}>
            <Ionicons
              name="notifications-outline"
              size={20}
              color={colors.icon}
            />
            <Text style={styles.settingText}>Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleToggle}
              trackColor={{ false: "#ddd", true: colors.primary }}
            />
          </View>
        </View>

        {/* About App */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={colors.icon}
            />
            <Text style={styles.settingText}>App Version</Text>
            <Text style={styles.versionText}>v1.0.0</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color={colors.icon}
            />
            <Text style={styles.settingText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.icon} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
