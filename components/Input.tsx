import React, { ReactNode } from "react";
import { TextInput, View, Text } from "react-native";

interface Input {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    placeholderTextColor?: string;
}

const Input: React.FC<Input> = ({
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    placeholderTextColor,
}) => {
    return (
        <View>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={placeholderTextColor}
            />
        </View>
    );
};

export default Input;
