import { Stack } from "expo-router";
import { StatusBar } from "react-native";

const HomeLayout = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="homeUser" />
                <Stack.Screen name="properties" />
            </Stack>
        </>
    );
};

export default HomeLayout;
