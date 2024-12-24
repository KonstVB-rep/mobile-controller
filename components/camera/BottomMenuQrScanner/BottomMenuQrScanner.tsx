import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PermissionResponse } from "expo-camera";
import { Link } from "expo-router";
import { View, Pressable, TouchableOpacity } from "react-native";

const BottomMenuQrScanner = ({
  isOnFlashlight,
  handlePressFlashlight,
  titleSegment,
  permission
}: {
  isOnFlashlight: boolean;
  handlePressFlashlight: () => void;
  titleSegment: string;
  permission: PermissionResponse,
}) => {

  if (!permission || !permission.granted) return null;
  
  return (
    <View className="h-24 relative items-center justify-center p-3 bg-black-200">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePressFlashlight}
        className="absolute right-3 bottom-3"
      >
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
            className="p-2 text-white bg-black-100 rounded-full border-2 border-solid border-secondary-200 flex items-center align-content-center justify-center p-5"
          />
        )}
      </TouchableOpacity>
      <Link
        href={`/scanner/${titleSegment}/nfc`}
        className="absolute left-3 bottom-3"
        replace
        asChild
      >
        <Pressable>
          <MaterialCommunityIcons
            name="cellphone-nfc"
            size={24}
            color="white"
            className="p-2 text-white bg-black-100 rounded-full border-2 border-solid border-secondary-200 flex items-center align-content-center justify-center p-5"
          />
        </Pressable>
      </Link>
    </View>
  );
};

export default BottomMenuQrScanner;
