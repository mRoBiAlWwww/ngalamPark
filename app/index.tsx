import { FIREBASE_AUTH } from "@/lib/firebaseconfig";
import { useFocusEffect, useRouter } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import Logo1 from "../assets/images/Logo1.svg";
import Toast from "react-native-toast-message";
import { get, getDatabase, ref } from "firebase/database";

const index: React.FC = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const db = getDatabase();

    const showToast = (message: string) => {
        Toast.show({
            type: "error",
            text1: message,
        });
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            FIREBASE_AUTH,
            async (user: User | null) => {
                if (user) {
                    try {
                        const userSnapshot = await get(
                            ref(db, "users/" + user.uid)
                        );

                        userSnapshot.exists()
                            ? router.replace("/homeUser")
                            : router.replace("/homeOfficer");
                    } catch (error: any) {
                        showToast(error.message);
                    }
                } else {
                    router.replace("/(auth)/defaultPage");
                }
                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    useFocusEffect(
        useCallback(() => {
            StatusBar.setBackgroundColor("#01aed6", false);
            StatusBar.setBarStyle("dark-content");
            return () => {
                StatusBar.setBackgroundColor("#ffffff", false);
            };
        }, [])
    );

    if (isLoading) {
        return (
            <>
                <View className="bg-primary h-full w-full flex items-center justify-center relative">
                    <Logo1 width={500} height={500} />
                    <View className="absolute top-3/4">
                        <ActivityIndicator size={50} color="white" />
                    </View>
                </View>
            </>
        );
    }
};

export default index;
