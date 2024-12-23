import { Colors } from "@/constants/styles-system";
import { View, Text } from "react-native";

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
}) => {
  return (
    <View
      className="relative mt-12 h-24 w-24 gap-1 align-center justify-center rounded-full"
      style={{
        backgroundColor: focused ? Colors.darkBlue : "transparent",
        width: 80,
        height: 80,
        marginTop: 46,
      }}
    >
      {children}
      {focused ? null : (
        <Text
          className="text-center text-base text-psemibold"
          style={{ color: color }}
        >
          {name}
        </Text>
      )}
    </View>
  );
};

export default TabIcon;
