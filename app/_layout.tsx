import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "@/constants/styles-system"; 
import { AuthProvider } from "@/context/AuthContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            // contentStyle: {
            //   backgroundColor: Colors.black100,
            // },
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="services" />
          <Stack.Screen name="login" />
        </Stack>
        <StatusBar style="light" backgroundColor={Colors.primary} />
      </SafeAreaProvider>
    </AuthProvider>
  );
}
