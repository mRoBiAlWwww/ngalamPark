import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const loginOption = () => {
    return (
        <View>
            <TouchableOpacity
                onPress={() => router.push("/(auth)/signup?role=user")}
            >
                sebagai pengguna
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => router.push("/(auth)/signup?role=officer")}
            >
                sebagai petugas parkir
            </TouchableOpacity>
        </View>
    );
};

export default loginOption;
