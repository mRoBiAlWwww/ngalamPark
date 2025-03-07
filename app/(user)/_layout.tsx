import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="homeUser" options={{ title: "Beranda" }} />
            <Tabs.Screen name="profileUser" options={{ title: "Profile" }} />
            <Tabs.Screen name="qrPage" options={{ title: "Qr" }} />
            <Tabs.Screen name="activity" options={{ title: "Aktivitas" }} />
        </Tabs>
    );
}
