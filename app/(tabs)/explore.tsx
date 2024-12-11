import { View, Text } from "react-native";
import React from "react";
import { HapticTab } from "@/components/HapticTab";

const explore = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl text-zinc-100">Explore</Text>
      <HapticTab className="absolute bottom-0">
        <Text className="text-3xl text-zinc-100">Explore</Text>
      </HapticTab>
    </View>
  );
};

export default explore;
