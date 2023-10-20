import React, { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Alert, LayoutAnimation, SafeAreaView, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, View, Text, TextInput, TouchableOpacity } from 'react-native';


import { colorPallete } from '../../assets/design_library';
import { INSTRUMENTS, LEVELS } from '../../assets/constants/profile_fields';
import { DropdownSelector, DropdownCalendar, ProfileLogoSection } from '../../components';
import { containerStyles, componentStyles, inputStyles, bottomStyles } from '../../assets/styles/auth_and_profile_styles';

const auth = getAuth();
import { deleteUserData, validateProfileEditFormat } from '../../helpers';



const Profile = () =>
{
    // TODO : use redux for these
    const [name, setName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [instruments, setInstruments] = useState<string[]>([]);
    const [level, setLevel] = useState<string[]>([]);
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    async function  handleDeletion() {
        try {
            // TODO : Complete these steps:
            // Step 1: Use 'Alert' react component to ask user if sure and if so:
            // Step 2: Delete user data from Firestore
                //deleteUserData(userUid);
            // Step 3: Delete user account from Firebase
            // Step 4: Navigate to Start screen
        }
        catch (e) {
            Alert.alert('Request Failed', 'Unable to delete account. Please try again later.',
                        [{ text: 'OK' }]);
        }
    }

    const [isEditMode, setIsEditMode] = useState(false);

    async function handleSave() {
        const editsError = validateProfileEditFormat(name, dateOfBirth, instruments, level, email, oldPassword, newPassword, confPassword);
        if (editsError) {
            Alert.alert('Invalid Login', editsError, [ {text: 'OK'} ]);
            setIsEditMode(false);
        }
        else {
            try {
                // TODO : To finish by getting the current user in DB and updating it with the edits
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setIsEditMode(false);
            }
            catch (e) {
                Alert.alert('Request Failed', 'Unable to save edits. Please check your credentials or try again later.',
                            [{ text: 'OK' }]);
            }
        }
    }
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF1F7' }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        {!isEditMode ? (
                            <View style={containerStyles.innerContainer}>
                                <ProfileLogoSection title={'User Name'} profile={true} altStyle={[componentStyles.profileTitleText, componentStyles.profileChangePictureButton, componentStyles.profileChangeText]}/>
                                <View style={{ flex: 1, width: '90%', marginBottom: '2%', borderRadius: 10, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                    <TouchableOpacity onPress={() => setIsEditMode(true)}
                                                      style={{ paddingVertical: '3%', paddingHorizontal: '5%', borderRadius: 10,
                                                               alignItems: 'flex-end', justifyContent: 'flex-end', backgroundColor: colorPallete.black_gradiant["60%"]
                                                            }}
                                    >
                                        <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'white' }}>Edit</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={containerStyles.inputContainer}>
                                    <Text style={inputStyles.profileLabelText}>Date of Birth</Text>
                                    <TextInput
                                        style={inputStyles.profileInputBox}
                                        value={dateOfBirth}
                                        editable={false}
                                    />
                                    <Text style={inputStyles.profileLabelText}>Email</Text>
                                    <TextInput
                                        style={inputStyles.profileInputBox}
                                        value={email}
                                        editable={false}
                                    />
                                    <Text style={inputStyles.profileLabelText}>Password</Text>
                                    <TextInput
                                        style={inputStyles.profileInputBox}
                                        value={oldPassword}
                                        secureTextEntry
                                        editable={false}
                                    />
                                    <Text style={inputStyles.profileLabelText}>Instrument(s)</Text>
                                    <TextInput
                                        style={inputStyles.profileInputBox}
                                        value={instruments.length > 0 ? instruments.join(', ') : instruments[0]}
                                        editable={false}
                                    />
                                    <Text style={inputStyles.profileLabelText}>Level</Text>
                                    <TextInput
                                        style={inputStyles.profileInputBox}
                                        value={level[0]}
                                        editable={false}
                                    />
                                </View>
                                <View style={containerStyles.buttonContainer}>
                                    <TouchableOpacity onPress={() => signOut(auth)} style={bottomStyles.blackButton}>
                                        <Text style={bottomStyles.buttonText}>Logout</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleDeletion} style={bottomStyles.redButton}>
                                        <Text style={bottomStyles.buttonText}>Delete Account</Text>
                                    </TouchableOpacity>
                                </View> 
                            </View>
                        ) : (
                            <View style={containerStyles.innerContainer}>
                                <Text style={{ fontWeight: 'bold', fontSize: 24, marginVertical: '5%' }}>Edits</Text>
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
                                    <DropdownCalendar title={dateOfBirth} selectedDate={dateOfBirth} setDate={setDateOfBirth}
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
                                    <DropdownSelector title={instruments.length > 0 ? instruments.join(', ') : instruments[0]} dataList={INSTRUMENTS}
                                                      multiselect={true} selectedItems={instruments} setSelectedItems={setInstruments}
                                                      altStyle={[componentStyles.profileComponentButton, componentStyles.selectedText, componentStyles.defaultText, containerStyles.profileDropdownBox]}
                                    />
                                    <Text style={inputStyles.profileLabelText}>Musical Level</Text>
                                    <DropdownSelector title={level[0]} dataList={LEVELS}
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
                        )}
                    </TouchableWithoutFeedback>   
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default Profile;