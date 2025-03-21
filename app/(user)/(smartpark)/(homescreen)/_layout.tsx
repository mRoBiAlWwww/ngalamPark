// filepath: e:\ProjectInternRaion\ngalamPark\app\(user)\(home)\_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

const HomeLayout = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="smartPark" />
                <Stack.Screen name="listSearch" />
                <Stack.Screen name="promoPage" />
            </Stack>
        </>
    );
};

export default HomeLayout;
