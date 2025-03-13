import React, { useState } from "react";
import {
    View,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
    sendEmailVerification,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../lib/firebaseconfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Button from "../../components/ButtonRegister";
import InputRegister from "../../components/InputRegister";
import Toast from "react-native-toast-message";
type Role = "user" | "officer";

const signUp: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [KTP, setKTP] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
    const [isPasswordVisible3, setIsPasswordVisible3] = useState(false);
    const { role } = useLocalSearchParams<{ role: Role }>();
    const router = useRouter();
    const db = getFirestore();

    const showToast = (message: string) => {
        Toast.show({
            type: "error",
            text1: message,
        });
    };

    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
    const isWeakPassword = (password: string) => password.length < 8;

    const signUp = async (): Promise<void> => {
        try {
            if (!isValidEmail(email)) return showToast("Format email salah.");
            if (isWeakPassword(password))
                return showToast("Password minimal 8 karakter.");
            if (password !== confirmPassword) {
                return showToast("Password tidak cocok!");
            }

            const userCredential = await createUserWithEmailAndPassword(
                FIREBASE_AUTH,
                email,
                password
            );

            const uid = userCredential.user.uid;
            if (role === "user") {
                await setDoc(doc(db, "users", uid), {
                    name,
                    role,
                });
            } else {
                await setDoc(doc(db, "users", uid), {
                    name,
                    KTP,
                    role,
                });
            }
            await sendEmailVerification(userCredential.user);
            router.replace("/(auth)/login");
        } catch (err: any) {
            if (err.code === "auth/email-already-in-use") {
                showToast("Email sudah terdaftar.");
            } else if (err.code === "auth/too-many-requests") {
                showToast("Terlalu banyak percobaan. Silakan coba lagi nanti.");
            } else {
                showToast("Terjadi kesalahan. Coba lagi nanti.");
            }
        }
    };

    return (
        // <KeyboardAwareScrollView
        //     style={{ flex: 1 }}
        //     bottomOffset={62}
        //     // keyboardVerticalOffset={120}
        // ></KeyboardAwareScrollView>
        <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={120}>
            <ScrollView>
                <View className="flex items-center ">
                    <Text className="font-maison text-3xl mt-36 text-black">
                        Daftar Akun
                    </Text>
                    <Text className="font-work mb-5 w-4/5 text-center text-lg leading-5 text-black">
                        Sebagai{" "}
                        {role === "user" ? "Pengguna" : "Petugas Parkir"}
                    </Text>

                    <View className="w-4/5 p-5 border-2 border-primary rounded-3xl">
                        <View className="mb-5 flex gap-3">
                            <InputRegister
                                placeholder="Nama Lengkap"
                                value={name}
                                onChangeText={setName}
                            >
                                <Feather
                                    name="user"
                                    size={25}
                                    color="rgb(202, 202, 202)"
                                    className="pr-3"
                                />
                            </InputRegister>

                            <InputRegister
                                placeholder="abc@gmail.com"
                                value={email}
                                onChangeText={setEmail}
                            >
                                <Ionicons
                                    name="mail-outline"
                                    size={25}
                                    color="rgb(202, 202, 202)"
                                    className="pr-3"
                                />
                            </InputRegister>

                            <InputRegister
                                placeholder="Kata sandi"
                                value={password}
                                onChangeText={setPassword}
                                secure={!isPasswordVisible}
                            >
                                <Feather
                                    name="lock"
                                    size={24}
                                    color="rgb(202, 202, 202)"
                                    className="pr-3"
                                />
                                <TouchableOpacity
                                    onPress={() =>
                                        setIsPasswordVisible(!isPasswordVisible)
                                    }
                                >
                                    <Feather
                                        name={
                                            isPasswordVisible
                                                ? "eye"
                                                : "eye-off"
                                        }
                                        size={20}
                                        color="rgb(200, 200, 200)"
                                    />
                                </TouchableOpacity>
                            </InputRegister>

                            <InputRegister
                                placeholder="Masukkan ulang kata"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secure={!isPasswordVisible2}
                            >
                                <Feather
                                    name="lock"
                                    size={24}
                                    color="rgb(202, 202, 202)"
                                    className="pr-3"
                                />
                                <TouchableOpacity
                                    onPress={() =>
                                        setIsPasswordVisible2(
                                            !isPasswordVisible2
                                        )
                                    }
                                >
                                    <Feather
                                        name={
                                            isPasswordVisible2
                                                ? "eye"
                                                : "eye-off"
                                        }
                                        size={20}
                                        color="rgb(200, 200, 200)"
                                    />
                                </TouchableOpacity>
                            </InputRegister>

                            {role === "officer" && (
                                <InputRegister
                                    placeholder="KTP"
                                    secure={!isPasswordVisible3}
                                    value={KTP}
                                    onChangeText={setKTP}
                                >
                                    <AntDesign
                                        name="idcard"
                                        size={25}
                                        color="rgb(202, 202, 202)"
                                        className="pr-3"
                                    />
                                    <TouchableOpacity
                                        onPress={() =>
                                            setIsPasswordVisible3(
                                                !isPasswordVisible3
                                            )
                                        }
                                    >
                                        <Feather
                                            name={
                                                isPasswordVisible3
                                                    ? "eye"
                                                    : "eye-off"
                                            }
                                            size={20}
                                            color="rgb(200, 200, 200)"
                                        />
                                    </TouchableOpacity>
                                </InputRegister>
                            )}
                        </View>

                        <Button
                            title="Daftar"
                            onPress={signUp}
                            componentStyle=" px-5 py-5 rounded-full font-bold flex justify-center items-center w-full mx-auto overflow-hidden"
                            textStyle="text-white"
                            colors={["#33D3F8", "#1B859D"]}
                        />
                        <View className="flex-row justify-center my-2">
                            <Text className="text-lg font-work">
                                Sudah punya akun?{" "}
                            </Text>
                            <Button
                                title="Masuk"
                                onPress={() => router.replace("/(auth)/login")}
                                textStyle="text-primary text-lg"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default signUp;
