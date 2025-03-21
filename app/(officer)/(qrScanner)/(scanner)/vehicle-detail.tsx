import React, { useEffect, useState } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
    get,
    getDatabase,
    onValue,
    push,
    ref,
    set,
    update,
} from "firebase/database";
import { FIREBASE_APP } from "@/lib/firebaseconfig";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

interface VehicleData {
    plateNumber: string;
    vehicleType: string;
    timestamp: string;
    accountId: string;
    paymentStatus: string;
    nameLocation: string;
    officerId: string;
}

const VehicleDetail = () => {
    const { qrData } = useLocalSearchParams<{ qrData: string }>();
    const now = new Date();
    const router = useRouter();
    const db = getDatabase(FIREBASE_APP);
    const officer = useSelector((state: RootState) => state.officerAccount);
    const parseQRData = (data: string): VehicleData => {
        const parts = data.split(", ");

        const vehicleData: Partial<VehicleData> = {};
        parts.forEach((part) => {
            const [key, value] = part.split(": ");
            if (key.includes("Nomor Plat") && value)
                vehicleData.plateNumber = value;
            if (key.includes("Jenis Kendaraan") && value)
                vehicleData.vehicleType = value;
            if (key.includes("Waktu")) vehicleData.timestamp = value;
            if (key.includes("Account ID") && value) {
                vehicleData.accountId = value;
            }
            vehicleData.nameLocation = officer.nameLocation;
            vehicleData.officerId = officer.id;
        });
        return vehicleData as VehicleData;
    };
    const vehicleData = parseQRData(qrData);

    console.log(vehicleData.accountId);
    console.log(vehicleData.nameLocation);
    console.log(vehicleData.officerId);
    console.log(vehicleData.paymentStatus);
    console.log(vehicleData.plateNumber);
    console.log(vehicleData.timestamp);
    console.log(vehicleData.vehicleType);

    const handlePayment = async () => {
        try {
            const snapshot = await get(
                ref(
                    db,
                    "officerPayment/" +
                        officer.nameLocation +
                        "/" +
                        vehicleData.accountId
                )
            );
            const currentStatus = snapshot.val()?.paymentStatus || "outsite";
            const newStatus = currentStatus === "insite" ? "outsite" : "insite";

            const paymentData = {
                paymentStatus: newStatus,
                plateNumber: vehicleData.plateNumber,
                vehicleType: vehicleData.vehicleType,
                timestamp: new Date().toISOString(),
                accountId: vehicleData.accountId,
                officerId: vehicleData.officerId,
            };

            if (officer.id) {
                await update(
                    ref(
                        db,
                        "officerPayment/" +
                            officer.nameLocation +
                            "/" +
                            vehicleData.accountId
                    ),
                    paymentData
                );

                Alert.alert(
                    "Sukses",
                    "Pembayaran berhasil",
                    [
                        {
                            text: "OK",
                            onPress: () => router.back(),
                        },
                    ],
                    { cancelable: false }
                );
            }
        } catch (error: any) {
            console.log(error.message);
            Alert.alert("Error", "Gagal memproses pembayaran");
        }
    };

    useEffect(() => {
        if (vehicleData.plateNumber) {
            const vehicleRef = ref(
                db,
                "officerPayment/" +
                    officer.nameLocation +
                    +"/" +
                    vehicleData.accountId
            );

            const unsubscribe = onValue(vehicleRef, (snapshot) => {
                (async () => {
                    const data = snapshot.val();
                    if (data?.paymentStatus === "insite") {
                        Alert.alert(
                            "Pembayaran Berhasil",
                            `Pembayaran berhasil sebesar Rp2000 dan menambah poin 2`,
                            [{ text: "OK" }]
                        );

                        const getSaldo = await get(
                            ref(
                                db,
                                "users/" + vehicleData.accountId + "/saldo/ovo"
                            )
                        );
                        const getSaldoCoin = await get(
                            ref(
                                db,
                                "users/" + vehicleData.accountId + "/saldo/coin"
                            )
                        );

                        await update(
                            ref(
                                db,
                                "users/" + vehicleData.accountId + "/saldo"
                            ),
                            {
                                ovo: getSaldo.val() - 2100,
                                coin: getSaldoCoin.val() + 2,
                            }
                        );

                        await set(
                            push(
                                ref(
                                    db,
                                    "payment/" +
                                        vehicleData.accountId +
                                        "/" +
                                        now.getFullYear() +
                                        "/" +
                                        (now.getMonth() + 1)
                                            .toString()
                                            .padStart(2, "0")
                                )
                            ),
                            {
                                plateNumber: vehicleData.plateNumber,
                                vehicleType: vehicleData.vehicleType,
                                officerId: vehicleData.officerId,
                                status: vehicleData.paymentStatus,
                                timestamp: vehicleData.timestamp,
                                accountId: vehicleData.accountId,
                                nameLocation: vehicleData.nameLocation,
                            }
                        );
                    }
                })();
            });

            return () => unsubscribe();
        }
    }, [vehicleData]);

    if (!vehicleData) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>Data kendaraan tidak valid</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-defaultBackground p-5">
            <Stack.Screen options={{ title: "Detail Kendaraan" }} />
            <View className="mt-10 p-5 bg-white rounded-2xl shadow-md">
                <Text className="text-2xl font-bold mb-5">
                    Detail Kendaraan
                </Text>
                <View className="mb-4">
                    <Text className="text-lg">
                        Nomor Plat: {vehicleData.plateNumber}
                    </Text>
                    <Text className="text-lg">
                        Jenis: {vehicleData.vehicleType}
                    </Text>
                    <Text className="text-lg">
                        Waktu: {vehicleData.timestamp}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={handlePayment}
                    className="bg-primary py-3 px-5 rounded-full mt-5"
                >
                    <Text className="text-white text-center text-lg font-bold">
                        Konfirmasi Pembayaran (Rp 2000)
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default VehicleDetail;
