import React, { ReactNode } from "react";
import { View } from "react-native";
import { TextInput } from "react-native";

interface InputDataProps {
    placeholder?: string;
    secure?: boolean;
    value: string;
    onChangeText: (text: string) => void;
    children: ReactNode;
    className?: string;
}

const InputData: React.FC<InputDataProps> = ({
    placeholder,
    secure = false,
    value,
    onChangeText,
    children,
    className = "flex-row border-2 border-gray-300 rounded-xl py-2 px-5 items-center ",
}) => {
    const childArray = React.Children.toArray(children);
    return (
        <View className={className}>
            <View className="flex-row items-center" style={{ flex: 1 }}>
                {childArray[0]}
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    placeholderTextColor="rgb(202, 202, 202)"
                    secureTextEntry={secure}
                    style={{ fontFamily: "WorkSans" }}
                />
            </View>
            {childArray[1]}
        </View>
    );
};
export default InputData;
