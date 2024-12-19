import { View, Text, Modal, Alert } from "react-native";
import React from "react";

import CustomButton from "./ui/CustomButton";

const ModalAction = ({
  text,
  state,
  action,
}: {
  text: string;
  state: boolean;
  action: () => void;
}) => {
  if (!state) return null;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={state}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        action();
      }}
    >
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="m-5 p-9 bg-black-100 items-center rounded-xl max-w-[90%]">
          <Text className="mb-4 text-white text-2xl font-pmedium text-center">
            {text}
          </Text>

          <View className="flex-row gap-5">
            <CustomButton
              onPress={action}
              title="Да"
              textStyles="text-white text-xl"
              containerStyles="w-40 max-w-[300px] mt-5 rounded-lg"
            />

            <CustomButton
              onPress={action}
              title="Нет"
              textStyles="text-white text-xl"
              containerStyles="w-40 max-w-[300px] mt-5 rounded-lg"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAction;
