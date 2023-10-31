import { Ionicons } from '@expo/vector-icons'; 
import React, { useEffect, useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView, ScrollView, View, TouchableOpacity, Text } from 'react-native';


import { Planner } from '../../components';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export type PracticeStackParamList = {
    Practice: undefined;
    PracticeTimer: undefined;
};
type PracticeNavigationProp = NavigationProp<PracticeStackParamList, 'Practice' | 'PracticeTimer'>;

const auth = getAuth();


const Practice = () =>
{
    const navigation = useNavigation<PracticeNavigationProp>();
    
    const [uid, setUid] = useState<string>('');
    useEffect(() => { const unsubscribe = onAuthStateChanged(auth, (user) => {
                        if (user) {
                            setUid(user.uid);
                        }
                    });
                    return unsubscribe;
    }, [uid]);

    const getDateRange = () => {
        const start = new Date();
        start.setHours(-4, 0, 0, 0);
        const end = new Date(start);
        end.setHours(43, 59, 59, 999);
        return [start, end];
    };
    
    const handleStartTimer = () => {
        // TODO : navigate to corresponding screen - Alex's
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF1F7' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Planner userId={uid} date={getDateRange()}></Planner>
                <TouchableOpacity onPress={handleStartTimer}
                                  style={{ width: '50%', padding: '5%', marginTop: '5%', borderRadius: 10, alignSelf: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#7BC3E9' }}>
                    <Ionicons name="play" size={25} color="black"/>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Start</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Practice;
