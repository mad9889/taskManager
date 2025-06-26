import { Slot, Stack } from "expo-router";
import { ThemeProvider } from "./theme";
import { AuthProvider, useAuth } from "./contexts/auth-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
     <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
    <AuthProvider>
      <ThemeProvider>
        <Slot />
      </ThemeProvider>
    </AuthProvider>
    </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
