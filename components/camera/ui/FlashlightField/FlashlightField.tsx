import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Radius } from '@/constants/styles-system';
import { useCameraPermissions } from 'expo-camera';

const FlashlightField = ({
	isOnFlashlight,
	handlePressFlashlight,
}: {
	isOnFlashlight: boolean;
	handlePressFlashlight: () => void;
}) => {
	const [permission] = useCameraPermissions();

	if (!permission || !permission.granted) return null;
	return (
		<View style={styles.flashlightField}>
			<Pressable onPress={handlePressFlashlight}>
				{!isOnFlashlight ? (
					<MaterialCommunityIcons name="flashlight" size={40} style={styles.flashlightIconOn} />
				) : (
					<MaterialCommunityIcons
						name="flashlight-off"
						size={40}
						style={styles.flashlightIconOff}
					/>
				)}
			</Pressable>
		</View>
	);
};

export default FlashlightField;

const styles = StyleSheet.create({
	flashlightField: {
		position: 'absolute',
		display: 'flex',
		bottom: 0,
		right: 0,
		left: 0,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.primaryLight,
		padding: 10,
	},
	flashlightIconOff: {
		position: 'relative',
		bottom: 20,
		color: Colors.linkColor,
		backgroundColor: Colors.primaryLighter,
		borderRadius: Radius.rFull,
		padding: 10,
		width: 80,
		height: 80,
		display: 'flex',
		alignContent: 'center',
		justifyContent: 'center',
		borderColor: Colors.primaryLight,
		borderWidth: 10,
		borderStyle: 'solid',
	},
	flashlightIconOn: {
		position: 'relative',
		bottom: 20,
		color: Colors.white,
		backgroundColor: Colors.primary,
		borderRadius: Radius.rFull,
		padding: 10,
		width: 80,
		height: 80,
		display: 'flex',
		alignContent: 'center',
		justifyContent: 'center',
		borderColor: Colors.primaryLight,
		borderWidth: 10,
		borderStyle: 'solid',
	},
});
