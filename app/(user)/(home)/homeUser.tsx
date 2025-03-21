import { router, usePathname, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
    BackHandler,
    Image,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    FlatList,
    ScrollView,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import Shopee from "../../../assets/images/dummyShopeepay.svg";
import Ovo from "../../../assets/images/ovo2.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { get, getDatabase, onValue, ref } from "firebase/database";
import Toast from "react-native-toast-message";
import Rectangle from "../../../assets/images/Rectangle.svg";
import Rectangle2 from "../../../assets/images/Rectangle2.svg";

const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(amount);
};

export interface ParkData {
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

const homeUser: React.FC = () => {
    const pathname = usePathname();
    const [showSaldo, setShowSaldo] = useState<boolean>(false);
    const [ewallet, setEwallet] = useState<string>("ovo");
    const [nominal, setNominal] = useState<Nominal>({
        ovo: 0,
        shopeepay: 0,
        coin: 0,
    });
    const [search, setSearch] = useState<string>("");
    const [searchResult, setSearchResult] = useState<ParkData[]>([]);
    const [listFavorite, setListFavorite] = useState<ParkData[]>([]);
    const db = getDatabase();
    const account = useSelector((state: RootState) => state.userAccount);

    const renderItem = ({ item }: { item: ParkData }) => (
        <TouchableOpacity
            onPress={() => {
                router.push(`/${item.id}`);
            }}
            className="bg-white border-[1px] border-gray-300 rounded-2xl p-3 gap-2 flex-row my-2"
        >
            <View className="w-1/4 mt-2">
                <Image
                    className="w-24 h-40 rounded-lg "
                    source={require("../../../assets/images/dummyBento.png")}
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

    useEffect(() => {
        const backAction = () => {
            if (pathname === "/home") {
                return true;
            }
            return false;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [pathname]);

    useEffect(() => {
        handleSearch(search);
    }, [search]);

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

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = getFavorite(account.id);
            return () => unsubscribe();
        }, [account.id])
    );
    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={showSaldo ? "#01586c" : "#01aed6"}
            />
            <View className="bg-defaultBackground mb-20 relative">
                {showSaldo && (
                    <View
                        className="absolute inset-0 z-40 flex justify-center items-center h-screen"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    >
                        <View className="bg-primary w-4/5 h-1/4 p-4 rounded-3xl shadow-lg flex justify-center items-center px-8">
                            <View className="w-full gap-3">
                                <TouchableOpacity
                                    className="flex-row justify-between items-center px-5 bg-white rounded-2xl"
                                    onPress={() => {
                                        setShowSaldo((prev) => !prev);
                                        setEwallet("ovo");
                                    }}
                                >
                                    <Ovo height={64} width={64} />
                                    <Text className="text-purple-800 font-workSemiBold text-lg">
                                        {formatRupiah(nominal.ovo)}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="flex-row justify-between items-center px-5 bg-white rounded-2xl"
                                    onPress={() => {
                                        setShowSaldo((prev) => !prev);
                                        setEwallet("shopeepay");
                                    }}
                                >
                                    <Shopee width={64} height={64} />
                                    <Text className="text-orange-600 font-workSemiBold text-lg">
                                        {formatRupiah(nominal.shopeepay)}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
                <View className="bg-primary rounded-b-3xl relative z-20">
                    <View className="flex-row justify-between mt-8 px-6">
                        <View className="">
                            <Text className="font-workSemiBold text-white text-3xl">
                                Halo, {account.name} !
                            </Text>
                            <Text className="font-work text-white ">
                                Ke mana kamu pergi hari ini?
                            </Text>
                        </View>
                        <View className="flex-row h-1/2 items-center gap-2">
                            <Image
                                source={require("../../../assets/images/star.png")}
                                className="w-5 h-5"
                            />
                            <Text className="font-work text-white text-xl">
                                {nominal.coin}
                            </Text>
                        </View>
                    </View>
                    <View className="bg-white rounded-2xl w-[90%] mx-auto flex-row justify-between px-6 mt-3 mb-12">
                        <TouchableOpacity
                            onPress={() => setShowSaldo(!showSaldo)}
                        >
                            {ewallet == "ovo" ? (
                                <Ovo width={64} height={64} />
                            ) : (
                                <Shopee width={64} height={64} />
                            )}
                        </TouchableOpacity>
                        <View className="flex-row items-center">
                            <Text className="text-sm text-gray-400 mr-2">
                                IDR
                            </Text>
                            <Text className="font-workSemiBold text-xl">
                                {ewallet == "ovo"
                                    ? formatRupiah(nominal.ovo)
                                    : formatRupiah(nominal.shopeepay)}
                            </Text>
                            <TouchableOpacity
                                onPress={() => setShowSaldo(!showSaldo)}
                            >
                                <MaterialIcons
                                    name="keyboard-arrow-right"
                                    size={40}
                                    color="#01aed6"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="bg-white rounded-2xl w-[90%] mx-auto flex-row border-[1px] border-gray-300 px-6 py-2 absolute right-6 top-[160px] items-center justify-between z-40">
                        <View className="flex-row items-center">
                            <Feather name="search" size={24} color="black" />
                            <TextInput
                                value={search}
                                onChangeText={setSearch}
                                className="ml-4"
                                placeholder="Cari lokasi parkirmu disini "
                                style={{ fontFamily: "WorkSans" }}
                            />
                        </View>
                        {search && (
                            <TouchableOpacity onPress={() => setSearch("")}>
                                <AntDesign
                                    name="close"
                                    size={24}
                                    color="gray"
                                />
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

                        <View className="flex-row gap-2 px-4 mt-5 justify-center mb-52">
                            <View className="bg-gray-100 rounded-2xl overflow-hidden w-1/2 shadow-lg">
                                <View className="=flex items-center">
                                    <Rectangle />
                                </View>
                                <View className="gap-2 p-4">
                                    <Text className="font-workSemiBold text-2xl">
                                        Freepark
                                    </Text>
                                    <Text className="font-work text-sm">
                                        Bebas ribet, parkir makin gampang cuma
                                        dengan 100 ribu per bulan!
                                    </Text>
                                </View>
                            </View>
                            <View className="bg-gray-100 rounded-2xl overflow-hidden w-1/2 shadow-lg">
                                <View className="h-32">
                                    <Rectangle2 />
                                </View>
                                <View className="gap-2 p-4">
                                    <Text className="font-workSemiBold text-2xl">
                                        Freemium
                                    </Text>
                                    <Text className="font-work text-sm">
                                        Paket Premium Buat Kamu yang #MauLebih.
                                        Parkir nyaman, untung maksimal, cuma 150
                                        ribu per bulan!
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                )}
            </View>
        </>
    );
};
export default homeUser;
