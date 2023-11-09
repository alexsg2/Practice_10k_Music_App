import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert, SafeAreaView, ScrollView, TouchableOpacity, Text } from 'react-native';


import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { STATUS } from '../../assets/constants';

import { Planner } from '../../components';

import { PracticeStackParamList } from './app_navigation';
type PracticeScreenProp = StackNavigationProp<PracticeStackParamList, 'Practice'>;


const Practice = () =>
{
    const isFocused = useIsFocused();
    useEffect(() => { if (isFocused) { 
                      // focusing to refresh planner data
                      } 
                    }, [isFocused]);
    const currDay = new Date().getDay();
    const navigation = useNavigation<PracticeScreenProp>();
    const currentPracticeData = useSelector((state: RootState) => state?.practice);

    const handlePracticeTimer = () => {
        const incompletePlans = currentPracticeData.weeklyPracticeData.filter((plan) => plan.practiceDate === currDay && plan.status !== STATUS[2]);
        if (incompletePlans.length == 0) {
            Alert.alert('No Plans To Practice', 'No available plans for today. Consider adding a new plan.', [{ text: 'OK' }]);
        }
        else {
            navigation.navigate('PracticeTimer', { item: incompletePlans });
        }
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF1F7' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{ fontSize: 20, paddingHorizontal: '3%', paddingTop: '3%' }}>Today's Plans</Text>
                <Planner dayOfWeek={currDay} practicing={true}/>
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
