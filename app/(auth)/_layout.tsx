import { Stack, Redirect } from "expo-router";
import { Text, View, ActivityIndicator } from "react-native";
import { useAuth } from "../contexts/auth-context";

export default function AuthLayout() {
  const { user, isLoading } = useAuth();

  // Show loading spinner while checking auth state
  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  // If user is logged in, redirect to dashboard or tabs
  if (user) {
    return <Redirect href="/dashboard" />;
  }

  // If not logged in, show auth stack
  // return (
  //   <Stack screenOptions={{ headerShown: false }}>
  //     <Stack.Screen name="login" />
  //     <Stack.Screen name="register" />
  //   </Stack>
  // );

  return <Stack screenOptions={{ headerShown: false }}/>
}
