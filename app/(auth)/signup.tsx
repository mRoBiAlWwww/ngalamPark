import React, { useState } from "react";
import {
    View,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
    sendEmailVerification,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_APP } from "../../lib/firebaseconfig";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Button from "../../components/ButtonRegister";
import InputRegister from "../../components/InputRegister";
import Toast from "react-native-toast-message";
import {
    equalTo,
    get,
    getDatabase,
    orderByChild,
    ref,
    query,
    set,
} from "firebase/database";
type Role = "user" | "officer";
const showToast = (message: string) => {
    Toast.show({
        type: "error",
        text1: message,
    });
};
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
    const db = getDatabase(FIREBASE_APP);

    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
    const isWeakPass = (pass: string) => pass.length < 8;
    const isValidCallNumber = (callNumber: string) =>
        /^\d{12,13}$/.test(callNumber);
    const isValidKTP = (NIK: string) => /^\d{16}$/.test(NIK);

    const handleSearch = async (
        officerNameLocation: string
    ): Promise<string | null> => {
        try {
            const snapShot = await get(
                query(
                    ref(db, "parkLocation"),
                    orderByChild("name"),
                    equalTo(officerNameLocation.toLowerCase())
                )
            );

            let foundKey: string | null = null;
            snapShot.forEach((childSnapshot) => {
                foundKey = childSnapshot.key;
            });

            return foundKey;
        } catch (error: any) {
            showToast(error.message);
            return null;
        }
    };

    const signUp = async (): Promise<void> => {
        try {
            if (
                !name ||
                !email ||
                !pass ||
                !confirmPass ||
                !KTP ||
                !callNumber ||
                !location
            ) {
                showToast("Error, Harap isi semua field!");
                return;
            }
            if (!isValidEmail(email)) return showToast("Format email salah.");
            if (!isWeakPass(pass)) return showToast("Pass minimal 8 karakter.");
            if (!isValidCallNumber(callNumber)) {
                return showToast("Nomor wajib 12 atau 13 digit");
            }
            if (!isValidKTP(KTP)) {
                return showToast("KTP wajib 16 digit");
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
                try {
                    await set(ref(db, "users/" + uid), {
                        id: uid,
                        name,
                        email,
                        callNumber,
                        role,
                        saldo: {
                            ovo: 100000,
                            shopeepay: 100000,
                            coin: 0,
                        },
                        PIN: "",
                        booking: "",
                    });
                } catch (error: any) {
                    showToast(error.message);
                }
            } else {
                const nameLocation = await handleSearch(location);
                try {
                    await set(ref(db, "officer/" + uid), {
                        id: uid,
                        name,
                        callNumber,
                        ktp: KTP,
                        role,
                        location,
                        nameLocation,
                    });
                } catch (error: any) {
                    showToast(error.message);
                }
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
        <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={120}>
            <StatusBar barStyle="dark-content" backgroundColor="#F2F1F9" />
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
