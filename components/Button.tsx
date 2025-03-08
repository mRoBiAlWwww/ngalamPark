import React, { FC } from "react";
import { TouchableOpacity, Text } from "react-native";

interface Props {
    onPress: () => void;
    title: string;
    componentStyle?: string;
    textStyle?: string;
}

export const Button: FC<Props> = ({
    onPress,
    title,
    componentStyle,
    textStyle,
}) => {
    return (
        <TouchableOpacity onPress={onPress} className={`${componentStyle} `}>
            <Text className={`${textStyle} `}>{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;
