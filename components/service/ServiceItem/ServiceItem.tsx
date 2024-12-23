import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const ServiceItem = ({ title, image }: { title: string; image: string }) => {
  return (
    <>
      <View className="flex-cols gap-1 pt-4 mb-4 bg-black-200 rounded-xl max-w-[500px] border-[1px] border-zinc-700 border-solid">
        <Text className="text-white text-2xl font-psemibold text-center">
          {title}
        </Text>

        <Image
          source={{
            uri: `${image}`,
          }}
          className="w-full h-[200px] ratio-video"
        />
        <View className="flex flex-row p-2 justify-between gap-1">
          <Pressable
            onPress={() => router.push(`/scanner/${title}/qr`)}
            className="grow h-24 border-1 border-black-200 rounded-xl"
          >
            {({ pressed }) => (
              <View
                className={`${
                  pressed
                    ? "bg-secondary-200 border-zinc-100"
                    : "bg-primary border-zinc-600"
                } h-full flex flex-cols p-2 justify-center items-center gap-2 border-2 rounded-xl border-solid`}
              >
                <MaterialIcons name="qr-code-scanner" size={24} color="white" />

                <Text className="text-white text-lg">Qr</Text>
              </View>
            )}
          </Pressable>

          <Pressable
            onPress={() => router.push(`/scanner/${title}/nfc`)}
            className="grow h-24 border-1 border-black-200 rounded-xl"
          >
            {({ pressed }) => (
              <View
                className={`${
                  pressed
                    ? "bg-secondary-200 border-zinc-100"
                    : "bg-primary border-zinc-600"
                } h-full flex flex-cols p-2 justify-center items-center gap-2 border-2 border-zinc-600 border-black-200 rounded-xl`}
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
