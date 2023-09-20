import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, View, StatusBar } from 'react-native';
import Login from './screens/authScreens/login';
import Sign from './screens/authScreens/signup';
import Rooms from './screens/rooms';
import Messages from './screens/messages';
import FlashMessage from 'react-native-flash-message';
import { Colors } from './theme';

const Stack = createStackNavigator();

function App() {
    const AuthStack = () => {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="LoginScreen" component={Login} />
                <Stack.Screen name="SignScreen" component={Sign} />
            </Stack.Navigator>
        );
    };
    const MessageStack = () => {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="RoomsScreen" component={Rooms} />
                <Stack.Screen name="MessagesScreen" component={Messages} />
            </Stack.Navigator>
        );
    };

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MessageStack" component={MessageStack} />
                <Stack.Screen name="AuthStack" component={AuthStack} />
            </Stack.Navigator>
            <StatusBar backgroundColor={Colors.DARK_BLUE} />
            <FlashMessage position="top" />
        </NavigationContainer>
    );
}

export default App;