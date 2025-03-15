import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="kendaraan" />
            </Stack>
        </>
    );
};

export default _layout;
