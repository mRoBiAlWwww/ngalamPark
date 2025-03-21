import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Shopeepay from "../../assets/images/dummyShopeepay.svg";
import OVO from "../../assets/images/ovo2.svg";
import Coin from "../../assets/images/coin.svg";
import { StatusBar } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
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
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { SvgProps } from "react-native-svg";

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

const activity: React.FC = () => {
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
            month: "long",
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
                                source={require("../../assets/images/Logo.jpg")}
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

    const processBooking = async () => {
        try {
            if (detailBookings) {
                await set(
                    push(
                        ref(
                            db,
                            "payment/" +
                                account.id +
                                "/" +
                                now.getFullYear() +
                                "/" +
                                (now.getMonth() + 1).toString().padStart(2, "0")
                        )
                    ),
                    {
                        address: detailBookings.address,
                        cost: detailBookings.cost,
                        methode: detailBookings.methode,
                        officerId: detailBookings.officerId,
                        platNomor: detailBookings.platNomor,
                        userName: detailBookings.userName,
                        timestamp: detailBookings.timestamp,
                        accountId: detailBookings.accountId,
                        nameLocation: detailBookings.nameLocation,
                    }
                );
                await update(ref(db, `users/${account.id}/saldo/`), {
                    coin:
                        (
                            await get(ref(db, `users/${account.id}/saldo/coin`))
                        ).val() + 2,
                });
                await remove(ref(db, "users/" + account.id + "/booking/"));
                await remove(
                    ref(db, "booking/" + account.booking + "/" + account.id)
                );
            }
            showToast("Booking berhasil diselesaikan");
        } catch (error: any) {
            showToast(error.message);
        }
    };

    const cancelBooking = async () => {
        try {
            if (detailBookings) {
                if (detailBookings.methode !== "coin") {
                    const getSaldo = await get(
                        ref(
                            db,
                            "users/" +
                                account.id +
                                "/saldo/" +
                                detailBookings.methode
                        )
                    );
                    await update(ref(db, "users/" + account.id + "/saldo/"), {
                        [detailBookings.methode as string]:
                            getSaldo.val() + 1500,
                    });
                }
                await remove(ref(db, "users/" + account.id + "/booking/"));
                await remove(
                    ref(db, "booking/" + account.booking + "/" + account.id)
                );
            }
            showToast("Booking sukses dibatalkan");
        } catch (error: any) {
            showToast(error.message);
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
                        Detail Aktivitas
                    </Text>
                    <View className="w-[90%] rounded-full bg-gray-200 flex-row justify-evenly p-2 mx-auto">
                        <TouchableOpacity
                            onPress={() => setIsActive("left")}
                            className={`${
                                isActive == "left" ? "bg-orange-500 " : null
                            } flex-row p-3 gap-2 rounded-full`}
                        >
                            <FontAwesome5
                                name="money-bill-alt"
                                size={22}
                                color={isActive == "left" ? "white" : "#6b7280"}
                            />
                            <Text
                                className={`${
                                    isActive == "left" ? " text-white" : null
                                } font-maison text-lg text-gray-500`}
                            >
                                Pengeluaran
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setIsActive("right")}
                            className={`${
                                isActive === "right" ? "bg-orange-500 " : null
                            } flex-row p-3 gap-2 rounded-full`}
                        >
                            <Feather
                                name="calendar"
                                size={22}
                                color={
                                    isActive == "right" ? "white" : "#6b7280"
                                }
                            />
                            <Text
                                className={`${
                                    isActive === "right" ? " text-white" : null
                                } font-maison text-lg text-gray-500`}
                            >
                                Non Pengeluaran
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
                                        Anda belum melakukan tranksaksi di bulan{" "}
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
                    ) : detailBookings === null ? (
                        <View className="py-72">
                            <Text className="font-work text-gray-500 m-auto">
                                Anda belum memiliki booking apapun sekarang
                            </Text>
                        </View>
                    ) : (
                        <View className="bg-white w-[90%] mx-auto my-8 rounded-2xl px-8 py-8">
                            <View className="mx-auto flex gap-5 mb-5">
                                <View className="bg-gray-200 rounded-full p-3 w-14 h-14 flex items-center mx-auto">
                                    <Text className="font-maison text-2xl ">
                                        {detailBookings.userName.charAt(0)}
                                    </Text>
                                </View>
                                <View className="mx-auto">
                                    <Text className="font-workSemiBold text-2xl mx-auto">
                                        {detailBookings.userName}
                                    </Text>
                                    <Text className="font-workSemiBold text-gray-300 text-sm">
                                        {detailBookings.accountId}
                                    </Text>
                                </View>
                            </View>

                            {details.map(({ label, value }, index) => (
                                <View
                                    key={index}
                                    className="flex-row justify-between mb-2"
                                >
                                    <Text className="font-workSemiBold text-lg text-gray-400">
                                        {label}
                                    </Text>
                                    <Text className="font-workSemiBold text-lg text-gray-400">
                                        {label === "Alamat"
                                            ? (value =
                                                  String(value).split(",")[0])
                                            : value}
                                    </Text>
                                </View>
                            ))}

                            <View className="flex gap-2 mt-10">
                                <TouchableOpacity
                                    className="bg-green-500 rounded-full p-2"
                                    onPress={processBooking}
                                >
                                    <Text className="mx-auto font-workSemiBold text-white text-xl">
                                        Konfirmasi Proses
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="bg-red-600 rounded-full p-2"
                                    onPress={cancelBooking}
                                >
                                    <Text className="mx-auto font-workSemiBold text-white text-xl">
                                        Batalkan Proses
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </>
    );
};

export default activity;
