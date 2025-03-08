import React, { useState } from "react";
import {
    View,
    Text,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
    sendEmailVerification,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../lib/firebaseconfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Input from "@/components/Input";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather2 from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import Button from "@/components/Button";
type Role = "user" | "officer";

const signUp: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [KTP, setKTP] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const db = getFirestore();
    const { role } = useLocalSearchParams<{ role: Role }>();

    const signUp = async (): Promise<void> => {
        try {
            if (password !== confirmPassword) {
                Alert.alert("Password tidak cocok!");
                return;
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

            router.replace("/login");
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={150}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex items-center h-full">
                    <Text className="font-bold text-3xl mt-36 text-black">
                        Daftar Akun
                    </Text>
                    <Text className="mb-5 w-4/5 text-center text-lg leading-5 text-black">
                        Sebagai{" "}
                        {role === "user" ? "Pengguna" : "Petugas Parkir"}
                    </Text>

                    <View className="w-4/5 p-5 border-2 border-primary rounded-3xl">
                        <View className="mb-5">
                            <View className="flex-row border-2 border-gray-300 rounded-xl my-1 py-2 px-5 items-center">
                                <Feather
                                    name="user"
                                    size={25}
                                    color="rgb(202, 202, 202)"
                                    className="pr-3"
                                />
                                <Input
                                    placeholder="Name"
                                    value={name}
                                    onChangeText={setName}
                                    placeholderTextColor="rgb(202, 202, 202)"
                                />
                            </View>

                            <View className="flex-row border-2 border-gray-300 rounded-xl my-1 py-2 px-5 items-center">
                                <Ionicons
                                    name="mail-outline"
                                    size={25}
                                    color="rgb(202, 202, 202)"
                                    className="pr-3"
                                />
                                <Input
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholderTextColor="rgb(202, 202, 202)"
                                />
                            </View>

                            <View className="flex-row border-2 border-gray-300 rounded-xl my-1 py-2 px-5 items-center">
                                <Feather2
                                    name="lock"
                                    size={24}
                                    color="rgb(202, 202, 202)"
                                    className="pr-3"
                                />
                                <Input
                                    placeholder="Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    placeholderTextColor="rgb(202, 202, 202)"
                                />
                            </View>

                            <View className="flex-row border-2 border-gray-300 rounded-xl my-1 py-2 px-5 items-center">
                                <Feather2
                                    name="lock"
                                    size={24}
                                    color="rgb(202, 202, 202)"
                                    className="pr-3"
                                />
                                <Input
                                    placeholder="Konfirmasi Password"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry
                                    placeholderTextColor="rgb(202, 202, 202)"
                                />
                            </View>

                            {role === "officer" && (
                                <View className="flex-row border-2 border-gray-300 rounded-xl my-1 py-2 px-6 items-center">
                                    <AntDesign
                                        name="idcard"
                                        size={25}
                                        color="rgb(202, 202, 202)"
                                        className="pr-3"
                                    />
                                    <Input
                                        placeholder="KTP"
                                        value={KTP}
                                        onChangeText={setKTP}
                                        placeholderTextColor="rgb(202, 202, 202)"
                                    />
                                </View>
                            )}
                        </View>

                        {error && <Text>{error}</Text>}
                        <Button
                            title="Daftar"
                            onPress={signUp}
                            componentStyle="bg-primary px-5 py-5 rounded-xl font-bold flex justify-center items-center w-full mx-auto"
                            textStyle="text-white font-custom"
                        />
                        <View className="flex-row justify-center my-2">
                            <Text className="text-lg">Sudah punya akun? </Text>
                            <Button
                                title="Masuk"
                                onPress={() => router.replace("/login")}
                                textStyle="text-primary text-lg font-custom"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default signUp;
