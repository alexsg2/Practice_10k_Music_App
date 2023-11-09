import React, { useState } from 'react';
import Swiper from 'react-native-swiper';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, ActivityIndicator, View, Text, StyleSheet } from 'react-native';


import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { STATUS } from '../../assets/constants';

import { GoalTracker, MusicDistribution } from '../../components';
import { getDailyDateRanges, getWeeklyDateRanges, getMonthlyDateRanges, getOverallDateRanges,
         formatWeeklyDateRange } from '../../helpers';

import { DataManagementAPI } from '../../services/apis/data_management_api';


const Progress = () =>
{
    const currentPracticeData = useSelector((state: RootState) => state?.practice);
    
    const dFilteredData = currentPracticeData.weeklyPracticeData.filter((plan) => plan.practiceDate === new Date().getDay());                                        
    const dailyHours = dFilteredData.reduce((sum, plan) => sum + plan.duration, 0);
    console.log(dailyHours);
    const dailyPieces = dFilteredData.filter((plan) => plan.status === STATUS[2]).length;

    const weeklyHours = currentPracticeData.weeklyPracticeData.reduce((sum, plan) => sum + plan.duration, 0);
    const weeklyPieces = currentPracticeData.weeklyPracticeData.filter((plan) => plan.status === STATUS[2]).length;

    const [monthlyHours, setMonthlyHours] = useState<number>(0);
    const [monthlyPieces, setMonthlyPieces] = useState<number>(0);
    const [totalHours, setTotalHours] = useState<number>(0);
    const [totalPieces, setTotalPieces] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    async function fetchGoalData() {
        setLoading(true);
        try {
            const monthlyDates = getMonthlyDateRanges();
            const [mPieces, mHours] = await DataManagementAPI.getPracticeHoursAndPiecesByDate(monthlyDates[0], monthlyDates[1]);
            setMonthlyPieces(mPieces);
            setMonthlyHours(mHours);
            const overallDates = getOverallDateRanges();
            const [tPieces, tHours] = await DataManagementAPI.getPracticeHoursAndPiecesByDate(overallDates[0], overallDates[1]);
            setTotalPieces(tPieces);
            setTotalHours(tHours);
        }
        catch (e) {
            // Handle in any way
        }
        setLoading(false);
    };
    useFocusEffect(React.useCallback(() => { fetchGoalData();}, []));

    const weeklyDates = getWeeklyDateRanges();
    const weeklyRange = formatWeeklyDateRange(weeklyDates[0], weeklyDates[1]);
    const composersMap = new Map<string, number>();
    const filteredPlans = currentPracticeData.weeklyPracticeData.filter((plan) => plan.duration !== 0);
    filteredPlans.forEach((plan) => { const composer = plan.composer;
                                      if (composersMap.has(composer)) {
                                          composersMap.set(composer, composersMap.get(composer) + plan.duration);
                                      }
                                      else {
                                          composersMap.set(composer, plan.duration);
                                      }
    });
    const sortedComposers = Array.from(composersMap || [], ([composer, hour]) => ({ composer, hour })).sort((a, b) => b.hour - a.hour);
    const composersData = sortedComposers.slice(0, 5);


    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#ECF1F7' }} showsVerticalScrollIndicator={false}>
            <View style={{ width: '100%' }}>
                <Text style={{ fontSize: 20, marginVertical: '5%', marginLeft: '5%' }}>Activity</Text>
                {loading ? (
                        <ActivityIndicator size="large" color='black' style={{ marginVertical: '20%'}}/>
                ) : (
                    <Swiper showsButtons={false} showsPagination={true} style={{ height: 260 }}>
                        <View style={styles.goalContainer}>
                            <GoalTracker title="Daily Hours" goal_amount={'2'} hours_amount={dailyHours} pieces_amount={dailyPieces} />
                        </View>
                        <View style={styles.goalContainer}>
                            <GoalTracker title="Weekly Hours" goal_amount={'14'} hours_amount={weeklyHours} pieces_amount={weeklyPieces} />
                        </View>
                        <View style={styles.goalContainer}>
                            <GoalTracker title="Monthly Hours" goal_amount={'56'} hours_amount={monthlyHours} pieces_amount={monthlyPieces} />
                        </View>
                        <View style={styles.goalContainer}>
                            <GoalTracker title="Overall Hours" goal_amount={'10,000'} hours_amount={totalHours} pieces_amount={totalPieces} />
                        </View>
                    </Swiper>
                )}
            </View>
            <View style={{ width: '100%' }}>
                <Text style={{ fontSize: 20, marginBottom: '7%', marginLeft: '5%' }}>Distribution</Text>
                <View style={{ flex: 1, width: '100%', alignItems: 'center', alignSelf: 'center' }}>
                    {composersData.length > 0 ? (
                        <MusicDistribution
                            date={weeklyRange}
                            composers={composersData}
                        />
                    ) : (
                        <Text style={{ fontSize: 16, marginBottom: '7%', fontStyle: 'italic', alignSelf: 'center' }}>No distrbution available.</Text>
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

export default Progress;

const styles = StyleSheet.create({
    goalContainer: {
        width: '100%',
        alignItems: 'center',
    },
});
