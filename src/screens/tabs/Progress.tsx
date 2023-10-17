import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import GoalTracker from '../../components/GoalTracker'

export default function Progress() {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <GoalTracker title="Daily Hours" goal_amount={10} hours_amount={7} pieces_amount={2} />
                <GoalTracker title="Weekly Hours" goal_amount={20} hours_amount={12} pieces_amount={26} />
                <GoalTracker title="Monthly Hours" goal_amount={50} hours_amount={24} pieces_amount={55} />
                <GoalTracker title="Overall Hours" goal_amount={200} hours_amount={107} pieces_amount={123} />

                <Text>Temporary progress screen.</Text>
                <StatusBar style="auto" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
