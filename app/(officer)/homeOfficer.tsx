import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
    equalTo,
    get,
    getDatabase,
    orderByChild,
    ref,
    query,
    onValue,
    remove,
    update,
} from "firebase/database";
import Toast from "react-native-toast-message";
import { AntDesign, FontAwesome6, MaterialIcons } from "@expo/vector-icons";

interface BookingData {
    address: string;
    cost: number;
    methode: string;
    officerId: string;
    accountId: string;
    platNomor: string;
    timestamp: string;
    userName: string;
}

const showToast = (message: string) => {
    Toast.show({
        type: "error",
        text1: message,
    });
};

const renderItem = ({ item }: { item: BookingData }) => {
    const db = getDatabase();
    const removeBooking = async () => {
        const getSaldo = await get(
            ref(db, "users/" + item.accountId + "/saldo/" + item.methode)
        );
        if (item.methode === "coin") {
            await update(ref(db, "users/" + item.accountId + "/saldo/"), {
                coin: getSaldo.val() + 40,
            });
        } else {
            await update(ref(db, "users/" + item.accountId + "/saldo/"), {
                [item.methode as string]: getSaldo.val() + 4000,
            });
        }
        await remove(ref(db, "users/" + item.accountId + "/booking/"));
        await remove(
            ref(db, "booking/" + item.officerId + "/" + item.accountId)
        );
    };
    return (
        <TouchableOpacity className="bg-white border-[1px] border-gray-300 rounded-2xl p-3 gap-2 flex-row my-2">
            <View className="w-3/4 flex gap-1 pl-2 pr-5">
                <Text className="font-workSemiBold text-lg">
                    {item.address}
                </Text>
                <View className="flex-row gap-3 ml-1">
                    <FontAwesome6 name="location-dot" size={20} color="black" />
                    <Text className="font-work text-sm">{item.cost}</Text>
                </View>
                <View className="flex-row gap-2 mb-2">
                    <AntDesign name="contacts" size={20} color="black" />
                    <Text className="font-work text-sm">{item.platNomor}</Text>
                </View>
                <Text className="font-work text-sm">{item.timestamp}</Text>
                <Text className="font-work text-sm">{item.userName}</Text>
                <TouchableOpacity onPress={removeBooking}>
                    <MaterialIcons name="cancel" size={24} color="red" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const homeOfficer: React.FC = () => {
    const [searchResult, setSearchResult] = useState<BookingData[] | null>(
        null
    );
    const [location, setLocation] = useState<string>("");

    const officer = useSelector((state: RootState) => state.officerAccount);
    const db = getDatabase();

    const handleSearch = async () => {
        try {
            const snapShot = await get(
                query(
                    ref(db, "parkLocation"),
                    orderByChild("name"),
                    equalTo(officer.location.toLowerCase())
                )
            );
            snapShot.forEach((childSnapshot) => {
                setLocation(childSnapshot.key);
            });
        } catch (error: any) {
            showToast(error.message);
        }
    };

    useEffect(() => {
        if (location !== "") {
            const fetchBookings = () => {
                onValue(ref(db, "booking/" + location), (snapshot) => {
                    const bookings = snapshot.val();
                    if (bookings) {
                        const bookingsArray: BookingData[] =
                            Object.values(bookings);
                        setSearchResult(bookingsArray);
                    } else {
                        setSearchResult(null);
                    }
                });
            };
            fetchBookings();
        }
    }, [location]);

    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <View>
            <FlatList
                data={searchResult}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${index}`}
                ListHeaderComponent={
                    <View className="pt-12 px-6">
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
        </View>
    );
};

export default homeOfficer;
