import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';


import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import { Planner } from '../../components';
import { STATUS } from '../../assets/constants';
import { onLightBackground, color_pallete, font_sizes } from '../../assets/common_styles';

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
            Alert.alert('Practice Session Undefined', 'No available plans to practice. Please add a new plan to continue.', [{ text: 'OK' }]);
        }
        else {
            navigation.navigate('PracticeTimer', { item: incompletePlans });
        }
    };


    return (
        <SafeAreaView style={onLightBackground.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={onLightBackground.sectionText}>Today's Plans</Text>
                <Planner dayOfWeek={currDay} practicing={true}/>
                <TouchableOpacity onPress={handlePracticeTimer}
                                  style={{ width: '50%', padding: '5%', marginVertical: '5%', borderRadius: 10, alignSelf: 'center', alignItems: 'center',
                                           flexDirection: 'row', justifyContent: 'center', backgroundColor: color_pallete.blue_gradiant['60%']
                                        }}>
                    <Text style={{ fontSize: font_sizes.buttons, fontWeight: 'bold' }}>Start  </Text>
                    <Ionicons name='play' size={25} color='black'/>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Practice;
