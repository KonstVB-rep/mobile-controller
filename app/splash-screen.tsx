import { View, Text } from "react-native";
import React from "react";
import Loader from "../components/Loader";
import { MotiView } from "moti";;
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/styles-system";

const SplashScreen = () => {
  return (
    <>
      <View className="flex-1 pt-10">
        <MotiView
          from={{ opacity: 0}}
          animate={{ opacity: 1}}
          transition={{
            type: "timing",
            duration: 300,
          }}
          className="flex-1 items-center justify-center bg-primary gap-20"
        >
            <Loader />
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
