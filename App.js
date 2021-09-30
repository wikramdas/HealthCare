import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react';
// import 'react-native-gesture-handler';
import { Provider } from "react-redux";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import store from "./src/redux/Reducers";

import SplashScreen from "./src/components/SplashScreen";
import Home from "./src/components/Home";
import DataList from './src/components/DataList';
// INTRO SCREENS 

const Stack = createNativeStackNavigator();
export default App = () => {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false
                        }}
                    >
                        <Stack.Screen name={"Splash"} component={SplashScreen} />
                        <Stack.Screen name={"Home"} component={Home} />
                        <Stack.Screen name={"DataList"} component={DataList} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    )
}