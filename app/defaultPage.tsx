import { Image, Text, View } from "react-native";
import React from "react";
import { Button } from "@/components/Button";
import { useRouter } from "expo-router";
import Rafiki from "../assets/images/rafiki.svg";

const defaultPage: React.FC = () => {
    const router = useRouter();

    return (
        <View className="flex items-center bg-white h-full ">
            <Text className="font-bold text-3xl mt-48 text-black">
                NGALAMPARK
            </Text>
            <Text className="mt-5 w-4/5 text-center text-lg leading-5 text-black">
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
                <Button
                    title="Masuk"
                    onPress={() => router.push("/login")}
                    componentStyle="border-primary border-2 px-5 py-5 rounded-full font-bold flex justify-center items-center w-4/5 mx-auto mb-3 "
                    textStyle="text-primary font-custom"
                />
                <Button
                    title="Daftar akun"
                    onPress={() => router.push("/signupOption")}
                    componentStyle="bg-primary px-5 py-5 rounded-full font-bold flex justify-center items-center w-4/5 mx-auto"
                    textStyle="text-white font-custom"
                />
            </View>
        </View>
    );
};

export default defaultPage;
