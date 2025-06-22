import { Slot, Stack } from "expo-router";
import { ThemeProvider } from "./theme";
import { AuthProvider, useAuth } from "./contexts/auth-context";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Slot />
      </ThemeProvider>
    </AuthProvider>
  );
}
