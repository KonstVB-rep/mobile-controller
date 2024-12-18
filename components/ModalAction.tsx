import { View, Text, Modal, Alert } from "react-native";
import React from "react";

import Button from "./ui/Button";

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
        <View className="m-5 p-9 bg-black-100 items-center rounded-xl">
          <Text className="mb-4 text-white text-2xl font-pmedium text-center">{text}</Text>
          
          <View className="flex-row gap-5">
            <Button text="Пропустить" onPress={action} />
            
            <Button text="Отмена" onPress={action} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAction;
