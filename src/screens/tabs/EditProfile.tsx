import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getAuth, onAuthStateChanged, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { Alert, SafeAreaView, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, View, Text, TextInput, TouchableOpacity } from 'react-native';


import { RootState } from '../../redux/store';
import { setProfile } from '../../redux/actions';
import { validateEdits, updateUserProfile } from '../../helpers';
import { DropdownSelector, DropdownCalendar } from '../../components';
import { INSTRUMENTS, LEVELS } from '../../assets/constants/profile_fields';

import { containerStyles, componentStyles, inputStyles, bottomStyles } from '../../assets/styles/auth_and_profile_styles';

const auth = getAuth();
const user = auth.currentUser!
import { ProfileStackParamList } from './app_navigation';
type editProfileScreenProp = StackNavigationProp<ProfileStackParamList, 'EditProfile'>;



const EditProfile = () =>
{
    const dispatch = useDispatch();
    const navigation = useNavigation<editProfileScreenProp>();
    const currentUserProfile = useSelector((state: RootState) => state?.profile);

    const [uid, setUid] = useState<string>('');
    const [email, setEmail] = useState<string | null>(null);
    useEffect(() => { const unsubscribe = onAuthStateChanged(auth, (user) => {
                        if (user) {
                            setUid(user.uid);
                            setEmail(user.email);
                        }
                    });
                    return unsubscribe;
    }, [uid, email]);
    const [name, setName] = useState(currentUserProfile.name);
    const [dateOfBirth, setDateOfBirth] = useState(currentUserProfile.dateOfBirth);
    const [instruments, setInstruments] = useState<string[]>(currentUserProfile.instruments);
    const [level, setLevel] = useState<string[]>([currentUserProfile.level]);
   
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    async function change_password(password: string) {
        if (password) {
            const cred = EmailAuthProvider.credential(email!, password);
            try {
                await reauthenticateWithCredential(user, cred);
                await updatePassword(user, newPassword);
            }
            catch (e) {
                Alert.alert('Password Change Failed', 'Could not change password. Please make sure old password is correct or try again later', [ {text: 'OK'} ]);
            }
        }
    }
    
    async function handleSave() {
        const editsError = validateEdits(name, dateOfBirth, instruments, level[0], oldPassword, newPassword, confPassword);
        if (editsError) {
            Alert.alert('Invalid Edits', editsError, [ {text: 'OK'} ]);
        }
        else {
            try {
                await updateUserProfile({userId: uid, name, dateOfBirth, instruments, level: level[0]});
                await change_password(oldPassword);
                dispatch(setProfile({...currentUserProfile, name, dateOfBirth, instruments, level: level[0]}));
                navigation.goBack();
            }
            catch (e) {
                Alert.alert('Profile Update Failed', 'Unable to update profile. Please try again later.', [{ text: 'OK' }]);
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
