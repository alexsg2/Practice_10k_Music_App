import React from 'react';
import { useDispatch } from 'react-redux';
import { useAuthentication } from '../utils/hooks/useAuthentication';


import UserStack from './userStack';
import AuthStack from './authStack';
import { setProfile } from '../redux/actions';

export default function RootNavigation() {
    const dispatch = useDispatch();
    const { user, userData } = useAuthentication();
    
    if(userData){
        dispatch(setProfile(userData))
    }
    return user ? <UserStack /> : <AuthStack />;
}
