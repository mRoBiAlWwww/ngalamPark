import { Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import Button from "@/components/Button";
import ForgotRafiki from "../assets/images/Forgot password-rafiki.svg";

const signupOption: React.FC = () => {
    return (
        <View className="flex items-center ">
            <Text className="font-bold text-3xl mt-48 text-black">
                Daftar Akun
            </Text>
            <Text className="mt-5 w-4/5 text-center text-lg leading-5 text-black">
                Pilih Peran Anda dan Buat Akun Baru
            </Text>
            <View className="-mt-3">
                <ForgotRafiki
                    width={300}
                    height={300}
                    style={{ margin: 0, padding: 0 }}
                />
            </View>
            <Button
                title="sebagai pengguna"
                onPress={() => router.push("/signup?role=user")}
                componentStyle="border-primary border-2 px-5 py-5 rounded-full font-bold flex justify-center items-center w-4/5 mx-auto mb-3 "
                textStyle="text-primary font-custom"
            />
            <Button
                title="sebagai petugas parkir"
                onPress={() => router.push("/signup?role=officer")}
                componentStyle="bg-primary px-5 py-5 rounded-full font-bold flex justify-center items-center w-4/5 mx-auto"
                textStyle="text-white font-custom"
            />
        </View>
    );
};

export default signupOption;
