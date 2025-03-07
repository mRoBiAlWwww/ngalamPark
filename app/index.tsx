import Button from "@/components/Button";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/lib/firebaseconfig";
import { Redirect, useRouter } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, TouchableOpacity } from "react-native";

const index: React.FC = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showLoader, setShowLoader] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            FIREBASE_AUTH,
            async (user: User | null) => {
                setIsLoading(false);
                if (user) {
                    try {
                        const userDoc = await getDoc(
                            doc(FIREBASE_DB, "users", user.uid)
                        );
                        const role = userDoc.data()?.role;
                        if (role === "user") {
                            router.replace("/homeUser");
                        } else if (role === "officer") {
                            router.replace("/homeOfficer");
                        }
                    } catch (error: any) {
                        console.log(error.message);
                    }
                } else {
                    router.replace("/defaultPage");
                }
            }
        );

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => setShowLoader(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (showLoader) {
        return (
            <View>
                <ActivityIndicator size="large" />
                <Text>Memuat...</Text>
            </View>
        );
    }
};

export default index;
{
    /* <Redirect href={isLoggedIn ? "/(tabs)/home" : "/(auth)/login"} />; */
}
