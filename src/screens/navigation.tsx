import React, { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { ActivityIndicator, View, Text } from 'react-native';


import { getWeeklyDateRanges } from '../helpers';
import { DataManagementAPI } from '../services/apis/data_management_api';
import { setProfile, setMusicPieces, setPracticeData } from '../redux/actions';

const initialSet = async (dispatch: any) =>
{
    try {
        const musicPieces = await DataManagementAPI.getAllMusicPieces();
        dispatch(setMusicPieces(musicPieces));

        const date = getWeeklyDateRanges();
        const practiceData = await DataManagementAPI.getAllPracticeDataByDate(date[0], date[1]);
        // practice dates are numbered for the week from 0 (i.e., Sunday) to 6 (i.e., Saturday)
        const modPracticeData = practiceData.map((item) => {
            return { ...item, practiceDate: item.practiceDate.toDate().getDay() };
        });
        dispatch(setPracticeData(modPracticeData));
    }
    catch (e) {
        // TODO : Handle in some way ???
    }
}

import AppNavigation from '../screens/tabs/app_navigation';
import AuthNavigation from '../screens/auth/auth_navigation';
import { useAuthentication } from '../services/hooks/use_authentication';


export default function RootNavigation()
{
    const dispatch = useDispatch();
    const { user, userData, loading } = useAuthentication();
    
    useEffect(() => { if (userData) {
                          dispatch(setProfile(userData));
                          initialSet(dispatch)
                      }
    }, [userData, dispatch]);


    // TODO : add a loading effect until redux is initilized.
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
