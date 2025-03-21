import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Pressable, View } from "react-native";
import QRon from "../../assets/images/QRbiru.svg";
import QRoff from "../../assets/images/QRCoklat.svg";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#fff",
                    height: 60,
                    borderTopWidth: 0,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontFamily: "WorkSansSemiBold",
                },
                tabBarActiveTintColor: "#01aed6",
                tabBarInactiveTintColor: "#3A3131",
            }}
        >
            <Tabs.Screen
                name="(home)"
                options={{
                    title: "Beranda",
                    tabBarIcon: ({ focused }) => (
                        <Entypo
                            name="home"
                            size={25}
                            color={focused ? "#01aed6" : "#3A3131"}
                        />
                    ),
                    tabBarButton: (props) => (
                        <Pressable
                            {...props}
                            android_ripple={{ color: "transparent" }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="activity"
                options={{
                    title: "Aktivitas",
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name="calendar-text"
                            size={25}
                            color={focused ? "#01aed6" : "#3A3131"}
                        />
                    ),
                    tabBarButton: (props) => (
                        <Pressable
                            {...props}
                            android_ripple={{ color: "transparent" }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="qrPage"
                options={{
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <QRon
                                width={100}
                                height={100}
                                style={{ marginLeft: 30, marginBottom: -20 }}
                            />
                        ) : (
                            <QRoff
                                width={100}
                                height={100}
                                style={{ marginLeft: 30, marginBottom: -20 }}
                            />
                        ),
                    tabBarLabel: () => null,
                    tabBarButton: (props) => (
                        <View className="relative">
                            <Pressable
                                {...props}
                                android_ripple={{ color: "transparent" }}
                                className="relative w-52 h-52 -top-10 -left-20 bg-red-500 z-40"
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="(smartpark)"
                options={{
                    title: "SmartPark",
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5
                            name="ticket-alt"
                            size={25}
                            color={focused ? "#01aed6" : "#3A3131"}
                        />
                    ),
                    tabBarButton: (props) => (
                        <Pressable
                            {...props}
                            android_ripple={{ color: "transparent" }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="(profileUser)"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5
                            name="user-alt"
                            size={20}
                            color={focused ? "#01aed6" : "#3A3131"}
                        />
                    ),
                    tabBarButton: (props) => (
                        <Pressable
                            {...props}
                            android_ripple={{ color: "transparent" }}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
