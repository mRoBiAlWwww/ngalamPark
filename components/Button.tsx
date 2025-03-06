import { View, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";

interface Props {
    onPress: () => void;
    title: string;
}

const Button: FC<Props> = ({ onPress, title }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;
