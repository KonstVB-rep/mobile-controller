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
    <View className="mt-12 h-20 w-20 gap-2 align-center justify-center">
      {children}
      <Text
        className={`text-center text-base text-psemibold ${focused ? "text-white" : "text-gray-100"}`}
        style={{ color }}
      >
        {name}
      </Text>
    </View>
  );
};

export default TabIcon;
