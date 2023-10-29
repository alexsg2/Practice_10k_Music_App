import React, { useEffect, useState } from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons'; 
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';


export type PracticeStackParamList = {
    Practice: undefined;
    PracticeTimer: undefined;
};
type PracticeNavigationProp = NavigationProp<PracticeStackParamList, 'Practice' | 'PracticeTimer'>;

interface PlannerProp {
    date: Date;
    practice: boolean;
}

const Planner: React.FC<PlannerProp> = ({ date, practice }) =>
{
    const navigation = useNavigation<PracticeNavigationProp>();
    
    const [plans, setPlans] = useState<string[]>([]);
    useEffect(() => {
        // TODO : fetch data in firestore by date and set plans
    }, [date]);

    const handleAddPlan = () => {
        // TODO : navigate to 'adding plan' screen - claire's
    };

    const handleViewPlan = () => {
        // TODO : navigate to 'viewing plan' screen just like journal
    };

    const handleStartPlan = () => {
        // TODO : navigate to 'viewing plan' screen just like journal
    };

    return (
        <View style={{ flex: 1, padding: '3%', width: '100%' }}>
            <Text style={{ fontSize: 20 }}>Today's Plans</Text>
            {plans.length > 0 ? (
                plans.map((plan, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.item}
                        onPress={() => {handleViewPlan}}
                    >
                        <Ionicons name='musical-note' size={25}></Ionicons>
                        <Text style={styles.itemText}>{plan}</Text>
                        <AntDesign name="right" size={24} right={'-780%'} color="black"/>
                    </TouchableOpacity>
                ))
            ) : (
                <Text style={{ fontSize: 16, fontStyle: 'italic', alignSelf: 'center', marginTop: '7%' }}>Nothing planned for this date.</Text>
            )}
            <TouchableOpacity style={styles.item} onPress={handleAddPlan}>
                <Ionicons name="add-sharp" size={30} color="black"/>
                <Text style={styles.itemText}>Add Piece</Text>
            </TouchableOpacity>
            {practice && plans.length > 0 ? (
                <TouchableOpacity style={styles.startButton} onPress={handleStartPlan}>
                    <Ionicons name="play" size={25} color="black"/>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Start</Text>
                </TouchableOpacity>
            ) : (
                null
            )}
        </View>
    );
};

export default Planner;

const styles = StyleSheet.create(
{
    item: {
        width: '98%',
        padding: '5%',
        marginTop: '5%',
        borderRadius: 15,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#7BC3E9',
    },
    itemText: {
        fontSize: 16,
        paddingHorizontal: '2.5%',
    },
    startButton: {
        width: '50%',
        padding: '5%',
        marginTop: '5%',
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#7BC3E9',
    },
});
