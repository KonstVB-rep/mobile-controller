import React, { useEffect } from 'react';
import { Text, StyleSheet, Animated, TextStyle } from 'react-native';;
import { Colors, FontFamily, FontSize } from '../constants/styles-system';

export interface ErrorNotificationProps {
	error: string | null;
}

const ErrorNotification = ({ error }: ErrorNotificationProps) => {
	const [isShown, setIsShown] = React.useState<boolean>(false);
	const animatedValue = new Animated.Value(-100);

	const onEnter = () => {
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start();

		const timer = setTimeout(() => {
			Animated.timing(animatedValue, {
				toValue: -100,
				duration: 300,
				useNativeDriver: true,
			}).start();
			clearTimeout(timer);
		}, 3000);
	};

	useEffect(() => {
		if (!error) {
			return;
		}

		setIsShown(true);
		const timeout = setTimeout(() => {
			setIsShown(false);
		}, 3300);

		return () => clearTimeout(timeout);
	}, [error]);

	if (!isShown) {
		return null;
	}

	return (
		<Animated.View
			style={{ ...style.error, transform: [{ translateY: animatedValue }] }}
			onLayout={onEnter}
		>
			<Text style={style.errorText}>{error}</Text>
		</Animated.View>
	);
};

export default ErrorNotification;

const style = StyleSheet.create({
	error: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		alignItems: 'center',
		padding: 15,
		backgroundColor: Colors.alert,
	},
	errorText: {
		fontSize: FontSize.f16,
		color: Colors.white,
		textAlign: 'center',
		fontFamily: FontFamily.Poppins,
	} as TextStyle,
});
