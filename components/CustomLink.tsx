import { StyleSheet, Text, TextStyle } from 'react-native';
import React from 'react';
import { FontSize, FontFamily, Gaps, Colors } from '../constants/styles-system';
import { Link, LinkProps } from 'expo-router';

const CustomLink = ({
	text,
	textColor = Colors.linkColor,
	...props
}: LinkProps & { text?: string; textColor?: string }) => {
	return (
		<Link style={style.link} {...props}>
			{props.children || null}
			{text && <Text style={{ ...style.text, color: textColor }}>{text}</Text>}
		</Link>
	);
};

export default CustomLink;

const style = StyleSheet.create({
	link: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: Gaps.g10,
	} as TextStyle,
	text: {
		fontFamily: FontFamily.PoppinsSemiBold,
		fontSize: FontSize.f20,
	},
});
