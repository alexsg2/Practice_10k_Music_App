import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Modal, View, SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';

import { validatePracticePlan, addPracticeData } from '../../helpers';
import AddPlanDetails from './AddPlanDetails'
import AddPieceButtons from './AddPieceButtons'
import AddPrevPlan from './AddPrevPlan'

interface AddPieceContainerProps {
    plans: any[];
    view: boolean;
    setView: (selected: boolean) => void;
    setReloadData: (selected: boolean) => void;
    date: Date[];
    reload: boolean;
    userId: string;
}


const AddPieceContainer: React.FC<AddPieceContainerProps> = ({plans, view, setView, setReloadData, date, reload, userId}) =>
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
    
    async function handleSave(plan: any) {
        const detailsError = validatePracticePlan(plan?.title, plan?.piece, plan?.composer, plan?.instrument);
        if (detailsError) {
            Alert.alert('Invalid Details', detailsError, [ {text: 'OK'} ]);
        }
        else {
            try {
                date[1].setHours(19, 59, 58, 998);
                await addPracticeData(userId, plan?.title, plan?.piece, plan?.composer, plan?.instrument, date[1], plan?.notes);
                setReloadData(true);
                setView(false);
            }
            catch (e) {
                Alert.alert('Practice Plan Addition Failed', 'Unable to add plan. Please try again later.', [{ text: 'OK' }]);
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
                                <Text style={{ fontSize: 25, fontWeight: 'bold', left: '-95%', alignItems: 'center', }}>Add Piece</Text>
                            </View>
                        </View>
                        {showInitialView && <AddPieceButtons openAddNewView={openAddNewView} openAddPrevView={openAddPrevView}/>}
                        {showAddNewView && <AddPlanDetails date={date[1]} handleSave={handleSave}/>}
                        {showAddPrevView && <AddPrevPlan plans={plans} handleSave={handleSave}/>}
                    </ScrollView>
                </SafeAreaView>
            </View>
        </Modal>
    );
};

export default AddPieceContainer;
