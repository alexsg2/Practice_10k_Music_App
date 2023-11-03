import { Ionicons } from '@expo/vector-icons'; 
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, Text } from 'react-native';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';


import { Planner } from '../../components';
import { getDailyDateRanges } from '../../helpers';
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

    const [reloadData, setReloadData] = useState(false);
    useFocusEffect(React.useCallback(() => { setReloadData(true); }, [uid]));
    
    const handleStartTimer = () => {
        // TODO : navigate to corresponding screen - Alex's
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF1F7' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{ fontSize: 20, paddingHorizontal: '3%', paddingTop: '3%' }}>Today's Plans</Text>
                <Planner userId={uid} date={getDailyDateRanges()} reload={reloadData} setReload={setReloadData}/>
                <TouchableOpacity onPress={handleStartTimer}
                                  style={{ width: '50%', padding: '5%', marginVertical: '5%', borderRadius: 10, alignSelf: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#7BC3E9' }}>
                    <Ionicons name="play" size={25} color="black"/>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Start</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Practice;
