import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/styles-system";

const FormField = ({
  title,
  placeholder,
  handleChange,
  value,
  keyboardType,
  otherStyle,
  ...props
}: {
  title: string;
  placeholder: string;
  handleChange: (value: string) => void;
  otherStyle?: string;
  value: string;
  keyboardType?: KeyboardTypeOptions | undefined;
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <View className={`space-y-2 ${otherStyle}`}>
      <Text className="text-lg text-gray-100 font-pmediun">{title}</Text>
      <View className="relative h-16 rounded-xl bg-bla mt-2">
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={handleChange}
          {...props}
          className="h-full flex items-center justify-start px-4 text-base rounded-xl text-gray-100 font-pregular border-2 border-black-200 focus:border-yellow"
          keyboardType={keyboardType}
          placeholderTextColor={Colors.placeholder}
          secureTextEntry={title === "Пароль" && !showPassword}
        />

        {title === "Пароль" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-4 transform -translate-y-1/2"
          >
            <Text className="text-gray-100 font-pregular">
              {showPassword ? (
                <Ionicons name="eye-off" size={32} color={Colors.placeholder} />
              ) : (
                <Ionicons name="eye" size={32} color={Colors.placeholder} />
              )}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
