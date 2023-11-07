import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Modal, View, SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';


import AddNewPlan from './add_new_plan';
import AddPrevPlan from './add_prev_plan';
import AddPlanButtons from './add_plan_buttons';

import { validatePracticePlanDetails } from '../../../helpers';
import { FirestoreAPI } from '../../../services/firestore_api';

interface AddPlanContainerProps {
    date: Date;
    view: boolean;
    setView: (selected: boolean) => void;
    setReloadData: (selected: boolean) => void;
}


const AddPlanContainer: React.FC<AddPlanContainerProps> = ({ date, view, setView, setReloadData }) =>
{
    const [showAddNewView, setShowAddNewView] = useState<boolean>(false);
    const [showAddPrevView, setShowAddPrevView] = useState<boolean>(false);
    const showInitialView = !showAddNewView && !showAddPrevView;
    
    const openAddNewView = () => {
      setShowAddPrevView(false);
      setShowAddNewView(true);
    }
    
    const openAddPrevView = () => {
      setShowAddNewView(false);
      setShowAddPrevView(true);
    }
    
    date.setUTCHours(23, 59, 58, 0);

    async function handleSave(plan: any) {
        const detailsError = validatePracticePlanDetails(plan.title, plan.piece, plan.composer, plan.instrument);
        if (detailsError) {
            Alert.alert('Invalid Details', detailsError, [{ text: 'OK' }]);
        }
        else {
            try {
                await FirestoreAPI.addPracticeData(plan.title, plan.piece, plan.composer, plan.instrument, date, plan.notes);
                setReloadData(true);
                setView(false);
            }
            catch (e: any) {
                Alert.alert('Practice Plan Addition Failed', 'Please try again later: ' + e.code, [{ text: 'OK' }]);
            }
        }
    }

    
    return (
        <Modal animationType="fade" transparent={true} visible={view}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <SafeAreaView style={{ flex: 0.70, width: '90%', backgroundColor: '#ECF1F7', borderRadius: 10 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ width: '95%', padding: '5%', alignSelf: 'center', backgroundColor: '#ECF1F7' }}>
                            <View style={{ width: '95%', marginBottom: '5%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => setView(false)} style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                    <Ionicons name="close" size={40} color='black'/>
                                </TouchableOpacity>
                                <Text style={{ fontSize: 25, fontWeight: 'bold', left: '-120%', alignItems: 'center', }}>Add Piece</Text>
                            </View>
                        </View>
                        {showInitialView && <AddPlanButtons openAddNewView={openAddNewView} openAddPrevView={openAddPrevView}/>}
                        {showAddNewView && <AddNewPlan date={date} handleSave={handleSave}/>}
                        {showAddPrevView && <AddPrevPlan handleSave={handleSave}/>}
                    </ScrollView>
                </SafeAreaView>
            </View>
        </Modal>
    );
};

export default AddPlanContainer;
