import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Start from './Start';
import Login from './Login';
import Register from './Register';

const Stack = createStackNavigator();

const AuthNavigator = () =>
{
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Start">
                <Stack.Screen options={{ headerShown: false }} name="Start" component={Start} />
                <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
                <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AuthNavigator;
