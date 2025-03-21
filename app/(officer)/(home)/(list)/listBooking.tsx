import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Shopeepay from "../../../../assets/images/dummyShopeepay.svg";
import OVO from "../../../../assets/images/ovo2.svg";
import Coin from "../../../../assets/images/coin.svg";
import { StatusBar } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import {
    get,
    getDatabase,
    onValue,
    push,
    query,
    ref,
    remove,
    set,
    update,
} from "firebase/database";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { SvgProps } from "react-native-svg";

import { ScrollView } from "react-native";

const bookingData = [
    {
        id: "1",
        day: "Senin 10 Feb 2025",
        name: "Budi Santoso",
        bookingId: "#1310281320132",
        time: "08:20",
        vehicle: "Honda Beat",
        status: "Antrian",
    },
    {
        id: "2",
        day: "Jumat 7 Feb 2025",
        name: "John Mayer",
        bookingId: "#1310281320132",
        time: "08:20",
        vehicle: "Honda Scoopy",
        status: "Sedang Parkir",
    },
    {
        id: "3",
        day: "Kamis 6 Feb 2025",
        name: "Tim Henson",
        bookingId: "#1310281320132",
        time: "08:20",
        vehicle: "Yamaha N-Max",
        status: "Selesai",
    },
    {
        id: "4",
        day: "Rabu 5 Feb 2025",
        name: "Mateus Asato",
        bookingId: "#1310281320132",
        time: "08:20",
        vehicle: "Honda Beat",
        status: "Antrian",
    },
];

const showToast = (message: string) => {
    Toast.show({
        type: "error",
        text1: message,
    });
};

export interface List {
    address: string;
    cost: number;
    methode: string;
    officerId: string;
    platNomor: string;
    timestamp: string;
    userName: string;
    nameLocation: string;
}

export interface UserBooking {
    locationId: string;
    userId: string;
}

export interface DetailBooking {
    address: string;
    cost: number;
    methode: string;
    officerId: string;
    platNomor: string;
    timestamp: string;
    userName: string;
    accountId: string;
    nameLocation: string;
}

const listBooking: React.FC = () => {
    const [monthsIndex, setMonthsIndex] = useState<number>(0);
    const [isActive, setIsActive] = useState<string>("left");
    const [list, setList] = useState<List[]>([]);
    const [detailBookings, setDetailBookings] = useState<DetailBooking | null>(
        null
    );
    const db = getDatabase();
    const now = new Date();

    const account = useSelector((state: RootState) => state.userAccount);

    const paymentMethods: Record<
        string,
        { label: string; Icon: React.FC<SvgProps> }
    > = {
        ovo: { label: "OVO", Icon: OVO },
        shopeepay: { label: "Shopeepay", Icon: Shopeepay },
        coin: { label: "Coin", Icon: Coin },
    };

    const month = String(monthsIndex + 1).padStart(2, "0");

    const handleList = () => {
        const unsubscribe = onValue(
            query(ref(db, "payment/" + account.id + "/2025/" + month)),
            (snapShot) => {
                const data = snapShot.val();
                if (data) {
                    const bookingsArray: List[] = Object.values(data);
                    setList(bookingsArray);
                }
            },
            (error: any) => {
                showToast(error.message);
            }
        );

        return () => unsubscribe();
    };

    useEffect(() => {
        setList([]);
        handleList();
    }, [monthsIndex, isActive]);

    const getFormattedDateWIB = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long", // Nama bulan dalam bahasa Indonesia
            year: "numeric",
            timeZone: "Asia/Jakarta",
        });
    };

    const convertToWIB = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: "Asia/Jakarta",
        });
    };

    const renderItem = ({ item }: { item: List }) => {
        return (
            <View className="my-2">
                <Text className="font-workSemiBold text-xl">
                    {getFormattedDateWIB(item.timestamp)}
                </Text>
                <View className="bg-white rounded-3xl px-5 my-1 p-5 flex-row justify-between gap-2">
                    <View className="flex-row gap-4 w-2/3 ">
                        <View className="rounded-full border-2 border-gray-200 p-2 my-auto">
                            <Image
                                source={require("../../../../assets/images/Logo.jpg")}
                                className="w-8 h-8"
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="font-workSemiBold text-lg">
                                {item.nameLocation} - Parkir
                            </Text>
                            <Text className="font-workSemiBold text-lg">
                                {getFormattedDateWIB(item.timestamp)}
                            </Text>
                        </View>
                    </View>
                    <View className="flex items-end">
                        <Text className="font-workSemiBold text-lg text-gray-500">
                            Rp. {item.methode === "coin" ? 40 : 4000}
                        </Text>
                        <View className="gap-1 items-end">
                            {paymentMethods[item.methode] &&
                                (() => {
                                    const { label, Icon } =
                                        paymentMethods[item.methode];

                                    const iconSize: Record<
                                        string,
                                        { width: number; height: number }
                                    > = {
                                        ovo: { width: 40, height: 20 },
                                        shopeepay: { width: 50, height: 25 },
                                        coin: { width: 35, height: 35 },
                                    };

                                    return (
                                        <View className="flex items-end">
                                            <Text className="font-workSemiBold text-gray-500">
                                                {label}
                                            </Text>
                                            <Icon
                                                width={
                                                    iconSize[
                                                        label.toLowerCase()
                                                    ]?.width || 40
                                                }
                                                height={
                                                    iconSize[
                                                        label.toLowerCase()
                                                    ]?.height || 20
                                                }
                                            />
                                        </View>
                                    );
                                })()}
                        </View>
                    </View>
                </View>
            </View>
        );
    };

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
        } else if (index == -1) {
            setMonthsIndex(11);
        } else {
            setMonthsIndex(index);
        }
    };

    useEffect(() => {
        const unsubscribeDetailBooking = onValue(
            ref(db, "booking/" + account.booking + "/" + account.id),
            (userSnapshot) => {
                userSnapshot.exists()
                    ? setDetailBookings(userSnapshot.val())
                    : setDetailBookings(null);
            }
        );

        return () => unsubscribeDetailBooking();
    }, [account.booking]);

    const details = [
        { label: "Tempat", value: detailBookings?.nameLocation ?? "" },
        { label: "Alamat", value: detailBookings?.address ?? "" },
        {
            label: "Waktu",
            value: detailBookings ? convertToWIB(detailBookings.timestamp) : "",
        },
        {
            label: "Tanggal",
            value: detailBookings
                ? getFormattedDateWIB(detailBookings.timestamp)
                : "",
        },
        { label: "Plat Nomor", value: detailBookings?.platNomor ?? "" },
        { label: "Metode Pembayaran", value: detailBookings?.methode ?? "" },
        { label: "Jumlah", value: detailBookings?.cost ?? 0 },
    ];
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#F2F1F9" />
            <SafeAreaView style={{ flex: 1 }}>
                <View className="my-10 bg-defaultBackground ">
                    <Text className="font-workSemiBold text-3xl ml-3 mb-5">
                        Detail Booking
                    </Text>
                    <View className="w-[95%] rounded-full bg-gray-200 flex-row justify-evenly p-3 mx-auto">
                        <TouchableOpacity
                            onPress={() => setIsActive("left")}
                            className={`${
                                isActive == "left" ? "bg-orange-500 " : null
                            } flex-row items-center px-3 py-2 gap-2 rounded-full`}
                        >
                            <FontAwesome5
                                name="money-bill-alt"
                                size={22}
                                color={isActive == "left" ? "white" : "#6b7280"}
                            />
                            <Text
                                className={`${
                                    isActive == "left" ? " text-white" : null
                                } font-maison  text-gray-500`}
                            >
                                Antrian
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setIsActive("middle")}
                            className={`${
                                isActive === "middle" ? "bg-orange-500 " : null
                            } flex-row items-center px-3 gap-2 rounded-full`}
                        >
                            <FontAwesome5
                                name="parking"
                                size={24}
                                color={
                                    isActive == "middle" ? "white" : "#6b7280"
                                }
                            />
                            <Text
                                className={`${
                                    isActive === "middle" ? " text-white" : null
                                } font-maison text-gray-500`}
                            >
                                Sedang parkir
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setIsActive("right")}
                            className={`${
                                isActive === "right" ? "bg-orange-500 " : null
                            } flex-row items-center px-3 gap-2 rounded-full`}
                        >
                            <AntDesign
                                name="checkcircle"
                                size={24}
                                color={
                                    isActive == "right" ? "white" : "#6b7280"
                                }
                            />

                            <Text
                                className={`${
                                    isActive === "right" ? " text-white" : null
                                } font-maison text text-gray-500`}
                            >
                                Selesai
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {isActive === "left" ? (
                        <View>
                            <View className="mt-5 w-[90%] mx-auto flex">
                                <View className="my-3">
                                    <View className="bg-white rounded-3xl my-1 px-5 py-4 flex-row justify-between gap-1">
                                        <TouchableOpacity
                                            className="rounded-full border-4 border-gray-300 p-2 my-auto"
                                            onPress={() =>
                                                handleMonths(monthsIndex - 1)
                                            }
                                        >
                                            <MaterialIcons
                                                name="keyboard-arrow-left"
                                                size={20}
                                                color="#01aed6"
                                            />
                                        </TouchableOpacity>
                                        <View className="flex-row gap-2 w-2/3 items-center ">
                                            <View className="flex-1">
                                                <Text className="font-workSemiBold text-2xl mx-auto">
                                                    {months[monthsIndex]}
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            className="rounded-full border-4 border-gray-300 p-2 my-auto"
                                            onPress={() =>
                                                handleMonths(monthsIndex + 1)
                                            }
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
                            {list.length === 0 ? (
                                <View className="w-4/5 m-auto mt-52">
                                    <Text className="font-work text-gray-500 m-auto text-center">
                                        Belum ada log booking bulan{" "}
                                        {months[monthsIndex]}
                                    </Text>
                                </View>
                            ) : (
                                <FlatList
                                    className="w-[90%] mx-auto bg-defaultBackground flex mb-32"
                                    data={list}
                                    renderItem={renderItem}
                                    keyExtractor={(item, index) =>
                                        index.toString()
                                    }
                                    contentContainerStyle={{
                                        paddingBottom: 300,
                                    }}
                                    showsVerticalScrollIndicator={false}
                                />
                            )}
                        </View>
                    ) : null}
                </View>
            </SafeAreaView>
        </>
    );
};

export default listBooking;
