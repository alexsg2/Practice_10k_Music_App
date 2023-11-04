import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Modal, View, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';


import { RootState } from '../../redux/store';
import DropdownSelector from '../dropdown_selector';
import { validatePracticePlan, addPracticeData } from '../../helpers';
import { bottomStyles, componentStyles, inputStyles } from '../../assets/styles/auth_and_profile_styles';


interface AddPlanDetailsProp {
    uid: string;
    date: Date;
    setReloadData: (selected: boolean) => void;
}


const AddPlanDeatails: React.FC<AddPlanDetailsProp> = ({ uid, date, setReloadData }) =>
{
    const currentUserProfile = useSelector((state: RootState) => state?.profile);
    const instruments = currentUserProfile.instruments;

    const [title, setTitle] = useState<string>('');
    const [piece, setPiece] = useState<string>('');
    const [composer, setComposer] = useState<string>('');
    const [instrument, setInstrument] = useState<string[]>([]);
    const [notes, setNotes] = useState<string>('');

    async function handleSave() {
        const detailsError = validatePracticePlan(title, piece, composer, instrument[0]);
        if (detailsError) {
            Alert.alert('Invalid Details', detailsError, [ {text: 'OK'} ]);
        }
        else {
            try {
                date.setHours(19, 59, 58, 998);
                await addPracticeData(uid, title, piece, composer, instrument[0], date, notes);
                setReloadData(true);
            }
            catch (e) {
                Alert.alert('Practice Plan Addition Failed', 'Unable to add plan. Please try again later.', [{ text: 'OK' }]);
            }
        }
    }

    return (
        <>
            <View>
                <Text style={inputStyles.profileLabelText}>Title</Text>
                <TextInput
                    style={inputStyles.profileInputBox}
                    placeholder={'Enter practice title'}
                    placeholderTextColor='#CCCCCC'
                    onChangeText={(text) => setTitle(text)}
                    value={title}
                />
                <Text style={inputStyles.profileLabelText}>Piece</Text>
                <TextInput
                    style={inputStyles.profileInputBox}
                    placeholder={'Enter piece name'}
                    placeholderTextColor='#CCCCCC'
                    onChangeText={(text) => setPiece(text)}
                    value={piece}
                />
                <Text style={inputStyles.profileLabelText}>Composer</Text>
                <TextInput
                    style={inputStyles.profileInputBox}
                    placeholder={'Enter composer name'}
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
                    placeholder={'Enter any notes'}
                    placeholderTextColor='#CCCCCC'
                    onChangeText={(text) => setNotes(text)}
                    value={notes}
                />
            </View>
            <View style={{ width: '70%', alignSelf: 'center' }}>
                <TouchableOpacity onPress={handleSave} style={bottomStyles.redButton}>
                    <Text style={bottomStyles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default AddPlanDeatails;
