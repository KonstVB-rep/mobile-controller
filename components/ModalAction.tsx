import { View, Text, StyleSheet, Modal, Alert } from "react-native";
import React from "react";
import { Colors, FontFamily, FontSize, Gaps } from "../constants/styles-system";
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
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{text}</Text>
          <View style={styles.modalButtons}>
            <Button text="Пропустить" onPress={action} />
            <Button text="Отмена" onPress={action} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAction;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.blackAlpha50,
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.black100,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: Colors.white,
    fontFamily: FontFamily.Poppins,
    fontSize: FontSize.f24,
  },
  modalButtons: {
    flexDirection: "row",
    gap: Gaps.g20,
  },
});
