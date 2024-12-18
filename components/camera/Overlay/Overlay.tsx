import { Canvas, DiffRect, rect, rrect } from '@shopify/react-native-skia';
import { Dimensions, Platform, StyleSheet } from 'react-native';

import { Colors, HEADER_HEIGHT } from '@/constants/styles-system';

const { width, height } = Dimensions.get('window');
const innerDimension = 300;
const innerDimensionButton = 118;

export const Overlay = ({ keyValue = 'inner' }: { keyValue: 'inner' | 'innerCircle' }) => {
	const outer = rrect(rect(-10, -10, width + 20, height), 0, 0);
	const inner = rrect(
		rect(
			width / 2 - innerDimension / 2,
			height / 2 - innerDimension / 2 - HEADER_HEIGHT,
			innerDimension,
			innerDimension,
		),
		20,
		20,
	);

	const innerCircle = rrect(
		rect(
			width / 2 - innerDimensionButton / 2,
			height / 2 - innerDimensionButton / 2 - HEADER_HEIGHT,
			innerDimensionButton,
			innerDimensionButton,
		),
		1000,
		1000,
	);

	const currentInnerRect = {
		inner,
		innerCircle,
	};
	const selectedInner = currentInnerRect[keyValue];

	if (!selectedInner) {
		console.warn(`Invalid keyValue: "${keyValue}"`);
		return null; // Возвращаем null, если выбранный прямоугольник отсутствует
	}

	return (
		<Canvas className={`${Platform.OS === 'android'} ? 'flex-1' : ${StyleSheet.absoluteFillObject}`}>
			<DiffRect
				inner={selectedInner}
				outer={outer}
				color={Colors.black}
				blendMode={'saturation'}
				opacity={0.7}
			/>

			<DiffRect
				inner={selectedInner}
				outer={outer}
				color={Colors.secondary}
				opacity={0.7}
				style={'stroke'}
				strokeWidth={3}
			/>
		</Canvas>
	);
};
