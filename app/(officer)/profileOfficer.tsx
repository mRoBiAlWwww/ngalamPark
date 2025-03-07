import { View, Text } from "react-native";
import React from "react";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "@/lib/firebaseconfig";

const profileOfficer: React.FC = () => {
    const router = useRouter();

    const handleSignOut = async (): Promise<void> => {
        try {
            await signOut(FIREBASE_AUTH);
            router.replace("/(auth)/login");
        } catch (error: any) {
            console.error(error.message);
        }
    };
    return (
        <View>
            <Text>Profile Page</Text>
            <Button title="Sign Out" onPress={handleSignOut} />
        </View>
    );
};

export default profileOfficer;
