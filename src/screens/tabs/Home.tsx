import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableHighlight, View } from 'react-native';


import { Planner, GoalTracker } from '../../components';
import { colorPallete } from '../../assets/design_library';

const auth = getAuth();


const Home = () =>
{
    const dateOptions = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [selectedDate, setSelectedDate] = useState(dateOptions[(new Date()).getDay()]);
    
    const [uid, setUid] = useState<string>('');
    useEffect(() => { const unsubscribe = onAuthStateChanged(auth, (user) => {
                        if (user) {
                            setUid(user.uid);
                        }
                    });
                    return unsubscribe;
    }, [uid]);

    const getDateRange = () => {
        const curr = new Date();
        const daysUntilSelectedDay = dateOptions.indexOf(selectedDate) - curr.getDay();
        const start = new Date();
        start.setDate(curr.getDate() + daysUntilSelectedDay);
        start.setHours(-4, 0, 0, 0);
        const end = new Date(start);
        end.setHours(43, 59, 59, 999);
        return [start, end];
    };

    const renderDateBoxes = () => {
        return dateOptions.map((date, index) => (
            <TouchableHighlight
                key={index}
                style={{ padding: '2.5%', borderWidth: 1, borderRadius: 10, backgroundColor: selectedDate === date ? colorPallete.yellow_gradiant["50%"] : 'white', }}
                underlayColor="#D3D3D3"
                onPress={() => setSelectedDate(date)}
            >
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{date}</Text>
            </TouchableHighlight>
        ));
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF1F7' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ width: "100%", paddingVertical: '5%', alignItems: 'center' }}>
                    <GoalTracker title="Overall Hours" goal_amount={10000}/>
                </View>
                <View style={{ width: "100%", paddingVertical: '2.5%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white' }}>
                    {renderDateBoxes()}
                </View>
                <Planner userId={uid} date={getDateRange()}></Planner>
            </ScrollView>
            <StatusBar/>
        </SafeAreaView>
    );
}

export default Home;
