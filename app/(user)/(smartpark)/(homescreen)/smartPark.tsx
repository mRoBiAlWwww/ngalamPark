import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    Alert,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import ButtonRegister from "../../../../components/ButtonRegister";
import { router } from "expo-router";

const smartPark: React.FC = () => {
    const [isShow, setIsShow] = useState<string>("");
    return (
        <View className="relative">
            <>
                <ImageBackground
                    source={require("../../../../assets/images/Group.png")}
                    className=" h-3/4"
                >
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
                            Hidup Udah Ribet, Parkir Jangan
                        </Text>
                        <Text className="text-xl text-gray-500 font-workSemiBold text-center">
                            Booking Parkir Cepat Hidup Makin Hemat
                        </Text>
                    </View>
                    <View className="w-[90%] mx-auto gap-4 ">
                        <Text className="font-maison text-2xl">
                            Produk SmartPark
                        </Text>
                        <View className="bg-white rounded-2xl flex-row justify-evenly items-center gap-2 px-4 py-6">
                            <View className="border-[1px] border-gray-200 rounded-full px-2 w-12 h-12 items-center justify-center ">
                                <Image
                                    source={require("../../../../assets/images/Logo.jpg")}
                                    className="w-7 h-7"
                                />
                            </View>
                            <View className="w-3/5">
                                <Text className="font-workSemiBold text-gray-600 text-xl">
                                    Booking Parkir
                                </Text>
                                <Text className="font-workSemiBold text-gray-400">
                                    Booking slot parkir berbayar lebih aman
                                </Text>
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        router.push("/listSearch");
                                    }}
                                    className="w-10 h-10 rounded-full bg-gray-200"
                                >
                                    <MaterialIcons
                                        name="navigate-next"
                                        size={24}
                                        color="#01aed6"
                                        className="m-auto"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="bg-white rounded-2xl flex-row justify-evenly items-center gap-2 px-4 py-6">
                            <View className="border-[1px] border-gray-200 rounded-full px-2 w-12 h-12 items-center justify-center ">
                                <Image
                                    source={require("../../../../assets/images/Logo.jpg")}
                                    className="w-7 h-7"
                                />
                            </View>
                            <View className="w-3/5">
                                <Text className="font-workSemiBold text-gray-600 text-xl">
                                    Free Parkir
                                </Text>
                                <Text className="font-workSemiBold text-gray-400">
                                    Dapatkan parkir gratis di lokasi tertentu
                                </Text>
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => setIsShow("freeparkir")}
                                    className="w-10 h-10 rounded-full bg-gray-200"
                                >
                                    <MaterialIcons
                                        name="navigate-next"
                                        size={24}
                                        color="#01aed6"
                                        className="m-auto"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="bg-white rounded-2xl flex-row justify-evenly items-center gap-2 px-4 py-6">
                            <View className="border-[1px] border-gray-200 rounded-full px-2 w-12 h-12 items-center justify-center ">
                                <Image
                                    source={require("../../../../assets/images/Logo.jpg")}
                                    className="w-7 h-7"
                                />
                            </View>
                            <View className="w-3/5">
                                <Text className="font-workSemiBold text-gray-600 text-xl">
                                    Freemium
                                </Text>
                                <Text className="font-workSemiBold text-gray-400">
                                    Beli freemium untuk dapat double poin
                                </Text>
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => setIsShow("freemium")}
                                    className="w-10 h-10 rounded-full bg-gray-200"
                                >
                                    <MaterialIcons
                                        name="navigate-next"
                                        size={24}
                                        color="#01aed6"
                                        className="m-auto"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.push("/promoPage")}
                        className="w-[90%] mx-auto mt-5 flex-row justify-between bg-secondary border-2 border-primary rounded-full py-2 px-5"
                    >
                        <Text className="font-workSemiBold text-lg text-primary">
                            Lihat detail benefitnya
                        </Text>
                        <AntDesign
                            name="arrowright"
                            size={24}
                            color="#01aed6"
                        />
                    </TouchableOpacity>
                </ImageBackground>
            </>
            {isShow !== "" ? (
                <View
                    className="absolute w-screen h-screen flex justify-center items-center"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    {isShow === "freeparkir" ? (
                        <View className="bg-white w-3/4 h-auto absolute rounded-2xl px-5 py-8">
                            <View className="border-b-[1px] border-gray-200 pb-5 w-4/5 mx-auto">
                                <Text className="text-2xl mx-auto font-workSemiBold">
                                    Free Parkir
                                </Text>
                                <Text className="font-work mx-auto text-center text-sm">
                                    Dapatkan parkir gratis dengan berlangganan
                                    free parkir!
                                </Text>
                            </View>
                            <View className="w-4/5 mx-auto my-5">
                                <Text className="font-work text-sm">
                                    1. Parkir gratis
                                </Text>
                                <Text className="font-work text-sm">
                                    2. Maksimal 5 kali parkir tiap hari
                                </Text>
                                <Text className="font-work text-sm">
                                    3. 1 slot booking parkir
                                </Text>
                            </View>
                            <ButtonRegister
                                title="Beli"
                                onPress={() => {
                                    setIsShow("");
                                    Alert.alert(
                                        "Maaf ya fitur ini masih dalam tahap pengembangan, coba lagi nanti"
                                    );
                                }}
                                componentStyle="px-5 py-3 rounded-full font-bold flex justify-center items-center w-full mx-auto overflow-hidden mt-5"
                                textStyle="text-white text-lg"
                                colors={["#33D3F8", "#1B859D"]}
                            />
                        </View>
                    ) : (
                        <View className="bg-white w-3/4 h-auto absolute rounded-2xl px-5 py-8">
                            <View className="border-b-[1px] border-gray-200 pb-5 w-4/5 mx-auto">
                                <Text className="text-2xl mx-auto font-workSemiBold">
                                    Freemium
                                </Text>
                                <Text className="font-work mx-auto text-center text-sm">
                                    Kumpulkan poin sebanyak banyaknya, dengan
                                    berlangganan freemium!
                                </Text>
                            </View>
                            <View className="w-4/5 mx-auto my-5">
                                <Text className="font-work text-sm">
                                    1. Parkir gratis
                                </Text>
                                <Text className="font-work text-sm">
                                    2. Double point
                                </Text>
                                <Text className="font-work text-sm">
                                    3. Maksimal 10 kali parkir tiap hari
                                </Text>
                                <Text className="font-work text-sm">
                                    4. 3 slot booking parkir
                                </Text>
                                <Text className="font-work text-sm">
                                    5. 1 slot booking 1 kali seminggu
                                </Text>
                            </View>
                            <ButtonRegister
                                title="Beli"
                                onPress={() => {
                                    setIsShow("");
                                    Alert.alert(
                                        "Maaf ya fitur ini masih dalam tahap pengembangan, coba lagi nanti"
                                    );
                                }}
                                componentStyle="px-5 py-3 rounded-full font-bold flex justify-center items-center w-full mx-auto overflow-hidden mt-5"
                                textStyle="text-white text-lg"
                                colors={["#33D3F8", "#1B859D"]}
                            />
                        </View>
                    )}
                </View>
            ) : null}
        </View>
    );
};

export default smartPark;
