import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert, SafeAreaView, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, View, Text, TextInput, TouchableOpacity } from 'react-native';


import { RootState } from '../../redux/store';
import { setProfile } from '../../redux/actions';
import { validateProfileEdits } from '../../helpers';
import { AuthenticationAPI } from '../../services/apis/authentication_api';

import { INSTRUMENTS, LEVELS } from '../../assets/constants';
import { DropdownSelector, DropdownCalendar } from '../../components';
import { containerStyles, componentStyles, inputStyles, bottomStyles } from '../../assets/styles/auth_and_profile_styles';

import { ProfileStackParamList } from './app_navigation';
type EditProfileScreenProp = StackNavigationProp<ProfileStackParamList, 'EditProfile'>;


const EditProfile = () =>
{
    const dispatch = useDispatch();

    const currentUserProfile = useSelector((state: RootState) => state?.profile);
    const email = currentUserProfile.email;
    const [name, setName] = useState(currentUserProfile.name);
    const [dateOfBirth, setDateOfBirth] = useState(currentUserProfile.dateOfBirth);
    const [instruments, setInstruments] = useState<string[]>(currentUserProfile.instruments);
    const [level, setLevel] = useState<string[]>([currentUserProfile.level]);
   
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const navigation = useNavigation<EditProfileScreenProp>();

    async function handleSave() {
        const editsError = validateProfileEdits(name, dateOfBirth, instruments, level[0], oldPassword, newPassword, confPassword);
        if (editsError) {
            Alert.alert('Invalid Edits', editsError, [{ text: 'OK' }]);
        }
        else {
            try {
                await AuthenticationAPI.updateProfile(name, email, dateOfBirth, instruments, level[0], oldPassword, confPassword);
                dispatch(setProfile({...currentUserProfile, name, dateOfBirth, instruments, level: level[0]}));
                navigation.goBack();
            }
            catch (e: any) {
                Alert.alert('Profile Update Failed', 'Please verify old password or try again later: ' + e.code, [{ text: 'OK' }]);
            }
        }
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF1F7' }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={containerStyles.innerContainer}>
                            <View style={containerStyles.inputContainer}>
                                <Text style={inputStyles.profileLabelText}>Name</Text>
                                <TextInput
                                    style={inputStyles.profileInputBox}
                                    placeholder={name}
                                    placeholderTextColor='#CCCCCC'
                                    onChangeText={(text) => setName(text)}
                                    value={name}
                                />
                                <Text style={inputStyles.profileLabelText}>Date of Birth</Text>
                                <DropdownCalendar input={dateOfBirth} selectedDate={dateOfBirth} setDate={setDateOfBirth}
                                                  altStyle={[componentStyles.profileComponentButton, componentStyles.selectedText, componentStyles.defaultText]}
                                />
                                <Text style={inputStyles.profileLabelText}>Instrument(s)</Text>
                                <DropdownSelector input={instruments.length > 0 ? instruments.join(', ') : instruments[0]} dataList={INSTRUMENTS}
                                                  multiselect={true} selectedItems={instruments} setSelectedItems={setInstruments}
                                                  altStyle={[componentStyles.profileComponentButton, componentStyles.selectedText, componentStyles.defaultText]}
                                />
                                <Text style={inputStyles.profileLabelText}>Musical Level</Text>
                                <DropdownSelector input={level[0]} dataList={LEVELS}
                                                  multiselect={false} selectedItems={level} setSelectedItems={setLevel}
                                                  altStyle={[componentStyles.profileComponentButton, componentStyles.selectedText, componentStyles.defaultText]}
                                />
                                <Text style={inputStyles.profileLabelText}>Old Password</Text>
                                <TextInput
                                    style={inputStyles.profileInputBox}
                                    placeholder='(Optional) Enter old password'
                                    placeholderTextColor='#CCCCCC'
                                    secureTextEntry
                                    onChangeText={(text) => setOldPassword(text)}
                                    value={oldPassword}
                                />
                                <Text style={inputStyles.profileLabelText}>New Password</Text>
                                <TextInput
                                    style={inputStyles.profileInputBox}
                                    placeholder='(Optional) Enter new password'
                                    placeholderTextColor='#CCCCCC'
                                    secureTextEntry
                                    onChangeText={(text) => setNewPassword(text)}
                                    value={newPassword}
                                />
                                <Text style={inputStyles.profileLabelText}>Confirm Password</Text>
                                <TextInput
                                    style={inputStyles.profileInputBox}
                                    placeholder="(Optional) Re-enter new password"
                                    placeholderTextColor='#CCCCCC'
                                    secureTextEntry
                                    onChangeText={(text) => setConfPassword(text)}
                                    value={confPassword}
                                />
                            </View>
                            <View style={containerStyles.buttonContainer}>
                                <TouchableOpacity onPress={handleSave} style={bottomStyles.redButton}>
                                    <Text style={bottomStyles.buttonText}>Save</Text>
                                </TouchableOpacity>
                            </View> 
                        </View>
                    </TouchableWithoutFeedback>   
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default EditProfile;
