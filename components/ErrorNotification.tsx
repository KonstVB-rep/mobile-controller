import React, { useEffect } from 'react';
import { Text, Animated } from 'react-native';;

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
			className="absolute top-0 left-0 right-0 p-16 items-center bg-alert"
			style={{transform: [{ translateY: animatedValue }] }}
			onLayout={onEnter}
		>
			<Text className='font-pmedium text-white text-center font-base'>{error}</Text>
		</Animated.View>
	);
};

export default ErrorNotification;
