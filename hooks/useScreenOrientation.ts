import React from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Platform } from 'react-native';

export const useScreenOrientation = () => {
	const [orientation, setOrientation] = React.useState<ScreenOrientation.Orientation>();
	React.useEffect(() => {
		ScreenOrientation.getOrientationAsync().then((orientation) => setOrientation(orientation));
		if (Platform.OS === 'web') {
			return;
		}
		const subscription = ScreenOrientation.addOrientationChangeListener((e) =>
			setOrientation(e.orientationInfo.orientation),
		);

		return () => ScreenOrientation.removeOrientationChangeListener(subscription);
	}, []);
	return orientation;
};
