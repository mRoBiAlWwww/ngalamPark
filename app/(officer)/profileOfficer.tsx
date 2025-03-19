import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { FIREBASE_AUTH } from "../../lib/firebaseconfig";
import Motor from "../../assets/images/Motorcycle.svg";
import Lock from "../../assets/images/LockKey.svg";
import FAQ from "../../assets/images/ChatsCircle.svg";
import Help from "../../assets/images/Question.svg";
import Pencil from "../../assets/images/PencilSimpleLine.svg";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSelector } from "react-redux"; // Ditambahkan untuk useSelector
import { RootState } from "../../../ngalamPark/redux/store"; // Asumsi lokasi store, sesuaikan jika berbeda

const ProfileOfficer: React.FC = () => {
    const router = useRouter();
    const account = useSelector((state: RootState) => state.userAccount);
    
    const handleSignOut = async (): Promise<void> => {
        try {
            await signOut(FIREBASE_AUTH);
            router.replace("/(auth)/defaultPage");
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#F2F1F9" />
            <View className="bg-defaultBackground px-10 h-full">
                <View className="border-b-2 border-gray-300 pt-10 pb-5 flex-row items-center gap-5">
                    <Image
                        className="rounded-full w-20 h-20"
                        source={require("../../assets/images/dummyUser.jpg")}
                    />
                    <View className="flex-row items-center">
                        <View>
                            <Text className="font-workSemiBold text-3xl">
                                Rasya Fariz
                            </Text>
                            <Text className="font-work text-sm text-gray-400">
                                rasyaafrz@student.ub.ac.id
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => router.push("/editProfile")}
                        >
                            <Pencil />
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="mt-8">
                    <Text className="font-workSemiBold text-xl mb-3">
                        Pengaturan Akun
                    </Text>
                    <View className="flex-row justify-between border-b-2 border-gray-300 mb-3 items-center">
                        <View className="flex-row gap-3 py-2 items-center mb-2">
                            <Lock />
                            <TouchableOpacity
                                onPress={() => router.push("/PIN")}
                            >
                                <Text className="font-work">Ubah PIN</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                            <MaterialIcons
                                name="keyboard-arrow-right"
                                size={30}
                                color="#4B4848"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="mt-3">
                    <Text className="font-workSemiBold text-xl mb-3">
                        Bantuan
                    </Text>
                    <View className="flex-row justify-between border-b-2 border-gray-300 mb-3 items-center">
                        <View className="flex-row gap-3 py-2 items-center mb-2">
                            <FAQ />
                            <TouchableOpacity>
                                <Text className="font-work">FAQ</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                            <MaterialIcons
                                name="keyboard-arrow-right"
                                size={30}
                                color="#4B4848"
                            />
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row justify-between border-b-2 border-gray-300 mb-3 items-center">
                        <View className="flex-row gap-3 py-2 items-center mb-2">
                            <Help width={30} height={30} />
                            <TouchableOpacity>
                                <Text className="font-work">
                                    Help Customer Service
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                            <MaterialIcons
                                name="keyboard-arrow-right"
                                size={30}
                                color="#4B4848"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={handleSignOut}
                    className="bg-red-100 my-5 rounded-full"
                >
                    <Text className="text-red-500 text-xl font-workSemiBold m-auto py-2">
                        Keluar
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default ProfileOfficer;