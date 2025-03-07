import { View } from "react-native";
import React from "react";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

const defaultPage: React.FC = () => {
    const router = useRouter();

    return (
        <View>
            <Button
                title="Masuk sini"
                onPress={() => router.push("/(auth)/login")}
            />
            <Button
                title="Daftar akun"
                onPress={() => router.push("/signupOption")}
            />
        </View>
    );
};

export default defaultPage;
