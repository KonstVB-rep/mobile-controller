import React, { useEffect } from 'react';
import { Text, Animated } from 'react-native';

export interface SuccessNotificationProps {
	successText: string | null;
}

const SuccessNotification = ({ successText }: SuccessNotificationProps) => {
	const [isShown, setIsShown] = React.useState<boolean>(false);
	const animatedValue = new Animated.Value(-65);


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
			style={{ transform: [{ translateY: animatedValue }] }}
			className="absolute top-0 left-0 right-0 flex-row items-center justify-center p-4 h-[65] bg-success z-10"
			onLayout={onEnter}
		>
			<Text className="text-white text-base font-pmedium text-center">{successText}</Text>
		</Animated.View>
	);
};

export default SuccessNotification;

