import { usePathname, useRouter } from "expo-router";
import { useEffect } from "react";
import { BackHandler, Text, View } from "react-native";

const homeUser: React.FC = () => {
    const pathname = usePathname();

    useEffect(() => {
        const backAction = () => {
            if (pathname === "/home") {
                return true;
            }
            return false;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [pathname]);

    return (
        <View>
            <Text>home</Text>
        </View>
    );
};
export default homeUser;
