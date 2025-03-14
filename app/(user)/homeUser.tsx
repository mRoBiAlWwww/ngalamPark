import { usePathname, useRouter } from "expo-router";
import { useEffect } from "react";
import {
    BackHandler,
    Image,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";

const homeUser: React.FC = () => {
    const pathname = usePathname();
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

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#01aed6" />
            <View className="bg-white mb-20">
                <View className="bg-primary rounded-b-3xl relative z-40">
                    <View className="flex-row justify-around mt-8">
                        <View>
                            <Text className="font-workSemiBold text-white text-3xl">
                                Halo, Rasya Fariz!
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
                        <Image
                            className="w-16 h-16"
                            source={require("../../assets/images/ovo.png")}
                        />
                        <View className="flex-row items-center">
                            <Text className="text-sm text-gray-400 mr-2">
                                IDR
                            </Text>
                            <Text className="font-workSemiBold text-xl">
                                15.000
                            </Text>
                            <TouchableOpacity>
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
                            className="ml-4"
                            placeholder="Cari lokasi parkirmu disini"
                            style={{ fontFamily: "WorkSans" }}
                        ></TextInput>
                    </View>
                </View>
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
                                    source={require("../../assets/images/dummyBento.png")}
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
                                    parkir yang luas sangat memudahkan sekali.
                                </Text>
                            </View>
                        </View>
                        <View className="bg-white border-[1px] border-gray-300 rounded-2xl p-3 gap-2 flex-row my-2">
                            <View className="w-1/4 mt-2">
                                <Image
                                    className="w-24 h-40 rounded-lg "
                                    source={require("../../assets/images/dummyBento.png")}
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
                                    parkir yang luas sangat memudahkan sekali.
                                </Text>
                            </View>
                        </View>
                        <View className="bg-white border-[1px] border-gray-300 rounded-2xl p-3 gap-2 flex-row my-2">
                            <View className="w-1/4 mt-2">
                                <Image
                                    className="w-24 h-40 rounded-lg "
                                    source={require("../../assets/images/dummyBento.png")}
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
                                    parkir yang luas sangat memudahkan sekali.
                                </Text>
                            </View>
                        </View>
                        <View className="bg-white border-[1px] border-gray-300 rounded-2xl p-3 gap-2 flex-row my-2">
                            <View className="w-1/4 mt-2">
                                <Image
                                    className="w-24 h-40 rounded-lg "
                                    source={require("../../assets/images/dummyBento.png")}
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
                                    parkir yang luas sangat memudahkan sekali.
                                </Text>
                            </View>
                        </View>
                        <View className="bg-white border-[1px] border-gray-300 rounded-2xl p-3 gap-2 flex-row my-2">
                            <View className="w-1/4 mt-2">
                                <Image
                                    className="w-24 h-40 rounded-lg "
                                    source={require("../../assets/images/dummyBento.png")}
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
                                    parkir yang luas sangat memudahkan sekali.
                                </Text>
                            </View>
                        </View>
                        <View className="bg-white border-[1px] border-gray-300 rounded-2xl p-3 gap-2 flex-row my-2">
                            <View className="w-1/4 mt-2">
                                <Image
                                    className="w-24 h-40 rounded-lg "
                                    source={require("../../assets/images/dummyBento.png")}
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
                                    parkir yang luas sangat memudahkan sekali.
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View className="flex-row gap-2 ">
                        <View className="bg-gray-100 rounded-2xl overflow-hidden w-1/2">
                            <View className="h-32">
                                <Image
                                    className="w-full h-full"
                                    source={require("../../assets/images/dummyPujas.jpg")}
                                />
                            </View>
                            <View className="gap-2 p-4">
                                <Text className="font-workSemiBold text">
                                    Bento Kopi UIN Malang
                                </Text>
                                <Text className="font-work text-sm">
                                    Tempatnya bagus banget dan luas, petugas
                                    parkirnya ramah - ramah. Dengan tempat
                                    parkir yang luas sangat memudahkan sekali.
                                </Text>
                            </View>
                        </View>
                        <View className="bg-gray-100 rounded-2xl overflow-hidden w-1/2">
                            <View className="h-32">
                                <Image
                                    className="w-full h-full"
                                    source={require("../../assets/images/dummyPujas.jpg")}
                                />
                            </View>
                            <View className="gap-2 p-4">
                                <Text className="font-workSemiBold text">
                                    Bento Kopi UIN Malang
                                </Text>
                                <Text className="font-work text-sm">
                                    Tempatnya bagus banget dan luas, petugas
                                    parkirnya ramah - ramah. Dengan tempat
                                    parkir yang luas sangat memudahkan sekali.
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};
export default homeUser;
