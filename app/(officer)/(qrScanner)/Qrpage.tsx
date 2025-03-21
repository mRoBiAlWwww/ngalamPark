import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import {
    AppState,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Alert,
} from "react-native";
import { useEffect, useRef } from "react";

export default function Scanner() {
    const qrLock = useRef<boolean>(false);
    const appState = useRef<string>(AppState.currentState);
    const router = useRouter();
    const [permission, requestPermission] = useCameraPermissions();

    useEffect(() => {
        (async () => {
            if (!permission) {
                await requestPermission();
            } else if (!permission.granted) {
                Alert.alert(
                    "Izin Diperlukan",
                    "Aplikasi membutuhkan izin kamera untuk memindai QR code.",
                    [
                        {
                            text: "Izinkan",
                            onPress: () => requestPermission(),
                        },
                        {
                            text: "Keluar",
                            onPress: () => router.back(),
                            style: "cancel",
                        },
                    ]
                );
            }
        })();
    }, [permission, requestPermission, router]);

    useEffect(() => {
        const subscription = AppState.addEventListener(
            "change",
            (nextAppState: string) => {
                if (
                    appState.current.match(/inactive|background/) &&
                    nextAppState === "active"
                ) {
                    qrLock.current = false;
                }
                appState.current = nextAppState;
            }
        );

        return () => {
            subscription.remove();
        };
    }, []);

    const handleQRScan = (data: string) => {
        if (data && !qrLock.current && permission?.granted) {
            // Hanya scan jika izin diberikan
            qrLock.current = true;
            try {
                router.push({
                    pathname: "./vehicle-detail",
                    params: { qrData: data },
                });
            } catch (error) {
                Alert.alert("Error", "Gagal memproses QR Code");
                qrLock.current = false;
            }
        }
    };

    // Jika izin belum diberikan, tampilkan pesan sementara
    if (!permission?.granted) {
        return (
            <SafeAreaView style={StyleSheet.absoluteFillObject}>
                <Stack.Screen
                    options={{ title: "Scanner", headerShown: false }}
                />
                <StatusBar hidden={Platform.OS === "android"} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={StyleSheet.absoluteFillObject}>
            <Stack.Screen
                options={{
                    title: "Scanner",
                    headerShown: false,
                }}
            />
            {Platform.OS === "android" ? <StatusBar hidden /> : null}
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                onBarcodeScanned={({ data }: { data: string }) =>
                    handleQRScan(data)
                }
            />
        </SafeAreaView>
    );
}
