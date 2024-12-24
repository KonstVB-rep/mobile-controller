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
      className="mt-12 h-[66px] w-[66px] gap-1 align-center justify-center rounded-full"
      style={{
        backgroundColor: focused ? Colors.darkBlue : "transparent",
        marginTop: 30,
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
