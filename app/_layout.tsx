import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Colors } from "@/constants/styles-system";
import { AuthProvider } from "@/context/AuthContext";

import "react-native-reanimated";
import "react-native-gesture-handler";

import Toast from "react-native-toast-message";
import { toastConfig } from "@/lib/toastConfig";

import "../global.css";
import { SheetProvider } from "react-native-actions-sheet";
import "@/lib/sheets";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (error) {
    return null;
  }
  if (!loaded && !error) {
    return null;
  }

  return (
      <SheetProvider context="global">
        <SafeAreaProvider>
          <AuthProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  backgroundColor: Colors.primary,
                },
              }}
            >
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="scanner" />
              <Stack.Screen name="index" />
            </Stack>
          </AuthProvider>
          <StatusBar style="light" backgroundColor={Colors.primary} />
          <Toast config={toastConfig} />
        </SafeAreaProvider>
      </SheetProvider>
  );
}
