import React, { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { ActivityIndicator, View, Text } from 'react-native';


import { setProfile } from '../redux/actions';
import { useAuthentication } from '../services/hooks/use_authentication';

import AppNavigation from '../screens/tabs/app_navigation';
import AuthNavigation from '../screens/auth/auth_navigation';


export default function RootNavigation()
{
    const dispatch = useDispatch();
    const { user, userData, loading } = useAuthentication();
    
    useEffect(() => { if (userData) {
                          dispatch(setProfile(userData));
                      }
    }, [userData, dispatch]);


    return (
        <>
        {loading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5982C2' }}>
                <Text style={{ color: 'white', fontSize: 20, fontStyle: 'italic', fontWeight: 'bold', paddingBottom: '1.5%' }}>Loading Data.</Text>
                <Text style={{ color: 'white', fontSize: 20, fontStyle: 'italic', fontWeight: 'bold', paddingBottom: '5%' }}>Please Be Patient.</Text>
                <ActivityIndicator size='large' color='white'/>
            </View>
        ) : (
            <>{ user ? (<AppNavigation/>) : (<AuthNavigation/>) }</>
        )}
        </>
    );
}
