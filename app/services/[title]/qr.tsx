import React from "react";
import { useLocalSearchParams } from "expo-router";

import useFlashlight from "@/hooks/useFlashlight";
import FlashlightField from "@/components/camera/FlashlightField/FlashlightField";
import QrCodeScanner from "@/components/camera/QrCodeScanner/QrCodeScanner";
import ModalAction from "@/components/ModalAction";
import useModal from "@/hooks/useModal";
import { SafeAreaView } from "react-native";

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
      <FlashlightField
        isOnFlashlight={isOnFlashlight}
        handlePressFlashlight={() => setIsOnFlashlight(!isOnFlashlight)}
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
