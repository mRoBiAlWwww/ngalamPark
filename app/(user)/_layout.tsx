import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Pressable, TouchableWithoutFeedback } from "react-native";

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
                name="homeUser"
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
            <Tabs.Screen name="qrPage" />
            <Tabs.Screen
                name="smartPark"
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
                name="profileUser"
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
{
    /* <Tabs.Screen
                name="homeUser"
                options={{
                    title: "Beranda",
                    tabBarIcon: ({ focused }) => (
                        <View>
                            {focused ? (
                                <LinearGradient
                                    colors={["#01aed6", "#0189a7"]}
                                    style={{
                                        flex: 1,
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                    }}
                                />
                            ) : null}
                            <Entypo
                                name="home"
                                size={25}
                                color={focused ? "#01aed6" : "#3A3131"}
                            />
                        </View>
                    ),
                }} 
            /> */
}
