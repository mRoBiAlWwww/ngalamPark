import { View, Text, Alert, ScrollView } from "react-native";
import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
const promoPage = () => {
    const [isActive, setIsActive] = useState<string>("left");
    const [isActive2, setIsActive2] = useState<string>("left");
    return (
        <ScrollView
            className="relative bg-defaultBackground flex-1"
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <View className="relative min-h-screen mb-10">
                <View className="flex-row gap-2 items-center px-3 py-1 bg-white rounded-full w-3/4 justify-center mx-auto my-10">
                    <Image
                        source={require("../../../../assets/images/Logo.jpg")}
                        className="w-5 h-5"
                    />
                    <Text className=" font-workSemiBold">Ngalam Park</Text>
                    <Text className="font-work">SmartPark</Text>
                </View>
                <View className="relative w-4/5 mx-auto mb-10">
                    <Text className="font-maison text-3xl text-center mb-3">
                        Parkir bebas ribet paketnya cuan banget
                    </Text>
                    <Text className="text-xl text-gray-500 font-workSemiBold text-center">
                        Beli paketnya, parkir makin gampang tiap hari
                    </Text>
                </View>

                <View className="w-[90%] flex-row mx-auto justify-evenly">
                    <TouchableOpacity
                        onPress={() => setIsActive("left")}
                        className={`${
                            isActive === "left"
                                ? "bg-secondary border-primary"
                                : "bg-white border-gray-200"
                        }  border-2 w-28 h-28 rounded-2xl justify-evenly items-center px-4 py-6 shadow-xl`}
                    >
                        <Text className="font-work">Standar</Text>
                        <Text className="font-workSemiBold text-2xl">
                            Gratis
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setIsActive("middle")}
                        className={`${
                            isActive === "middle"
                                ? "bg-secondary border-primary"
                                : "bg-white border-gray-200"
                        } border-2 w-28 h-28 rounded-2xl justify-evenly items-center p-4 shadow-xl `}
                    >
                        <Text className="font-work">FreePark</Text>
                        <Text className="font-workSemiBold text-2xl">
                            100rb
                        </Text>
                        <Text className="font-work">/bulan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setIsActive("right")}
                        className={`${
                            isActive === "right"
                                ? "bg-secondary border-primary"
                                : "bg-white border-gray-200"
                        } border-2 w-28 h-28 rounded-2xl justify-evenly items-center p-4 relative shadow-xl`}
                    >
                        <Text className="font-work">FreePark</Text>
                        <Text className="font-workSemiBold text-2xl">
                            150rb
                        </Text>
                        <Text className="font-work">/bulan</Text>
                        <View className="flex-row items-center bg-primary rounded-full px-1 absolute -top-2">
                            <Entypo name="flash" size={12} color="white" />
                            <Text className="text-[9px] py-1 text-white w-[90%]">
                                Paling hemat
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="bg-gray-200 rounded-full w-[90%] flex-row justify-between px-3 py-2 mx-auto mt-5">
                    <TouchableOpacity
                        onPress={() => setIsActive2("left")}
                        className={`${
                            isActive2 === "left" ? "bg-white" : null
                        }  w-1/2 rounded-full py-1 `}
                    >
                        <Text
                            className={`${
                                isActive2 === "left"
                                    ? "text-primary"
                                    : "text-gray-500"
                            } text-xl text-center font-workSemiBold`}
                        >
                            Benefit
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setIsActive2("right")}
                        className={`${
                            isActive2 === "right" ? "bg-white" : null
                        }  w-1/2 rounded-full py-1 `}
                    >
                        <Text
                            className={`${
                                isActive2 === "right"
                                    ? "text-primary"
                                    : "text-gray-500"
                            } text-xl text-center font-workSemiBold`}
                        >
                            Peraturan
                        </Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <View
                        className={`${
                            isActive2 === "left" ? "flex-1 " : "hidden"
                        } `}
                    >
                        <View className="w-[90%] bg-white rounded-2xl mx-auto mt-5 p-10 px-5 mb-5">
                            <View className="mx-auto">
                                <Text className="font-workSemiBold text-2xl">
                                    Benefit yang kamu dapat
                                </Text>
                                <Text className="font-workSemiBold text-lg text-gray-400">
                                    Keuntungan kalo ga beli paket
                                </Text>
                            </View>
                            <View className="w-full mx-auto flex-row justify-between border-b-2 border-gray-100 py-3 mt-5">
                                <Text className="font-workSemiBold text-gray-500 text-lg">
                                    3x Fee Parkir Sehari
                                </Text>
                                <Text className="font-workSemiBold text-red-600 text-lg ">
                                    Tidak
                                </Text>
                            </View>
                            <View className="w-full mx-auto flex-row justify-between border-b-2 border-gray-100 py-3 mt-5">
                                <Text className="font-workSemiBold text-gray-500 text-lg">
                                    1x Booking Slot Perhari
                                </Text>
                                <Text className="font-workSemiBold text-red-600 text-lg ">
                                    Tidak
                                </Text>
                            </View>
                            <View className="w-full mx-auto flex-row justify-between border-b-2 border-gray-100 py-3 mt-5">
                                <Text className="font-workSemiBold text-gray-500 text-lg">
                                    3x Booking Slot Perhari
                                </Text>
                                <Text className="font-workSemiBold text-red-600 text-lg ">
                                    Tidak
                                </Text>
                            </View>
                            <View className="w-full mx-auto flex-row justify-between border-b-2 border-gray-100 py-3 mt-5">
                                <Text className="font-workSemiBold text-gray-500 text-lg">
                                    Double Koin
                                </Text>
                                <Text className="font-workSemiBold text-red-600 text-lg ">
                                    Tidak
                                </Text>
                            </View>
                            <View className="w-full mx-auto flex-row justify-between border-b-2 border-gray-100 py-3 mt-5">
                                <Text className="font-workSemiBold text-gray-500 text-lg">
                                    Priorias Booking
                                </Text>
                                <Text className="font-workSemiBold text-red-600 text-lg ">
                                    Tidak
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() =>
                                Alert.alert(
                                    "Maaf, fitur ini masih dalam tahap pengembangan"
                                )
                            }
                            className="w-[90%] mx-auto p-3 rounded-full bg-primary"
                        >
                            <Text className="text-white font-workSemiBold text-2xl text-center">
                                Pilih & Beli
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        className={`${
                            isActive2 === "right" ? "flex-1 " : "hidden"
                        } `}
                    >
                        <View className="w-[90%] bg-white rounded-2xl mx-auto mt-5 p-10 px-5 mb-5">
                            <View className="mx-auto">
                                <Text className="font-workSemiBold text-2xl">
                                    Benefit yang kamu dapat
                                </Text>
                                <Text className="font-workSemiBold text-lg text-gray-400">
                                    Keuntungan kalo ga beli paket
                                </Text>
                            </View>
                            <View className="w-full mx-auto flex-row justify-between border-b-2 border-gray-100 py-3 mt-5">
                                <Text className="font-workSemiBold text-gray-500 text-lg">
                                    3x Fee Parkir Sehari
                                </Text>
                                <Text className="font-workSemiBold text-green-500 text-lg ">
                                    Tidak
                                </Text>
                            </View>
                            <View className="w-full mx-auto flex-row justify-between border-b-2 border-gray-100 py-3 mt-5">
                                <Text className="font-workSemiBold text-gray-500 text-lg">
                                    1x Booking Slot Perhari
                                </Text>
                                <Text className="font-workSemiBold text-green-500 text-lg ">
                                    Tidak
                                </Text>
                            </View>
                            <View className="w-full mx-auto flex-row justify-between border-b-2 border-gray-100 py-3 mt-5">
                                <Text className="font-workSemiBold text-gray-500 text-lg">
                                    3x Booking Slot Perhari
                                </Text>
                                <Text className="font-workSemiBold text-red-600 text-lg ">
                                    Tidak
                                </Text>
                            </View>
                            <View className="w-full mx-auto flex-row justify-between border-b-2 border-gray-100 py-3 mt-5">
                                <Text className="font-workSemiBold text-gray-500 text-lg">
                                    Double Koin
                                </Text>
                                <Text className="font-workSemiBold text-red-600 text-lg ">
                                    Tidak
                                </Text>
                            </View>
                            <View className="w-full mx-auto flex-row justify-between border-b-2 border-gray-100 py-3 mt-5">
                                <Text className="font-workSemiBold text-gray-500 text-lg">
                                    Priorias Booking
                                </Text>
                                <Text className="font-workSemiBold text-red-600 text-lg ">
                                    Tidak
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() =>
                                Alert.alert(
                                    "Maaf, fitur ini masih dalam tahap pengembangan"
                                )
                            }
                            className="w-[90%] mx-auto p-3 rounded-full bg-primary"
                        >
                            <Text className="text-white font-workSemiBold text-2xl text-center">
                                Pilih & Beli
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default promoPage;
