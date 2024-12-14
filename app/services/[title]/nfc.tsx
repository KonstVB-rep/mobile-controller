import { Colors, FontSize } from "@/constants/styles-system";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import NfcManager, { NfcEvents } from "react-native-nfc-manager";
import { SafeAreaView } from "react-native-safe-area-context";

const styleWrapper = "flex-1 items-center justify-center gap-4";
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
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      Alert.alert(`tag found ${JSON.stringify(tag)}`);
    });

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, []);

  const readTag = async () => {
    await NfcManager.registerTagEvent();
  };

  if (hasNfc === null) {
    return (
      <View className={styleWrapper}>
        <Text className={styleText}>Your device</Text>
        <Text className={styleText}>does not support NFC</Text>
      </View>
    );
  }

  if (!hasNfc || Platform.OS === "web") {
    return (
      <View className={styleWrapper}>
        <Text className={styleText}>NFC not supported</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className={styleWrapper}>
      <TouchableOpacity onPress={readTag}>
        <Text className={styleText}>Scan a Tag</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={readTag}>
        <Text className={styleText}>Cancel Scan a Tag</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NFCReader;
