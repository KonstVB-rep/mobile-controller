import React from "react";
import { View, Text } from "react-native";
import { Link, Stack } from "expo-router";

import { Colors } from "@/constants/styles-system";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Oops!",
          headerStyle: { backgroundColor: Colors.black100 },
        }}
      />
      <View className="flex-1 items-center justify-center p-5 bg-primary">
        <Text className="text-white text-2xl font-psemibold text-center">Данной страницы не существует!</Text>
        <Link href="/" className="mt-4 py-4">
          <Text className="text-white text-lg font-psemibold text-center">Вернуться на главную!</Text>
        </Link>
      </View>
    </>
  );
}
