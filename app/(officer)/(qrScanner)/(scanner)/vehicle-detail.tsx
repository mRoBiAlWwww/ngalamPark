import React from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { get, getDatabase, push, ref, set, update } from "firebase/database";
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
    const router = useRouter();
    const db = getDatabase(FIREBASE_APP);
    const officer = useSelector((state: RootState) => state.officerAccount);
    const parseQRData = (data: string): VehicleData => {
        const parts = data.split(",");

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

    const handlePayment = async () => {
        try {
            const paymentRef = ref(
                db,
                `officerPayment/${officer.nameLocation}/${vehicleData.accountId}`
            );
            const snapshot = await get(paymentRef);
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

            await set(paymentRef, paymentData);

            const saldoRef = ref(db, `users/${vehicleData.accountId}/saldo`);
            const slotRef = ref(db, `parkLocation/${officer.nameLocation}`);

            const getSlot = await get(slotRef);
            const currentSlot = getSlot.val()?.slot || 0;

            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, "0");
            const paymentMonthRef = ref(
                db,
                `payment/${vehicleData.accountId}/${year}/${month}`
            );
            await set(push(paymentMonthRef), paymentData);

            if (newStatus === "insite") {
                const getSaldo = await get(
                    ref(db, `users/${vehicleData.accountId}/saldo/ovo`)
                );
                const getSaldoCoin = await get(
                    ref(db, `users/${vehicleData.accountId}/saldo/coin`)
                );

                await update(saldoRef, {
                    ovo: (getSaldo.val() || 0) - 4000,
                    coin: (getSaldoCoin.val() || 0) + 2,
                });

                await update(slotRef, {
                    slot: Math.max(currentSlot - 1, 0),
                });
                Alert.alert(
                    "Sukses",
                    "Pembayaran berhasil",
                    [{ text: "OK", onPress: () => router.back() }],
                    { cancelable: false }
                );
            } else {
                await update(slotRef, {
                    slot: currentSlot + 1,
                });
                Alert.alert(
                    "Terimakasih",
                    "Semoga perjalananmu selamat dan menyenangkan",
                    [{ text: "OK", onPress: () => router.back() }],
                    { cancelable: false }
                );
            }
        } catch (error: any) {
            console.log(error.message);
            Alert.alert("Error", "Gagal memproses pembayaran");
        }
    };

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
