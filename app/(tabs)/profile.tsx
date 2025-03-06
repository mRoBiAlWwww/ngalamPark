import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";
import { FIREBASE_AUTH } from "../../lib/firebaseconfig";

export default function Profile() {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut(FIREBASE_AUTH);
        router.replace("/(auth)/login");
    };

    return (
        <View>
            <Text>Profile Page</Text>
            <Button title="Sign Out" onPress={handleSignOut} />
        </View>
    );
}
