import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Modal, View, SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';


import { RootState } from '../../../redux/store';
import { validatePracticePlanDetails } from '../../../helpers';
import { DataManagementAPI } from '../../../services/apis/data_management_api';
import { IMusicPiecesProps, IPracticeDataProps } from '../../../redux/reducers';

import { STATUS } from '../../../assets/constants';
import { font_sizes, containers } from '../../../assets/common_styles';

import AddNewPlan from './add_new_plan';
import AddPrevPlan from './add_prev_plan';
import AddPlanButtons from './add_plan_buttons';

interface AddPlanContainerProps {
    weekDay: number;
    view: boolean;
    setView: (selected: boolean) => void;
}


const AddPlanContainer: React.FC<AddPlanContainerProps> = ({ weekDay, view, setView }) =>
{
    const currentPracticeData = useSelector((state: RootState) => state?.practice);
    const currentMusicPieces = useSelector((state: RootState) => state?.music);

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
    
    const selectedDate = new Date();
    const currDay = selectedDate.getDay();
    const difference = weekDay - currDay;
    selectedDate.setDate(selectedDate.getDate() + difference);
    selectedDate.setUTCHours(23, 59, 58, 0);

    async function handleSave(plan: any) {
        const detailsError = validatePracticePlanDetails(plan.title, plan.piece, plan.composer, plan.instrument);
        if (detailsError) {
            Alert.alert('Invalid Details', detailsError, [{ text: 'OK' }]);
        }
        else {
            try {
                const practiceId = await DataManagementAPI.addPracticeData(plan.title, plan.piece, plan.composer, plan.instrument, selectedDate, plan.notes);
                currentPracticeData.weeklyPracticeData.push({ id: practiceId, title: plan.title, piece: plan.piece, composer: plan.composer, instrument: plan.instrument[0],
                                                              practiceDate: weekDay, duration: 0, status: STATUS[0], notes: plan.notes } as IPracticeDataProps);
                const musicPiece = { title: plan.title, piece: plan.piece, composer: plan.composer, instrument: plan.instrument, notes: plan.notes } as IMusicPiecesProps;
                const existing = currentMusicPieces.musicPieces.find(item => item.title === musicPiece.title && item.piece === musicPiece.piece &&
                                                                     item.composer === musicPiece.composer && item.instrument === musicPiece.instrument &&
                                                                     item.notes === musicPiece.notes);                                              
                if (!existing) {
                    currentMusicPieces.musicPieces.push(musicPiece);
                }
                setView(false);
            }
            catch (e: any) {
                Alert.alert('Practice Plan Addition Failed', 'Please try again later: ' + e.code, [{ text: 'OK' }]);
            }
        }
    }

    
    return (
        <Modal animationType="fade" transparent={true} visible={view}>
            <View style={containers.backgroundModal}>
                <SafeAreaView style={containers.safeModal}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={containers.innerModal}>
                            <View style={containers.innerInnerModal}>
                                <TouchableOpacity onPress={() => setView(false)} style={containers.closeModal}>
                                    <Ionicons name='close' size={45} color='black'/>
                                </TouchableOpacity>
                                <Text style={{ fontSize: font_sizes.headers, fontWeight: 'bold', left: '-120%', alignItems: 'center', }}>Add Piece</Text>
                            </View>
                            {showInitialView && <AddPlanButtons openAddNewView={openAddNewView} openAddPrevView={openAddPrevView}/>}
                            {showAddNewView && <AddNewPlan date={selectedDate} handleSave={handleSave}/>}
                            {showAddPrevView && <AddPrevPlan handleSave={handleSave}/>}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </Modal>
    );
};

export default AddPlanContainer;
