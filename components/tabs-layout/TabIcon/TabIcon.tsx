import { FontFamily, Gaps } from "@/constants/styles-system";
import { View, Text, StyleSheet } from "react-native";

const TabIcon = ({
  children,
  name,
  color,
  focused,
}: {
  children: React.ReactNode;
  name: string;
  color: string;
  focused: boolean;
}) => (
  <View className="relative t-5 w-20 gap-2 align-center justify-center">
    {children}
    <Text
    className={`text-center text-[${color}] text-base ${focused ? "text-psemibold" : "text-pmedium"}`}
    >
      {name}
    </Text>
  </View>
);

export default TabIcon;
