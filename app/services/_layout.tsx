import React from "react";
import { Redirect, Stack } from "expo-router";

import { Colors } from "@/constants/styles-system";
import { useAuth } from "@/context/AuthContext";

const ServicesLayout = () => {
  
    const {isLoading, isAuthenticated } = useAuth()
  
    if (!isLoading && !isAuthenticated) return <Redirect href="/login" />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.primary,
        },
        headerStyle: {
          backgroundColor: Colors.black100,
        },
        headerTintColor: Colors.white,
      }}
    >
      <Stack.Screen
        name="[title]/qr"
        options={({ route }) => ({
          headerTitle: `${
            (route.params as { title: string })?.title as string
          }/QR-код сканер`,
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="[title]/nfc"
        options={({ route }) => ({
          headerTitle: `${
            (route.params as { title: string })?.title as string
          }/NFC`,
          headerShown: true,
        })}
      />
    </Stack>
  );
};

export default ServicesLayout;
