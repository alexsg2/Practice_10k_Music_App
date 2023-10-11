import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import AuthNavigation from '../screens/auth/AuthNavigation';

export default function AuthStack()
{
    return (
        <SafeAreaProvider>
            <AuthNavigation/>
        </SafeAreaProvider>
    );
}
