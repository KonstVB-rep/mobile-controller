import {
	Text,
	PressableProps,
	Pressable,
	StyleSheet,
	Animated,
	GestureResponderEvent,
	ActivityIndicator,
	TextStyle,
} from 'react-native';
import React from 'react';
import { Radius, FontFamily, FontSize } from '@/constants/styles-system';
import { Colors } from 'react-native/Libraries/NewAppScreen';


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
				style={{
					...style.button,
					backgroundColor: color,
				}}
			>
				{!isLoading ? (
					<Text style={style.text}>{text}</Text>
				) : (
					<ActivityIndicator size="large" color={Colors.secondary} />
				)}
			</Animated.View>
		</Pressable>
	);
};

export default Button;

const style = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: Radius.r10,
		height: 50,
		paddingHorizontal: 20,
	},
	text: {
		color: Colors.secondary,
		fontFamily: FontFamily.Poppins,
		fontSize: FontSize.f18,
	} as TextStyle,
});
