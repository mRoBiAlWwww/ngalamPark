import { Button, Text, View, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Kendaraan = () => {
    const router = useRouter();

const [plateNumber, setPlateNumber] = useState("");
const [vehicleType, setVehicleType] = useState("");


const saveVehicleData = async () => {
    if (!plateNumber || !vehicleType) {
        Alert.alert("Error", "Harap isi semua field!");
        return;
    }
    try {
        const vehicleData = {
            plateNumber,
            vehicleType,
            timestamp: new Date().toISOString(),
        };
        await AsyncStorage.setItem("vehicleData", JSON.stringify(vehicleData));
        Alert.alert("Sukses", "Data kendaraan berhasil disimpan!");
    } catch (error: unknown) {
        if (error instanceof Error) {
            Alert.alert("Error", "Gagal menyimpan data: " + error.message);
        } else {
            Alert.alert("Error", "Gagal menyimpan data: " + String(error));
        }
    }
};


    return (
        <View className="flex items-center bg-white h-full">
            <Text className="font-maison text-3xl mt-36 mb-10 text-black">
                Daftar Kendaraan
            </Text>
            <View className="w-4/5 p-5 border-2 border-primary rounded-3xl">
                <View className="mb-5 flex">
                <Text className="text-2xl font-bold mb-4">Input Data Kendaraan</Text>
                
                <Text className="text-lg mb-2">Nomor Plat:</Text>
                <TextInput
                    className="border border-gray-300 p-2 mb-4 rounded"
                    value={plateNumber}
                    onChangeText={setPlateNumber}
                    placeholder="Masukkan nomor plat (contoh: B 1234 XYZ)"
                />

                <Text className="text-lg mb-2">Jenis Kendaraan:</Text>
                <TextInput
                    className="border border-gray-300 p-2 mb-4 rounded"
                    value={vehicleType}
                    onChangeText={setVehicleType}
                    placeholder="Masukkan jenis kendaraan (contoh: Mobil)"
                />

                <Button title="Simpan Data Kendaraan" onPress={saveVehicleData} />
                </View>
            </View>
        </View>
    );
};

export default Kendaraan;