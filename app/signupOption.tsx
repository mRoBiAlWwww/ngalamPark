import { View } from "react-native";
import React from "react";
import { router } from "expo-router";
import Button from "@/components/Button";

const signupOption: React.FC = () => {
    return (
        <View>
            <Button
                title="sebagai pengguna"
                onPress={() => router.push("/(auth)/signup?role=user")}
            />
            <Button
                title="sebagai petugas parkir"
                onPress={() => router.push("/(auth)/signup?role=officer")}
            />
        </View>
    );
};

export default signupOption;
