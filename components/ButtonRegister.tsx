import React, { FC } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
    onPress: () => void;
    title?: string;
    componentStyle?: string;
    textStyle?: string;
    colors?: readonly [string, string, ...string[]];
}

export const Button: FC<Props> = ({
    onPress,
    title,
    componentStyle,
    textStyle,
    colors,
}) => {
    return (
        <TouchableOpacity onPress={onPress} className={`${componentStyle} `}>
            {colors ? (
                <LinearGradient
                    colors={colors}
                    style={{ ...StyleSheet.absoluteFillObject }}
                ></LinearGradient>
            ) : null}
            <Text className={`${textStyle} z-50 font-work`}>{title}</Text>
        </TouchableOpacity>
    );
};
// const styles = StyleSheet.create({
//     gradient: {
//         paddingVertical: 12,
//         paddingHorizontal: 24,
//         borderRadius: 999,
//         alignItems: "center",
//         justifyContent: "center",
//     },
// });

export default Button;
