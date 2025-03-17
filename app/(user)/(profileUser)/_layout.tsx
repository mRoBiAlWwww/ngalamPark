import React from "react";
import { StatusBar } from "react-native";
import { Stack } from "expo-router";

const ProfileLayout = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="profileUser" />
                <Stack.Screen name="(settings)" />
            </Stack>
        </>
    );
};

export default ProfileLayout;
