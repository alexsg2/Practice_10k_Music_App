import React, { useState } from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons'; 
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { STATUS } from '../../assets/constants';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IPracticeDataProps } from '../../redux/reducers';

import ViewPlanDetails from './view_plan_details';
import AddPlanContainer from './add_practice_details/add_plan_container'

interface PlannerProp {
    dayOfWeek: number;
    practicing: boolean;
}


const Planner: React.FC<PlannerProp> = ({ dayOfWeek, practicing }) =>
{
    const currentPracticeData = useSelector((state: RootState) => state?.practice);

    let selectedPlans = currentPracticeData.weeklyPracticeData.filter((plan) => plan.practiceDate === dayOfWeek)
    if (practicing) {
        selectedPlans = selectedPlans.filter((plan) => plan.status !== STATUS[2]);
    }
    
    const [addPlanVisible, setAddPlanVisible] = useState(false);
    async function handleAddPlan() {
        setAddPlanVisible(true);
    };

    const [selectedPlan, setSelectedPlan] = useState<IPracticeDataProps>({ id: '', title: '', piece: '', composer: '',
                                                                           instrument: '', practiceDate: 0, duration: 0,
                                                                           status: '', notes: '' });
    const [viewPlanVisible, setViewPlanVisible] = useState(false);
    async function handleViewPlan(plan: IPracticeDataProps) {
        setSelectedPlan(plan);
        setViewPlanVisible(true);
    };


    return (
        <View style={{ flex: 1, paddingHorizontal: '3%' }}>
            {selectedPlans.length > 0 ? (
                selectedPlans.map((plan, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.item}
                        onPress={() => { handleViewPlan(plan) }}
                    >
                        <View style={styles.leftContainer}>
                            <Ionicons name='musical-note' size={25}></Ionicons>
                            <Text style={styles.itemText}>{plan.title}</Text>
                        </View>
                        <View style={styles.rightContainer}>
                            <AntDesign name="right" size={24} color="black"/>
                        </View>
                    </TouchableOpacity>
                ))
            ) : (
                practicing ? (
                    <Text style={{ fontSize: 20, textAlign: 'center', alignSelf: 'center', marginVertical: '20%' }}>No plans to practice.</Text>
                ) : (
                    <Text style={{ fontSize: 20, alignSelf: 'center', marginVertical: '20%' }}>No plans scheduled.</Text>
                )
            )}
            {dayOfWeek >= new Date().getDay() ? (
                <TouchableOpacity style={styles.item} onPress={handleAddPlan}>
                    <Ionicons name="add-sharp" size={30} color="black"/>
                    <Text style={styles.itemText}>Add Piece</Text>
                </TouchableOpacity>
            ) : null}
            {addPlanVisible ? (
                <AddPlanContainer weekDay={dayOfWeek} view={addPlanVisible} setView={setAddPlanVisible}/>
            ) : null}
            {viewPlanVisible ? (
                <ViewPlanDetails plan={selectedPlan} view={viewPlanVisible} setView={setViewPlanVisible}/>
            ) : null}
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
    leftContainer: {
        flex: 1,
        paddingRight: '5%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    rightContainer: {
        alignItems: 'flex-end',
    },
    itemText: {
        fontSize: 16,
        alignSelf: 'center',
        paddingHorizontal: '5%',
    },
});
