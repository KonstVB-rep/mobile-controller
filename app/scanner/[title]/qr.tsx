import React from "react";
import { useLocalSearchParams } from "expo-router";

import useFlashlight from "@/hooks/useFlashlight";
import QrCodeScanner from "@/components/camera/QrCodeScanner/QrCodeScanner";
import { View } from "react-native";
import BottomMenuQrScanner from "@/components/camera/BottomMenuQrScanner/BottomMenuQrScanner";
import { PermissionResponse, useCameraPermissions } from "expo-camera";


const QrScannerServicePage = () => {
  const { title } = useLocalSearchParams();
   const [permission, requestPermission] = useCameraPermissions();

  const { isOnFlashlight, setIsOnFlashlight } = useFlashlight();

  return (
    <View className="flex-1 relative">
      <QrCodeScanner
        isOnFlashlight={isOnFlashlight}
        permission={permission as PermissionResponse}
        requestPermission={requestPermission}
      />
      <BottomMenuQrScanner
        isOnFlashlight={isOnFlashlight}
        permission={permission as PermissionResponse}
        handlePressFlashlight={() => setIsOnFlashlight(!isOnFlashlight)}
        titleSegment={title as string}
      />
    </View>
  );
};

export default QrScannerServicePage;
