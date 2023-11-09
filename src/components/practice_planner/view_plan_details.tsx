import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Modal, View, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';


import { RootState } from '../../redux/store';
import { validatePracticePlanDetails } from '../../helpers';
import { DataManagementAPI } from '../../services/apis/data_management_api';

import DropdownSelector from '../dropdowns/dropdown_selector';
import { bottomStyles, componentStyles, inputStyles } from '../../assets/styles/auth_and_profile_styles';

import { PlanProp } from './planner';
interface ViewPlanDetailsProp {
    date: Date;
    plan: PlanProp;
    view: boolean;
    setView: (selected: boolean) => void;
    isEditable: boolean;
    setReloadData: (selected: boolean) => void;
}


const ViewPlanDetails: React.FC<ViewPlanDetailsProp> = ({ date, plan, view, setView, isEditable, setReloadData }) =>
{
    const currentUserProfile = useSelector((state: RootState) => state?.profile);
    const instruments = currentUserProfile.instruments;

    const [title, setTitle] = useState<string>(plan.title);
    const [piece, setPiece] = useState<string>(plan.piece);
    const [composer, setComposer] = useState<string>(plan.composer);
    const [instrument, setInstrument] = useState<string[]>([plan.instrument]);
    const [notes, setNotes] = useState<string>(plan.notes);
    const duration = plan.duration;
    const status = plan.status;

    async function handleSave() {
        const detailsError = validatePracticePlanDetails(title, piece, instrument[0], composer);
        if (detailsError) {
            Alert.alert('Invalid Details', detailsError, [{ text: 'OK' }]);
        }
        else {
            try {
                const updates = { title, piece, composer, instrument: instrument[0], notes};
                await DataManagementAPI.updatePracticeDataByField(plan.id, updates);
                setView(false);
                setReloadData(true);
            }
            catch (e: any) {
                Alert.alert('Practice Plan Update Failed', 'Please try again later: ' + e.code, [{ text: 'OK' }]);
            }
        }
    }

    async function handleDelete() {
        Alert.alert('Practice Plan Deletion','Are you sure you want to delete this plan?',
                   [{ text: 'Yes', onPress: async () => { await DataManagementAPI.deletePracticeData(plan.id); 
                                                          setView(false);
                                                          setReloadData(true);
                                                        }},
                    { text: 'No' }]
        );
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
                                <Text style={{ fontSize: 25, fontWeight: 'bold', left: '-95%', alignItems: 'center', }}>Plan Details</Text>
                            </View>
                            {isEditable ? (
                                <View>
                                    <Text style={inputStyles.profileLabelText}>Title</Text>
                                    <TextInput
                                        style={inputStyles.profileInputBox}
                                        placeholder={title}
                                        placeholderTextColor='#CCCCCC'
                                        onChangeText={(text) => setTitle(text)}
                                        value={title}
                                    />
                                    <Text style={inputStyles.profileLabelText}>Piece</Text>
                                    <TextInput
                                        style={inputStyles.profileInputBox}
                                        placeholder={piece}
                                        placeholderTextColor='#CCCCCC'
                                        onChangeText={(text) => setPiece(text)}
                                        value={piece}
                                    />
                                    <Text style={inputStyles.profileLabelText}>Composer</Text>
                                    <TextInput
                                        style={inputStyles.profileInputBox}
                                        placeholder={composer}
                                        placeholderTextColor='#CCCCCC'
                                        onChangeText={(text) => setComposer(text)}
                                        value={composer}
                                    />
                                    <Text style={inputStyles.profileLabelText}>Instrument</Text>
                                    <DropdownSelector input={'Select an instrument'} dataList={instruments}
                                                    multiselect={false} selectedItems={instrument} setSelectedItems={setInstrument}
                                                    altStyle={[componentStyles.profileComponentButton, componentStyles.selectedText, componentStyles.defaultText]}
                                    />
                                    <Text style={inputStyles.profileLabelText}>Practice Date - Not Editable</Text>
                                    <TextInput
                                        style={inputStyles.profileInputBox}
                                        value={date.toDateString()}
                                        editable={false}
                                    />
                                    <Text style={inputStyles.profileLabelText}>Notes</Text>
                                    <TextInput
                                        style={inputStyles.profileInputBox}
                                        placeholder={notes}
                                        placeholderTextColor='#CCCCCC'
                                        onChangeText={(text) => setNotes(text)}
                                        value={notes}
                                    />
                                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                        <TouchableOpacity onPress={handleSave} style={bottomStyles.smallBlackButton}>
                                            <Text style={bottomStyles.buttonText}>Save</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleDelete} style={bottomStyles.smallRedButton}>
                                            <Text style={bottomStyles.buttonText}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                <View>
                                    <Text style={inputStyles.profileLabelText}>Title</Text>
                                    <TextInput
                                        style={inputStyles.profileInputBox}
                                        value={title}
                                        editable={false}
                                    />
                                    <Text style={inputStyles.profileLabelText}>Piece</Text>
                                    <TextInput
                                        style={inputStyles.profileInputBox}
                                        value={piece}
                                        editable={false}
                                    />
                                    <Text style={inputStyles.profileLabelText}>Composer</Text>
                                    <TextInput
                                        style={inputStyles.profileInputBox}
                                        value={composer}
                                        editable={false}
                                    />
                                    <Text style={inputStyles.profileLabelText}>Instrument</Text>
                                    <TextInput
                                        style={inputStyles.profileInputBox}
                                        value={instrument[0]}
                                        editable={false}
                                    />
                                    <Text style={inputStyles.profileLabelText}>Practice Date</Text>
                                    <TextInput
                                        style={inputStyles.profileInputBox}
                                        value={date.toDateString()}
                                        editable={false}
                                    />
                                    <Text style={inputStyles.profileLabelText}>Duration (in hours)</Text>
                                    <TextInput
                                        style={inputStyles.profileInputBox}
                                        value={duration.toString()}
                                        editable={false}
                                    />
                                    <Text style={inputStyles.profileLabelText}>Status</Text>
                                    <TextInput
                                        style={inputStyles.profileInputBox}
                                        value={status}
                                        editable={false}
                                    />
                                    <Text style={inputStyles.profileLabelText}>Notes</Text>
                                    <TextInput
                                        style={inputStyles.profileInputBox}
                                        value={notes}
                                        editable={false}
                                    />
                                    <View style={{ width: '70%', alignSelf: 'center' }}>
                                        <TouchableOpacity onPress={handleDelete} style={bottomStyles.redButton}>
                                            <Text style={bottomStyles.buttonText}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </Modal>
    );
};

export default ViewPlanDetails;
