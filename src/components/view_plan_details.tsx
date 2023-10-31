import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, View, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';


import { bottomStyles, inputStyles } from '../assets/styles/auth_and_profile_styles';
import { validatePracticePlan, updatePracticeData, deletePracticeData } from '../helpers';

interface ViewPlanDetailsProp {
    uid: string;
    plan: null | { id: string;
                   title: string;
                   piece: string;
                   composer: string;
                   practiceDate: Date;
                   duration: number;
                   status: string;
                   notes: string;
                 };
    view: boolean;
    setView: (selected: boolean) => void;
}


const ViewPlanDetails: React.FC<ViewPlanDetailsProp> = ({ uid, plan, view, setView }) =>
{
    const [pId, setPid] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [piece, setPiece] = useState<string>('');
    const [composer, setComposer] = useState<string>('');
    const [practiceDate, setPractieDate] = useState<Date>(new Date());
    const [calendarDate, setCalendarDate] = useState<string>((new Date()).toDateString());
    const [duration, setDuration] = useState<number>(0);
    const [status, setStatus] = useState<string>('');
    const [notes, setNotes] = useState<string>('');

    useEffect(() => { if (plan) {
                          setPid(plan.id);
                          setTitle(plan.title);
                          setPiece(plan.piece);
                          setComposer(plan.composer);
                          setPractieDate(plan.practiceDate);
                          setCalendarDate((new Date(practiceDate)).toDateString());
                          setDuration(plan.duration);
                          setStatus(plan.status);
                          setNotes(plan.notes);
                      }
                    }, [plan]);

    async function handleSave() {
        const detailsError = validatePracticePlan(title, piece, composer);
        if (detailsError) {
            Alert.alert('Invalid Details', detailsError, [ {text: 'OK'} ]);
        }
        else {
            try {
                await updatePracticeData(uid, pId, title, piece, composer, practiceDate, 0, 'Not Yet Started', notes)
                setView(false);
            }
            catch (e) {
                Alert.alert('Update Failed', 'Unable to update plan. Please try again later.', [{ text: 'OK' }]);
            }
        }
    }

    async function handleDelete() {
        Alert.alert('Practice Plan Deletion','Are you sure you want to delete plan?',
                [{ text: 'Yes', onPress: async () => { await deletePracticeData(uid, pId); setView(false); }}, { text: 'Cancel' }]
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
                                <Text style={inputStyles.profileLabelText}>Practice Date</Text>
                                <TextInput
                                    style={inputStyles.profileInputBox}
                                    value={calendarDate}
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
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </Modal>
    );
};

export default ViewPlanDetails;
