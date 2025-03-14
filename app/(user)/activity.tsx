import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import Wallet from "../../assets/images/Wallet.svg";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { StatusBar } from "react-native";

const activity: React.FC = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#ffff" />
            <ScrollView
                className="bg-white"
                contentContainerStyle={{ paddingBottom: 75 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="mt-28 mb-10 mx-auto w-4/5">
                    <Text className="font-workSemiBold text-3xl mx-auto">
                        Aktivitas Pembayaran
                    </Text>
                    <Text className="font-work text-center">
                        Berikur daftar aktivitas pembayaranmu. Semua aktivitas
                        pembayaranmu bisa kamu lihat di sini.
                    </Text>
                </View>
                <View className="w-4/5 mx-auto">
                    {/* pake flatlist */}
                    <View className="border-b-2 border-gray-300 px-5 my-3">
                        <Text className="font-work">01/01/2024 - 07.00</Text>
                        <View className="flex-row justify-between pb-3 pt-2 items-center">
                            <Wallet />
                            <View>
                                <Text className="font-workSemiBold">
                                    Pembayaran non tunai
                                </Text>
                                <Text className="font-work">Rp 2.000</Text>
                            </View>
                            <View className="items-center">
                                <Text className="font-work">QRIS</Text>
                                <FontAwesome5
                                    name="money-bill-wave"
                                    size={15}
                                    color="black"
                                />
                            </View>
                        </View>
                    </View>
                    <View className="border-b-2 border-gray-300 px-5 my-3">
                        <Text className="font-work">01/01/2024 - 07.00</Text>
                        <View className="flex-row justify-between pb-3 pt-2 items-center">
                            <Wallet />
                            <View>
                                <Text className="font-workSemiBold">
                                    Pembayaran non tunai
                                </Text>
                                <Text className="font-work">Rp 2.000</Text>
                            </View>
                            <View className="items-center">
                                <Text className="font-work">QRIS</Text>
                                <FontAwesome5
                                    name="money-bill-wave"
                                    size={15}
                                    color="black"
                                />
                            </View>
                        </View>
                    </View>
                    <View className="border-b-2 border-gray-300 px-5 my-3">
                        <Text className="font-work">01/01/2024 - 07.00</Text>
                        <View className="flex-row justify-between pb-3 pt-2 items-center">
                            <Wallet />
                            <View>
                                <Text className="font-workSemiBold">
                                    Pembayaran non tunai
                                </Text>
                                <Text className="font-work">Rp 2.000</Text>
                            </View>
                            <View className="items-center">
                                <Text className="font-work">QRIS</Text>
                                <FontAwesome5
                                    name="money-bill-wave"
                                    size={15}
                                    color="black"
                                />
                            </View>
                        </View>
                    </View>
                    <View className="border-b-2 border-gray-300 px-5 my-3">
                        <Text className="font-work">01/01/2024 - 07.00</Text>
                        <View className="flex-row justify-between pb-3 pt-2 items-center">
                            <Wallet />
                            <View>
                                <Text className="font-workSemiBold">
                                    Pembayaran non tunai
                                </Text>
                                <Text className="font-work">Rp 2.000</Text>
                            </View>
                            <View className="items-center">
                                <Text className="font-work">QRIS</Text>
                                <FontAwesome5
                                    name="money-bill-wave"
                                    size={15}
                                    color="black"
                                />
                            </View>
                        </View>
                    </View>
                    <View className="border-b-2 border-gray-300 px-5 my-3">
                        <Text className="font-work">01/01/2024 - 07.00</Text>
                        <View className="flex-row justify-between pb-3 pt-2 items-center">
                            <Wallet />
                            <View>
                                <Text className="font-workSemiBold">
                                    Pembayaran non tunai
                                </Text>
                                <Text className="font-work">Rp 2.000</Text>
                            </View>
                            <View className="items-center">
                                <Text className="font-work">QRIS</Text>
                                <FontAwesome5
                                    name="money-bill-wave"
                                    size={15}
                                    color="black"
                                />
                            </View>
                        </View>
                    </View>
                    <View className="border-b-2 border-gray-300 px-5 my-3">
                        <Text className="font-work">01/01/2024 - 07.00</Text>
                        <View className="flex-row justify-between pb-3 pt-2 items-center">
                            <Wallet />
                            <View>
                                <Text className="font-workSemiBold">
                                    Pembayaran non tunai
                                </Text>
                                <Text className="font-work">Rp 2.000</Text>
                            </View>
                            <View className="items-center">
                                <Text className="font-work">QRIS</Text>
                                <FontAwesome5
                                    name="money-bill-wave"
                                    size={15}
                                    color="black"
                                />
                            </View>
                        </View>
                    </View>
                    <View className="border-b-2 border-gray-300 px-5 my-3">
                        <Text className="font-work">01/01/2024 - 07.00</Text>
                        <View className="flex-row justify-between pb-3 pt-2 items-center">
                            <Wallet />
                            <View>
                                <Text className="font-workSemiBold">
                                    Pembayaran non tunai
                                </Text>
                                <Text className="font-work">Rp 2.000</Text>
                            </View>
                            <View className="items-center">
                                <Text className="font-work">QRIS</Text>
                                <FontAwesome5
                                    name="money-bill-wave"
                                    size={15}
                                    color="black"
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

export default activity;
