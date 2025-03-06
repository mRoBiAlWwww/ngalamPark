import { useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import {
    sendEmailVerification,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../lib/firebaseconfig";
import Button from "@/components/Button";
import Input from "@/components/Input";

// const OTP_EXPIRATION = 5 * 60 * 1000;

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [uid, setUid] = useState("");

    // const actionCodeSettings = {
    //     url: "https://exp.host/@mrobialwww/NGALAMPARK/home",
    //     handleCodeInApp: true,
    // };
    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                FIREBASE_AUTH,
                email,
                password
            );
            await sendEmailVerification(userCredential.user);
            router.replace("/(tabs)/home");
        } catch (err: any) {
            setError(err.message);
        }
    };
    // const resetPassword = async () => {
    //     await sendPasswordResetEmail(FIREBASE_AUTH, email);
    //     alert("Cek email Anda untuk mengatur ulang kata sandi.");
    // };

    return (
        <View>
            <Text>Login</Text>
            <Input placeholder="Email" value={email} onChangeText={setEmail} />
            <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {error ? <Text>{error}</Text> : null}
            <Button title="Login" onPress={handleLogin} />
            <View>
                <Text>belum punya akun?</Text>
                <Button
                    title="Signup"
                    onPress={() => router.replace("/signupOption")}
                />
            </View>
            <View>
                <Text>Lupa password?</Text>
                <Button
                    title="Lupa password"
                    onPress={() => router.replace("/sendReset")}
                />
            </View>
        </View>
    );
}

// const db = getFirestore();

// const generateOTP = () =>
//     Math.floor(100000 + Math.random() * 900000).toString();
// const sendOtp = async () => {
//     try {
//         const userCredential = await signInWithEmailAndPassword(
//             FIREBASE_AUTH,
//             email,
//             password
//         );
//         const user = userCredential.user;
//         setUid(user.uid);

//         const setOtpCode = generateOTP();
//         await setDoc(doc(db, "otps", user.uid), {
//             otp: otpCode,
//             createdAt: serverTimestamp(),
//             expiresAt: Timestamp.fromMillis(Date.now() + OTP_EXPIRATION),
//         });
//     } catch (error: any) {
//         console.error("Error saat mengirim OTP:", error.message);
//         Alert.alert("Error", error.message);
//     }
// };

// const verifyOtp = async () => {
//     try {
//         const otpRef = doc(db, "otps", uid);
//         const otpDoc = await getDoc(otpRef);

//         // if (!otpDoc.exists()) {
//         //     Alert.alert("Gagal", "OTP tidak ditemukan.");
//         //     return;
//         // }

//         const { otp: storedOtp, createdAt, expiresAt } = otpDoc.data();

//         const isExpired = expiresAt.toMillis() < Date.now();
//         if (isExpired) {
//             await deleteDoc(otpRef);
//             Alert.alert("Gagal", "OTP telah kedaluwarsa.");
//             return;
//         }

//         if (otpCode !== storedOtp) {
//             Alert.alert("Gagal", "OTP salah.");
//             return;
//         }

//         await deleteDoc(otpRef);
//         Alert.alert("Sukses", "OTP valid. Anda berhasil verifikasi!");
//     } catch (error: any) {
//         console.error("Error saat memverifikasi OTP:", error.message);
//         Alert.alert("Error", error.message);
//     }
// };
