import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';


import { RootState } from '../../../redux/store';

import DropdownSelector from '../../dropdowns/dropdown_selector';
import { containers, onLightBackground, buttons, texts } from '../../../assets/common_styles';

interface AddNewPlanProp {
    date: Date;
    handleSave: (plan: any) => void;
}


const AddNewPlan: React.FC<AddNewPlanProp> = ({ date, handleSave }) =>
{
    const currentUserProfile = useSelector((state: RootState) => state?.profile);
    const instruments = currentUserProfile.instruments;

    const [title, setTitle] = useState<string>('');
    const [piece, setPiece] = useState<string>('');
    const [composer, setComposer] = useState<string>('');
    const [instrument, setInstrument] = useState<string[]>([]);
    const [notes, setNotes] = useState<string>('');


    return (
        <View style={{ flex: 1 }}>
            <View>
                <Text style={onLightBackground.sectionText}>Title</Text>
                <TextInput
                    style={onLightBackground.inputBox}
                    placeholder={'Enter practice title'}
                    placeholderTextColor='#CCCCCC'
                    onChangeText={(text) => setTitle(text)}
                    value={title}
                />
                <Text style={onLightBackground.sectionText}>Piece</Text>
                <TextInput
                    style={onLightBackground.inputBox}
                    placeholder={'Enter piece name'}
                    placeholderTextColor='#CCCCCC'
                    onChangeText={(text) => setPiece(text)}
                    value={piece}
                />
                <Text style={onLightBackground.sectionText}>Composer</Text>
                <TextInput
                    style={onLightBackground.inputBox}
                    placeholder={'Enter composer name'}
                    placeholderTextColor='#CCCCCC'
                    onChangeText={(text) => setComposer(text)}
                    value={composer}
                />
                <Text style={onLightBackground.sectionText}>Instrument</Text>
                <DropdownSelector input={'Select an instrument'} dataList={instruments}
                                  multiselect={false} selectedItems={instrument} setSelectedItems={setInstrument}
                                  altStyle={onLightBackground.dropdown}
                />
                <Text style={onLightBackground.sectionText}>Practice Date - Not Editable</Text>
                <TextInput
                    style={onLightBackground.inputBox}
                    value={date.toDateString()}
                    editable={false}
                />
                <Text style={onLightBackground.sectionText}>Notes</Text>
                <TextInput
                    style={onLightBackground.inputBox}
                    placeholder={'(Optional) Enter any notes'}
                    placeholderTextColor='#CCCCCC'
                    onChangeText={(text) => setNotes(text)}
                    value={notes}
                />
            </View>
            <View style={containers.doubleButton}>
                <TouchableOpacity onPress={() => handleSave({ title, piece, notes, composer, instrument })}
                                  style={buttons.smallRed}>
                    <Text style={texts.button}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddNewPlan;
