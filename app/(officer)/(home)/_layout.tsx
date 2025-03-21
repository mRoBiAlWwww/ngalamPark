// filepath: e:\ProjectInternRaion\ngalamPark\app\(user)\(home)\_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

const QrLayout = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="homeOfficer" />
                <Stack.Screen name="(list)" />
            </Stack>
        </>
    );
};

export default QrLayout;
