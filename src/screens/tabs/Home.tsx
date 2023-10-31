import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableHighlight, View } from 'react-native';


import { Planner, GoalTracker } from '../../components';
import { colorPallete } from '../../assets/design_library';

const auth = getAuth();


const Home = () =>
{
    const dateOptions = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [selectedDate, setSelectedDate] = useState(dateOptions[(new Date()).getDay()]);
    const dateOptionsAbbr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [selectedDateAbbr, setSelectedDateAbbr] = useState(dateOptionsAbbr[(new Date()).getDay()]);
    
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
        const daysUntilSelectedDay = dateOptionsAbbr.indexOf(selectedDateAbbr) - curr.getDay();
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
                    {dateOptionsAbbr.map((date, index) => (
                        <TouchableHighlight
                            key={index}
                            style={{ padding: '2.5%', borderWidth: 1, borderRadius: 10, backgroundColor: selectedDateAbbr === date ? colorPallete.yellow_gradiant["50%"] : 'white', }}
                            underlayColor="#D3D3D3"
                            onPress={() => {
                                setSelectedDateAbbr(date);
                                setSelectedDate(dateOptions[index]);
                            }}
                        >
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{date}</Text>
                        </TouchableHighlight>
                    ))}
                </View>
                <Text style={{ fontSize: 20, paddingHorizontal: '3%', paddingTop: '3%' }}>{selectedDateAbbr === dateOptionsAbbr[(new Date()).getDay()] ? "Today's Plans" : `${selectedDate}'s Plans`}</Text>
                <Planner userId={uid} date={getDateRange()}/>
            </ScrollView>
            <StatusBar/>
        </SafeAreaView>
    );
}

export default Home;
