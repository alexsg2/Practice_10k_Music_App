import React, { useEffect, useState } from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons'; 
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';


import AddPlanDetails from './add_plan_details';
import ViewPlanDetails from './view_plan_details';
import { getPracticeDataByDate } from '../helpers';

interface PlannerProp {
    userId: string;
    date: Date[];
}


const Planner: React.FC<PlannerProp> = ({ userId, date }) =>
{
    const [loading, setLoading] = useState(true);
    
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [addPlanVisible, setAddPlanVisible] = useState(false);
    const [viewPlanVisible, setViewPlanVisible] = useState(false);

    const [plans, setPlans] = useState<any[]>([]);
    useEffect(() => { async function fetchPlans() {
                        try {
                            const practiceData = await getPracticeDataByDate(userId, date[0], date[1]);
                            setPlans(practiceData || []);
                        }
                        catch (e: any) {
                            // Alert.alert('Loading Failed', 'Unable to load practice plans. Please reload or try again later: ' + e.code, [{ text: 'OK' }]);
                        }
                    }

                    fetchPlans();
                    setLoading(false);
                }, [userId, date, addPlanVisible, viewPlanVisible]);

    async function handleAddPlan() {
        setAddPlanVisible(true);
    };

    async function handleViewPlan(plan: any) {
        setSelectedPlan(plan);
        setViewPlanVisible(true);
    };

    return (
        <View style={{ flex: 1, padding: '3%', width: '100%' }}>
            <Text style={{ fontSize: 20 }}>Today's Plans</Text>
            {loading ? (
                <ActivityIndicator size='large' color='black' style={{ marginTop: '5%'}} />
            ) : plans.length > 0 ? (
                    plans.map((plan, index) => (
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
                    <Text style={{ fontSize: 16, fontStyle: 'italic', alignSelf: 'center', marginTop: '7%' }}>Nothing planned for this date.</Text>
                )}
            <TouchableOpacity style={styles.item} onPress={handleAddPlan}>
                <Ionicons name="add-sharp" size={30} color="black"/>
                <Text style={styles.itemText}>Add Piece</Text>
            </TouchableOpacity>
            {addPlanVisible ? (
                <AddPlanDetails uid={userId} date={date[1]} view={addPlanVisible} setView={setAddPlanVisible}/> 
            ) : null}
            {viewPlanVisible ? (
                <ViewPlanDetails uid={userId} plan={selectedPlan} view={viewPlanVisible} setView={setViewPlanVisible}/> 
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
