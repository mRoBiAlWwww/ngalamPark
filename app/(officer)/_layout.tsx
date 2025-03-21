import { Tabs } from "expo-router";
import React from "react";

const _layout = () => {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="(home)" />
            <Tabs.Screen name="(qrScanner)" />
            <Tabs.Screen name="profileOfficer" />
        </Tabs>
    );
};

export default _layout;
