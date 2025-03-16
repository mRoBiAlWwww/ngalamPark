// filepath: e:\ProjectInternRaion\ngalamPark\app\(user)\(home)\[id].tsx
import { View, Text, StatusBar, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { get, getDatabase, ref } from "firebase/database";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import Toast from "react-native-toast-message";
import FullyHeart from "../../../assets/images/FullyHeart.svg";
import EmptyHeart from "../../../assets/images/EmptyHeart.svg";
import { ScrollView } from "react-native";

interface ParkData {
    id: string;
    address: string;
    name: string;
    officer: string;
    rate: number;
    review: string;
    slot: number;
}

const showToast = (message: string) => {
    Toast.show({
        type: "error",
        text1: message,
    });
};

const DetailSearch = () => {
    const { id } = useLocalSearchParams();
    const db = getDatabase();
    const [detailSearchResult, setDetailSearchResult] =
        useState<ParkData | null>(null);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    const handleDetailSearch = async () => {
        try {
            const snapshot = await get(ref(db, "parkLocation/" + id));
            const detailParks = snapshot.val();
            setDetailSearchResult(detailParks);
        } catch (error: any) {
            console.error("Error fetching data:", error);
            showToast(error.message);
        }
    };

    const countStar = (total: number) => {
        const stars = [];
        const fullStars = Math.min(total, 5);

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <AntDesign
                    key={`star-${i}`}
                    name="star"
                    size={15}
                    color="black"
                />
            );
        }

        for (let i = fullStars; i < 5; i++) {
            stars.push(
                <AntDesign
                    key={`staro-${i}`}
                    name="staro"
                    size={15}
                    color="black"
                />
            );
        }

        return stars;
    };

    useEffect(() => {
        handleDetailSearch();
    }, [detailSearchResult]);
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#F4FBF8" />
            <ScrollView className="bg-loginColor h-full px-10">
                <View className="mx-auto mt-20">
                    <Image
                        className="w-96 h-60 rounded-3xl"
                        source={require("../../../assets/images/dummyPujas.jpg")}
                    />
                </View>
                <View className="flex-row mt-10 justify-between">
                    <View className="flex gap-2">
                        <Text className="font-workSemiBold text-3xl mb-3">
                            {detailSearchResult?.name}
                        </Text>
                        <View className="flex-row gap-4">
                            <Entypo name="time-slot" size={20} color="black" />
                            <Text className="font-work text-xl">
                                Sisa slot : {detailSearchResult?.slot}/40
                            </Text>
                        </View>
                        <View className="flex-row gap-5">
                            <FontAwesome name="user" size={24} color="black" />
                            <Text className="font-work text-xl">
                                Bapak {detailSearchResult?.officer}
                            </Text>
                        </View>

                        <View className="flex-row gap-4">
                            <Entypo name="address" size={24} color="black" />
                            <Text className="font-work text-xl">
                                {detailSearchResult?.address}
                            </Text>
                        </View>
                    </View>
                    <View className="flex items-end">
                        <View className="flex-row gap-2 mt-2">
                            {detailSearchResult?.rate !== undefined &&
                                countStar(detailSearchResult.rate)}
                        </View>
                        <TouchableOpacity
                            onPress={() => setIsFavorite(!isFavorite)}
                            className="flex-row gap-2 mt-2"
                        >
                            {isFavorite ? (
                                <FullyHeart width={25} height={25} />
                            ) : (
                                <EmptyHeart width={25} height={25} />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="bg-white rounded-3xl border-2 border-gray-200 p-3 mt-10 mx-auto w-full">
                    <Text className="font-work text-xl">
                        {detailSearchResult?.review}
                    </Text>
                </View>
            </ScrollView>
        </>
    );
};

export default DetailSearch;
// className = "px-5";
