import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { color_pallete, font_sizes } from '../../assets/common_styles';

import Start from './Start';
import Login from './Login';
import ResetPassword from './ResetPassword';
import Register from './Register';

export type AuthStackParamList = {
    Start: undefined;
    Login: undefined;
    ResetPassword: undefined;
    Register: undefined;
};
const Stack = createStackNavigator<AuthStackParamList>();


const AuthNavigation = () =>
{
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Start">
                <Stack.Screen
                    options={{ 
                        headerStyle: { backgroundColor: color_pallete.darkBlue },
                        headerShadowVisible: false,
                        headerTitle: "" }}
                    name="Start"
                    component={ Start }
                />
                <Stack.Screen
                    options={({ navigation }) => ({
                        headerStyle: { backgroundColor: color_pallete.darkBlue },
                        headerShadowVisible: false,
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name='arrow-back' size={40} color='white' left="7%"/>
                            </TouchableOpacity>
                        ),
                        headerTitle: "Login",
                        headerTitleStyle: { padding: '5%', fontWeight: 'bold', fontSize: font_sizes.headers, color: color_pallete.white_gradiant['default'] }
                    })}
                    name="Login"
                    component={ Login }
                />
                <Stack.Screen
                    options={({ navigation }) => ({
                        headerStyle: { backgroundColor: color_pallete.darkBlue },
                        headerShadowVisible: false,
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name='arrow-back' size={40} color='white' left="7%"/>
                            </TouchableOpacity>
                        ),
                        headerTitle: "" })}
                    name="ResetPassword"
                    component={ ResetPassword }
                />
                <Stack.Screen
                    options={({ navigation }) => ({
                        headerStyle: { backgroundColor: color_pallete.darkBlue },
                        headerShadowVisible: false,
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name='arrow-back' size={40} color='white' left="7%"/>
                            </TouchableOpacity>
                        ),
                        headerTitle: "Register",
                        headerTitleStyle: { padding: '5%', fontWeight: 'bold', fontSize: font_sizes.headers, color: color_pallete.white_gradiant['default'] }
                    })}
                    name="Register"
                    component={ Register }
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AuthNavigation;
