import React, {  useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, ScrollView, View, ActivityIndicator, StatusBar, Text, TouchableHighlight } from 'react-native';


import { DAYS } from '../../assets/constants';
import { GoalTracker, Planner } from '../../components';
import { colorPallete } from '../../assets/design_library';

import { getOverallDateRanges } from '../../helpers';
import { DataManagementAPI } from '../../services/apis/data_management_api';


const Home = () =>
{
    const [totalHours, setTotalHours] = useState<number>(0);
    const [totalPieces, setTotalPieces] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    async function fetchGoalData() {
        setLoading(true);
        try {
            const dates = getOverallDateRanges();
            const [hours, pieces] = await DataManagementAPI.getPracticeHoursAndPiecesByDate(dates[0], dates[1]);
            setTotalHours(hours);
            setTotalPieces(pieces);
        }
        catch (e) {
            // Handle in any way
        }
        setLoading(false);
    };
    useFocusEffect(React.useCallback(() => { fetchGoalData(); }, []));

    const currDay = new Date().getDay();
    const [selectedDate, setSelectedDate] = useState(DAYS[currDay]);
    const dateOptionsAbbr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [selectedDateAbbr, setSelectedDateAbbr] = useState(dateOptionsAbbr[currDay]);
    
    const selectedDay = dateOptionsAbbr.indexOf(selectedDateAbbr);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF1F7' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ width: "100%", paddingVertical: '5%', alignItems: 'center' }}>
                    {loading ? (
                        <ActivityIndicator size="large" color='black'/>
                    ) : (
                        <GoalTracker title="Overall Hours" goal_amount={'10,000'} hours_amount={totalHours} pieces_amount={totalPieces} />
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
                                setSelectedDate(DAYS[index]);
                            }}
                        >
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{date}</Text>
                        </TouchableHighlight>
                    ))}
                </View>
                <Text style={{ fontSize: 20, paddingHorizontal: '3%', paddingTop: '3%' }}>{selectedDateAbbr === dateOptionsAbbr[(new Date()).getDay()] ? "Today's Plans" : `${selectedDate}'s Plans`}</Text>
                <View style={{ marginBottom: '5%' }}>
                    <Planner dayOfWeek={selectedDay} practicing={false}/>
                </View>
            </ScrollView>
            <StatusBar/>
        </SafeAreaView>
    );
}

export default Home;
