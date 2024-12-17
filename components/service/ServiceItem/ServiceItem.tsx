import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const ServiceItem = ({ title, image }: { title: string; image: string }) => {
  console.log(title, 'title');
  return (
    <>
      <View className="flex-cols gap-5 p-5 mx-2 mb-4 bg-black-200 rounded-xl w-full max-w-[500px]">
        <Text className="text-white text-2xl font-psemibold text-center">
          {title}
        </Text>
        <Image
          source={{
            uri: `${image}`,
          }}
          className="w-full h-[200px] m-auto ratio-video rounded-xl"
        />
        <View className="flex flex-row justify-between gap-4">
          <Pressable
            onPress={() => router.push(`/services/${title}/qr`)}
            className="grow h-24 border-1 border-black-200 rounded-xl"
          >
            {({ pressed }) => (
              <View
                className={`${
                  pressed ? "bg-secondary-100" : "bg-primary"
                } h-full flex flex-cols p-2 justify-center items-center gap-2 border-2 border-black-200 rounded-xl`}
              >
                <MaterialIcons name="qr-code-scanner" size={24} color="white" />
                <Text className="text-white text-lg">Qr</Text>
              </View>
            )}
          </Pressable>

          <Pressable
            onPress={() => router.push(`/services/${title}/nfc`)}
            className="grow h-24 border-1 border-black-200 rounded-xl"
          >
            {({ pressed }) => (
              <View
                className={`${
                  pressed ? "bg-secondary-100" : "bg-primary"
                } h-full flex flex-cols p-2 justify-center items-center gap-2 border-2 border-black-200 rounded-xl`}
              >
                <MaterialCommunityIcons
                  name="cellphone-nfc"
                  size={24}
                  color="white"
                />
                <Text className="text-white text-lg">NFC</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default ServiceItem;
