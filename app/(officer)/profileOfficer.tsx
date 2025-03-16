import { View, Text } from "react-native";
import React from "react";
import ButtonRegister from "../../components/ButtonRegister";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "@/lib/firebaseconfig";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const profileOfficer: React.FC = () => {
    const router = useRouter();
    const account = useSelector((state: RootState) => state.account);
    const handleSignOut = async (): Promise<void> => {
        try {
            await signOut(FIREBASE_AUTH);
            router.replace("/(auth)/defaultPage");
        } catch (error: any) {
            console.error(error.message);
        }
    };
    return (
        <View>
            <Text className="text-3xl">{account.name}</Text>
            <ButtonRegister title="Sign Out" onPress={handleSignOut} />
        </View>
    );
};

export default profileOfficer;
