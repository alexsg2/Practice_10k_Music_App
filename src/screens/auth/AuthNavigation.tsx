import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { DesignLibrary } from '../../assets/DesignLibrary';


import Start from './Start';
import Login from './Login';
import ResetPassword from './ResetPassword';
import Register from './Register';
import ProfileSetup from './ProfileSetup';

export type AuthStackParamList = {
    Start: undefined;
    Login: undefined;
    ResetPassword: undefined;
    Register: undefined;
    ProfileSetup: undefined;
};
const Stack = createStackNavigator<AuthStackParamList>();


const AuthNavigation = () =>
{
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Start">
                <Stack.Screen
                    options={{ 
                        headerStyle: { backgroundColor: DesignLibrary.color_pallete.login_blue["default"] },
                        headerShadowVisible: false,
                        headerTitle: "" }}
                    name="Start"
                    component={ Start }
                />
                <Stack.Screen
                    options={({ navigation }) => ({
                        headerStyle: { backgroundColor: DesignLibrary.color_pallete.login_blue["default"] },
                        headerShadowVisible: false,
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name="arrow-back" size={40} color='white' left="7%"/>
                            </TouchableOpacity>
                        ),
                        headerTitle: "" })}
                    name="Login"
                    component={ Login }
                />
                <Stack.Screen
                    options={({ navigation }) => ({
                        headerStyle: { backgroundColor: DesignLibrary.color_pallete.login_blue["default"] },
                        headerShadowVisible: false,
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name="arrow-back" size={40} color='white' left="7%"/>
                            </TouchableOpacity>
                        ),
                        headerTitle: "" })}
                    name="ResetPassword"
                    component={ ResetPassword }
                />
                <Stack.Screen
                    options={({ navigation }) => ({
                        headerStyle: { backgroundColor: DesignLibrary.color_pallete.login_blue["default"] },
                        headerShadowVisible: false,
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name="arrow-back" size={40} color='white' left="7%"/>
                            </TouchableOpacity>
                        ),
                        headerTitle: "" })}
                    name="Register"
                    component={ Register }
                />
                <Stack.Screen
                    options={{ 
                        headerStyle: { backgroundColor: DesignLibrary.color_pallete.login_blue["default"] },
                        headerTitle: "Setup Profile" }}
                    name="ProfileSetup"
                    component={ ProfileSetup }
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AuthNavigation;
