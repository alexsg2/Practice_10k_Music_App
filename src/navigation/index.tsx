import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';


import UserStack from './userStack';
import AuthStack from './authStack';
import { setProfile } from '../redux/actions';


export default function RootNavigation() {
    const dispatch = useDispatch();
    const { user, userData, loading } = useAuthentication();
    
    useEffect(() => {
        if (userData) {
            dispatch(setProfile(userData));
        }
    }, [userData, dispatch]);
    
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5982C2' }}>
                <Text style={{ color: 'white', fontSize: 20, fontStyle: 'italic', fontWeight: 'bold', paddingBottom: '1.5%' }}>Loading Data.</Text>
                <Text style={{ color: 'white', fontSize: 20, fontStyle: 'italic', fontWeight: 'bold', paddingBottom: '5%' }}>Please Be Patient.</Text>
                <ActivityIndicator size='large' color='white' />
            </View>
        );
    }

    return user ? <UserStack /> : <AuthStack />;
}
