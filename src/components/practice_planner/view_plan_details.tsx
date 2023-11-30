import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Modal, View, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';


import { RootState } from '../../redux/store';
import { IPracticeDataProps } from '../../redux/reducers';
import { validatePracticePlanDetails } from '../../helpers';
import { DataManagementAPI } from '../../services/apis/data_management_api';

import { DAYS } from '../../assets/constants';
import DropdownSelector from '../dropdowns/dropdown_selector';
import { font_sizes, containers, onLightBackground, buttons, texts } from '../../assets/common_styles';

interface ViewPlanDetailsProp {
    plan: IPracticeDataProps;
    view: boolean;
    setView: (selected: boolean) => void;
}


const ViewPlanDetails: React.FC<ViewPlanDetailsProp> = ({ plan, view, setView }) =>
{
    const currentUserProfile = useSelector((state: RootState) => state?.profile);
    const currentPracticeData = useSelector((state: RootState) => state?.practice);

    const [title, setTitle] = useState<string>(plan.title);
    const [piece, setPiece] = useState<string>(plan.piece);
    const [composer, setComposer] = useState<string>(plan.composer);
    const [instrument, setInstrument] = useState<string[]>([plan.instrument]);
    const [notes, setNotes] = useState<string>(plan.notes);
    const duration = plan.duration;
    const status = plan.status;

    const instruments = currentUserProfile.instruments;

    async function handleSave() {
        const detailsError = validatePracticePlanDetails(title, piece, instrument[0], composer);
        if (detailsError) {
            Alert.alert('Invalid Details', detailsError, [{ text: 'OK' }]);
        }
        else {
            try {
                const updates = { title, piece, composer, instrument: instrument[0], notes};
                await DataManagementAPI.updatePracticeDataByField(plan.id, updates);
                { plan.title = title; plan.piece = piece; plan.composer = composer; plan.instrument = instrument[0]; plan.notes = notes; }
                setView(false);
            }
            catch (e: any) {
                Alert.alert('Practice Plan Update Failed', 'Please try again later: ' + e.code, [{ text: 'OK' }]);
            }
        }
    }

    async function handleDelete() {
        Alert.alert('Practice Plan Deletion','Are you sure you want to delete this plan?',
                   [{ text: 'Yes', onPress: async () => { await DataManagementAPI.deletePracticeData(plan.id); 
                                                          const index = currentPracticeData.weeklyPracticeData.findIndex((item) => item.id === plan.id);
                                                          if (index !== -1) {
                                                              currentPracticeData.weeklyPracticeData.splice(index, 1);
                                                          }
                                                          setView(false);
                                                        }},
                    { text: 'No' }]
        );
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
                                <Text style={{ fontSize: font_sizes.headers, fontWeight: 'bold', left: '-105%', alignItems: 'center', }}>Plan Details</Text>
                            </View>
                            {plan.practiceDate >= (new Date()).getDay() ? (
                                <View>
                                    <Text style={onLightBackground.sectionText}>Title</Text>
                                    <TextInput
                                        style={onLightBackground.inputBox}
                                        placeholder={title}
                                        placeholderTextColor='#CCCCCC'
                                        onChangeText={(text) => setTitle(text)}
                                        value={title}
                                    />
                                    <Text style={onLightBackground.sectionText}>Piece</Text>
                                    <TextInput
                                        style={onLightBackground.inputBox}
                                        placeholder={piece}
                                        placeholderTextColor='#CCCCCC'
                                        onChangeText={(text) => setPiece(text)}
                                        value={piece}
                                    />
                                    <Text style={onLightBackground.sectionText}>Composer</Text>
                                    <TextInput
                                        style={onLightBackground.inputBox}
                                        placeholder={composer}
                                        placeholderTextColor='#CCCCCC'
                                        onChangeText={(text) => setComposer(text)}
                                        value={composer}
                                    />
                                    <Text style={onLightBackground.sectionText}>Instrument</Text>
                                    <DropdownSelector input={'Select an instrument'} dataList={instruments}
                                                      multiselect={false} selectedItems={instrument} setSelectedItems={setInstrument}
                                                      altStyle={onLightBackground.dropdown}
                                    />
                                    <Text style={onLightBackground.sectionText}>Practice Date</Text>
                                    <TextInput
                                        style={onLightBackground.inputBox}
                                        value={DAYS[plan.practiceDate]}
                                        editable={false}
                                    />
                                    <Text style={onLightBackground.sectionText}>Notes</Text>
                                    <TextInput
                                        style={onLightBackground.inputBox}
                                        placeholder={notes}
                                        placeholderTextColor='#CCCCCC'
                                        onChangeText={(text) => setNotes(text)}
                                        value={notes}
                                    />
                                    <View style={containers.doubleButton}>
                                        <TouchableOpacity onPress={handleSave} style={buttons.smallBlack}>
                                            <Text style={texts.button}>Save</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleDelete} style={buttons.smallRed}>
                                            <Text style={texts.button}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                <View>
                                    <Text style={onLightBackground.sectionText}>Title</Text>
                                    <TextInput
                                        style={onLightBackground.inputBox}
                                        value={title}
                                        editable={false}
                                    />
                                    <Text style={onLightBackground.sectionText}>Piece</Text>
                                    <TextInput
                                        style={onLightBackground.inputBox}
                                        value={piece}
                                        editable={false}
                                    />
                                    <Text style={onLightBackground.sectionText}>Composer</Text>
                                    <TextInput
                                        style={onLightBackground.inputBox}
                                        value={composer}
                                        editable={false}
                                    />
                                    <Text style={onLightBackground.sectionText}>Instrument</Text>
                                    <TextInput
                                        style={onLightBackground.inputBox}
                                        value={instrument[0]}
                                        editable={false}
                                    />
                                    <Text style={onLightBackground.sectionText}>Practice Date</Text>
                                    <TextInput
                                        style={onLightBackground.inputBox}
                                        value={DAYS[plan.practiceDate]}
                                        editable={false}
                                    />
                                    <Text style={onLightBackground.sectionText}>Duration (in hours)</Text>
                                    <TextInput
                                        style={onLightBackground.inputBox}
                                        value={duration.toString()}
                                        editable={false}
                                    />
                                    <Text style={onLightBackground.sectionText}>Status</Text>
                                    <TextInput
                                        style={onLightBackground.inputBox}
                                        value={status}
                                        editable={false}
                                    />
                                    <Text style={onLightBackground.sectionText}>Notes</Text>
                                    <TextInput
                                        style={onLightBackground.inputBox}
                                        value={notes}
                                        editable={false}
                                    />
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
