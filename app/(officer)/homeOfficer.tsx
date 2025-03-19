import { useRouter } from "expo-router";
import { Image, ImageBackground, StatusBar, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import { RootState } from "../../../ngalamPark/redux/store"; // Sesuaikan path store

const HomeOfficer: React.FC = () => {
    const router = useRouter();
    const account = useSelector((state: RootState) => state.userAccount);

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#3B82F6" />
            <View className="flex-1 bg-gray-100">
                <View className="flex-row justify-between items-center px-5 pt-10 pb-3">
                    <Image
                        className="rounded-full w-10 h-10"
                        source={require("../../assets/images/dummyUser.jpg")}
                    />
                    <TouchableOpacity className="bg-green-500 flex-row items-center justify-center py-2 px-4 rounded-lg">
                        <MaterialIcons name="warning" size={20} color="white" />
                        <Text className="font-workSemiBold text-white text-base ml-2">
                            Kebijakan Tukang Parkir
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className=" bg-gray-500 rounded-full p-2">
                        <MaterialIcons name="question-mark" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                {/* Header Section */}
                <ImageBackground
                    source={require("../../assets/images/Rectangle.png")} // Ganti dengan path gambar Anda
                    className="px-5 pt-10 pb-5 m-5 rounded-t-3xl"
                    style={{ overflow: "hidden" }}
                    resizeMode="cover"
                >
                    {/* Teks Tersisa dan Slot */}
                    <View className="mt-5">
                        <Text className="font-workSemiBold text-white text-lg">
                            Tersisa
                        </Text>
                        <Text className="font-workSemiBold text-5xl text-white mt-2">
                            129 Slot
                        </Text>
                    </View>

                    {/* Tabs Section */}
                    <View className="flex-row justify-around mx-5 mt-5">
                        <TouchableOpacity className="border py-2 px-5 rounded-full">
                            <Text className="font-workSemiBold text-white">
                                Pendapatan
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="border py-2 px-5 rounded-full">
                            <Text className="font-workSemiBold text-white">
                                Total Kendaraan
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                {/* Booking List Section */}
                <View className="bg-white mx-5 mt-5 rounded-2xl p-5 shadow-md">
                    <Text className="font-workSemiBold text-xl mb-3">
                        Daftar Booking
                    </Text>
                    {/* Booking Item 1 */}
                    <View className="flex-row items-center justify-between border-b border-gray-200 py-3">
                        <View className="flex-row items-center gap-3">
                            <Image
                                className="rounded-full w-10 h-10"
                                source={require("../../assets/images/dummyUser.jpg")}
                            />
                            <View>
                                <Text className="font-workSemiBold text-gray-800">
                                    Budi Santoso
                                </Text>
                                <Text className="font-work text-gray-500">
                                    #132B3216322
                                </Text>
                            </View>
                        </View>
                        <View className="flex items-end">
                        <Text className="font-work text-gray-500">08:20</Text>
                        <Text className="font-work text-gray-500">Honda Beat</Text>
                        </View>
                    </View>
                    {/* Booking Item 2 */}
                    <View className="flex-row items-center justify-between border-b border-gray-200 py-3">
                        <View className="flex-row items-center gap-3">
                            <Image
                                className="rounded-full w-10 h-10"
                                source={require("../../assets/images/dummyUser.jpg")}
                            />
                            <View>
                                <Text className="font-workSemiBold text-gray-800">
                                    Johan Meyer
                                </Text>
                                <Text className="font-work text-gray-500">
                                    #240B3086210
                                </Text>
                            </View>
                        </View>
                        <View className="flex items-end">
                        <Text className="font-work text-gray-500">08:20</Text>
                        <Text className="font-work text-gray-500">Honda Scoopy</Text>
                        </View>
                    </View>
                    {/* Booking Item 3 */}
                    <View className="flex-row items-center justify-between py-3">
                        <View className="flex-row items-center gap-3">
                            <Image
                                className="rounded-full w-10 h-10"
                                source={require("../../assets/images/dummyUser.jpg")}
                            />
                            <View>
                                <Text className="font-workSemiBold text-gray-800">
                                    Tim Henson
                                </Text>
                                <Text className="font-work text-gray-500">
                                    #380B5701274 
                                </Text>
                            </View>
                        </View>
                        <View className="flex items-end">
                        <Text className="font-work text-gray-500">07:25</Text>
                        <Text className="font-work text-gray-500">Yamaha N-Max</Text>
                        </View>
                    </View>
                    {/* See More Button */}
                    <TouchableOpacity className="flex-row items-center justify-center mt-3">
                        <Text className="font-work text-black mr-2">
                            Cek daftar selengkapnya
                        </Text>
                        <MaterialIcons name="arrow-forward" size={20} color="#3B82F6" />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default HomeOfficer;