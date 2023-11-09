import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert, SafeAreaView, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, View, Text, TextInput, TouchableOpacity } from 'react-native';


import { RootState } from '../../redux/store';
import { setProfile } from '../../redux/actions';
import { validateRegistrationFormat } from '../../helpers';
import { AuthenticationAPI } from '../../services/apis/authentication_api';

import { INSTRUMENTS, LEVELS } from '../../assets/constants';
import { DropdownSelector, DropdownCalendar, ProfileLogoSection } from '../../components';
import { containerStyles, componentStyles, inputStyles, bottomStyles } from "../../assets/styles/auth_and_profile_styles";

import { AuthStackParamList } from './auth_navigation';
type registerScreenProp = StackNavigationProp<AuthStackParamList, 'Register'>;


const Register = () =>
{
    const dispatch = useDispatch();
    const currentUserProfile = useSelector((state: RootState) => state?.profile);

    const [profilePicture, setProfilePicture] = useState('');
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [instruments, setInstruments] = useState<string[]>([]);
    const [level, setLevel] = useState<string[]>([]);          
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const navigation = useNavigation<registerScreenProp>();
    
    async function handleRegister() {
        const registerError = validateRegistrationFormat(name, dateOfBirth, instruments, level, email, password, confPassword);
        if (registerError) {
            Alert.alert('Invalid Registration', registerError, [{ text: 'OK' }]);
        }
        else {
            try {
                await AuthenticationAPI.register(profilePicture, name, dateOfBirth, instruments, level[0], email, confPassword);
                dispatch(setProfile({ ...currentUserProfile, email, profilePicture, name, dateOfBirth, instruments, level: level[0] }));
            }
            catch (e: any) {
                Alert.alert('Registration Failed', 'Please check provided information or try again later: ' + e.code,
                            [{ text: 'OK' }]);
            }
        }
    }

    
    return (
        <SafeAreaView style={containerStyles.safeContainer}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={containerStyles.innerContainer}>
                            <ProfileLogoSection title={''} profile={true} picture={profilePicture} setPicture={setProfilePicture}
                                                altStyle={[componentStyles.authTitleText, componentStyles.authChangePictureButton, componentStyles.authChangeText]}
                            />
                            <View style={containerStyles.inputContainer}>
                                <Text style={inputStyles.authLabelText}>Name</Text>
                                <TextInput
                                    style={inputStyles.authInputBox}
                                    placeholder='Enter your name'
                                    placeholderTextColor='#CCCCCC'
                                    onChangeText={(text) => setName(text)}
                                    value={name}
                                />
                                <Text style={inputStyles.authLabelText}>Date of Birth</Text>
                                <DropdownCalendar input={'MM/DD/YYYY'} selectedDate={dateOfBirth} setDate={setDateOfBirth}
                                                  altStyle={[componentStyles.authComponentButton, componentStyles.selectedText, componentStyles.defaultText]}
                                />
                                <Text style={inputStyles.authLabelText}>Email</Text>
                                <TextInput
                                    style={inputStyles.authInputBox}
                                    placeholder='Enter email address'
                                    placeholderTextColor='#CCCCCC'
                                    onChangeText={(text) => setEmail(text)}
                                    value={email}
                                />
                                <Text style={inputStyles.authLabelText}>Instrument(s)</Text>
                                <DropdownSelector input={'Select your instrument(s)'} dataList={INSTRUMENTS}
                                                  multiselect={true} selectedItems={instruments} setSelectedItems={setInstruments}
                                                  altStyle={[componentStyles.authComponentButton, componentStyles.selectedText, componentStyles.defaultText]}
                                />
                                <Text style={inputStyles.authLabelText}>Musical Level</Text>
                                <DropdownSelector input={'Select your level'} dataList={LEVELS}
                                                  multiselect={false} selectedItems={level} setSelectedItems={setLevel}
                                                  altStyle={[componentStyles.authComponentButton, componentStyles.selectedText, componentStyles.defaultText]}
                                />
                                <Text style={inputStyles.authLabelText}>New Password</Text>
                                <TextInput
                                    style={inputStyles.authInputBox}
                                    placeholder='Enter a password'
                                    placeholderTextColor='#CCCCCC'
                                    secureTextEntry
                                    onChangeText={(text) => setPassword(text)}
                                    value={password}
                                />
                                <Text style={inputStyles.authLabelText}>Confirm Password</Text>
                                <TextInput
                                    style={inputStyles.authInputBox}
                                    placeholder="Re-enter password above"
                                    placeholderTextColor='#CCCCCC'
                                    secureTextEntry
                                    onChangeText={(text) => setConfPassword(text)}
                                    value={confPassword}
                                />
                            </View>
                            <View style={containerStyles.buttonContainer}>
                                <TouchableOpacity onPress={handleRegister} style={bottomStyles.blackButton}>
                                    <Text style={bottomStyles.buttonText}>Register</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text style={bottomStyles.footerText}>Already a user? Click here.</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>   
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default Register;
