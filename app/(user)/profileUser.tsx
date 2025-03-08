import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";
import { FIREBASE_AUTH } from "../../lib/firebaseconfig";

const profile: React.FC = () => {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut(FIREBASE_AUTH);
            router.replace("/login");
        } catch (error) {
            console.error("Error saat sign out:", error);
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
