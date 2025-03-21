import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
import { get, getDatabase, onValue, ref } from "firebase/database";
import { RootState } from "@/redux/store";
import SvgObject from "../../../../assets/images/searhSmartpark.svg";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { router, useFocusEffect } from "expo-router";

export interface ParkData {
    id: string;
    address: string;
    name: string;
    officer: string;
    rate: number;
    review: string;
    slot: number;
}

const listSearch = () => {
    const [isBooking, setIsBooking] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [searchResult, setSearchResult] = useState<ParkData[]>([]);
    const [listFavorite, setListFavorite] = useState<ParkData[]>([]);
    const account = useSelector((state: RootState) => state.userAccount);
    const db = getDatabase();

    const showToast = (message: string) => {
        Toast.show({
            type: "error",
            text1: message,
        });
    };
    const renderItem = ({ item }: { item: ParkData }) => (
        <TouchableOpacity
            onPress={() => {
                isBooking
                    ? showToast("selesaikan dulu pesanan")
                    : router.push({
                          pathname: "/(user)/(smartpark)/(properties)/[id]",
                          params: {
                              id: item.id,
                              location: item.address,
                              nameLocation: item.name,
                          },
                      });
            }}
            className="bg-white border-[1px] border-gray-300 rounded-2xl p-3 gap-5 flex-row my-2"
        >
            <View className="w-1/4 mt-2">
                <Image
                    style={{ width: 96, height: 160, borderRadius: 8 }}
                    source={require("../../../../assets/images/dummyBento.png")}
                />
            </View>
            <View className="w-3/4 flex gap-1 pl-2 pr-5">
                <Text className="font-workSemiBold text-lg">{item.name}</Text>
                <View className="flex-row gap-3 ml-1">
                    <FontAwesome6 name="location-dot" size={20} color="black" />
                    <Text className="font-work text-sm">{item.address}</Text>
                </View>
                <View className="flex-row gap-2 mb-2">
                    <AntDesign name="contacts" size={20} color="black" />
                    <Text className="font-work text-sm">{item.officer}</Text>
                </View>
                <Text className="font-work text-sm">{item.review}</Text>
            </View>
        </TouchableOpacity>
    );
    const handleSearch = async (input: string) => {
        try {
            const snapshot = await get(ref(db, "parkLocation"));
            if (snapshot.exists()) {
                const parks = snapshot.val();
                const results: ParkData[] = [];

                for (let parkId in parks) {
                    if (
                        parks[parkId].name
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    ) {
                        const result: ParkData = {
                            id: parkId,
                            ...parks[parkId],
                        };
                        results.push(result);
                    }
                }
                setSearchResult(results);
            }
        } catch (error: any) {
            showToast(error.message);
        }
    };
    const getFavorite = (accountId: string) => {
        const unsubscribe = onValue(
            ref(db, "favorites/" + accountId),
            (snapshot) => {
                if (snapshot.exists()) {
                    const favoriteNames = Object.keys(snapshot.val());

                    Promise.all(
                        favoriteNames.map(async (name) => {
                            const locationSnapshot = await get(
                                ref(db, "parkLocation/" + name)
                            );
                            return locationSnapshot.exists()
                                ? { id: name, ...locationSnapshot.val() }
                                : null;
                        })
                    ).then((favoriteDetails) => {
                        setListFavorite(
                            favoriteDetails.filter((item) => item !== null)
                        );
                    });
                } else {
                    setListFavorite([]);
                }
            }
        );

        return unsubscribe;
    };
    useFocusEffect(
        useCallback(() => {
            const unsubscribe = getFavorite(account.id);
            return () => unsubscribe();
        }, [account.id])
    );

    useEffect(() => {
        handleSearch(search);
    }, [search]);

    useEffect(() => {
        const unsubscribe = onValue(
            ref(db, "booking/" + account.booking + "/" + account.id),
            (snapshot) => {
                setIsBooking(snapshot.exists());
            }
        );

        return () => unsubscribe();
    }, []);

    return (
        <View className=" h-full">
            <View className=" bg-white mt-0 relative pt-10 flex items-center">
                <TouchableOpacity
                    className="bg-black rounded-full w-12 h-12 absolute top-10 left-5"
                    onPress={() => router.back()}
                >
                    <FontAwesome6
                        name="xmark"
                        size={34}
                        color="white"
                        className="mx-auto py-1"
                    />
                </TouchableOpacity>
                <SvgObject width={300} height={200} />
                <View className=" bg-white rounded-full w-[90%] mx-auto flex-row border-[1px] border-gray-300 px-6 py-2 absolute right-6 top-60 items-center justify-between z-40">
                    <View className="flex-row items-center">
                        <Feather name="search" size={24} color="#01aed6" />
                        <TextInput
                            value={search}
                            onChangeText={setSearch}
                            className="ml-4"
                            placeholder="Cari lokasi parkirmu disini"
                            style={{ fontFamily: "WorkSans" }}
                        />
                    </View>
                    {search && (
                        <TouchableOpacity onPress={() => setSearch("")}>
                            <AntDesign name="close" size={24} color="gray" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            {search && searchResult ? (
                <FlatList
                    data={searchResult}
                    renderItem={renderItem}
                    keyExtractor={(item, index) =>
                        item.id ? item.id : `${index}`
                    }
                    ListHeaderComponent={
                        <View className="mt-20 mb-5 ml-2">
                            <Text className="font-workSemiBold text-2xl">
                                Hasil Pencarian
                            </Text>
                        </View>
                    }
                    contentContainerStyle={{
                        paddingHorizontal: 21,
                        paddingBottom: 120,
                    }}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <ScrollView keyboardShouldPersistTaps="handled">
                    {listFavorite.length > 0 ? (
                        <FlatList
                            data={listFavorite}
                            renderItem={renderItem}
                            keyExtractor={(item, index) =>
                                item.id ? item.id : `${index}`
                            }
                            ListHeaderComponent={
                                <View className="pt-12">
                                    <Text className="font-workSemiBold text-2xl">
                                        Favorite
                                    </Text>
                                </View>
                            }
                            contentContainerStyle={{
                                paddingHorizontal: 21,
                                paddingBottom: 10,
                            }}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={false}
                        />
                    ) : (
                        <View className="mt-20 mb-10">
                            <Text className="font-work mx-auto">
                                Anda masih belum memiliki daftar favorit
                            </Text>
                        </View>
                    )}
                </ScrollView>
            )}
        </View>
    );
};

export default listSearch;
