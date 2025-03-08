import React, { ReactNode } from "react";
import { TextInput, View, Text } from "react-native";

interface Input {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    placeholderTextColor?: string;
    children?: ReactNode;
}

const Input: React.FC<Input> = ({
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    placeholderTextColor,
    children,
}) => {
    return (
        <View className="flex flex-row justify-between">
            <TextInput
                style={{ flex: 1 }}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={placeholderTextColor}
            />
            {children}
        </View>
    );
};

export default Input;
