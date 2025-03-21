import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import Toast from "react-native-toast-message";
import { getDatabase, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FIREBASE_APP } from "@/lib/firebaseconfig";

const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, " ", 0, "del"];

const PIN = () => {
    const router = useRouter();
    const [PIN, setPIN] = useState<number[]>([]);
    const [PIN2, setPIN2] = useState<number[]>([]);
    const [confirm, setIsConfirm] = useState<boolean>(false);
    const account = useSelector((state: RootState) => state.userAccount);
    const db = getDatabase(FIREBASE_APP);

    const showToast = (message: string) => {
        Toast.show({
            type: "error",
            text1: message,
        });
    };

    const configurePIN = (number: number | string) => {
        if (number === "del") {
            setPIN((prev) => prev.slice(0, prev.length - 1));
        } else if (typeof number === "number") {
            setPIN((prev) => [...prev, number]);
        }
    };

    const addPIN = async (PIN: number[]) => {
        try {
            await set(ref(db, "users/" + account.id + "/PIN"), PIN);
            showToast("PIN berhasil diubah/didaftarkan.");
        } catch (error: any) {
            showToast(error.message);
        }
    };

    useEffect(() => {
        if (PIN.length === 5) {
            setTimeout(() => {
                if (PIN2.length === 0) {
                    setPIN2(PIN.slice());
                    setIsConfirm(true);
                    setPIN([]);
                } else {
                    const isEqual =
                        PIN.length === PIN2.length &&
                        PIN.every((value, index) => value === PIN2[index]);

                    if (isEqual) {
                        addPIN(PIN);
                        router.back();
                    } else {
                        showToast("PIN tidak sama, silakan ulangi.");
                        setIsConfirm(false);
                        setPIN([]);
                        setPIN2([]);
                    }
                }
            }, 0);
        }
    }, [PIN]);

    return (
        <View className="flex items-center bg-defaultBackground h-full pb-20">
            {/* Header */}
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
                    {account.PIN === "" ? "Buat PIN" : "Ubah PIN"}
                </Text>
            </View>

            {/* PIN Display */}
            <View className="items-center gap-10">
                <Text className="font-workSemiBold">
                    {confirm
                        ? account.PIN === ""
                            ? "Konfirmasi PIN Anda"
                            : "Masukkan PIN baru anda"
                        : account.PIN === ""
                        ? " Daftarkan PIN Anda"
                        : "Masukkan PIN anda sekarang"}
                </Text>
                <View className="flex-row gap-10 align-bottom">
                    {[...Array(5).keys()].map((_, index) => {
                        const isSelected = !!PIN[index];

                        return (
                            <MotiView
                                key={index}
                                className={`w-6 h-6 rounded-full ${
                                    isSelected
                                        ? "bg-primary opacity-100"
                                        : "bg-gray-400 opacity-30"
                                }`}
                                style={{
                                    opacity: isSelected ? 1 : 0.3,
                                }}
                            />
                        );
                    })}
                </View>
            </View>

            {/* Dial Pad */}
            <View className="mt-auto pb-10">
                <FlatList
                    numColumns={3}
                    data={dialPad}
                    style={{ flexGrow: 0 }}
                    scrollEnabled={false}
                    keyExtractor={(_, index) => index.toString()} // ✅ Fix keyExtractor
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => configurePIN(item)}
                            disabled={
                                item !== "del" &&
                                PIN.length === 5 &&
                                PIN2.length === 5
                            }
                        >
                            <View className="w-36 h-24 justify-end items-center">
                                <Text className="font-maison text-3xl">
                                    {item}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
};

export default PIN;
