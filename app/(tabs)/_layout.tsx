import { Redirect, Slot, Tabs, useRouter } from "expo-router";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemeContext } from "../theme";
import { useContext } from "react";
import { useAuth } from "../contexts/auth-context";

export default function TabLayout() {
  const router = useRouter();
  const { colors } = useContext(ThemeContext);
  const { user } = useAuth();
  // if (!user) {
  //   return <Redirect href="/login" />;
  // }

  // return <Slot />;

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.icon,
          headerStyle: {
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          },
          headerShadowVisible: false,
          headerTintColor: "#fff",
          tabBarStyle: {
            padding: 17,
            backgroundColor: colors.tabBar,
            // borderTopLeftRadius: 15,
            // borderTopRightRadius: 15,
            position: "relative",
            elevation: 0,
            height: 60,
            shadowOpacity: 0,
            borderTopWidth: 0,
          },
          tabBarItemStyle: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home-sharp" : "home-outline"}
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="taskCalendar"
          options={{
            title: "",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "calendar-clear" : "calendar-clear-outline"}
                color={color}
                size={26}
              />
            ),
          }}
        />

        {/* This is a dummy screen to create space for the plus button */}
        <Tabs.Screen
          name="addTask"
          options={{
            title: "",
            tabBarIcon: () => null,
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                color={color}
                size={26}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tabs>

      {/* Floating Plus Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          router.push("/(tabs)/addTask");
        }}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  floatingButton: {
    position: "absolute",
    bottom: 25,
    alignSelf: "center",
    backgroundColor: "#161f7c",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 100,
  },
});
