import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import Shopeepay from "../../assets/images/dummyShopeepay.svg";
import { StatusBar } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const activity: React.FC = () => {
    const [monthsIndex, setMonthsIndex] = useState(1);

    const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

    const handleMonths = (index: number) => {
        if (index == 12) {
            setMonthsIndex(0);
        } else {
            setMonthsIndex(index);
        }
    };
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#F2F1F9" />
            <ScrollView
                className="bg-defaultBackground flex"
                contentContainerStyle={{ paddingBottom: 75 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="my-10 w-[90%] mx-auto flex">
                    <Text className="font-workSemiBold text-3xl justify-self-start">
                        Detail Aktivitas
                    </Text>
                    <View className="my-3">
                        <View className="bg-white rounded-3xl px-5 my-1 p-5 flex-row justify-between gap-1">
                            <TouchableOpacity
                                className="rounded-full border-4 border-gray-300 p-2 my-auto"
                                onPress={() => handleMonths(monthsIndex - 1)}
                            >
                                <MaterialIcons
                                    name="keyboard-arrow-left"
                                    size={20}
                                    color="#01aed6"
                                />
                            </TouchableOpacity>
                            <View className="flex-row gap-2 items-center">
                                <View className="">
                                    <Text className="font-workSemiBold text-sm">
                                        {monthsIndex - 1 <= 0
                                            ? months[11]
                                            : months[monthsIndex - 1]}
                                    </Text>
                                </View>
                                <View className="">
                                    <Text className="font-workSemiBold text-sm">
                                        {months[monthsIndex]}
                                    </Text>
                                </View>

                                <View className="">
                                    <Text className="font-workSemiBold text-sm">
                                        {monthsIndex + 1 != 12
                                            ? months[monthsIndex + 1]
                                            : months[0]}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                className="rounded-full border-4 border-gray-300 p-2 my-auto"
                                onPress={() => handleMonths(monthsIndex + 1)}
                            >
                                <MaterialIcons
                                    name="keyboard-arrow-right"
                                    size={20}
                                    color="#01aed6"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View className="w-[90%] mx-auto">
                    {/* pake flatlist */}
                    <View className="my-3">
                        <Text className="font-workSemiBold text-2xl">
                            Senin 10 Feb 2025
                        </Text>
                        <View className="bg-white rounded-3xl px-5 my-1 p-5 flex-row justify-between gap-2">
                            <View className="flex-row gap-4 w-2/3 ">
                                <View className="rounded-full border-2 border-gray-200 p-2 my-auto">
                                    <Image
                                        source={require("../../assets/images/Logo.jpg")}
                                        className="w-8 h-8"
                                    />
                                </View>
                                <View className="flex-1">
                                    <Text className="font-workSemiBold text-lg">
                                        Pujasera UB - Parkir
                                    </Text>
                                    <Text className="font-workSemiBold text-lg">
                                        #241038108309
                                    </Text>
                                </View>
                            </View>
                            <View className="flex items-end">
                                <Text className="font-work text-lg text-gray-500">
                                    Rp. 2.000
                                </Text>
                                <View className="gap-1 items-end">
                                    <Text className="font-work text-gray-500">
                                        Shopeepay
                                    </Text>
                                    <Shopeepay width={40} height={20} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className="my-3">
                        <Text className="font-workSemiBold text-2xl">
                            Senin 10 Feb 2025
                        </Text>
                        <View className="bg-white rounded-3xl px-5 my-1 p-5 flex-row justify-between gap-2">
                            <View className="flex-row gap-4 w-2/3 ">
                                <View className="rounded-full border-2 border-gray-200 p-2 my-auto">
                                    <Image
                                        source={require("../../assets/images/Logo.jpg")}
                                        className="w-8 h-8"
                                    />
                                </View>
                                <View className="flex-1">
                                    <Text className="font-workSemiBold text-lg">
                                        Pujasera UB - Parkir
                                    </Text>
                                    <Text className="font-workSemiBold text-lg">
                                        #241038108309
                                    </Text>
                                </View>
                            </View>
                            <View className="flex items-end">
                                <Text className="font-work text-lg text-gray-500">
                                    Rp. 2.000
                                </Text>
                                <View className="gap-1 items-end">
                                    <Text className="font-work text-gray-500">
                                        Shopeepay
                                    </Text>
                                    <Shopeepay width={40} height={20} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className="my-3">
                        <Text className="font-workSemiBold text-2xl">
                            Senin 10 Feb 2025
                        </Text>
                        <View className="bg-white rounded-3xl px-5 my-1 p-5 flex-row justify-between gap-2">
                            <View className="flex-row gap-4 w-2/3 ">
                                <View className="rounded-full border-2 border-gray-200 p-2 my-auto">
                                    <Image
                                        source={require("../../assets/images/Logo.jpg")}
                                        className="w-8 h-8"
                                    />
                                </View>
                                <View className="flex-1">
                                    <Text className="font-workSemiBold text-lg">
                                        Pujasera UB - Parkir
                                    </Text>
                                    <Text className="font-workSemiBold text-lg">
                                        #241038108309
                                    </Text>
                                </View>
                            </View>
                            <View className="flex items-end">
                                <Text className="font-work text-lg text-gray-500">
                                    Rp. 2.000
                                </Text>
                                <View className="gap-1 items-end">
                                    <Text className="font-work text-gray-500">
                                        Shopeepay
                                    </Text>
                                    <Shopeepay width={40} height={20} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className="my-3">
                        <Text className="font-workSemiBold text-2xl">
                            Senin 10 Feb 2025
                        </Text>
                        <View className="bg-white rounded-3xl px-5 my-1 p-5 flex-row justify-between gap-2">
                            <View className="flex-row gap-4 w-2/3 ">
                                <View className="rounded-full border-2 border-gray-200 p-2 my-auto">
                                    <Image
                                        source={require("../../assets/images/Logo.jpg")}
                                        className="w-8 h-8"
                                    />
                                </View>
                                <View className="flex-1">
                                    <Text className="font-workSemiBold text-lg">
                                        Pujasera UB - Parkir
                                    </Text>
                                    <Text className="font-workSemiBold text-lg">
                                        #241038108309
                                    </Text>
                                </View>
                            </View>
                            <View className="flex items-end">
                                <Text className="font-work text-lg text-gray-500">
                                    Rp. 2.000
                                </Text>
                                <View className="gap-1 items-end">
                                    <Text className="font-work text-gray-500">
                                        Shopeepay
                                    </Text>
                                    <Shopeepay width={40} height={20} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className="my-3">
                        <Text className="font-workSemiBold text-2xl">
                            Senin 10 Feb 2025
                        </Text>
                        <View className="bg-white rounded-3xl px-5 my-1 p-5 flex-row justify-between gap-2">
                            <View className="flex-row gap-4 w-2/3 ">
                                <View className="rounded-full border-2 border-gray-200 p-2 my-auto">
                                    <Image
                                        source={require("../../assets/images/Logo.jpg")}
                                        className="w-8 h-8"
                                    />
                                </View>
                                <View className="flex-1">
                                    <Text className="font-workSemiBold text-lg">
                                        Pujasera UB - Parkir
                                    </Text>
                                    <Text className="font-workSemiBold text-lg">
                                        #241038108309
                                    </Text>
                                </View>
                            </View>
                            <View className="flex items-end">
                                <Text className="font-work text-lg text-gray-500">
                                    Rp. 2.000
                                </Text>
                                <View className="gap-1 items-end">
                                    <Text className="font-work text-gray-500">
                                        Shopeepay
                                    </Text>
                                    <Shopeepay width={40} height={20} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

export default activity;
