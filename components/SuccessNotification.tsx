import React, { useEffect } from 'react';
import { Text, StyleSheet, Animated, TextStyle } from 'react-native';
import { Colors, FontFamily, FontSize } from '../constants/styles-system';


export interface SuccessNotificationProps {
	successText: string | null;
}

const SuccessNotification = ({ successText }: SuccessNotificationProps) => {
	const [isShown, setIsShown] = React.useState<boolean>(false);
	const animatedValue = new Animated.Value(-65);

	console.log(successText, '==========================successText==========================');

	const onEnter = () => {
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true,
		}).start();

		const timer = setTimeout(() => {
			Animated.timing(animatedValue, {
				toValue: -65,
				duration: 300,
				useNativeDriver: true,
			}).start();
			clearTimeout(timer);
		}, 2000);
	};

	useEffect(() => {
		if (!successText) {
			setIsShown(false);
			return;
		}

		setIsShown(true);
		const timeout = setTimeout(() => {
			setIsShown(false);
		}, 2310);

		return () => clearTimeout(timeout);
	}, [successText]);

	if (!isShown) {
		return null;
	}

	return (
		<Animated.View
			style={{ ...style.success, transform: [{ translateY: animatedValue }] }}
			onLayout={onEnter}
		>
			<Text style={style.successText}>{successText}</Text>
		</Animated.View>
	);
};

export default SuccessNotification;

const style = StyleSheet.create({
	success: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
		height: 65,
		backgroundColor: Colors.success,
		zIndex: 10,
	},
	successText: {
		fontSize: FontSize.f16,
		color: Colors.white,
		textAlign: 'center',
		fontFamily: FontFamily.Poppins,
	} as TextStyle,
});
