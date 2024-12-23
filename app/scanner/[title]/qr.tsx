import React from "react";
import { useLocalSearchParams } from "expo-router";

import useFlashlight from "@/hooks/useFlashlight";
import QrCodeScanner from "@/components/camera/QrCodeScanner/QrCodeScanner";
import { SafeAreaView } from "react-native";
import BottomMenuQrScanner from "@/components/camera/BottomMenuQrScanner/BottomMenuQrScanner";


const QrScannerServicePage = () => {
  const { title } = useLocalSearchParams();

  const { isOnFlashlight, setIsOnFlashlight } = useFlashlight();

  return (
    <SafeAreaView className="flex-1 relative">
      <QrCodeScanner
        isOnFlashlight={isOnFlashlight}
      />
      <BottomMenuQrScanner
        isOnFlashlight={isOnFlashlight}
        handlePressFlashlight={() => setIsOnFlashlight(!isOnFlashlight)}
        titleSegment={title as string}
      />
    </SafeAreaView>
  );
};

export default QrScannerServicePage;
