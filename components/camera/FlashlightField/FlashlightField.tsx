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
    <View className="absolute bottom-0 right-0 left-0 h-12 items-center justify-center p-3 bg-black-100">
      <Pressable onPress={handlePressFlashlight}>
        {!isOnFlashlight ? (
          <MaterialCommunityIcons
            name="flashlight"
            size={40}
            className="relative bottom-20 w-20 h-20 text-secondary bg-black-100 rounded-full border-5 border-solid border-black-100 flex align-content-center justify-center p-5" 
          />
        ) : (
          <MaterialCommunityIcons
            name="flashlight-off"
            size={40}
            className="relative bottom-20 w-20 h-20 text-secondary bg-black-100 rounded-full border-5 border-solid border-black-100 flex align-content-center justify-center p-5" 
          />
        )}
      </Pressable>
    </View>
  );
};

export default FlashlightField;