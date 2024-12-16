import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Platform,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Feather, MaterialIcons } from "@expo/vector-icons";

// import { Overlay } from "../Overlay/Overlay";

import { useWindowDimensions } from "react-native";
import SuccessNotification from "@/components/SuccessNotification";
import { HEADER_HEIGHT, Colors } from "@/constants/styles-system";
import Button from "@/components/ui/Button";
import { Overlay } from "../Overlay/Overlay";

const QrCodeScanner = ({
  isOnFlashlight,
  setShowModal,
}: {
  isOnFlashlight: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [scanned, setScanned] = useState<boolean>(false);
  const [showBtnScan, setShowBtnScan] = useState<boolean>(false);
  const [permission, requestPermission] = useCameraPermissions();

  const windowHeight = useWindowDimensions().height;

  // const handlePress = async (uri: string) => {
  // 	const url = uri; // Замените на ваш URL
  // 	const supported = await Linking.canOpenURL(url);

  // 	if (supported) {
  // 		await Linking.openURL(url);
  // 	} else {
  // 		console.log(`Can't open URL: ${url}`);
  // 	}
  // };
  const handleBarCodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    await new Promise((resolve) => setTimeout(resolve, 500))
      .then(() => setScanned(true))
      .then(() => setShowModal(true));
  };

  const handlePressScan = () => {
    setScanned(false);
    setShowBtnScan(false);
  };

  useEffect(() => {
    if (scanned) {
      setShowBtnScan(true);
    }
  }, [scanned]);

  if (!permission) {
    return (
      <SafeAreaView className="relative flex-1 bg-black-100">
        <Feather name="camera-off" size={120} color={Colors.white} />
        <Text className="text-white text-2xl font-pmedium">
          Запрашивает разрешение камеры
        </Text>
      </SafeAreaView>
    );
  }
  if (!permission.granted) {
    return (
      <SafeAreaView className="relative flex-1 bg-black-100">
        <View className="absolute to-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-5 flex-cols align-center justify-center">
          <Feather name="camera-off" size={120} color={Colors.white} />
          <Text className="text-white text-2xl font-pmedium">
            Нет доступа к камере
          </Text>
          <Button onPress={requestPermission} text="Предоставьте разрешение" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SuccessNotification
        successText={scanned ? "QR-код успешно сканирован" : null}
      />
      <CameraView
        animateShutter={true}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        enableTorch={isOnFlashlight}
        className="absolute inset-0 -z-1"
      />
      {Platform.OS === "ios" || Platform.OS === "android" ? (
        <Overlay keyValue={!showBtnScan ? "inner" : "innerCircle"} />
      ) : null}
      {showBtnScan && (
        <Pressable
          onPress={handlePressScan}
          style={({ pressed }) => ({
            width: pressed ? 140 : 120,
            height: pressed ? 140 : 120,
          })}
          className={`absolute h-[120px] w-[120px] bg-black-100 rounded-fill top-[${
            windowHeight / 2 - HEADER_HEIGHT
          }px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-5 flex-cols align-center justify-center`}
        >
          <MaterialIcons
            name="qr-code-scanner"
            size={48}
            color={Colors.secondary}
          />
        </Pressable>
      )}
    </>
  );
};

export default QrCodeScanner;
