import Swiper from 'react-native-swiper';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ScrollView, ActivityIndicator, View, Text, StyleSheet } from 'react-native';


import GoalTracker from '../../components/GoalTracker';
import MusicDistribution from '../../components/MusicDistribution';
import { getMostPracticedComposersByDate, getPracticePiecesAndHoursByDate } from '../../helpers';

const auth = getAuth();


const Progress = () =>
{
    const [uid, setUid] = useState<string>('');
    useEffect(() => { const unsubscribe = onAuthStateChanged(auth, async (user) => {
                        if (user) {
                            setUid(user.uid);
                        }
                    });
                    return unsubscribe;
    }, [uid]);

    useFocusEffect(React.useCallback(() => { fetchProgressData(); }, [uid]));

    const [dailyHours, setDailyHours] = useState<number>(0);
    const [weeklyHours, setWeeklyHours] = useState<number>(0);
    const [monthlyHours, setMonthlyHours] = useState<number>(0);
    const [totalHours, setTotalHours] = useState<number>(0);

    const [dailyPieces, setDailyPieces] = useState<number>(0);
    const [weeklyPieces, setWeeklyPieces] = useState<number>(0);
    const [monthlyPieces, setMonthlyPieces] = useState<number>(0);
    const [totalPieces, setTotalPieces] = useState<number>(0);

    const [composersData, setComposersData] = useState<{ artist: string; duration: number }[]>([]);
    // TODO : hardcoded for now until I get Rahul's conversion functions
    const totalComposerHours = 12;
    const totalComposerMinutes = 48;

    const [loading, setLoading] = useState<boolean>(true);
    async function fetchProgressData() {
        const startTotalDate = new Date(2023, 9, 29, -4, 0, 0);
        const endTotalDate = new Date();
        endTotalDate.setHours(19, 59, 59, 999);

        const startMonthlyDate = new Date();
        startMonthlyDate.setDate(1);
        startMonthlyDate.setHours(-4, 0, 0, 0);
        const endMonthlyDate = new Date();
        endMonthlyDate.setMonth(endMonthlyDate.getMonth() + 1, 1);
        endMonthlyDate.setDate(endMonthlyDate.getDate() - 1);
        endMonthlyDate.setHours(18, 59, 59, 999);

        const startWeeklyDate = new Date();
        startWeeklyDate.setHours(-4, 0, 0, 0);
        startWeeklyDate.setDate(startWeeklyDate.getDate() - startWeeklyDate.getDay() - 1);
        const endWeeklyDate = new Date();
        endWeeklyDate.setDate(endWeeklyDate.getDate() + (6 - endWeeklyDate.getDay()));
        endWeeklyDate.setHours(19, 59, 59, 999);

        const startDailyDate = new Date();
        startDailyDate.setHours(-4, 0, 0, 0);
        const endDailyDate = new Date();
        endDailyDate.setHours(19, 59, 59, 999);
    
        try {
            setLoading(true);

            const [tPieces, tHours] = await getPracticePiecesAndHoursByDate(uid, startTotalDate, endTotalDate);
            setTotalPieces(tPieces);
            setTotalHours(tHours);
            const [dPieces, dHours] = await getPracticePiecesAndHoursByDate(uid, startDailyDate, endDailyDate);
            setDailyPieces(dPieces);
            setDailyHours(dHours);
            const [wPieces, wHours] = await getPracticePiecesAndHoursByDate(uid, startWeeklyDate, endWeeklyDate);
            setWeeklyPieces(wPieces);
            setWeeklyHours(wHours);
            const [mPieces, mHours] = await getPracticePiecesAndHoursByDate(uid, startMonthlyDate, endMonthlyDate);
            setMonthlyPieces(mPieces);
            setMonthlyHours(mHours);

            const weeklyComposersInfo = await getMostPracticedComposersByDate(uid, startWeeklyDate, endWeeklyDate);
            setComposersData(weeklyComposersInfo);
        }
        catch (e) {
            // Handle in any way
        }
        finally {
            setLoading(false);
        }
    };


    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
            {loading ? (
                <ActivityIndicator size="large" color='black' style={{ marginVertical: '70%' }}/>
            ) : (
                <>
                <View style={styles.topContainer}>
                    <Text style={{ marginTop: 15, marginBottom: 15, marginLeft: 20, fontSize: 20 }}>Activity</Text>
                    <Swiper showsButtons={false} showsPagination={true} style={styles.swiperContainer}>
                        <View style={styles.goalContainer}>
                            <GoalTracker title="Daily Hours" goal_amount={10} hours_amount={dailyHours} pieces_amount={dailyPieces} />
                        </View>
                        <View style={styles.goalContainer}>
                            <GoalTracker title="Weekly Hours" goal_amount={20} hours_amount={weeklyHours} pieces_amount={weeklyPieces} />
                        </View>
                        <View style={styles.goalContainer}>
                            <GoalTracker title="Monthly Hours" goal_amount={50} hours_amount={monthlyHours} pieces_amount={monthlyPieces} />
                        </View>
                        <View style={styles.goalContainer}>
                            <GoalTracker title="Overall Hours" goal_amount={10000} hours_amount={totalHours} pieces_amount={totalPieces} />
                        </View>
                    </Swiper>
                    {/* <Text style={{ marginBottom: 15, marginLeft: 20, fontSize: 20, fontWeight: 'bold' }}>Trends</Text> */}
                </View>
                <View style={styles.distributionContainer}>
                    <MusicDistribution
                        date="October 23-27"
                        hours_amount={totalComposerHours.toString()}
                        minutes_amount={totalComposerMinutes.toString()}
                        songs={composersData}
                    />
                </View>
                </>
            )}
        </ScrollView>
    );
}

export default Progress;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topContainer: {
        width: "100%",
        backgroundColor: '#ECF1F7',
    },
    goalContainer: {
        alignItems: 'center',
        width: "100%",
    },
    distributionContainer: {
        width: "100%",
        marginTop: 20,
    },
    swiperContainer: {
        height: 260,
    },
});
