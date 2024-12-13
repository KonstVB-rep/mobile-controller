import React from "react";
import { Redirect, Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/styles-system";

const ServicesLayout = () => {
  // const { accessToken } = useAtomValue(authAtom);

  // if (!accessToken) {
  // 	return <Redirect href="/login" />;
  // }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="grow">
        <Stack
          screenOptions={{
            headerShown: true,
            contentStyle: {
              backgroundColor: Colors.primary,
            },
            headerStyle: {
              backgroundColor: Colors.primaryLight,
            },
            headerTintColor: Colors.linkColor,
          }}
        >
          <Stack.Screen
            name="[title]/qr"
            options={({ route }) => ({
              headerTitle: `${
                (route.params as { title: string })?.title as string
              }/qr-code сканер`,
            })}
          />
          <Stack.Screen
            name="[title]/nfc"
            options={({ route }) => ({
              headerTitle: `${
                (route.params as { title: string })?.title as string
              }/NFC`,
            })}
          />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ServicesLayout;
;
