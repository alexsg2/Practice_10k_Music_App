import React, { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { ActivityIndicator, View, Text } from 'react-native';


import AppNavigation from '../screens/tabs/app_navigation';
import AuthNavigation from '../screens/auth/auth_navigation';

import { setProfile, setMusicPieces, setPracticeData } from '../redux/actions';
import { useAuthentication } from '../services/hooks/use_authentication';
import { DataManagementAPI } from '../services/data_management_api';
import { getDailyDateRanges } from '../helpers';

const initialSet = async (dispatch: any) => {
    const date = getDailyDateRanges();
    try{
        const musicPieces = await DataManagementAPI.getAllMusicPieces();
        const practiceData = await DataManagementAPI.getAllPracticeDataByDate(date[0], date[1]);
        dispatch(setMusicPieces(musicPieces))
        dispatch(setPracticeData(practiceData))
    } catch(err){
        
    }

}

export default function RootNavigation() {
    const dispatch = useDispatch();
    const { user, userData, loading } = useAuthentication();
    
    useEffect(() => {
        if (userData) {
            dispatch(setProfile(userData));
            initialSet(dispatch)
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

    return (
        <>
        {loading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5982C2' }}>
                <Text style={{ color: 'white', fontSize: 20, fontStyle: 'italic', fontWeight: 'bold', paddingBottom: '1.5%' }}>Loading Data.</Text>
                <Text style={{ color: 'white', fontSize: 20, fontStyle: 'italic', fontWeight: 'bold', paddingBottom: '5%' }}>Please Be Patient.</Text>
                <ActivityIndicator size='large' color='white'/>
            </View>
        ) : (
            <>
            {user ? (
                <AppNavigation/>
            ) : (
                <AuthNavigation/>
            )}
            </>
        )}
        </>
    );
}
