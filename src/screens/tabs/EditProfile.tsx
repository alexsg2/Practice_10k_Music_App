import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth, updatePassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert, SafeAreaView, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';


import { RootState } from '../../redux/store';
import { setProfile } from '../../redux/actions';
import { updateUserData, validateEdits } from '../../helpers';
import { DropdownSelector, DropdownCalendar } from '../../components';
import { INSTRUMENTS, LEVELS } from '../../assets/constants/profile_fields';

import { colorPallete, fontSizes } from '../../assets/design_library';
import { containerStyles, componentStyles, inputStyles, bottomStyles } from '../../assets/styles/auth_and_profile_styles';

const auth = getAuth();
const user = auth.currentUser!
import { ProfileStackParamList } from './app_navigation';
type editProfileScreenProp = StackNavigationProp<ProfileStackParamList, 'Profile'>;



const EditProfile = () =>
{
    const navigation = useNavigation<editProfileScreenProp>();
    
    const dispatch = useDispatch();
    
    const currentUserProfile = useSelector((state: RootState) => state?.profile);
    const [name, setName] = useState(currentUserProfile.name);
    const [dateOfBirth, setDateOfBirth] = useState(currentUserProfile.dateOfBirth);
    const [instruments, setInstruments] = useState<string[]>(currentUserProfile.instruments);
    const [level, setLevel] = useState<string[]>(currentUserProfile.level);
    const [email, setEmail] = useState(currentUserProfile.email);
    const currPassword = currentUserProfile.password;
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    async function handleBackToProfile() {
        Alert.alert('Exiting Edit Mode', 'No changes will be saved. Are you sure you want to go back to the profile page?',
                  [ {text: 'Yes', onPress: () => navigation.navigate('Profile')}, {text: 'No'} ]
        );
    }

    async function handleSave() {
        const editsError = validateEdits(name, dateOfBirth, instruments, level, email, currPassword, oldPassword, newPassword, confPassword);
        if (editsError) {
            Alert.alert('Invalid Edits', editsError, [ {text: 'OK'} ]);
        }
        else {
            try {
                // await updatePassword(user, newPassword); --> NOT WORKING !!!!!
                await updateUserData({userId: user?.uid, name, dateOfBirth, instruments, level, email});
                dispatch(setProfile({...currentUserProfile, name, dateOfBirth, instruments, level, email, password: newPassword}));
                navigation.navigate('Profile');
            }
            catch (e) {
                Alert.alert('Profile Update Failed', 'Unable to update profile. Please try again later.', [{ text: 'OK' }]);
            }
        }
    }
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF1F7' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackToProfile} style={styles.cancelButton}>
                    <Ionicons name="arrow-back" size={40} color='black' left="5%"/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Profile</Text>
            </View>
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
                                                altStyle={[componentStyles.profileComponentButton, componentStyles.selectedText, componentStyles.defaultText, containerStyles.profileCalendarBox]}
                                />
                                <Text style={inputStyles.profileLabelText}>Email</Text>
                                <TextInput
                                    style={inputStyles.profileInputBox}
                                    placeholder={email}
                                    placeholderTextColor='#CCCCCC'
                                    onChangeText={(text) => setEmail(text)}
                                    value={email}
                                />
                                <Text style={inputStyles.profileLabelText}>Instrument(s)</Text>
                                <DropdownSelector input={instruments.length > 0 ? instruments.join(', ') : instruments[0]} dataList={INSTRUMENTS}
                                                multiselect={true} selectedItems={instruments} setSelectedItems={setInstruments}
                                                altStyle={[componentStyles.profileComponentButton, componentStyles.selectedText, componentStyles.defaultText, containerStyles.profileDropdownBox]}
                                />
                                <Text style={inputStyles.profileLabelText}>Musical Level</Text>
                                <DropdownSelector input={level[0]} dataList={LEVELS}
                                                multiselect={false} selectedItems={level} setSelectedItems={setLevel}
                                                altStyle={[componentStyles.profileComponentButton, componentStyles.selectedText, componentStyles.defaultText, containerStyles.profileDropdownBox]}
                                />
                                <Text style={inputStyles.profileLabelText}>Old Password</Text>
                                <TextInput
                                    style={inputStyles.profileInputBox}
                                    placeholder='Enter old password'
                                    placeholderTextColor='#CCCCCC'
                                    secureTextEntry
                                    onChangeText={(text) => setOldPassword(text)}
                                    value={oldPassword}
                                />
                                <Text style={inputStyles.profileLabelText}>New Password</Text>
                                <TextInput
                                    style={inputStyles.profileInputBox}
                                    placeholder='Enter new password'
                                    placeholderTextColor='#CCCCCC'
                                    secureTextEntry
                                    onChangeText={(text) => setNewPassword(text)}
                                    value={newPassword}
                                />
                                <Text style={inputStyles.profileLabelText}>Confirm Password</Text>
                                <TextInput
                                    style={inputStyles.profileInputBox}
                                    placeholder="Re-enter new password"
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

const styles = StyleSheet.create(
{
    header: {
        height: 60,
        marginBottom: '2%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: colorPallete.black_gradiant["default"],
    },
    cancelButton: {
        flex: 1,
    },
    headerTitle: {
        flex: 1,
        left: -50,
        fontWeight: 'bold',
        fontSize: fontSizes.name,
    }
});
