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
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Button from "../../components/ButtonRegister";
import InputRegister from "../../components/InputRegister";
import Toast from "react-native-toast-message";
import useDatabase from "../../hooks/useCreate";
type Role = "user" | "officer";

const signUp: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [KTP, setKTP] = useState<string>("");
    const [confirmPass, setConfirmPass] = useState<string>("");
    const [callNumber, setCallNumber] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
    const [isPassVisible2, setIsPassVisible2] = useState<boolean>(false);
    const [isPassVisible3, setIsPassVisible3] = useState<boolean>(false);
    const { role } = useLocalSearchParams<{ role: Role }>();
    const router = useRouter();
    const { saveData } = useDatabase();

    const showToast = (message: string) => {
        Toast.show({
            type: "error",
            text1: message,
        });
    };

    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
    const isWeakPass = (pass: string) => pass.length < 8;
    const isValidCallNumber = (callNumber: string) =>
        /^08\d{10,11}$/.test(callNumber);

    const signUp = async (): Promise<void> => {
        try {
            if (!isValidEmail(email)) return showToast("Format email salah.");
            if (isWeakPass(pass)) return showToast("Pass minimal 8 karakter.");
            if (isValidCallNumber(callNumber)) {
                return showToast(
                    "Nomor wajib 12 atau 13 digit serta diawali dengan 08"
                );
            }
            if (pass !== confirmPass) {
                return showToast("Pass tidak cocok!");
            }

            const userCredential = await createUserWithEmailAndPassword(
                FIREBASE_AUTH,
                email,
                pass
            );

            const uid = userCredential.user.uid;
            if (role === "user") {
                const userData: Record<string, any> = {
                    id: uid,
                    name,
                    callNumber,
                    role,
                    saldo: {
                        ovo: 800000,
                        shopeepay: 100000,
                    },
                };
                await saveData("users/" + uid, userData);
            } else {
                const userData: Record<string, any> = {
                    id: uid,
                    name,
                    callNumber,
                    ktp: KTP,
                    role,
                    location,
                };
                await saveData("officer/" + uid, userData);
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
                                placeholder="0812345678910"
                                value={callNumber}
                                onChangeText={setCallNumber}
                            >
                                <Feather
                                    name="phone-call"
                                    size={24}
                                    color="rgb(202, 202, 202)"
                                    className="pr-3"
                                />
                            </InputRegister>

                            <InputRegister
                                placeholder="Kata sandi"
                                value={pass}
                                onChangeText={setPass}
                                secure={!isPassVisible}
                            >
                                <Feather
                                    name="lock"
                                    size={24}
                                    color="rgb(202, 202, 202)"
                                    className="pr-3"
                                />
                                <TouchableOpacity
                                    onPress={() =>
                                        setIsPassVisible(!isPassVisible)
                                    }
                                >
                                    <Feather
                                        name={isPassVisible ? "eye" : "eye-off"}
                                        size={20}
                                        color="rgb(200, 200, 200)"
                                    />
                                </TouchableOpacity>
                            </InputRegister>

                            <InputRegister
                                placeholder="Masukkan ulang kata"
                                value={confirmPass}
                                onChangeText={setConfirmPass}
                                secure={!isPassVisible2}
                            >
                                <Feather
                                    name="lock"
                                    size={24}
                                    color="rgb(202, 202, 202)"
                                    className="pr-3"
                                />
                                <TouchableOpacity
                                    onPress={() =>
                                        setIsPassVisible2(!isPassVisible2)
                                    }
                                >
                                    <Feather
                                        name={
                                            isPassVisible2 ? "eye" : "eye-off"
                                        }
                                        size={20}
                                        color="rgb(200, 200, 200)"
                                    />
                                </TouchableOpacity>
                            </InputRegister>

                            {role === "officer" && (
                                <>
                                    <InputRegister
                                        placeholder="KTP"
                                        secure={!isPassVisible3}
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
                                                setIsPassVisible3(
                                                    !isPassVisible3
                                                )
                                            }
                                        >
                                            <Feather
                                                name={
                                                    isPassVisible3
                                                        ? "eye"
                                                        : "eye-off"
                                                }
                                                size={20}
                                                color="rgb(200, 200, 200)"
                                            />
                                        </TouchableOpacity>
                                    </InputRegister>

                                    <InputRegister
                                        placeholder="Lokasi"
                                        value={location}
                                        onChangeText={setLocation}
                                    >
                                        <SimpleLineIcons
                                            name="location-pin"
                                            size={25}
                                            color="rgb(200, 200, 200)"
                                            className="pr-3"
                                        />
                                    </InputRegister>
                                </>
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
