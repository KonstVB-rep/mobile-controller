import { View, Text } from "react-native";
import React from "react";
import Loader from "../components/Loader";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";

const SplashScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-primary gap-8">
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
    </View>
  );
};

export default SplashScreen;
