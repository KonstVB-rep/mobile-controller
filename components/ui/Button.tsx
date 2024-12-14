import {
  Text,
  PressableProps,
  Pressable,
  Animated,
  GestureResponderEvent,
  ActivityIndicator,
} from "react-native";
import React from "react";
import {

  Colors,
} from "@/constants/styles-system";

const Button = ({
  text,
  isLoading,
  ...props
}: PressableProps & { text: string; isLoading?: boolean }) => {
  const animatedValue = new Animated.Value(100);

  const color = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [Colors.btnHoverColor, Colors.btnColor],
  });

  const fadeIn = (event: GestureResponderEvent) => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
    props.onPressIn?.(event);
  };

  const fadeOut = (event: GestureResponderEvent) => {
    Animated.timing(animatedValue, {
      toValue: 100,
      duration: 100,
      useNativeDriver: false,
    }).start();
    props.onPressOut?.(event);
  };

  return (
    <Pressable {...props} onPressIn={fadeIn} onPressOut={fadeOut}>
      <Animated.View
      className={`items-center justify-center rounded-lg h-12 px-5 bg-[${color}]`}
        // style={{
        //   ...style.button,
        //   backgroundColor: color,
        // }}
      >
        {!isLoading ? (
          <Text className="text-white font-pmedium text-lg ">{text}</Text>
        ) : (
          <ActivityIndicator size="large" className="text-white" />
        )}
      </Animated.View>
    </Pressable>
  );
};

export default Button;
