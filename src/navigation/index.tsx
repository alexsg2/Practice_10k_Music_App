import React from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication';


import UserStack from './userStack';
import AuthStack from './authStack';

export default function RootNavigation()
{
    const { user, userData } = useAuthentication();
    return user ? <UserStack /> : <AuthStack />;
}
