import { useState } from "react";
import { View, Alert } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { FIREBASE_AUTH } from "../../lib/firebaseconfig";
import { router } from "expo-router";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function SendResetLink() {
    const [email, setEmail] = useState("");

    const handleSendResetEmail = async (): Promise<void> => {
        try {
            await sendPasswordResetEmail(FIREBASE_AUTH, email);
            Alert.alert("Sukses", "Link reset password telah dikirim.");
            router.replace("/(auth)/login");
        } catch (error: any) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View>
            <Input
                placeholder="Masukkan Email"
                value={email}
                onChangeText={setEmail}
            />
            <Button title="Kirim Link Reset" onPress={handleSendResetEmail} />
        </View>
    );
}
