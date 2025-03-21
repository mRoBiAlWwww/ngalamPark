import { useRouter } from "expo-router";
import {
    Image,
    ImageBackground,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store"; // Sesuaikan path store

const HomeOfficer: React.FC = () => {
    const router = useRouter();
    const officer = useSelector((state: RootState) => state.officerAccount);
    console.log(officer.nameLocation, " asli");
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#3B82F6" />
            <View className="flex-1 bg-gray-100">
                <View className="flex-row justify-between items-center px-5 pt-10 pb-3">
                    <Image
                        className="rounded-full w-10 h-10"
                        source={require("../../../assets/images/dummyUser.jpg")}
                    />
                    <TouchableOpacity className="bg-green-500 flex-row items-center justify-center py-2 px-4 rounded-lg">
                        <MaterialIcons name="warning" size={20} color="white" />
                        <Text className="font-workSemiBold text-white text-base ml-2">
                            Kebijakan Tukang Parkir
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className=" bg-gray-500 rounded-full p-2">
                        <MaterialIcons
                            name="question-mark"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
                {/* Header Section */}
                <ImageBackground
                    source={require("../../../assets/images/Rectangle.png")} // Ganti dengan path gambar Anda
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
                                source={require("../../../assets/images/dummyUser.jpg")}
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
                            <Text className="font-work text-gray-500">
                                08:20
                            </Text>
                            <Text className="font-work text-gray-500">
                                Honda Beat
                            </Text>
                        </View>
                    </View>
                    {/* Booking Item 2 */}
                    <View className="flex-row items-center justify-between border-b border-gray-200 py-3">
                        <View className="flex-row items-center gap-3">
                            <Image
                                className="rounded-full w-10 h-10"
                                source={require("../../../assets/images/dummyUser.jpg")}
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
                            <Text className="font-work text-gray-500">
                                08:20
                            </Text>
                            <Text className="font-work text-gray-500">
                                Honda Scoopy
                            </Text>
                        </View>
                    </View>
                    {/* Booking Item 3 */}
                    <View className="flex-row items-center justify-between py-3">
                        <View className="flex-row items-center gap-3">
                            <Image
                                className="rounded-full w-10 h-10"
                                source={require("../../../assets/images/dummyUser.jpg")}
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
                            <Text className="font-work text-gray-500">
                                07:25
                            </Text>
                            <Text className="font-work text-gray-500">
                                Yamaha N-Max
                            </Text>
                        </View>
                    </View>
                    {/* See More Button */}
                    <TouchableOpacity
                        onPress={() => router.push("/(list)/listBooking")}
                        className="flex-row items-center justify-center mt-3"
                    >
                        <Text className="font-work text-black mr-2">
                            Cek daftar selengkapnya
                        </Text>
                        <MaterialIcons
                            name="arrow-forward"
                            size={20}
                            color="#3B82F6"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </>
        // import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
        // import React, { useEffect, useState } from "react";
        // import { useSelector } from "react-redux";
        // import { RootState } from "@/redux/store";
        // import {
        //     equalTo,
        //     get,
        //     getDatabase,
        //     orderByChild,
        //     ref,
        //     query,
        //     onValue,
        //     remove,
        //     update,
        // } from "firebase/database";
        // import Toast from "react-native-toast-message";
        // import { AntDesign, FontAwesome6, MaterialIcons } from "@expo/vector-icons";

        // interface BookingData {
        //     address: string;
        //     cost: number;
        //     methode: string;
        //     officerId: string;
        //     accountId: string;
        //     platNomor: string;
        //     timestamp: string;
        //     userName: string;
        // }

        // const showToast = (message: string) => {
        //     Toast.show({
        //         type: "error",
        //         text1: message,
        //     });
        // };

        // const renderItem = ({ item }: { item: BookingData }) => {
        //     const db = getDatabase();
        //     const removeBooking = async () => {
        //         const getSaldo = await get(
        //             ref(db, "users/" + item.accountId + "/saldo/" + item.methode)
        //         );
        //         if (item.methode === "coin") {
        //             await update(ref(db, "users/" + item.accountId + "/saldo/"), {
        //                 coin: getSaldo.val() + 40,
        //             });
        //         } else {
        //             await update(ref(db, "users/" + item.accountId + "/saldo/"), {
        //                 [item.methode as string]: getSaldo.val() + 4000,
        //             });
        //         }
        //         await remove(ref(db, "users/" + item.accountId + "/booking/"));
        //         await remove(
        //             ref(db, "booking/" + item.officerId + "/" + item.accountId)
        //         );
        //     };
        //     return (
        //         <TouchableOpacity className="bg-white border-[1px] border-gray-300 rounded-2xl p-3 gap-2 flex-row my-2">
        //             <View className="w-3/4 flex gap-1 pl-2 pr-5">
        //                 <Text className="font-workSemiBold text-lg">
        //                     {item.address}
        //                 </Text>
        //                 <View className="flex-row gap-3 ml-1">
        //                     <FontAwesome6 name="location-dot" size={20} color="black" />
        //                     <Text className="font-work text-sm">{item.cost}</Text>
        //                 </View>
        //                 <View className="flex-row gap-2 mb-2">
        //                     <AntDesign name="contacts" size={20} color="black" />
        //                     <Text className="font-work text-sm">{item.platNomor}</Text>
        //                 </View>
        //                 <Text className="font-work text-sm">{item.timestamp}</Text>
        //                 <Text className="font-work text-sm">{item.userName}</Text>
        //                 <TouchableOpacity onPress={removeBooking}>
        //                     <MaterialIcons name="cancel" size={24} color="red" />
        //                 </TouchableOpacity>
        //             </View>
        //         </TouchableOpacity>
        //     );
        // };

        // const homeOfficer: React.FC = () => {
        //     const [searchResult, setSearchResult] = useState<BookingData[] | null>(
        //         null
        //     );
        //     const [location, setLocation] = useState<string>("");

        //     const officer = useSelector((state: RootState) => state.officerAccount);
        //     const db = getDatabase();

        //     const handleSearch = async () => {
        //         try {
        //             const snapShot = await get(
        //                 query(
        //                     ref(db, "parkLocation"),
        //                     orderByChild("name"),
        //                     equalTo(officer.location.toLowerCase())
        //                 )
        //             );
        //             snapShot.forEach((childSnapshot) => {
        //                 setLocation(childSnapshot.key);
        //             });
        //         } catch (error: any) {
        //             showToast(error.message);
        //         }
        //     };

        //     useEffect(() => {
        //         if (location !== "") {
        //             const fetchBookings = () => {
        //                 onValue(ref(db, "booking/" + location), (snapshot) => {
        //                     const bookings = snapshot.val();
        //                     if (bookings) {
        //                         const bookingsArray: BookingData[] =
        //                             Object.values(bookings);
        //                         setSearchResult(bookingsArray);
        //                     } else {
        //                         setSearchResult(null);
        //                     }
        //                 });
        //             };
        //             fetchBookings();
        //         }
        //     }, [location]);

        //     useEffect(() => {
        //         handleSearch();
        //     }, []);

        //     return (
        //         <View>
        //             <FlatList
        //                 data={searchResult}
        //                 renderItem={renderItem}
        //                 keyExtractor={(item, index) => `${index}`}
        //                 ListHeaderComponent={
        //                     <View className="pt-12 px-6">
        //                         <Text className="font-workSemiBold text-2xl">
        //                             Hasil Pencarian
        //                         </Text>
        //                     </View>
        //                 }
        //                 contentContainerStyle={{
        //                     paddingHorizontal: 21,
        //                     paddingBottom: 120,
        //                 }}
        //                 showsVerticalScrollIndicator={false}
        //             />
        //         </View>
    );
};

export default HomeOfficer;
