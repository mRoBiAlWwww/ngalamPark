import React from "react";
import { TextInput, View, Text } from "react-native";

interface TextInputFieldProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    label?: string;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    label,
}) => {
    return (
        <View>
            {label && <Text>{label}</Text>}
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

export default TextInputField;
