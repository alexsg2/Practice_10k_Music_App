import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableHighlight, View } from 'react-native';


import GoalTracker from '../../components/GoalTracker';
import { colorPallete } from '../../assets/design_library';
import Planner from '../../components/planner';


const Home = () =>
{
    const dateOptions = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [selectedDate, setSelectedDate] = useState(dateOptions[(new Date()).getDay()]);

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
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ width: "100%", paddingVertical: '5%', alignItems: 'center', backgroundColor: '#ECF1F7' }}>
                    <GoalTracker title="Overall Hours" goal_amount={10000}/>
                </View>
                <View style={{ width: "100%", paddingVertical: '2.5%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
                    {renderDateBoxes()}
                </View>
                <View style={{ backgroundColor: '#ECF1F7' }}>
                    <Planner date={new Date()} practice={false}></Planner>
                </View>
            </ScrollView>
            <StatusBar/>
        </SafeAreaView>
    );
}

export default Home;
