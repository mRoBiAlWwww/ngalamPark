import { Stack, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import React, { useEffect } from "react";
import "../global.css";
import { StatusBar } from "react-native";
import * as Font from "expo-font";
import store, { persistor } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const RootLayout: React.FC = () => {
    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hideAsync();
        }, 2000);
    }, []);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                WorkSans: require("../assets/fonts/WorkSans-Regular.ttf"),
                WorkSansSemiBold: require("../assets/fonts/WorkSans-SemiBold.ttf"),
                Maison: require("../assets/fonts/FontsFree-Net-Maison-Neue-Bold.ttf"),
            });
            await SplashScreen.hideAsync();
        }
        loadFonts();
    }, []);

    return (
        // <KeyboardProvider>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <StatusBar barStyle="dark-content" />
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(user)" />
                    <Stack.Screen name="(officer)" />
                    <Stack.Screen name="(auth)" />
                    <Stack.Screen name="index" />
                </Stack>
                <Toast />
            </PersistGate>
        </Provider>
        // </KeyboardProvider>
    );
};

export default RootLayout;
