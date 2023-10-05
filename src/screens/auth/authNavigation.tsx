import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Start from './Start';
import Login from './Login';
import Register from './Register';
import ProfileSetup from './ProfileSetup';

export type AuthStackParamList = {
    Start: undefined;
    Login: undefined;
    Register: undefined;
    ProfileSetup: undefined;
};
  
const Stack = createStackNavigator<AuthStackParamList>();
  
export const AuthNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Start">
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="Start"
                    component={Start}
                />
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="Register"
                    component={Register}
                />
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="ProfileSetup"
                    component={ProfileSetup}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AuthNavigation;
