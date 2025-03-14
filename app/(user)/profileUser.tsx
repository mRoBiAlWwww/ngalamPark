import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import { Button, Text, View, TextInput, Alert } from "react-native";
import { FIREBASE_AUTH } from "../../lib/firebaseconfig";

const profile: React.FC = () => {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut(FIREBASE_AUTH);
            router.replace("/(auth)/defaultPage");
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error saat sign out:", error.message);
            } else {
                console.error("Error tidak dikenal:", error);
            }
        }
    };


    return (
        <View>
            <Text>profile Page</Text>
            <Button title="Sign Out" onPress={handleSignOut} />
        </View>
    );
};

export default profile;