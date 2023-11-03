import Swiper from 'react-native-swiper';
import React, { useEffect, useState } from 'react';
import { LineChart } from "react-native-chart-kit";
import { useFocusEffect } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ScrollView, ActivityIndicator, View, Text, StyleSheet, Dimensions } from 'react-native';


import { colorPallete } from '../../assets/design_library';
import { GoalTracker, MusicDistribution } from '../../components';
import { getMostPracticedComposersByDate, getPracticeDataByDate, getPracticePiecesAndHoursByDate,
         getDailyDateRanges, getWeeklyDateRanges, getMonthlyDateRanges, getOverallDateRanges,
         totalDurationInHoursAndMinutes, formatWeeklyDateRange } from '../../helpers';

const auth = getAuth();


const Progress = () =>
{
    const [dailyHours, setDailyHours] = useState<number>(0);
    const [weeklyHours, setWeeklyHours] = useState<number>(0);
    const [monthlyHours, setMonthlyHours] = useState<number>(0);
    const [totalHours, setTotalHours] = useState<number>(0);

    const [dailyPieces, setDailyPieces] = useState<number>(0);
    const [weeklyPieces, setWeeklyPieces] = useState<number>(0);
    const [monthlyPieces, setMonthlyPieces] = useState<number>(0);
    const [totalPieces, setTotalPieces] = useState<number>(0);

    const [trendData, setTrendData] = useState<number[]>([]);

    const [weeklyRange, setWeeklyRange] = useState<string>('');
    const [composersData, setComposersData] = useState<{ composer: string; hour: number }[]>([]);
    const [composerHours, setComposerHours] = useState<number>(0);
    const [composerMinutes, setComposerMinutes] = useState<number>(0);

    const [uid, setUid] = useState<string>('');
    useEffect(() => { const unsubscribe = onAuthStateChanged(auth, async (user) => {
                        if (user) {
                            setUid(user.uid);
                        }
                        fetchProgressData();
                    });
                    return unsubscribe;
    }, [uid]);

    useFocusEffect(React.useCallback(() => { fetchProgressData(); }, [uid]));

    const [loading, setLoading] = useState<boolean>(true);
    async function fetchProgressData() {
        const dailyDates = getDailyDateRanges();
        const weeklyDates = getWeeklyDateRanges();
        const monthlyDates = getMonthlyDateRanges();
        const overallDates = getOverallDateRanges();
    
        try {
            setLoading(true);

            const [tPieces, tHours] = await getPracticePiecesAndHoursByDate(uid, overallDates[0], overallDates[1]);
            setTotalPieces(tPieces);
            setTotalHours(tHours);
            const [dPieces, dHours] = await getPracticePiecesAndHoursByDate(uid, dailyDates[0], dailyDates[1]);
            setDailyPieces(dPieces);
            setDailyHours(dHours);
            const [wPieces, wHours] = await getPracticePiecesAndHoursByDate(uid, weeklyDates[0], weeklyDates[1]);
            setWeeklyPieces(wPieces);
            setWeeklyHours(wHours);
            const [mPieces, mHours] = await getPracticePiecesAndHoursByDate(uid, monthlyDates[0], monthlyDates[1]);
            setMonthlyPieces(mPieces);
            setMonthlyHours(mHours);

            const monthlyData = await getPracticeDataByDate(uid, overallDates[0], overallDates[1]);
            setTrendData(monthlyData.map(item => item.duration));

            setWeeklyRange(formatWeeklyDateRange(weeklyDates[0], weeklyDates[1]));
            const weeklyComposersInfo = await getMostPracticedComposersByDate(uid, weeklyDates[0], weeklyDates[1]);
            setComposersData(weeklyComposersInfo);
            const allHours = composersData.map(item => item.hour);
            const [tComposerHours, tComposerMinutes] = totalDurationInHoursAndMinutes(allHours);
            setComposerHours(tComposerHours);
            setComposerMinutes(tComposerMinutes);
        }
        catch (e) {
            // Handle in any way
        }
        finally {
            setLoading(false);
        }
    };


    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#ECF1F7' }} showsVerticalScrollIndicator={false}>
            {loading ? (
                <ActivityIndicator size="large" color='black' style={{ marginVertical: '70%' }}/>
            ) : (
                <>
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
                </View>
                <View style={{ width: '100%' }}>
                    <Text style={{ fontSize: 20, marginBottom: '7%', marginLeft: '5%' }}>Trend</Text>
                    <View style={{ flex: 1, width: '100%', alignItems: 'center', alignSelf: 'center' }}>
                        {trendData.length > 0 ? (
                            <LineChart
                                data={{ labels: [],
                                        datasets: [{ data: trendData,
                                                    strokeWidth: 2,
                                                    color: (opacity: any) => colorPallete.blue_gradiant["60%"],
                                                    },],
                                    }}
                                yAxisSuffix=' hrs'
                                width={Dimensions.get('window').width * 0.95}
                                height={200}
                                chartConfig={{ decimalPlaces: 0,
                                               style: { alignItems: 'center', borderWidth: 1, borderRadius: 16 },
                                               color: (opacity) => colorPallete.black_gradiant["default"],
                                               labelColor: (opacity) => colorPallete.black_gradiant["default"],
                                               backgroundGradientTo: '#ECF1F7',
                                               backgroundGradientFrom: '#ECF1F7',
                                               backgroundGradientToOpacity: 0,
                                            }}
                                withInnerLines={false}
                            />
                        ) : (
                            <Text style={{ fontSize: 16, fontStyle: 'italic', alignSelf: 'center' }}>No trend available.</Text>
                        )}
                    </View>
                </View>
                <View style={{ width: '100%' }}>
                    <Text style={{ fontSize: 20, marginVertical: '7%', marginLeft: '5%' }}>Distribution</Text>
                    <View style={{ flex: 1, width: '100%', alignItems: 'center', alignSelf: 'center' }}>
                        {composersData.length > 0 ? (
                            <MusicDistribution
                                date={weeklyRange}
                                hours_amount={composerHours.toString()}
                                minutes_amount={composerMinutes.toString()}
                                composers={composersData}
                            />
                        ) : (
                            <Text style={{ fontSize: 16, fontStyle: 'italic', alignSelf: 'center' }}>No distrbution available.</Text>
                        )}
                    </View>
                </View>
                </>
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
