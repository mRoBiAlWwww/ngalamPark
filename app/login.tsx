import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import {
    sendEmailVerification,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../lib/firebaseconfig";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { doc, getDoc } from "firebase/firestore";
import Feather from "@expo/vector-icons/Feather";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleLogin = async (): Promise<void> => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                FIREBASE_AUTH,
                email,
                password
            );
            await sendEmailVerification(userCredential.user);
            const userDoc = await getDoc(
                doc(FIREBASE_DB, "users", userCredential.user.uid)
            );
            userDoc.data()?.role == "user"
                ? router.replace("/homeUser")
                : router.replace("/homeOfficer");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <View className="bg-white h-full px-5">
            <Text className="text-4xl font-extrabold mb-4">
                Selamat datang di Ngalam Park!
            </Text>
            <Text className="text-xl font-bold text-gray-500">
                Masuk menggunakan akunmu yang telah terverifikasi.
            </Text>
            <View>
                <View className="my-8 border-b-2 border-gray-300">
                    <Text className="text-lg font-semibold text-gray-500">
                        Email
                    </Text>
                    <Input value={email} onChangeText={setEmail} />
                </View>
                <View className="border-b-2 border-gray-300">
                    <Text className="text-lg font-semibold text-gray-500">
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
            {error ? <Text>{error}</Text> : null}
            <Button
                componentStyle="flex-row justify-center my-5 text-2xl"
                textStyle="text-primary font-bold"
                title="Lupa kata sandi?"
                onPress={() => router.replace("/sendReset")}
            />
            <Button
                title="Masuk"
                onPress={handleLogin}
                componentStyle="bg-gray-200 px-5 py-3 rounded-full font-bold flex justify-center items-center w-full mx-auto "
                textStyle="text-white text-lg font-custom"
            />
            <Text className="text-sm w-3/5 text-center mx-auto mt-5">
                Saya setuju dengan{" "}
                <Text
                    className="text-primary text-sm"
                    onPress={() => router.push("/")}
                >
                    kebijakan
                </Text>{" "}
                &{" "}
                <Text
                    className="text-primary text-sm"
                    onPress={() => router.push("/")}
                >
                    privasi
                </Text>{" "}
                yang telah ditentukan
            </Text>
        </View>
    );
}
