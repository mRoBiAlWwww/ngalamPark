import { View, Text, StatusBar, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
    get,
    getDatabase,
    onValue,
    ref,
    remove,
    set,
    update,
} from "firebase/database";
import ButtonRegister, { Button } from "../../../../components/ButtonRegister";
import InputRegister from "../../../../components/InputRegister";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import Toast from "react-native-toast-message";
import Shopee from "../../../../assets/images/dummyShopeepay.svg";
import Ovo from "../../../../assets/images/ovo2.svg";
import { ScrollView } from "react-native";
import {
    Feather,
    FontAwesome6,
    Ionicons,
    MaterialIcons,
    Octicons,
} from "@expo/vector-icons";
import { setUserAccount } from "@/redux/slice/userAccountSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface ParkData {
    id: string;
    address: string;
    name: string;
    officer: string;
    rate: number;
    review: string;
    slot: number;
}
export interface Nominal {
    ovo: number;
    shopeepay: number;
    coin: number;
}
const showToast = (message: string) => {
    Toast.show({
        type: "error",
        text1: message,
    });
};

export interface Methode {
    ovo: number;
    shopeepay: number;
    coin: number;
}

const DetailSearch = () => {
    const { id, location, nameLocation } = useLocalSearchParams();
    const idString = String(id);
    const db = getDatabase();
    const [isShow, setIsShow] = useState<boolean>(false);
    const [detailSearchResult, setDetailSearchResult] =
        useState<ParkData | null>(null);
    const [name, setName] = useState<string>("");
    const [jenis, setJenis] = useState<string>("");
    const [nomor, setNomor] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [methodChoice, setMethodChoice] = useState<string>("");
    const [methode, setMethode] = useState<Methode | null>();
    const [isPress, setIsPress] = useState<string>("");
    const dispatch = useDispatch();
    const account = useSelector((state: RootState) => state.userAccount);
    const [showOption, setShowOption] = useState<boolean>(false);
    const [nominal, setNominal] = useState<Nominal>({
        ovo: 0,
        shopeepay: 0,
        coin: 0,
    });
    const isValidPlateNumber = (plate: string) =>
        /^[A-Z]{1,2}\s\d{1,4}\s?[A-Z]{0,3}$/.test(plate);

    const isValidDate = (date: string) =>
        /^\d{2}\/\d{2}\/\d{4}$/.test(date) &&
        (() => {
            const [day, month, year] = date.split("/").map(Number);
            const daysInMonth = new Date(year, month, 0).getDate();
            return day > 0 && day <= daysInMonth && month >= 1 && month <= 12;
        })();

    const handleDetailSearch = async () => {
        try {
            const snapshot = await get(ref(db, "parkLocation/" + id));
            const detailParks = snapshot.val();
            setDetailSearchResult(detailParks);
        } catch (error: any) {
            showToast(error.message);
        }
    };

    const getMethode = async () => {
        try {
            const methodSnapshot = await get(
                ref(db, "users/" + account.id + "/saldo")
            );
            setMethode(methodSnapshot.val());
        } catch (error: any) {
            showToast(error.message);
        }
    };

    const countSaldo = () => {
        if (methode) {
            if (methodChoice === "ovo" && methode.ovo < 4000) {
                setMethodChoice("");
                return true;
            } else if (
                methodChoice === "shopeepay" &&
                methode.shopeepay < 4000
            ) {
                setMethodChoice("");
                return true;
            } else if (methodChoice === "coin" && methode.coin < 40) {
                setMethodChoice("");
                return true;
            }
        }
        return false;
    };

    const saveBooking = async () => {
        if (!name || !jenis || !nomor || !date || !methode) {
            showToast("Error, Harap isi semua field!");
            return;
        }
        if (!isValidPlateNumber(nomor))
            return showToast("Format Plat nomor salah.");

        if (!isValidDate(date)) return showToast("Format tanggal salah.");

        try {
            dispatch(
                setUserAccount({
                    id: account.id,
                    name: account.name,
                    PIN: account.PIN,
                    booking: id.toString(),
                    // bookingList: account.bookingList,
                    email: account.email,
                })
            );
            await set(ref(db, "booking/" + id + "/" + account.id), {
                officerId: id,
                accountId: account.id,
                userName: name,
                cost: 4000,
                address: location,
                platNomor: nomor,
                methode: methodChoice,
                nameLocation,
                timestamp: new Date().toISOString(),
            });

            if (methodChoice === "coin") {
                await update(ref(db, `users/${account.id}/saldo/`), {
                    coin:
                        (
                            await get(ref(db, `users/${account.id}/saldo/coin`))
                        ).val() - 40,
                });
            } else {
                const getSaldo = await get(
                    ref(db, "users/" + account.id + "/saldo/" + methodChoice)
                );
                await update(ref(db, "users/" + account.id + "/saldo/"), {
                    [methodChoice]: getSaldo.val() - 4000,
                });
            }
            await update(ref(db, `parkLocation/${id}`), {
                slot: (await get(ref(db, `parkLocation/${id}/slot`))).val() - 1,
            });

            showToast("Sukses, Data kendaraan berhasil disimpan!");
            router.back();
            router.back();
        } catch (error: unknown) {
            if (error instanceof Error) {
                showToast("Error, Gagal menyimpan data: " + error.message);
            } else {
                showToast("Error, Gagal menyimpan data: " + String(error));
            }
        }
    };

    useEffect(() => {
        getMethode();
    }, []);

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

    useEffect(() => {
        const unsubscribe = onValue(
            ref(db, "users/" + account.id + "/saldo"),
            (snapshot) => {
                if (snapshot.exists()) {
                    setNominal(snapshot.val());
                }
            }
        );
        return () => unsubscribe();
    }, []);

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
            {isShow && (
                <View
                    className="absolute inset-0 z-40 flex justify-center items-center h-screen"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <View className="w-4/5 rounded-3xl bg-white p-10 flex gap-3">
                        <Text className="font-workSemiBold text-xl">
                            Booking Parkir
                        </Text>
                        <InputRegister
                            placeholder="Nama Lengkap"
                            value={name}
                            onChangeText={setName}
                        >
                            <Feather
                                name="user"
                                size={25}
                                color="rgb(202, 202, 202)"
                                className=" pr-1"
                            />
                        </InputRegister>
                        <InputRegister
                            placeholder="Jenis Kendaraan"
                            value={jenis}
                            onChangeText={setJenis}
                        >
                            <FontAwesome6
                                name="motorcycle"
                                size={20}
                                color="rgb(202, 202, 202)"
                                className="pr-2 -ml-1 "
                            />
                        </InputRegister>
                        <InputRegister
                            placeholder="No kendaraan"
                            value={nomor}
                            onChangeText={setNomor}
                        >
                            <Octicons
                                name="number"
                                size={25}
                                color="rgb(202, 202, 202)"
                                className="pr-3 pl-1"
                            />
                        </InputRegister>
                        <InputRegister
                            placeholder="dd/mm/yyyy"
                            value={date}
                            onChangeText={setDate}
                        >
                            <AntDesign
                                name="calendar"
                                size={25}
                                color="rgb(202, 202, 202)"
                                className="pr-2"
                            />
                        </InputRegister>
                        <View className="flex gap-3 border-2 border-gray-300 rounded-xl py-2 px-5 ">
                            <View className="flex-row items-center">
                                <Ionicons
                                    name="wallet-outline"
                                    size={25}
                                    color="rgb(202, 202, 202)"
                                    className="pr-3"
                                />
                                <Text className="font-work text-gray-400">
                                    Metode pembayaran
                                </Text>
                            </View>
                            <TouchableOpacity
                                className="pl-[2px] flex-row justify-between items-center border-b-[1px] py-3 border-gray-300"
                                onPress={() => {
                                    setMethodChoice("ovo");
                                    setIsPress("ovo");
                                }}
                            >
                                <Ovo width={50} height={25} />
                                <View className="flex-row gap-2 items-center">
                                    <Text className="font-work text-gray-300">
                                        IDR
                                    </Text>
                                    <Text
                                        className={`${
                                            isPress === "ovo"
                                                ? "text-primary"
                                                : null
                                        } font-workSemiBold text-l`}
                                    >
                                        {nominal.ovo}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className=" pl-[2px] flex-row justify-between items-center border-b-[1px] py-3 border-gray-300"
                                onPress={() => {
                                    setMethodChoice("shopeepay");
                                    setIsPress("shopeepay");
                                }}
                            >
                                <Shopee width={60} height={30} />
                                <View className="flex-row gap-2 items-center">
                                    <Text className="font-work text-gray-300">
                                        IDR
                                    </Text>
                                    <Text
                                        className={`${
                                            isPress === "shopeepay"
                                                ? "text-primary"
                                                : null
                                        } font-workSemiBold text-l`}
                                    >
                                        {nominal.shopeepay}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="pl-[2px] flex-row justify-between items-center py-3"
                                onPress={() => {
                                    setMethodChoice("coin");
                                    setIsPress("coin");
                                }}
                            >
                                <Image
                                    source={require("../../../../assets/images/star.png")}
                                    className="w-6 h-6"
                                />
                                <Text
                                    className={`${
                                        isPress === "coin"
                                            ? "text-primary"
                                            : null
                                    } font-workSemiBold text-l`}
                                >
                                    {nominal.coin}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Button
                            title="Booking"
                            onPress={() => {
                                const error = countSaldo();
                                if (error) {
                                    showToast("Saldo tidak cukup");
                                } else {
                                    setIsShow(!isShow);
                                    saveBooking();
                                }
                            }}
                            componentStyle=" px-5 py-3 rounded-full flex justify-center items-center w-full mx-auto overflow-hidden"
                            textStyle="text-white font-bold text-xl"
                            colors={["#33D3F8", "#1B859D"]}
                        />
                    </View>
                </View>
            )}
            <ScrollView
                className={`bg-loginColor h-full px-10 relative mx-auto pt-10`}
            >
                <View className="relative min-h-screen">
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
                                <Entypo
                                    name="time-slot"
                                    size={20}
                                    color="black"
                                />
                                <Text className="font-work text-xl">
                                    Sisa slot : {detailSearchResult?.slot}/40
                                </Text>
                            </View>
                            <View className="flex-row gap-5">
                                <FontAwesome
                                    name="user"
                                    size={24}
                                    color="black"
                                />
                                <Text className="font-work text-xl">
                                    Bapak {detailSearchResult?.officer}
                                </Text>
                            </View>
                            <View className="flex-row gap-4">
                                <Entypo
                                    name="address"
                                    size={24}
                                    color="black"
                                />
                                <Text className="font-work text-xl">
                                    {detailSearchResult?.address}
                                </Text>
                            </View>
                        </View>
                        <View className="flex-row gap-2 mt-2">
                            {detailSearchResult?.rate !== undefined &&
                                countStar(detailSearchResult.rate)}
                        </View>
                        <View className="flex-row items-center justify-end -ml-16">
                            <TouchableOpacity
                                onPress={() => {
                                    setShowOption(!showOption);
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
                    </View>
                    <View className="bg-white rounded-3xl border-2 border-gray-200 p-3 my-5 mx-auto w-full">
                        <Text className="font-work text-xl">
                            {detailSearchResult?.review}
                        </Text>
                    </View>
                    <ButtonRegister
                        title="Booking"
                        onPress={() => {
                            setIsShow(!isShow);
                        }}
                        componentStyle="px-5 py-3 rounded-full font-bold flex justify-center items-center w-full mx-auto overflow-hidden "
                        textStyle="text-white text-lg font-custom"
                        colors={["#33D3F8", "#1B859D"]}
                    />
                </View>
            </ScrollView>
        </>
    );
};

export default DetailSearch;
