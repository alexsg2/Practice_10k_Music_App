import { Ionicons } from '@expo/vector-icons'; 
import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Alert, SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';


import { STATUS } from '../../assets/constants';
import { IPracticeDataProps } from '../../redux/reducers';
import { color_pallete, font_sizes, containers, onLightBackground, texts, buttons, } from '../../assets/common_styles';

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
    const [currPlan, setCurrPlan] = useState(toPractice[0]);

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
            const totalHours = convertToHours(time);
            if (totalHours !== 0.00) {
                const updates = { status: STATUS[1], duration: currPlan.duration + totalHours };
                await DataManagementAPI.updatePracticeDataByField(currPlan.id, updates);
                { currPlan.status = STATUS[1], currPlan.duration = currPlan.duration + totalHours };
            }
            setTime(0);
            navigation.goBack();
        }
        catch (e: any) {
            Alert.alert('Database Error', "Unable to save the current plan's practice details: " + e.code, [{ text: 'OK' }]);
        }
    }

    async function handleNextPiece() {
        try {
            setTimerOn(false);
            const totalHours = convertToHours(time);
            const updates = { status: STATUS[2], duration: currPlan.duration + totalHours };
            await DataManagementAPI.updatePracticeDataByField(currPlan.id, updates);
            { currPlan.status = STATUS[2], currPlan.duration = currPlan.duration + totalHours };
            setTime(0);
            
            if (toPractice.length === 1) {
                navigation.goBack();
                toPractice.splice(0, 1);
            }
            else {
                toPractice.splice(0, 1);
                setCurrPlan(toPractice[0]);
            }
        }
        catch (e: any) {
            Alert.alert('Database Error', "Unable to save the current plan's practice details: " + e.code, [{ text: 'OK' }]);
        }
    }


    return (
        <SafeAreaView style={onLightBackground.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: '2.5%', paddingHorizontal: '5%' }}>
                    <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: '2%' }}>
                        <Text style={{ fontSize: font_sizes.inputs }}>Now Playing:</Text>
                        <Text style={{ fontSize: font_sizes.footers, marginTop: '5%' }}>{currPlan.composer} - {currPlan.piece}</Text>
                    </View>
                    {timerVisible && (
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ fontSize: font_sizes.sections }}>
                                { Math.floor(time / 3600).toString().padStart(2, '0') }:
                                { Math.floor((time % 3600) / 60).toString().padStart(2, '0') }:
                                { (time % 60).toString().padStart(2, '0') }
                            </Text>
                        </View>
                    )}
                    <View style={{ flex: 1, alignItems: 'flex-end', marginRight: '2%' }}>
                        <TouchableOpacity onPress={() => setTimerVisible(!timerVisible)}
                                            style={{ padding: '7%', borderRadius: 5, backgroundColor: color_pallete.blue_gradiant['60%'] }}
                        >
                            <Text style={{ fontSize: font_sizes.touchables }}>{ timerVisible ? ' Hide\nTimer' : 'Show\nTimer' }</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {!currPlan ? (
                    <Text>No More Plans</Text>
                ) : (
                    <View style={{ width: '90%', minHeight: '55%', padding: '5%', borderRadius: 10, flexDirection: 'column',
                                   alignSelf: 'center', alignItems: 'center', backgroundColor: '#5982C2'
                                }}
                    >
                        <Text style={texts.cardTitle}>{currPlan.title}</Text>
                        <View style={containers.list}>
                            <Text style={texts.cardField}>Piece: </Text>
                            <Text style={texts.cardValue}>{currPlan.piece}</Text>
                        </View>
                        <View style={containers.list}>
                            <Text style={texts.cardField}>Composer: </Text>
                            <Text style={texts.cardValue}>{currPlan.composer}</Text>
                        </View>
                        <View style={containers.list}>
                            <Text style={texts.cardField}>Instrument: </Text>
                            <Text style={texts.cardValue}>{currPlan.instrument}</Text>
                        </View>
                        <View style={containers.list}>
                            <Text style={texts.cardField}>Notes: </Text>
                            <Text style={texts.cardValue}>{currPlan.notes}</Text>
                        </View>
                    </View>
                )}
                <View style={{ width: '100%', alignItems: 'center', marginVertical: '5%' }}>
                    <TouchableOpacity onPress={() => setTimerOn(prevState => !prevState)}
                                        style={{ width: '90%', padding: '5%', marginBottom: '5%', borderRadius: 10, alignSelf: 'center', alignItems: 'center',
                                                 flexDirection: 'row', justifyContent: 'center', backgroundColor: color_pallete.blue_gradiant['60%']
                                               }}
                    >
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{ timerOn ? 'Pause Timer  ' : 'Start Timer  '}</Text>
                        <Ionicons name={ timerOn ? 'pause' : 'play' } size={25} color='black' />
                    </TouchableOpacity>
                    <View style={containers.doubleButton}>
                        <TouchableOpacity onPress={handleStopSession} style={buttons.smallBlue}>
                            <Text style={onLightBackground.buttonText}>Stop Session  </Text>
                            <Ionicons name='square' size={25} color='black' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleNextPiece} style={buttons.smallBlue}>
                            <Text style={onLightBackground.buttonText}>Next Piece  </Text>
                            <Ionicons name='arrow-redo' size={25} color='black' />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default PracticeTimer;
