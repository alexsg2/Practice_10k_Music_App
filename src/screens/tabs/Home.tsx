import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { SafeAreaView, ScrollView, View, ActivityIndicator, StatusBar, Text, TouchableHighlight } from 'react-native';


import { Planner, GoalTracker } from '../../components';
import { colorPallete } from '../../assets/design_library';
import { getPracticePiecesAndHoursByDate } from '../../helpers';

const auth = getAuth();


const Home = () =>
{
    const dateOptions = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [selectedDate, setSelectedDate] = useState(dateOptions[(new Date()).getDay()]);
    const dateOptionsAbbr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [selectedDateAbbr, setSelectedDateAbbr] = useState(dateOptionsAbbr[(new Date()).getDay()]);
    
    const [uid, setUid] = useState<string>('');
    const [totalHours, setTotalHours] = useState<number>(0);
    const [totalPieces, setTotalPieces] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => { const unsubscribe = onAuthStateChanged(auth, async (user) => {
                        if (user) {
                            setUid(user.uid);
                        }
                    });
                    return unsubscribe;
    }, [uid]);

    useFocusEffect(React.useCallback(() => { fetchPracticeGoalData(); }, [uid]));

    const [reloadData, setReloadData] = useState(false);
    useFocusEffect(React.useCallback(() => { setReloadData(true); }, [uid, selectedDateAbbr]));

    async function fetchPracticeGoalData() {
        const startDate = new Date(2023, 9, 29, -4, 0, 0);
        const endDate = new Date();
        endDate.setHours(19, 59, 59, 999);
    
        try {
            setLoading(true);
            const [pieces, hours] = await getPracticePiecesAndHoursByDate(uid, startDate, endDate);
            setTotalPieces(pieces);
            setTotalHours(hours);
        }
        catch (e) {
            // Handle in any way
        }
        finally {
            setLoading(false);
        }
    };

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


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF1F7' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ width: "100%", paddingVertical: '5%', alignItems: 'center' }}>
                    {loading ? (
                        <ActivityIndicator size="large" color='black'/>
                    ) : (
                        <GoalTracker title="Overall Hours" goal_amount={10000} hours_amount={totalHours} pieces_amount={totalPieces} />
                    )}
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
                <View style={{ marginBottom: '5%' }}>
                    <Planner userId={uid} date={getDateRange()} reload={reloadData} setReload={setReloadData}/>
                </View>
            </ScrollView>
            <StatusBar/>
        </SafeAreaView>
    );
}

export default Home;
