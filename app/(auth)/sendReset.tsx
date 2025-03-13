import { useCallback, useState } from "react";
import { View, Alert, StatusBar, Text, TouchableOpacity } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { FIREBASE_AUTH } from "../../lib/firebaseconfig";
import { router, useFocusEffect } from "expo-router";
import ButtonRegister from "../../components/ButtonRegister";
import InputData from "../../components/InputRegister";
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import Entypo from "@expo/vector-icons/Entypo";

export default function SendResetLink() {
    const [email, setEmail] = useState("");

    const showToast = (message: string) => {
        Toast.show({
            type: "error",
            text1: message,
        });
    };

    const handleSendResetEmail = async (): Promise<void> => {
        try {
            await sendPasswordResetEmail(FIREBASE_AUTH, email);
            Alert.alert("Sukses", "Link reset password telah dikirim.");
            router.replace("/(auth)/login");
        } catch (err: any) {
            if (err.code === "auth/missing-email") {
                showToast("Masukkan email terlebih dahulu");
            }
        }
    };

    useFocusEffect(useCallback(() => {}, []));

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#F4FBF8" />
            <View className="bg-loginColor h-full px-12 flex gap-5">
                <View className="bg-loginColor flex-row mt-10 -ml-8">
                    <TouchableOpacity
                        className="mr-3"
                        onPress={() => router.back()}
                    >
                        <Entypo name="cross" size={35} color="black" />
                    </TouchableOpacity>
                    <Text className="font-workSemiBold mt-1 text-2xl">
                        Setel Ulang Kata Sandi
                    </Text>
                </View>
                <Text className="font-work leading-5 font-medium text-gray-500">
                    Masukkan alamat Email yang terdaftar dan pesan konfirmasi
                    akan dikirim melalui email kamu
                </Text>
                <InputData
                    placeholder="abc@gmail.com"
                    value={email}
                    onChangeText={setEmail}
                    className="flex-row border-2 border-gray-300 rounded-xl py-2 px-5 items-center"
                >
                    <Ionicons
                        name="mail-outline"
                        size={30}
                        color="rgb(202, 202, 202)"
                        className="pr-3"
                    />
                </InputData>
                <ButtonRegister
                    title="Kirim Link Reset"
                    onPress={handleSendResetEmail}
                    componentStyle="px-5 py-3 rounded-full font-bold flex justify-center items-center w-full mx-auto overflow-hidden"
                    textStyle="text-white text-lg font-custom"
                    colors={["#33D3F8", "#1B859D"]}
                />
            </View>
        </>
    );
}
