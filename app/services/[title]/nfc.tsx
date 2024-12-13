import { Colors, FontSize } from "@/constants/styles-system";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import NfcManager, { NfcEvents } from "react-native-nfc-manager";

const NFCReader = () => {
  const [hasNfc, setHasNFC] = useState<boolean | null>(null);

  useEffect(() => {
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

  if (hasNfc === null) return null;

  if (!hasNfc) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.text}>NFC not supported</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <TouchableOpacity onPress={readTag}>
        <Text style={styles.text}>Scan a Tag</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={readTag}>
        <Text style={styles.text}>Cancel Scan a Tag</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.secondary,
    fontSize: FontSize.f24,
  },
});

export default NFCReader;
