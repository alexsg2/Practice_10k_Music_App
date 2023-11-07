import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView, ScrollView, TouchableOpacity, Text } from 'react-native';


import { Planner } from '../../components';
import { getDailyDateRanges } from '../../helpers';

import { PracticeStackParamList } from './app_navigation';
type PracticeScreenProp = StackNavigationProp<PracticeStackParamList, 'Practice'>;


const Practice = () =>
{
    const navigation = useNavigation<PracticeScreenProp>();

    const dateRange = getDailyDateRanges();
    const [reloadData, setReloadData] = useState(false);
    useFocusEffect(React.useCallback(() => { setReloadData(true); }, []));


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF1F7' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{ fontSize: 20, paddingHorizontal: '3%', paddingTop: '3%' }}>Today's Plans</Text>
                <Planner date={dateRange} reload={reloadData} setReload={setReloadData}/>
                <TouchableOpacity onPress={() => navigation.navigate('PracticeTimer')}
                                  style={{ width: '50%', padding: '5%', marginVertical: '5%', borderRadius: 10, alignSelf: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#7BC3E9' }}>
                    <Ionicons name="play" size={25} color="black"/>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Start</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Practice;
