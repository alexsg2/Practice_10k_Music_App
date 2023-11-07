import React, {  useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, ScrollView, View, ActivityIndicator, StatusBar, Text, TouchableHighlight } from 'react-native';


import { GoalTracker, Planner } from '../../components';
import { colorPallete } from '../../assets/design_library';
import { getDailyDateRanges, getOverallDateRanges } from '../../helpers';

import { DataManagementAPI } from '../../services/data_management_api';


const Home = () =>
{
    const [totHours, setTotHours] = useState<number>(0);
    const [totPieces, setTotPieces] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    async function fetchGoalData() {
        setLoading(true);
        try {
            const dates = getOverallDateRanges();
            const [hours, pieces] = await DataManagementAPI.getPracticeHoursAndPiecesByDate(dates[0], dates[1]);
            setTotHours(hours);
            setTotPieces(pieces);
        }
        catch (e) {
            // Handle in any way
        }
        setLoading(false);
    };
    useFocusEffect(React.useCallback(() => { fetchGoalData(); }, []));

    const dayOfWeek = new Date().getDay();
    const dateOptions = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [selectedDate, setSelectedDate] = useState(dateOptions[dayOfWeek]);
    const dateOptionsAbbr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [selectedDateAbbr, setSelectedDateAbbr] = useState(dateOptionsAbbr[dayOfWeek]);
    const daysUntilSelectedDay = dateOptionsAbbr.indexOf(selectedDateAbbr) - dayOfWeek;

    const dateRange = getDailyDateRanges();
    dateRange[0].setDate(dateRange[0].getDate() + daysUntilSelectedDay);
    dateRange[1].setDate(dateRange[1].getDate() + daysUntilSelectedDay);

    const [reloadData, setReloadData] = useState(false);
    useFocusEffect(React.useCallback(() => { setReloadData(true);}, [selectedDateAbbr]));


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF1F7' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ width: "100%", paddingVertical: '5%', alignItems: 'center' }}>
                    {loading ? (
                        <ActivityIndicator size="large" color='black'/>
                    ) : (
                        <GoalTracker title="Overall Hours" goal_amount={'10,000'} hours_amount={totHours} pieces_amount={totPieces} />
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
                    <Planner date={dateRange} reload={reloadData} setReload={setReloadData}/>
                </View>
            </ScrollView>
            <StatusBar/>
        </SafeAreaView>
    );
}

export default Home;
