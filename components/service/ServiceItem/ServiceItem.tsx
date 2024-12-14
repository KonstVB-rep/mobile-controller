import {
  View,
  Text,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Colors,
} from "@/constants/styles-system";

const ServiceItem = ({ title, image }: { title: string; image: string }) => {
  return (
    <>
      <View className="flex-cols gap-5 p-5 mx-2 bg-black-200 rounded-xl w-full max-w-[500px]">
        <Text className="text-white text-2xl font-psemibold text-center">{title}</Text>
        <Image
          source={{
            uri: `${image}`,
          }}
          className="w-full h-[100px] m-auto ratio-video rounded-xl"
        />
        <View className="flex flex-row justify-between gap-4">
          <Pressable
            onPress={() => router.push(`/services/${title}/qr`)}
            style={(props) => ({
              backgroundColor: props.pressed
                ? Colors.btnHoverColor
                : Colors.black100,
              borderColor: props.pressed
                ? Colors.secondary
                : Colors.transparent,
            })}
            className="w-1/2 border-1 border-black-200 rounded-xl"
          >
            <View className="h-12 flex flex-cols p-2 justify-center items-center gap-2 border-2 border-black-200 rounded-xl">
              <MaterialIcons name="qr-code-scanner" size={24} color="white" />
              <Text className="text-white text-lg">QR</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => router.push(`/services/${title}/qr`)}
            style={(props) => ({
              backgroundColor: props.pressed
                ? Colors.btnHoverColor
                : Colors.black100,
              borderColor: props.pressed
                ? Colors.secondary
                : Colors.transparent,
            })}
              className="w-1/2 border-1 border-black-200 rounded-xl"
          >
            <View className="h-12 flex flex-cols p-2 justify-center items-center gap-2 border-2 border-black-200 rounded-xl">
              <MaterialCommunityIcons
                name="cellphone-nfc"
                size={24}
                color={Colors.secondary}
              />
              <Text className="text-white text-lg">NFC</Text>
            </View>
          </Pressable>
        </View>

      </View>
    </>
  );
};

export default ServiceItem;
