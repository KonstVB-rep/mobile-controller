import {
  View,
  Text,
  TouchableOpacity,
  ButtonProps,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";
import React from "react";

const CustomButton = ({
  title,
  containerStyles,
  textStyles,
  isLoading,
  ...props
}: TouchableOpacityProps & {
  title: string;
  textStyles?: string;
  containerStyles?: string;
  isLoading?: boolean;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`bg-secondary p-4 rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} `}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <Text className={`text-primary text-lg text-psemiboldc ${textStyles}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
