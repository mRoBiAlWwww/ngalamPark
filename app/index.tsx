import Button from "@/components/Button";
import { Redirect, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { ActivityIndicator, Text, View, TouchableOpacity } from "react-native";

export default function Index() {
    const router = useRouter();
    // const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
    //         setIsLoggedIn(!!user); // true jika user ada, false jika null
    //     });

    //     return () => unsubscribe(); // Bersihkan listener saat unmount
    // }, []);

    // if (isLoggedIn === null) {
    //     // Tampilkan loading saat cek status autentikasi
    //     return (
    //         <View
    //             style={{
    //                 flex: 1,
    //                 justifyContent: "center",
    //                 alignItems: "center",
    //             }}
    //         >
    //             <ActivityIndicator size="large" />
    //         </View>
    //     );
    // }

    return (
        <View>
            <Button
                title="Masuk"
                onPress={() => router.push("/(auth)/login")}
            />
            <Button
                title="Daftar akun"
                onPress={() => router.push("/signupOption")}
            />
        </View>
    );
}
{
    /* <Redirect href={isLoggedIn ? "/(tabs)/home" : "/(auth)/login"} />; */
}
