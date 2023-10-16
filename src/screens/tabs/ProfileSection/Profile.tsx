import React, { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { SafeAreaView, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';


import { containerStyles, inputStyles, bottomStyles } from "./profile_styles";
import { INSTRUMENTS, LEVELS } from '../../../assets/constants/profile_fields';
import { DropdownSelector, DropdownCalendar, ProfileLogoSection } from '../../../components';

const auth = getAuth();
import { useAuthentication } from '../../../utils/hooks/useAuthentication';


const Profile = () =>
{
    const { user } = useAuthentication();
    const [isEditMode, setIsEditMode] = useState(false);

    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [instruments, setInstruments] = useState<string[]>([]);
    const [level, setLevel] = useState<string[]>([]);          
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');


    // TODO : Add smoother transitions !!!!
    async function  handleDeletion() {
        // TODO : Complete these steps:
            // Step 1: Ask if sure and if so, proceed
            // Step 2: Delete user data in Firestore (i.e. profile info and practice data)
            // Step 3: Delete user account from Firebase
    }

    async function handleSave() {
        // TODO : Complete these steps:
            // Step 1: Check if ALL inputs are correct and if so, proceed
            // Step 2: Update user data in Firestore and Application (i.e. profile info)
        setIsEditMode(false);
    }
    
    return (
        <SafeAreaView style={containerStyles.safeContainer}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        {!isEditMode ? (
                            <View style={containerStyles.innerContainer}>
                                <ProfileLogoSection title={'User Name'} profile={true} altStyle={inputStyles.changeButton}/>
                                <View style={containerStyles.editContainer}>
                                    <TouchableOpacity onPress={() => setIsEditMode(true)} style={inputStyles.editButton}>
                                        <Text style={inputStyles.editText}>Edit</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={containerStyles.inputContainer}>
                                    <Text style={inputStyles.labelText}>Date of Birth</Text>
                                    <TextInput
                                        style={inputStyles.inputBox}
                                        value={dateOfBirth}
                                        editable={false}
                                    />
                                    <Text style={inputStyles.labelText}>Email</Text>
                                    <TextInput
                                        style={inputStyles.inputBox}
                                        value={email}
                                        editable={false}
                                    />
                                    <Text style={inputStyles.labelText}>Password</Text>
                                    <TextInput
                                        style={inputStyles.inputBox}
                                        value={oldPassword}
                                        secureTextEntry
                                        editable={false}
                                    />
                                    <Text style={inputStyles.labelText}>Instrument(s)</Text>
                                    <TextInput
                                        style={inputStyles.inputBox}
                                        value={instruments.length > 0 ? instruments.join(', ') : instruments[0]}
                                        editable={false}
                                    />
                                    <Text style={inputStyles.labelText}>Level</Text>
                                    <TextInput
                                        style={inputStyles.inputBox}
                                        value={level[0]}
                                        editable={false}
                                    />
                                </View>
                                <View style={containerStyles.buttonContainer}>
                                    <TouchableOpacity onPress={() => signOut(auth)} style={bottomStyles.blueButton}>
                                        <Text style={bottomStyles.buttonText}>Logout</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleDeletion} style={bottomStyles.redButton}>
                                        <Text style={bottomStyles.buttonText}>Delete Account</Text>
                                    </TouchableOpacity>
                                </View> 
                            </View>
                        ) : (
                            <View style={containerStyles.innerContainer}>
                                <ProfileLogoSection title={''} profile={true} altStyle={inputStyles.changeButton}/>
                                <View style={containerStyles.inputContainer}>
                                    <Text style={inputStyles.labelText}>Name</Text>
                                    <TextInput
                                        style={inputStyles.inputBox}
                                        placeholder={name}
                                        placeholderTextColor='#CCCCCC'
                                        onChangeText={(text) => setName(text)}
                                        value={name}
                                    />
                                    <Text style={inputStyles.labelText}>Date of Birth</Text>
                                    <DropdownCalendar title={dateOfBirth} selectedDate={dateOfBirth} setDate={setDateOfBirth} altStyle={inputStyles.calendarButton}/>
                                    <Text style={inputStyles.labelText}>Email</Text>
                                    <TextInput
                                        style={inputStyles.inputBox}
                                        placeholder={email}
                                        placeholderTextColor='#CCCCCC'
                                        onChangeText={(text) => setEmail(text)}
                                        value={email}
                                    />
                                    <Text style={inputStyles.labelText}>Instrument(s)</Text>
                                    <DropdownSelector title={instruments.length > 0 ? instruments.join(', ') : instruments[0]} dataList={INSTRUMENTS} multiselect={true} selectedItems={instruments} setSelectedItems={setInstruments} altStyle={inputStyles.calendarButton}/>
                                    <Text style={inputStyles.labelText}>Musical Level</Text>
                                    <DropdownSelector title={level[0]} dataList={LEVELS} multiselect={false} selectedItems={level} setSelectedItems={setLevel} altStyle={inputStyles.calendarButton}/>
                                    <Text style={inputStyles.labelText}>Old Password</Text>
                                    <TextInput
                                        style={inputStyles.inputBox}
                                        placeholder='Enter old password'
                                        placeholderTextColor='#CCCCCC'
                                        secureTextEntry
                                        onChangeText={(text) => setOldPassword(text)}
                                        value={oldPassword}
                                    />
                                    <Text style={inputStyles.labelText}>New Password</Text>
                                    <TextInput
                                        style={inputStyles.inputBox}
                                        placeholder='Enter new password'
                                        placeholderTextColor='#CCCCCC'
                                        secureTextEntry
                                        onChangeText={(text) => setNewPassword(text)}
                                        value={newPassword}
                                    />
                                    <Text style={inputStyles.labelText}>Confirm Password</Text>
                                    <TextInput
                                        style={inputStyles.inputBox}
                                        placeholder="Re-enter new password"
                                        placeholderTextColor='#CCCCCC'
                                        secureTextEntry
                                        onChangeText={(text) => setConfPassword(text)}
                                        value={confPassword}
                                    />
                                </View>
                                <View style={containerStyles.buttonContainer}>
                                    <TouchableOpacity onPress={handleSave} style={bottomStyles.yellowButton}>
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
