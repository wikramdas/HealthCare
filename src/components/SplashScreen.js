import { CommonActions } from '@react-navigation/routers';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
const SplashScreen = (props) => {
    const { theme, navigation } = props
    useEffect(() => {
        startAfterDelay(2000, "Home")
    })
    const startAfterDelay = (delay, routeName) => {
        setTimeout(() => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: routeName },
                    ],
                })
            );
        }, delay)
        clearTimeout()
    }
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 14 }}>Splash Screen</Text>
        </View>
    )
}
export default SplashScreen