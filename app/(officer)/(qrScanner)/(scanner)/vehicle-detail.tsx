import React from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { getDatabase, ref, update } from "firebase/database";
import { FIREBASE_APP } from "@/lib/firebaseconfig";

interface VehicleData {
  plateNumber: string;
  vehicleType: string;
  timestamp: string;
}

const VehicleDetail = () => {
  const { qrData } = useLocalSearchParams<{ qrData: string }>();
  const router = useRouter();
  const db = getDatabase(FIREBASE_APP);

  const parseQRData = (data: string): VehicleData | null => {
    try {
      const parts = data.split(", ");
      const vehicleData: Partial<VehicleData> = {};
      parts.forEach((part) => {
        const [key, value] = part.split(": ");
        if (key.includes("Nomor Plat")) vehicleData.plateNumber = value;
        if (key.includes("Jenis Kendaraan")) vehicleData.vehicleType = value;
        if (key.includes("Waktu")) vehicleData.timestamp = value;
      });
      return vehicleData as VehicleData;
    } catch (error) {
      return null;
    }
  };

  const vehicleData: VehicleData | null = qrData ? parseQRData(qrData) : null;

  const handlePayment = async () => {
    try {
      const paymentData = {
        paymentStatus: "completed",
        paymentAmount: 2000,
        paymentTimestamp: new Date().toISOString(),
        pointsEarned: 1,
      };

      if (vehicleData?.plateNumber) {
        await update(ref(db, "vehicle/" + vehicleData.plateNumber), paymentData);

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
    } catch (error) {
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
        <Text className="text-2xl font-bold mb-5">Detail Kendaraan</Text>
        <View className="mb-4">
          <Text className="text-lg">Nomor Plat: {vehicleData.plateNumber}</Text>
          <Text className="text-lg">Jenis: {vehicleData.vehicleType}</Text>
          <Text className="text-lg">Waktu: {vehicleData.timestamp}</Text>
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