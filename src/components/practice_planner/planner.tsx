import React, { useEffect, useState } from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons'; 
import { View, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native';


import { FirestoreAPI } from '../../services/firestore_api';

import ViewPlanDetails from './view_plan_details';
import AddPlanContainer from './add_practice_details/add_plan_container'

interface PlannerProp {
    date: Date[];
    reload: boolean;
    setReload: (selected: boolean) => void;
}

export interface PlanProp {
    id: string;
    title: string;
    piece: string;
    composer: string;
    instrument: string;
    practiceDate: Date;
    duration: number;
    status: string;
    notes: string;
}


const Planner: React.FC<PlannerProp> = ({ date, reload, setReload }) =>
{
    const [practicePlans, setPracticePlans] = useState<PlanProp[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    async function fetchPlans() {
        setLoading(true);
        try {
            const plans = await FirestoreAPI.getAllPracticeDataByDate(date[0], date[1]);
            setPracticePlans(plans);
        }
        catch (e) {
            // Handle in any way
        }
        setLoading(false);
    };

    useEffect(() => { if (reload) {
                         fetchPlans();
                         setReload(false);
                      }
    }, [date, reload]);

    const [addPlanVisible, setAddPlanVisible] = useState(false);
    async function handleAddPlan() {
        setAddPlanVisible(true);
    };

    const [selectedPlan, setSelectedPlan] = useState<PlanProp>({ id: '', title: '', piece: '', composer: '',
                                                                 instrument: '', practiceDate: new Date(),
                                                                 duration: 0, status: '', notes: '' });
    const [viewPlanVisible, setViewPlanVisible] = useState(false);
    async function handleViewPlan(plan: any) {
        setSelectedPlan({ id: plan.id, title: plan.title, piece: plan.piece, composer: plan.composer,
                          instrument: plan.instrument, practiceDate: plan.practiceDate, duration: plan.duration,
                          status: plan.status, notes: plan.notes });
        setViewPlanVisible(true);
    };

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);


    return (
        <View style={{ flex: 1, paddingHorizontal: '3%' }}>
            {loading ? (
                <ActivityIndicator size='large' color='black' style={{ marginTop: '5%'}} />
            ) : practicePlans.length > 0 ? (
                    practicePlans.map((plan, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.item}
                            onPress={() => {handleViewPlan(plan)}}
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
                    <Text style={{ fontSize: 20, alignSelf: 'center', marginVertical: '20%' }}>No plans.</Text>
                )}
            {date[1] >= today ? (
                <TouchableOpacity style={styles.item} onPress={handleAddPlan}>
                    <Ionicons name="add-sharp" size={30} color="black"/>
                    <Text style={styles.itemText}>Add Piece</Text>
                </TouchableOpacity>
            ) : null}
            {addPlanVisible ? (
                <AddPlanContainer date={date[0]} setReloadData={setReload}
                                  view={addPlanVisible} setView={setAddPlanVisible}/>
            ) : null}
            {viewPlanVisible ? (
                <ViewPlanDetails date={date[1]} plan={selectedPlan}
                                 view={viewPlanVisible} setView={setViewPlanVisible}
                                 isEditable={date[1] >= today} setReloadData={setReload}/>
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
