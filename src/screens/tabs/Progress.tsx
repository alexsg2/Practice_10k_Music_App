import React, { useState } from 'react';
import Swiper from 'react-native-swiper';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, ActivityIndicator, View, Text, StyleSheet } from 'react-native';


import { GoalTracker, MusicDistribution } from '../../components';
import { getDailyDateRanges, getWeeklyDateRanges, getMonthlyDateRanges, getOverallDateRanges,
         formatWeeklyDateRange } from '../../helpers';

import { DataManagementAPI } from '../../services/data_management_api';


const Progress = () =>
{
    const [dailyPieces, setDailyPieces] = useState<number>(0);
    const [dailyHours, setDailyHours] = useState<number>(0);
    const [weeklyHours, setWeeklyHours] = useState<number>(0);
    const [weeklyPieces, setWeeklyPieces] = useState<number>(0);
    const [monthlyHours, setMonthlyHours] = useState<number>(0);
    const [monthlyPieces, setMonthlyPieces] = useState<number>(0);
    const [totalHours, setTotalHours] = useState<number>(0);
    const [totalPieces, setTotalPieces] = useState<number>(0);
    const [goalLoading, setGoalLoading] = useState<boolean>(true);
    async function fetchGoalData() {
        setGoalLoading(true);
        try {
            const dailyDates = getDailyDateRanges();
            const [dPieces, dHours] = await DataManagementAPI.getPracticeHoursAndPiecesByDate(dailyDates[0], dailyDates[1]);
            setDailyPieces(dPieces);
            setDailyHours(dHours);
            const weeklyDates = getWeeklyDateRanges();
            const [wPieces, wHours] = await DataManagementAPI.getPracticeHoursAndPiecesByDate(weeklyDates[0], weeklyDates[1]);
            setWeeklyPieces(wPieces);
            setWeeklyHours(wHours);
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
        setGoalLoading(false);
    };

    const [weeklyRange, setWeeklyRange] = useState<string>('');
    const [composersData, setComposersData] = useState<{ composer: string; hour: number }[]>([]);
    const [distributionLoading, setDistributionLoading] = useState<boolean>(true);
    async function fetchDistributionData() {
        setDistributionLoading(true);
        try {
            const weeklyDates = getWeeklyDateRanges();
            setWeeklyRange(formatWeeklyDateRange(weeklyDates[0], weeklyDates[1]));
            const weeklyComposersInfo = await DataManagementAPI.getMostPracticedComposersByDate(weeklyDates[0], weeklyDates[1]);
            setComposersData(weeklyComposersInfo);
        }
        catch (e) {
            // Handle in any way
        }
        setDistributionLoading(false);
    }

    useFocusEffect(React.useCallback(() => { fetchGoalData(); fetchDistributionData();}, []));


    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#ECF1F7' }} showsVerticalScrollIndicator={false}>
            {goalLoading || distributionLoading ? (
                <ActivityIndicator size="large" color='black' style={{ marginVertical: '20%'}}/>
            ) : (
                <View style={{ width: '100%' }}>
                    <Text style={{ fontSize: 20, marginVertical: '5%', marginLeft: '5%' }}>Activity</Text>
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
                </View>
            )}
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
