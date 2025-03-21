import { StatusBar, Text, View } from "react-native";
import React from "react";
import ButtonRegister from "../../components/ButtonRegister";
import { useRouter } from "expo-router";
import Rafiki from "../../assets/images/rafiki.svg";

const defaultPage: React.FC = () => {
    const router = useRouter();

    return (
        <View className="flex items-center bg-defaultBackground h-full ">
            <StatusBar barStyle="dark-content" backgroundColor="#F2F1F9" />
            <Text className="font-maison text-3xl mt-48 text-black">
                NGALAMPARK
            </Text>
            <Text className="font-work mt-5 w-4/5 text-center text-lg leading-5 text-black">
                Selamat datang di aplikasi Ngalampark. Aplikasi yang bisa
                membantu anda dalam mengatasi pembayaran parkir liar!
            </Text>
            <View className="-mt-3">
                <Rafiki
                    width={300}
                    height={300}
                    style={{ margin: 0, padding: 0 }}
                />
            </View>
            <View className="w-full -mt-5">
                <ButtonRegister
                    title="Masuk"
                    onPress={() => router.push("/(auth)/login")}
                    componentStyle="border-primary border-2 px-5 py-5 rounded-full font-bold flex justify-center items-center w-4/5 mx-auto mb-3 overflow-hidden"
                    textStyle="text-primary"
                />
                <ButtonRegister
                    title="Daftar akun"
                    onPress={() => router.push("/(auth)/signupOption")}
                    componentStyle="px-5 py-5 rounded-full font-bold flex justify-center items-center w-4/5 mx-auto overflow-hidden"
                    textStyle="text-white"
                    colors={["#33D3F8", "#1B859D"]}
                />
            </View>
        </View>
    );
};

export default defaultPage;
