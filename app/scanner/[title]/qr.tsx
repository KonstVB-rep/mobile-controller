import React from "react";
import { useLocalSearchParams, usePathname, useSegments } from "expo-router";

import useFlashlight from "@/hooks/useFlashlight";
import QrCodeScanner from "@/components/camera/QrCodeScanner/QrCodeScanner";
import ModalAction from "@/components/ModalAction";
import useModal from "@/hooks/useModal";
import { SafeAreaView } from "react-native";
import BottomMenuQrScanner from "@/components/camera/BottomMenuQrScanner/BottomMenuQrScanner";
import { useSearchParams } from "expo-router/build/hooks";

const QrScannerServicePage = () => {
  const { title } = useLocalSearchParams();

  const { isOnFlashlight, setIsOnFlashlight } = useFlashlight();
  const { showModal, setShowModal } = useModal();

  return (
    <SafeAreaView className="flex-1 relative">
      <QrCodeScanner
        isOnFlashlight={isOnFlashlight}
        setShowModal={setShowModal}
      />
      <BottomMenuQrScanner
        isOnFlashlight={isOnFlashlight}
        handlePressFlashlight={() => setIsOnFlashlight(!isOnFlashlight)}
        titleSegment={title as string}
      />
      <ModalAction
        text={`Пропустить посетителя на ${title}?`}
        state={showModal}
        action={() => setShowModal(false)}
      />
    </SafeAreaView>
  );
};

export default QrScannerServicePage;
