import { Ionicons } from '@expo/vector-icons'; 
import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Alert, SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';


import { STATUS } from '../../assets/constants';
import { IPracticeDataProps } from '../../redux/reducers';

import { convertToHours } from '../../helpers';
import { DataManagementAPI } from '../../services/apis/data_management_api';

type PracticeTimerParamList = {
    PracticeTimer: { item: IPracticeDataProps[] };
};
type PracticeTimerRouteProp = RouteProp<PracticeTimerParamList, 'PracticeTimer'>;


const PracticeTimer = () =>
{
    const route = useRoute<PracticeTimerRouteProp>();
    const toPractice = route.params.item;

    const [currPlanIndex, setCurrPlanIndex] = useState(0);
    const currPlan = toPractice[currPlanIndex];

    const [time, setTime] = useState(0);
    let interval: NodeJS.Timeout | null = null;
    const [timerOn, setTimerOn] = useState(false);
    const [timerVisible, setTimerVisible] = useState(true);

    useEffect(() => { if (timerOn) {
                          interval = setInterval(() => { setTime(prevTime => prevTime + 1); }, 1000); // Increment time every 1 second (1000ms)
                      }
                      else if (interval) {
                          clearInterval(interval);
                          interval = null;
                      }
                      return () => { if (interval) {
                                         clearInterval(interval);
                                     }
                      };
    }, [timerOn]);

    const navigation = useNavigation();

    async function handleStopSession() {
        try {
            setTimerOn(false);
            console.log(time);
            const totalHours = convertToHours(time);
            console.log(totalHours);
            if (totalHours !== 0) {
                const updates = { status: STATUS[1], duration: totalHours };
                await DataManagementAPI.updatePracticeDataByField(currPlan.id, updates);
                // TODO : is this valid ?? --> does it actually change redux
                { currPlan.status = STATUS[1], currPlan.duration = totalHours };
                console.log(currPlan);
            }
            navigation.goBack();
        }
        catch (e: any) {
            Alert.alert('Database Error', "Unable to save the current plan's practice details: " + e.code, [{ text: 'OK' }]);
        }
    }

    async function handleNextPiece() {
        try {
            setTimerOn(false);
            console.log(time);
            const updates = { status: STATUS[2], duration: convertToHours(time) };
            console.log(convertToHours(time));
            await DataManagementAPI.updatePracticeDataByField(currPlan.id, updates);
            { currPlan.status = STATUS[2], currPlan.duration = convertToHours(time) };
            toPractice.splice(0, 1);
            setTime(0);
            
            if (toPractice.length === 0) {
                navigation.goBack();
            }
        }
        catch (e: any) {
            Alert.alert('Database Error', "Unable to save the current plan's practice details: " + e.code, [{ text: 'OK' }]);
        }
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF1F7' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: '2.5%', paddingHorizontal: '5%' }}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 12 }}>Now Playing:</Text>
                        <Text style={{ fontSize: 10, marginTop: 5 }}>{currPlan.composer} - {currPlan.piece}</Text>
                    </View>
                    {timerVisible && (
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ fontSize: 20 }}>
                                { Math.floor(time / 3600).toString().padStart(2, '0') }:
                                { Math.floor((time % 3600) / 60).toString().padStart(2, '0') }:
                                { (time % 60).toString().padStart(2, '0') }
                            </Text>
                        </View>
                    )}
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={() => setTimerVisible(!timerVisible)}
                                            style={{ padding: '7%', borderRadius: 5, backgroundColor: '#7BC3E9' }}
                        >
                            <Text style={{ fontSize: 14 }}>{ timerVisible ? ' Hide\nTimer' : 'Show\nTimer' }</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {!currPlan ? (
                    <Text>No More Plans</Text>
                ) : (
                    <View style={{ width: '90%', minHeight: '55%', flexDirection: 'column', alignSelf: 'center', alignItems: 'center', borderRadius: 10, padding: '5%', backgroundColor: '#5982C2' }}>
                        <Text style={{ fontSize: 36, fontWeight: 'bold', textAlign: 'center', paddingBottom: '7%' }}>{currPlan.title}</Text>
                        <View style={styles.planDetailsContainer}>
                            <Text style={styles.planTitleText}>Piece: </Text>
                            <Text style={styles.planValueText}>{currPlan.piece}</Text>
                        </View>
                        <View style={styles.planDetailsContainer}>
                            <Text style={styles.planTitleText}>Composer: </Text>
                            <Text style={styles.planValueText}>{currPlan.composer}</Text>
                        </View>
                        <View style={styles.planDetailsContainer}>
                            <Text style={styles.planTitleText}>Instrument: </Text>
                            <Text style={styles.planValueText}>{currPlan.instrument}</Text>
                        </View>
                        <Text style={{ fontSize: 26, fontWeight: 'bold', alignSelf: 'flex-start', padding: '2%' }}>Notes: </Text>
                        <Text style={{ fontStyle: 'italic', fontSize: 24, paddingHorizontal: '7%' }}>{currPlan.notes}</Text>
                    </View>
                )}
                <View style={{ width: '100%', alignItems: 'center', marginVertical: '5%' }}>
                    <TouchableOpacity onPress={() => setTimerOn(prevState => !prevState)}
                                        style={{ width: '90%', borderRadius: 10, padding: '6%', marginVertical: '3%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#7BC3E9' }}
                    >
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{ timerOn ? 'Pause Timer  ' : 'Start Timer  '}</Text>
                        <Ionicons name={ timerOn ? "pause" : "play" } size={25} color="black" />
                    </TouchableOpacity>
                    <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', marginVertical: '3%' }}>
                        <TouchableOpacity onPress={handleStopSession} style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Stop Session  </Text>
                            <Ionicons name="square" size={25} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleNextPiece} style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Next Piece  </Text>
                            <Ionicons name="arrow-redo" size={25} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default PracticeTimer;

const styles = StyleSheet.create(
{
    planDetailsContainer: {
        width: '100%',
        padding: '2%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    planTitleText: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    planValueText: {
        fontSize: 24,
    },
    buttonContainer: {
        width: '48%',
        padding: '5%',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7BC3E9',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
