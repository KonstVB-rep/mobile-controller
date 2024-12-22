import { View, Text } from "react-native";
import React from "react";
import Loader from "../components/Loader";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/styles-system";

const SplashScreen = () => {
  return (
    <>
      <View className="flex-1">
        <MotiView
          from={{ opacity: 0}}
          animate={{ opacity: 1}}
          transition={{
            type: "timing",
            duration: 300,
          }}
          className="flex-1 items-center justify-center bg-primary gap-20"
        >
          <MotiView
            from={{ opacity: 0, rotate: "0deg" }}
            animate={{ opacity: 1, rotate: "360deg" }}
            transition={{
              type: "timing",
              duration: 2000,
              repeat: Infinity,
              easing: Easing.linear,
              repeatReverse: false,
            }}
          >
            <Loader />
          </MotiView>
          <Text className="text-white text-2xl font-psemibold text-center">
            Подождите, идет загрузка...
          </Text>
        </MotiView>
      </View>
      <StatusBar style="light" backgroundColor={Colors.primary} />
    </>
  );
};

export default SplashScreen;
