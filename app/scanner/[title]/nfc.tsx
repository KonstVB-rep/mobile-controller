import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, Platform } from "react-native";
import NfcManager, { NfcEvents } from "react-native-nfc-manager";
import { SafeAreaView } from "react-native-safe-area-context";
import NotSupportNfcImage from "@/components/NotSupportNfcImage";

const styleWrapper = "flex-1 items-center justify-center gap-4 pb-10";
const styleText = "text-white text-2xl";

const NFCReader = () => {
  const [hasNfc, setHasNFC] = useState<boolean | null>(null);

  useEffect(() => {
    if (Platform.OS === "web") {
      return;
    }
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported();

      setHasNFC(deviceIsSupported);
      if (deviceIsSupported) {
        await NfcManager.start();
      }
    };

    checkIsSupported();
  }, []);

  useEffect(() => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: any) => {
      Alert.alert(`tag found ${JSON.stringify(tag)}`);
    });

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, []);

  const readTag = async () => {
    await NfcManager.registerTagEvent();
  };

  if (!hasNfc || Platform.OS === "web") {
    return (
      <SafeAreaView className="relative flex-1 bg-primary">
        <View className={styleWrapper}>
          <NotSupportNfcImage width={180} height={180} />
          <Text className={styleText}>Ваше устройство</Text>
          <Text className={styleText}>не поддерживает NFC</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className={styleWrapper}>
      <TouchableOpacity onPress={readTag}>
        <Text className={styleText}>Сканировать тег</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={readTag}>
        <Text className={styleText}>Отменить сканирование</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NFCReader;
