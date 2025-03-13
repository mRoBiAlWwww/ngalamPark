import { Stack } from "expo-router";
import { StatusBar } from "react-native";
export default function TabLayout() {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="defaultPage" />
                <Stack.Screen name="login" />
                <Stack.Screen name="sendReset" />
                <Stack.Screen name="signup" />
            </Stack>
        </>
    );
}
