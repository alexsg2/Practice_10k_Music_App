import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import GoalTracker from '../../components/GoalTracker';
import MusicDistribution from '../../components/MusicDistribution';
import Swiper from 'react-native-swiper';
import { DesignLibrary } from '../../assets/DesignLibrary';

const songs = [
    { artist: 'Bach', duration: 100 },
    { artist: 'Jessie Montgomery', duration: 80 },
    { artist: 'Dvorak', duration: 50 },
    { artist: 'Beethoven', duration: 20 },
    { artist: 'Artist 5', duration: 10 },
  ];
  
export default function Progress() {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.topContainer}>
                <Text style={{ marginTop: 15, marginBottom: 15, marginLeft: 20, fontSize: 20 }}>Activity</Text>
                <Swiper showsButtons={false} showsPagination={true} style={styles.swiperContainer}>
                    <View style={styles.goalContainer}>
                        <GoalTracker title="Daily Hours" goal_amount={10} hours_amount={7} pieces_amount={2} />
                    </View>
                    <View style={styles.goalContainer}>
                        <GoalTracker title="Weekly Hours" goal_amount={20} hours_amount={12} pieces_amount={26} />
                    </View>
                    <View style={styles.goalContainer}>
                        <GoalTracker title="Monthly Hours" goal_amount={50} hours_amount={24} pieces_amount={55} />
                    </View>
                    <View style={styles.goalContainer}>
                        <GoalTracker title="Overall Hours" goal_amount={520} hours_amount={490} pieces_amount={75} />
                    </View>
                </Swiper>
                {/* <Text style={{ marginBottom: 15, marginLeft: 20, fontSize: 20, fontWeight: 'bold' }}>Trends</Text> */}

            </View>
            <View style={styles.distributionContainer}>
                <MusicDistribution
                    date="October 23-27"
                    hours_amount={"10"}
                    minutes_amount={"59"}
                    songs={songs}
                />
            </View>
        </ScrollView>
    );
}

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
