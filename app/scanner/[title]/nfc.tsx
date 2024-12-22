import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  Pressable,
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
        <Text className={styleText}>Ваше устройство</Text>
        <Text className={styleText}>не поддерживает NFC</Text>
      </View>
    );
  }

  if (!hasNfc || Platform.OS === "web") {
    return (
      <View className={styleWrapper}>
        <Text className={styleText}>NFC не поддерживается</Text>
      </View>
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
      {/* <View className="h-24 relative py-2 items-center justify-center p-3 bg-black-200">
        <Link
          href="/scanner/[title]/qr"
          className="m-auto"
          replace
          asChild
        >
          <Pressable>
            <MaterialIcons
              name="qr-code-scanner"
              size={48}
              color="white"
              className="p-2 text-white bg-black-100 rounded-full border-2 border-solid border-secondary-200 flex items-center align-content-center justify-center p-5"
            />
          </Pressable>
        </Link>
      </View> */}
    </SafeAreaView>
  );
};

export default NFCReader;
