import React from "react";
import { Redirect, Stack } from "expo-router";
import { Colors } from "@/constants/styles-system";
import { useGlobalContext } from "@/context/useGlobalContext";

const ServicesLayout = () => {
  
  const { isLoggedIn, user, isLoading } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/" />;

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
