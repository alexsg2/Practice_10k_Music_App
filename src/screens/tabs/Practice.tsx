import React from 'react'; 
import { SafeAreaView, ScrollView, View } from 'react-native';


import Planner from '../../components/planner';


const Practice = () =>
{
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ backgroundColor: '#ECF1F7' }}>
                    <Planner date={new Date()} practice={true}></Planner>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Practice;
