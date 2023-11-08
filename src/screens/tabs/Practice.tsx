import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Alert, SafeAreaView, ScrollView, TouchableOpacity, Text } from 'react-native';


import { Planner } from '../../components';
import { STATUS } from '../../assets/constants';

import { getDailyDateRanges } from '../../helpers';
import { DataManagementAPI } from '../../services/data_management_api';

import { PracticeStackParamList } from './app_navigation';
type PracticeScreenProp = StackNavigationProp<PracticeStackParamList, 'Practice'>;


const Practice = () =>
{
    const navigation = useNavigation<PracticeScreenProp>();

    async function handlePracticeTimer() {
        try {
            const date = getDailyDateRanges();
            const plans = await DataManagementAPI.getAllPracticeDataByDate(date[0], date[1]);
            const filteredPlans = plans.filter((plan) => plan.status !== STATUS[2]);
            if (filteredPlans.length == 0) {
                Alert.alert('No Plans To Practice', 'No available plans for today. Consider adding a new plan.', [{ text: 'OK' }]);
            }
            else {
                navigation.navigate('PracticeTimer', { item: filteredPlans});
            }
        }
        catch (e) {
            // Handle in any way
        }
    };

    const dateRange = getDailyDateRanges();
    const [reloadData, setReloadData] = useState(false);
    useFocusEffect(React.useCallback(() => { setReloadData(true); }, []));


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF1F7' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{ fontSize: 20, paddingHorizontal: '3%', paddingTop: '3%' }}>Today's Plans</Text>
                <Planner date={dateRange} practicing={true} reload={reloadData} setReload={setReloadData}/>
                <TouchableOpacity onPress={handlePracticeTimer}
                                  style={{ width: '50%', padding: '5%', marginVertical: '5%', borderRadius: 10, alignSelf: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#7BC3E9' }}>
                    <Ionicons name="play" size={25} color="black"/>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Start</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Practice;
