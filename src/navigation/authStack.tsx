import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Start from '../screens/auth/Start';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';

const Stack = createStackNavigator();

export default function AuthStack()
{
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
          </Stack.Navigator>
        </NavigationContainer>
    );
};
