import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
    sendEmailVerification,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../lib/firebaseconfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Input from "@/components/Input";

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

            router.replace("/(auth)/login");
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <View>
            <Text>Daftar Akun</Text>
            <Text>{role === "user" ? "Pengguna" : "Petugas Parkir"}</Text>
            <Input placeholder="Name" value={name} onChangeText={setName} />
            <Input placeholder="Email" value={email} onChangeText={setEmail} />
            <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Input
                placeholder="Konfirmasi Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            {role === "officer" && (
                <TextInput
                    placeholder="KTP"
                    value={KTP}
                    onChangeText={setKTP}
                />
            )}

            {error && <Text>{error}</Text>}
            <Button title="Sign Up" onPress={signUp} />
            <View>
                <Text>Sudah punya akun?</Text>
                <Button
                    title="Login"
                    onPress={() => router.replace("/login")}
                />
            </View>
        </View>
    );
};

export default signUp;

{
    /* <View>
            {role === "user" ? (
                <View>
                    <Text>Form Signup untuk User</Text>
                    <SignUpUser></SignUpUser>
                </View>
            ) : (
                <View>
                    <Text>Form Signup untuk Petugas</Text>
                    <SignUpOfficer></SignUpOfficer>
                </View>
            )}
        </View> */
}
