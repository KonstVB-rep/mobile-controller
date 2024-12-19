import { Pressable, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCameraPermissions } from "expo-camera";

const FlashlightField = ({
  isOnFlashlight,
  handlePressFlashlight,
}: {
  isOnFlashlight: boolean;
  handlePressFlashlight: () => void;
}) => {
  const [permission] = useCameraPermissions();

  if (!permission || !permission.granted) return null;
  return (
    <View className="h-24 relative items-center justify-center p-3 bg-black-200">
      <Pressable onPress={handlePressFlashlight} className="absolute right-3 bottom-3">
        {!isOnFlashlight ? (
          <MaterialCommunityIcons
            name="flashlight"
            size={24}
            color="white"
            className="p-2 text-white bg-black-100 rounded-full border-2 border-solid border-secondary-200 flex items-center align-content-center justify-center p-5"
          />
        ) : (
          <MaterialCommunityIcons
            name="flashlight-off"
            size={24}
            color="white"
            className="p-2text-white bg-black-100 rounded-full border-2 border-solid border-secondary-200 flex items-center align-content-center justify-center p-5"
          />
        )}
      </Pressable>
    </View>
  );
};

export default FlashlightField;
