import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuthentication } from '../utils/hooks/useAuthentication';


import UserStack from './userStack';
import AuthStack from './authStack';
import { setProfile } from '../redux/actions';


export default function RootNavigation() {
    const dispatch = useDispatch();
    const { user, userData } = useAuthentication();
    
    useEffect(() => {
        if (userData) {
            dispatch(setProfile(userData));
        }
    }, [userData, dispatch]);
    
    return user ? <UserStack /> : <AuthStack />;
}
