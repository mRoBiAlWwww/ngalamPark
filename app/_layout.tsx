import { Stack, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import React, { useEffect } from "react";
import "../global.css";
import { StatusBar } from "react-native";
import * as Font from "expo-font";
import { KeyboardProvider } from "react-native-keyboard-controller";

import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const RootLayout: React.FC = () => {
    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hideAsync();
        }, 2000);
    }, []);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                WorkSans: require("../assets/fonts/WorkSans-Regular.ttf"),
                WorkSansSemiBold: require("../assets/fonts/WorkSans-SemiBold.ttf"),
                Maison: require("../assets/fonts/FontsFree-Net-Maison-Neue-Bold.ttf"),
            });
            await SplashScreen.hideAsync();
        }
        loadFonts();
    }, []);

    return (
        // <KeyboardProvider>
        <>
            <StatusBar barStyle="dark-content" />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(user)" />
                <Stack.Screen name="(officer)" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="index" />

                {/* <Stack.Screen name="signupOption" />
                <Stack.Screen name="signup" />
                <Stack.Screen
                    name="sendReset"
                    options={{
                        title: "Setel Ulang Kata Sandi",
                        headerShown: true,
                        headerShadowVisible: false,
                        headerStyle: {
                            backgroundColor: "#F4FBF8",
                        },
                        headerLeft: () => (
                            <TouchableOpacity
                                style={{ marginRight: 10, marginLeft: -10 }}
                                onPress={() => router.back()}
                            >
                                <Entypo name="cross" size={35} color="black" />
                            </TouchableOpacity>
                        ),
                    }}
                />
                <Stack.Screen name="login" /> */}
            </Stack>
            <Toast />
        </>
        // </KeyboardProvider>
    );
};

export default RootLayout;

// import { FIREBASE_AUTH, FIREBASE_DB } from "@/lib/firebaseconfig";
// import { Stack, useRouter } from "expo-router";
// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { ActivityIndicator, Text, View } from "react-native";

// export default function RootLayout() {
//     const router = useRouter();
//     const [isLoading, setIsLoading] = useState(true);
//     const [isUser, setIsUser] = useState(false);
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
//             setIsLoading(false);
//             if (user) {
//                 setIsUser(true);
//                 try {
//                     const userDoc = await getDoc(
//                         doc(FIREBASE_DB, "users", user.uid)
//                     );
//                     const role = userDoc.data()?.role;
//                     if (role === "user") {
//                         router.replace("/homeUser");
//                     } else if (role === "officer") {
//                         router.replace("/homeOfficer");
//                     }
//                 } catch (error) {
//                     router.replace("/");
//                 }
//             } else {
//                 router.replace("/");
//             }
//         });

//         return () => unsubscribe();
//     }, []);

//     if (isLoading) {
//         return (
//             <View>
//                 <ActivityIndicator size="large" />
//                 <Text>Memuat...</Text>
//             </View>
//         );
//     }
//     return (
//         <Stack screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="(user)" />
//             <Stack.Screen name="(officer)" />
//             <Stack.Screen name="index" />
//             <Stack.Screen name="signupOption" />
//         </Stack>
//     );
// }
