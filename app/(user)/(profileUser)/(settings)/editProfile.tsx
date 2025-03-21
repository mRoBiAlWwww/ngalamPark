import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import InputRegister from "../../../../components/InputRegister";
import ButtonRegister from "../../../../components/ButtonRegister";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { getDatabase, ref, update } from "firebase/database";
import Toast from "react-native-toast-message";

const showToast = (message: string) => {
    Toast.show({
        type: "error",
        text1: message,
    });
};

const editProfile = () => {
    const [name, setName] = useState<string>("");
    const [callNumber, setCallNumber] = useState<string>("");
    const db = getDatabase();
    const isValidCallNumber = (callNumber: string) =>
        /^\d{12,13}$/.test(callNumber);
    const account = useSelector((state: RootState) => state.userAccount);

    const updateDetailAccount = () => {
        if (!isValidCallNumber(callNumber)) {
            return showToast("Nomor wajib 12 atau 13 digit");
        }
        update(ref(db, "users/" + account.id), {
            name,
            callNumber,
        });
        showToast("Sukses, Profile berhasil diupdate!");
        router.back();
    };

    return (
        <View className="flex items-center bg-defaultBackground h-full">
            <View className="flex-row mt-28 mb-20 gap-5 px-10 -left-5 relative">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="self-start relative -left-14"
                >
                    <Ionicons
                        name="arrow-back-circle-outline"
                        size={35}
                        color="#01aed6"
                    />
                </TouchableOpacity>
                <Text className="font-maison text-3xl mt-1 text-black">
                    Edit Profile
                </Text>
            </View>
            <View className="w-4/5 p-5 border-2 border-primary bg-white rounded-3xl">
                <View className="flex py-5 gap-5">
                    <InputRegister
                        placeholder="Nama Lengkap"
                        value={name}
                        onChangeText={setName}
                    />
                    <InputRegister
                        placeholder="Nomor Handphone"
                        value={callNumber}
                        onChangeText={setCallNumber}
                    />

                    <ButtonRegister
                        title="Simpan"
                        onPress={updateDetailAccount}
                        componentStyle="px-5 py-3 rounded-full font-bold flex justify-center items-center w-full mx-auto overflow-hidden "
                        textStyle="text-white text-lg font-custom"
                        colors={["#33D3F8", "#1B859D"]}
                    />
                </View>
            </View>
        </View>
    );
};

export default editProfile;
