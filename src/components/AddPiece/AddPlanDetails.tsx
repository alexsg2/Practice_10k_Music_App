import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';


import { RootState } from '../../redux/store';
import DropdownSelector from '../dropdown_selector';
import { bottomStyles, componentStyles, inputStyles } from '../../assets/styles/auth_and_profile_styles';


interface AddPlanDetailsProp {
    date: Date;
    handleSave: (plan: any) => void;
}


const AddPlanDetails: React.FC<AddPlanDetailsProp> = ({ handleSave, date }) =>
{
    const currentUserProfile = useSelector((state: RootState) => state?.profile);
    const instruments = currentUserProfile.instruments;

    const [title, setTitle] = useState<string>('');
    const [piece, setPiece] = useState<string>('');
    const [composer, setComposer] = useState<string>('');
    const [instrument, setInstrument] = useState<string[]>([]);
    const [notes, setNotes] = useState<string>('');
    return (
        <View style={{ flex: 1, paddingHorizontal: '3%' }}>
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
                <TouchableOpacity onPress={() => handleSave({title, piece, notes, composer, instrument})} style={bottomStyles.redButton}>
                    <Text style={bottomStyles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddPlanDetails;
