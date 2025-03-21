import React, { useState } from "react";
import { View, Text, StatusBar } from "react-native";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

interface VehicleData {
    nameLocation: string;
    plateNumber: string;
    vehicleType: string;
    timestamp: string;
    points?: number;
    paymentStatus?: string;
    accountId: string;
}

const qrPage = () => {
    const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);

    useFocusEffect(
        React.useCallback(() => {
            const fetchVehicleData = async () => {
                try {
                    const storedData = await AsyncStorage.getItem(
                        "vehicleData"
                    );
                    if (storedData) {
                        setVehicleData(JSON.parse(storedData));
                    }
                } catch (error) {
                    console.error("Gagal mengambil data:", error);
                }
            };
            fetchVehicleData();
        }, [])
    );

    const qrValue = vehicleData
        ? `Nomor Plat: ${vehicleData.plateNumber}, Jenis Kendaraan: ${vehicleData.vehicleType}, Waktu: ${vehicleData.timestamp}, Account ID: ${vehicleData.accountId},`
        : "Belum ada data kendaraan";
    return (
        <View className="flex items-center bg-defaultBackground h-full">
            <StatusBar barStyle="dark-content" backgroundColor="#01aed6" />
            <View className="p-10 mt-32">
                <Text className="font-workSemiBold text-black text-3xl">
                    Rasya Fariz
                </Text>
                <Text className="font-work text-black text-justify mt-1">
                    Ini adalah QRCode kamu. Kamu bisa melakukan pembayaran
                    dengan cara menunjukkan QRCode ini ke petugas parkir.
                </Text>
            </View>
            <View className="flex-1 justify-center items-center mt-20">
                <View className="border-4 border-gray-300 rounded-2xl p-4 z-10 bg-white shadow-xl">
                    <QRCode
                        value={qrValue}
                        size={300}
                        color="black"
                        backgroundColor="transparent"
                    />
                </View>
            </View>
            <View className="flex-1 justify-end w-full">
                <View className="bg-primary rounded-t-full h-96"></View>
            </View>
        </View>
    );
};

export default qrPage;
