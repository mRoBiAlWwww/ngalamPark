// filepath: e:\ProjectInternRaion\ngalamPark\app\(user)\(home)\[id].tsx
import { View, Text, StatusBar, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { get, getDatabase, ref, remove, set } from "firebase/database";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import Toast from "react-native-toast-message";
import { ScrollView } from "react-native";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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
    const idString = String(id);
    const db = getDatabase();
    const [detailSearchResult, setDetailSearchResult] =
        useState<ParkData | null>(null);
    const [showOption, setShowOption] = useState<boolean>(false);

    const account = useSelector((state: RootState) => state.userAccount);

    const handleDetailSearch = async () => {
        try {
            const snapshot = await get(ref(db, "parkLocation/" + id));
            const detailParks = snapshot.val();
            setDetailSearchResult(detailParks);
        } catch (error: any) {
            showToast(error.message);
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
    }, []);

    const addToFavorite = async (userId: string, locationId: string) => {
        const exist = await checkFavorite(account.id, idString);
        if (exist) {
            showToast("Item ada di favorite");
            return;
        }
        try {
            await set(ref(db, `favorites/${userId}/${locationId}`), true);
            showToast("Item berhasil ditambahkan ke favorite");
        } catch (error: any) {
            showToast(error.message);
        }
    };
    const removeToFavorite = async (userId: string, locationId: string) => {
        const exist = await checkFavorite(account.id, idString);
        if (!exist) {
            showToast("Item tidak ada di favorite");
            return;
        }
        try {
            await remove(ref(db, `favorites/${userId}/${locationId}`));
            showToast("Item berhasil dihapus dari favorite");
        } catch (error: any) {
            showToast(error.message);
        }
    };

    const checkFavorite = async (userId: string, locationId: string) => {
        try {
            const snapshot = await get(
                ref(db, `favorites/${userId}/${locationId}`)
            );
            return snapshot.exists();
        } catch (error: any) {
            showToast(error.message);
            return false;
        }
    };

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#F4FBF8" />
            {showOption && (
                <View
                    className="absolute inset-0 z-40 flex justify-center items-center"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
                >
                    <View className="bg-loginColor w-2/5 h-1/4 rounded-xl flex justify-center items-center ">
                        <View className="w-auto gap-3">
                            <TouchableOpacity
                                className="items-center px-5 bg-black rounded-xl"
                                onPress={() => {
                                    setShowOption(!showOption);
                                    addToFavorite(account.id, idString);
                                }}
                            >
                                <MaterialIcons
                                    name="playlist-add"
                                    size={40}
                                    color="white"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="items-center px-5 bg-black rounded-xl"
                                onPress={() => {
                                    setShowOption(!showOption);
                                    removeToFavorite(account.id, idString);
                                }}
                            >
                                <MaterialIcons
                                    name="playlist-remove"
                                    size={40}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
            <ScrollView className={`bg-loginColor h-full px-10 relative`}>
                <View className="flex-row items-center justify-end mt-10">
                    <TouchableOpacity
                        onPress={() => {
                            setShowOption(!showOption);
                            // setIsFavorite(!isFavorite);
                            // addOrRemove();
                        }}
                        className="flex-row gap-2 mt-2"
                    >
                        <MaterialIcons
                            name="playlist-add"
                            size={40}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>

                <View className="mx-auto mt-5">
                    <Image
                        className="w-96 h-60 rounded-3xl"
                        source={require("../../../../assets/images/dummyPujas.jpg")}
                    />
                </View>

                <View className="flex-row mt-10 justify-between">
                    <View className="flex gap-2 w-3/5">
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
                    <View className="flex-row gap-2 mt-2">
                        {detailSearchResult?.rate !== undefined &&
                            countStar(detailSearchResult.rate)}
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
