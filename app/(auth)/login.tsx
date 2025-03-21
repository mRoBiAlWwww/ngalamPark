import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../lib/firebaseconfig";
import ButtonRegister from "../../components/ButtonRegister";
import Input from "../../components/Input";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { ProgressBar } from "react-native-paper";
import Toast from "react-native-toast-message";
import { setUserAccount } from "../../redux/slice/userAccountSlice";
import { setOfficerAccount } from "../../redux/slice/officerAccountSlice";
import React from "react";
import { RootState } from "@/redux/store";
import { get, getDatabase, ref } from "firebase/database";
export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const dispatch = useDispatch();
    const db = getDatabase();

    const showToast = (message: string) => {
        Toast.show({
            type: "error",
            text1: message,
        });
    };

    const handleLogin = async (): Promise<void> => {
        setLoading(true);
        setProgress(0.3);
        try {
            const userCredential = await signInWithEmailAndPassword(
                FIREBASE_AUTH,
                email,
                password
            );
            if (!userCredential.user.emailVerified) {
                showToast("Verifikasi email terlebih dahulu.");
                return;
            }

            const userSnapshot = await get(
                ref(db, "users/" + userCredential.user.uid)
            );
            if (userSnapshot.exists()) {
                dispatch(
                    setUserAccount({
                        id: userSnapshot.val().id,
                        name: userSnapshot.val().name,
                        email: userSnapshot.val().email,
                        PIN: userSnapshot.val().PIN,
                        booking: userSnapshot.val().booking,
                    })
                );
                router.replace("/homeUser");
            } else {
                const officerSnapshot = await get(
                    ref(db, "officer/" + userCredential.user.uid)
                );
                console.log(officerSnapshot.val().nameLocation);
                dispatch(
                    setOfficerAccount({
                        id: officerSnapshot.val().id,
                        name: officerSnapshot.val().name,
                        location: officerSnapshot.val().location,
                        nameLocation: officerSnapshot.val().nameLocation,
                    })
                );
                router.replace("/homeOfficer");
            }
        } catch (err: any) {
            console.log("Firebase Error Code:", err.code);
            if (err.code === "auth/invalid-credential") {
                showToast("Email belum terdaftar / Password salah.");
            } else if (err.code === "auth/too-many-requests") {
                alert("Terlalu banyak percobaan. Silakan coba lagi nanti.");
            } else {
                showToast("Terjadi kesalahan saat login. Coba lagi.");
            }
        } finally {
            setLoading(false);
            setProgress(1);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev >= 2 ? 0 : prev + 0.06));
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <View className="bg-loginColor h-full px-5 relative">
            <StatusBar
                barStyle="dark-content"
                backgroundColor={loading ? "#797d7c" : "#F4FBF8"}
            />
            {loading && (
                <View className="absolute inset-0 z-10">
                    <View className="bg-black opacity-50 h-[85%]" />
                    <View className="absolute bottom-0 bg-white rounded-t-2xl w-full h-[20%] flex justify-center p-10 gap-5">
                        <Text className="text-3xl font-bold text-black">
                            Sedang authentikasi...
                        </Text>
                        <ProgressBar
                            progress={progress}
                            color="#0e96b5"
                            style={{
                                height: 7,
                                borderRadius: 10,
                            }}
                        />
                        <Text className="font-semibold text-gray-500 w-4/5">
                            Tunggu sebentar masih proses yaa ngga lama kok🙏
                        </Text>
                    </View>
                </View>
            )}
            <TouchableOpacity
                style={{ marginBottom: 10, marginTop: 20 }}
                onPress={() => router.back()}
            >
                <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
            <Text className="text-4xl font-maison mb-4 w-4/5">
                Selamat datang di Ngalam Park!
            </Text>
            <Text className="font-work-bold text-xl font text-gray-500">
                Masuk menggunakan akunmu yang telah terverifikasi.
            </Text>
            <View>
                <View className="my-8 border-b-2 border-gray-300">
                    <Text className="font-work text-lg font-semibold text-gray-500">
                        Email
                    </Text>
                    <Input value={email} onChangeText={setEmail} />
                </View>
                <View className="border-b-2 border-gray-300">
                    <Text className="font-work text-lg font-semibold text-gray-500">
                        Kata Sandi
                    </Text>
                    <Input
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!isPasswordVisible}
                    >
                        <TouchableOpacity
                            onPress={() =>
                                setIsPasswordVisible(!isPasswordVisible)
                            }
                        >
                            <Feather
                                name={isPasswordVisible ? "eye" : "eye-off"}
                                size={24}
                                color="rgb(200, 200, 200)"
                            />
                        </TouchableOpacity>
                    </Input>
                </View>
            </View>
            <ButtonRegister
                componentStyle="flex-row justify-center my-5 text-2xl"
                textStyle="text-primary font-workSemiBold"
                title="Lupa kata sandi?"
                onPress={() => router.push("/(auth)/sendReset")}
            />
            <ButtonRegister
                title="Masuk"
                onPress={handleLogin}
                componentStyle="px-5 py-3 rounded-full font-bold flex justify-center items-center w-full mx-auto overflow-hidden "
                textStyle="text-white text-lg font-custom"
                colors={["#33D3F8", "#1B859D"]}
            />
            <Text className="font-work text-sm w-3/5 text-center mx-auto mt-5">
                Saya setuju dengan{" "}
                <Text
                    className="font-work text-primary text-sm"
                    onPress={() => router.push("/")}
                >
                    kebijakan
                </Text>{" "}
                &{" "}
                <Text
                    className="font-work text-primary text-sm"
                    onPress={() => router.push("/")}
                >
                    privasi
                </Text>{" "}
                yang telah ditentukan
            </Text>
        </View>
    );
}
