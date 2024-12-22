import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Pressable,
  SafeAreaView,
  Platform,
  Alert,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Feather, MaterialIcons } from "@expo/vector-icons";

import SuccessNotification from "@/components/SuccessNotification";
import { Colors } from "@/constants/styles-system";
import CustomButton from "@/components/ui/CustomButton";
import { Overlay } from "../Overlay/Overlay";
import { SheetManager } from "react-native-actions-sheet";

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

  const qrIsLocked = useRef<boolean>(false)

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
    if(data && !qrIsLocked.current) {
      console.log(
        `Bar code with type ${type} and data ${data} has been scanned!`
      );
      qrIsLocked.current = true;
      await new Promise((resolve) => setTimeout(resolve, 500))
        .then(() => setScanned(true))
        .then(() => SheetManager.show('gestures', {
          payload: {
            data,
          },
        }));
      return;
    }
  };

  const handlePressScan = () => {
    setScanned(false);
    setShowBtnScan(false);
    qrIsLocked.current = false;
  };

  useEffect(() => {
    if (scanned) {
      setShowBtnScan(true);
    }
  }, [scanned]);

  if (!permission) {
    return (
      <SafeAreaView className="relative flex-1 bg-primary">
        <Feather name="camera-off" size={120} color={Colors.white} />

        <Text className="text-white text-2xl font-pmedium">
          Запрашивает разрешение камеры
        </Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView className="relative flex-1 bg-primary">
        <View className="flex-1 gap-5 flex-cols items-center justify-center">
          <Feather name="camera-off" size={120} color="white" />

          <Text className="text-white text-2xl font-pmedium">
            Нет доступа к камере
          </Text>

          <CustomButton
            onPress={requestPermission}
            title="Предоставьте разрешение"
            textStyles="text-white text-xl"
            containerStyles="max-w-[300px] mt-5 rounded-lg"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View className="relative flex-1 bg-black-100">
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
        autofocus={"on"}
        style={{
          flex: 1,
        }}
        className="absolute top-0 left-0 right-0 bottom-0 -z-[10]"
      />

      {Platform.OS === "ios" || Platform.OS === "android" ? (
        <Overlay keyValue={showBtnScan ? "fill" : "inner"} />
      ) : null}

      {showBtnScan && (
        <Pressable
          onPress={handlePressScan}
          className="absolute active:opacity-75 h-[120px] w-[120px] bg-black-100 rounded-full bottom-0 left-1/2 opacity-transform -translate-x-1/2 translate-y-1/2 flex items-center justify-center border-2 ring-offset-4 border-solid border-secondary z-[11]"
        >
          <MaterialIcons
            name="qr-code-scanner"
            size={48}
            color={Colors.white}
          />
          <Text className="text-white text-base block text-center">
            Сканировать
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default QrCodeScanner;
