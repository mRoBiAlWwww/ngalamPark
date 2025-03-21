import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "moti";
import React from "react";
import { Pressable } from "react-native";
import QRon from "../../assets/images/QRbiru.svg";
import QRoff from "../../assets/images/QRCoklat.svg";

const _layout = () => {
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
                    tabBarIconStyle: {
                        marginLeft: 50,
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        marginLeft: 50,
                    },
                    tabBarButton: (props) => (
                        <Pressable
                            {...props}
                            android_ripple={{ color: "transparent" }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="(qrScanner)"
                options={{
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <QRon
                                width={100}
                                height={100}
                                style={{ marginLeft: 90 }}
                            />
                        ) : (
                            <QRoff
                                width={100}
                                height={100}
                                style={{ marginLeft: 90 }}
                            />
                        ),
                    tabBarLabel: () => null,
                    tabBarButton: (props) => (
                        <View className="relative">
                            <Pressable
                                {...props}
                                android_ripple={{ color: "transparent" }}
                                className="absolute w-52 h-52 -top-10 -left-20 bg-red-500 z-40"
                            />
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name="profileOfficer"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5
                            name="user-alt"
                            size={20}
                            color={focused ? "#01aed6" : "#3A3131"}
                        />
                    ),
                    tabBarIconStyle: {
                        marginRight: 50,
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        marginRight: 50,
                    },
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
};

export default _layout;
