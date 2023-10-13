import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import AuthNavigation from '../screens/auth/auth_nav';

export default function AuthStack()
{
    return (
        <SafeAreaProvider>
            <AuthNavigation/>
        </SafeAreaProvider>
    );
}
