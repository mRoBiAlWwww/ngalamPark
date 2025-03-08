import { router, Stack, useRouter } from "expo-router";
import React from "react";
import "../global.css";
import { Button, StatusBar } from "react-native";
const RootLayout: React.FC = () => {
    const router = useRouter();
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(user)" />
                <Stack.Screen name="(officer)" />
                <Stack.Screen name="index" />
                <Stack.Screen name="signupOption" />
                <Stack.Screen name="signup" />
                <Stack.Screen name="sendReset" />
                <Stack.Screen
                    name="login"
                    options={{
                        title: "Detail",
                        headerShown: true,
                        headerLeft: () => (
                            <Button
                                title="← Back"
                                onPress={() => router.back()}
                            />
                        ),
                    }}
                />
            </Stack>
        </>
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
