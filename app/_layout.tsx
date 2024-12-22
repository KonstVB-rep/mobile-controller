import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Colors } from "@/constants/styles-system";
import { AuthProvider } from "@/context/AuthContext";

import "react-native-reanimated";
import "react-native-gesture-handler";

import "../global.css";
import SplashScreen from "@/app/splash-screen";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/lib/toastConfig";
import { SheetProvider } from "react-native-actions-sheet";
import "@/lib/sheets";

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const [splashScreenShow, setSplashScreenShow] = useState(true);

  useEffect(() => {
    if (error) throw error;
    let timeout = undefined;
    if (loaded) {
      timeout = setTimeout(() => {
        setSplashScreenShow(false);
      }, 1000);
      // SplashScreen.hideAsync();
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [loaded, error]);

  if (splashScreenShow) {
    return <SplashScreen />;
  }

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <SheetProvider context="global">
        <SafeAreaProvider>
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
          <StatusBar style="light" backgroundColor={Colors.primary} />
          <Toast config={toastConfig} />
        </SafeAreaProvider>
      </SheetProvider>
    </AuthProvider>
  );
}
