import { Tabs } from "expo-router";
import React from "react";

const _layout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="homeOfficer" options={{ title: "Beranda" }} />
            <Tabs.Screen name="profileOfficer" options={{ title: "Profile" }} />
        </Tabs>
    );
};

export default _layout;
