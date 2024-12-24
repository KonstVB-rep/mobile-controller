import { View, Text } from "react-native";
import React from "react";
import ActionSheet, { useSheetPayload } from "react-native-actions-sheet";
import { Colors } from "@/constants/styles-system";

const ScanDrawer = () => {
  const payload = useSheetPayload("payload");
  return (
    <ActionSheet
      id="gestures"
      zIndex={1000}
      gestureEnabled={true}
      indicatorStyle={{
        width: 100,
        height: 5,
        backgroundColor: Colors.primary,
      }}
      containerStyle={{ backgroundColor: "#e0e1dd" }}
      openAnimationConfig={{
        speed: 20,
        delay: 0,
        velocity: 12,
      }}
      closeAnimationConfig={{
        speed: 20,
        delay: 0,
        velocity: 12,
      }}
    >
      <View
        style={{
          paddingHorizontal: 12,
          height: 400,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: Colors.primary,
            fontSize: 30,
            textAlign: "center",
          }}
        >
          Привет, проведи по мне пальцем вверх-вниз!
        </Text>
        <Text
          style={{
            color: Colors.primary,
            fontSize: 30,
            textAlign: "center",
          }}
        >
          {JSON.stringify(payload)}
        </Text>
      </View>
    </ActionSheet>
  );
};

export default ScanDrawer;
