import { Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import ButtonRegister from "../../components/ButtonRegister";
import ForgotRafiki from "../../assets/images/Forgot password-rafiki.svg";

const signupOption: React.FC = () => {
    return (
        <View className="flex items-center bg-defaultBackground h-full ">
            <Text className="font-maison text-3xl mt-48 text-black">
                Daftar Akun
            </Text>
            <Text className="font-work mt-5 w-4/5 text-center text-lg leading-5 text-black">
                Pilih Peran Anda dan Buat Akun Baru
            </Text>
            <View className="-mt-3">
                <ForgotRafiki
                    width={300}
                    height={300}
                    style={{ margin: 0, padding: 0 }}
                />
            </View>
            <ButtonRegister
                title="sebagai pengguna"
                onPress={() => router.push("/(auth)/signup?role=user")}
                componentStyle="border-primary border-2 px-5 py-5 rounded-full font-bold flex justify-center items-center w-4/5 mx-auto mb-3 overflow-hidden"
                textStyle="text-primary"
            />
            <ButtonRegister
                title="sebagai petugas parkir"
                onPress={() => router.push("/(auth)/signup?role=officer")}
                componentStyle="bg-primary px-5 py-5 rounded-full font-bold flex justify-center items-center w-4/5 mx-auto overflow-hidden"
                textStyle="text-white"
                colors={["#33D3F8", "#1B859D"]}
            />
        </View>
    );
};

export default signupOption;
