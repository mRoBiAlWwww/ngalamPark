import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import useDatabase from "../../../../hooks/useCreate";
import Ionicons from "@expo/vector-icons/Ionicons";
import InputRegister from "../../../../components/InputRegister";
import ButtonRegister from "../../../../components/ButtonRegister";
import { TouchableOpacity } from "react-native";

const Kendaraan = () => {
    const router = useRouter();
    const account = useSelector((state: RootState) => state.userAccount);
    const { saveData } = useDatabase();

    const [plateNumber, setPlateNumber] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [stnk, setStnk] = useState("");

    const showToast = (message: string) => {
        Toast.show({
            type: "error",
            text1: message,
        });
    };

    const saveVehicleData = async () => {
        if (!plateNumber || !vehicleType) {
            showToast("Error, Harap isi semua field!");
            return;
        }
        try {
            const vehicleData = {
                plateNumber,
                vehicleType,
                timestamp: new Date().toISOString(),
            };
            await AsyncStorage.setItem(
                "vehicleData",
                JSON.stringify(vehicleData)
            );

            const userData: Record<string, any> = {
                plateNumber,
                vehicleType,
                timestamp: new Date().toISOString(),
            };
            await saveData("vehicle/" + account.id, userData);

            router.back();
            showToast("Sukses, Data kendaraan berhasil disimpan!");
        } catch (error: unknown) {
            if (error instanceof Error) {
                showToast("Error, Gagal menyimpan data: " + error.message);
            } else {
                showToast("Error, Gagal menyimpan data: " + String(error));
            }
        }
    };

    return (
        <View className="flex items-center bg-defaultBackground h-full">
            <View className="flex-row mt-28 mb-20 gap-5 w-full px-10">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons
                        name="arrow-back-circle-outline"
                        size={35}
                        color="black"
                    />
                </TouchableOpacity>
                <Text className="font-maison text-3xl mt-1 text-black">
                    Kendaraan Anda
                </Text>
            </View>
            <View className="w-4/5 p-5 border-2 border-primary bg-white rounded-3xl">
                <View className="flex py-5 gap-5">
                    <InputRegister
                        placeholder="Plat No. Kendaraan"
                        value={plateNumber}
                        onChangeText={setPlateNumber}
                    />
                    <InputRegister
                        placeholder="Brand"
                        value={vehicleType}
                        onChangeText={setVehicleType}
                    />
                    <InputRegister
                        placeholder="Nomor STNK"
                        value={stnk}
                        onChangeText={setStnk}
                    />

                    <ButtonRegister
                        title="Simpan"
                        onPress={saveVehicleData}
                        componentStyle="px-5 py-3 rounded-full font-bold flex justify-center items-center w-full mx-auto overflow-hidden "
                        textStyle="text-white text-lg font-custom"
                        colors={["#33D3F8", "#1B859D"]}
                    />
                </View>
            </View>
        </View>
    );
};

export default Kendaraan;
