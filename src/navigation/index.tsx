import React from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication';


import UserStack from './userStack';
import AuthStack from './auth_stack';

export default function RootNavigation()
{
    const { user } = useAuthentication();

    return user ? <UserStack /> : <AuthStack />;
}
