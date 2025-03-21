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
import { useDispatch, useSelector } from "react-redux"; // Ditambahkan untuk useSelector
import { RootState } from "../../../ngalamPark/redux/store"; // Asumsi lokasi store, sesuaikan jika berbeda
import { getDatabase, ref, update } from "firebase/database";
import { resetUserAccount } from "@/redux/slice/userAccountSlice";

const ProfileOfficer: React.FC = () => {
    const router = useRouter();
    const officer = useSelector((state: RootState) => state.officerAccount);
    const db = getDatabase();
    const dispatch = useDispatch();

    const handleSignOut = async (): Promise<void> => {
        try {
            await update(ref(db, "officer/" + officer.id), {
                id: officer.id,
                name: officer.name,
                location: officer.location,
                nameLocation: officer.nameLocation,
            });
            await signOut(FIREBASE_AUTH);
            dispatch(resetUserAccount());
            router.replace("/(auth)/defaultPage");
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#F2F1F9" />
            <View className="bg-defaultBackground px-10 h-full pt-20">
                <View className="border-b-2 border-gray-300 pt-10 pb-5 flex-row items-center gap-5">
                    <Image
                        className="rounded-full w-20 h-20"
                        source={require("../../assets/images/dummyUser.jpg")}
                    />
                    <View className="flex-row items-center">
                        <View>
                            <Text className="font-workSemiBold text-3xl">
                                {officer.name}
                            </Text>
                            <Text className="font-work text-sm text-gray-400">
                                {officer.name}@student.ub.ac.id
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
