import { router, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import {
    BackHandler,
    Image,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
    FlatList,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import Shopee from "../../../assets/images/dummyShopeepay.svg";
import Ovo from "../../../assets/images/ovo2.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { get, getDatabase, ref } from "firebase/database";
import Toast from "react-native-toast-message";

const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(amount);
};

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

const homeUser: React.FC = () => {
    const pathname = usePathname();
    const [showSaldo, setShowSaldo] = useState<boolean>(false);
    const [ewallet, setEwallet] = useState<string>("ovo");
    const [search, setSearch] = useState<string>("");
    const [searchResult, setSearchResult] = useState<ParkData[]>([]);

    const db = getDatabase();

    const renderItem = ({ item }: { item: ParkData }) => (
        <TouchableOpacity
            onPress={() => {
                console.log(item.id);
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
                <View className="flex-row gap-3 mb-2">
                    <AntDesign name="contacts" size={20} color="black" />
                    <Text className="font-work text-sm">{item.officer}</Text>
                </View>
                <Text className="font-work text-sm">{item.review}</Text>
            </View>
        </TouchableOpacity>
    );

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

    const handleSearch = async (input: string) => {
        try {
            const snapshot = await get(ref(db, "parkLocation"));
            if (snapshot.exists()) {
                const parks = snapshot.val();
                const results: ParkData[] = []; // Gunakan array untuk menampung hasil

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
            } else {
                console.log("No data available");
            }
        } catch (error: any) {
            console.error("Error fetching data:", error);
            showToast(error.message);
        }
    };

    useEffect(() => {
        handleSearch(search);
    }, [search]);

    const account = useSelector((state: RootState) => state.userAccount);

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={showSaldo ? "#01586c" : "#01aed6"}
            />
            <View className="bg-defaultBackground mb-20 relative">
                {showSaldo && (
                    <View
                        className="absolute inset-0 z-40 flex justify-center items-center"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    >
                        <View className="bg-slate-900 w-4/5 h-1/4 p-4 rounded-3xl shadow-lg flex justify-center items-center px-8">
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
                                        {formatRupiah(account.saldo.ovo)}
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
                                        {formatRupiah(account.saldo.shopeepay)}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
                <View className="bg-primary rounded-b-3xl relative z-20">
                    <View className="flex-row justify-around mt-8">
                        <View>
                            <Text className="font-workSemiBold text-white text-3xl">
                                Halo, {account.name} !
                            </Text>
                            <Text className="font-work text-white ">
                                Ke mana kamu pergi hari ini?
                            </Text>
                        </View>
                        <Text className="font-work text-white text-xl">
                            100
                        </Text>
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
                                    ? formatRupiah(account.saldo.ovo)
                                    : formatRupiah(account.saldo.shopeepay)}
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
                    <View className="bg-white rounded-2xl w-[90%] mx-auto flex-row border-[1px] border-gray-300 px-6 py-2 absolute right-6 top-[160px] items-center">
                        <Feather name="search" size={24} color="black" />
                        <TextInput
                            value={search}
                            onChangeText={setSearch}
                            className="ml-4"
                            placeholder="Cari lokasi parkirmu disini "
                            style={{ fontFamily: "WorkSans" }}
                        />
                    </View>
                </View>
                {search ? (
                    <View className="pt-12 px-6">
                        <Text className="font-workSemiBold text-2xl">
                            Hasil Pencarian
                        </Text>
                        {searchResult &&
                        Array.isArray(searchResult) &&
                        searchResult.length > 0 ? (
                            <FlatList
                                data={searchResult} // Gunakan searchResult langsung tanpa Object.values
                                renderItem={renderItem}
                                keyExtractor={(item, index) =>
                                    item.id ? item.id : `${index}`
                                }
                            />
                        ) : null}
                    </View>
                ) : (
                    <ScrollView
                        className="pt-12 px-6"
                        contentContainerStyle={{ paddingBottom: 180 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <View className="mb-10">
                            <Text className="font-workSemiBold text-2xl">
                                Favorit
                            </Text>
                            {/* pake flatlist */}
                            <View className="bg-white border-[1px] border-gray-300 rounded-2xl p-3 gap-2 flex-row my-2">
                                <View className="w-1/4 mt-2">
                                    <Image
                                        className="w-24 h-40 rounded-lg "
                                        source={require("../../../assets/images/dummyBento.png")}
                                    />
                                </View>
                                <View className="w-3/4 flex gap-1 px-2">
                                    <Text className="font-workSemiBold text-lg">
                                        Bento Kopi UIN Malang
                                    </Text>
                                    <View className="flex-row gap-3 ml-1">
                                        <FontAwesome6
                                            name="location-dot"
                                            size={20}
                                            color="black"
                                        />
                                        <Text className="font-work text-sm">
                                            Dinoyo, Lowokwaru, Malang.
                                        </Text>
                                    </View>
                                    <View className="flex-row gap-3 mb-2">
                                        <AntDesign
                                            name="contacts"
                                            size={20}
                                            color="black"
                                        />
                                        <Text className="font-work text-sm">
                                            Bapak Suryanto
                                        </Text>
                                    </View>
                                    <Text className="font-work text-sm">
                                        Tempatnya bagus banget dan luas, petugas
                                        parkirnya ramah - ramah. Dengan tempat
                                        parkir yang luas sangat memudahkan
                                        sekali.
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View className="flex-row gap-2 ">
                            <View className="bg-gray-100 rounded-2xl overflow-hidden w-1/2">
                                <View className="h-32">
                                    <Image
                                        className="w-full h-full"
                                        source={require("../../../assets/images/dummyPujas.jpg")}
                                    />
                                </View>
                                <View className="gap-2 p-4">
                                    <Text className="font-workSemiBold text">
                                        Bento Kopi UIN Malang
                                    </Text>
                                    <Text className="font-work text-sm">
                                        Tempatnya bagus banget dan luas, petugas
                                        parkirnya ramah - ramah. Dengan tempat
                                        parkir yang luas sangat memudahkan
                                        sekali.
                                    </Text>
                                </View>
                            </View>
                            <View className="bg-gray-100 rounded-2xl overflow-hidden w-1/2">
                                <View className="h-32">
                                    <Image
                                        className="w-full h-full"
                                        source={require("../../../assets/images/dummyPujas.jpg")}
                                    />
                                </View>
                                <View className="gap-2 p-4">
                                    <Text className="font-workSemiBold text">
                                        Bento Kopi UIN Malang
                                    </Text>
                                    <Text className="font-work text-sm">
                                        Tempatnya bagus banget dan luas, petugas
                                        parkirnya ramah - ramah. Dengan tempat
                                        parkir yang luas sangat memudahkan
                                        sekali.
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
