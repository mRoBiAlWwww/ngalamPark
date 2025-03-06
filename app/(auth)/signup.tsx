import { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
    sendEmailVerification,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../lib/firebaseconfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Input from "@/components/Input";

export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [KTP, setKTP] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const db = getFirestore();
    const { role } = useLocalSearchParams();

    const signUp = async () => {
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
            if (role == "user") {
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
            <Text>daftar akun</Text>
            <Text>{role === "user" ? "pengguna" : "petugas parkir"}</Text>
            <Input placeholder="name" value={name} onChangeText={setName} />
            <Input placeholder="email" value={email} onChangeText={setEmail} />
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

            {role == "officer" ? (
                <TextInput
                    placeholder="KTP"
                    value={KTP}
                    onChangeText={setKTP}
                    secureTextEntry
                />
            ) : null}

            {error ? <Text>{error}</Text> : null}
            <Button title="Sign Up" onPress={signUp} />
            <View>
                <Text>Sudah punya akun?</Text>
                <Button
                    title="login"
                    onPress={() => router.replace("/login")}
                />
            </View>
        </View>
    );
}

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
