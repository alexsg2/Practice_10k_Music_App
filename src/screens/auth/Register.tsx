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
import { onDarkBackground, containers, buttons, texts } from '../../assets/common_styles';

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
        <SafeAreaView style={onDarkBackground.safeArea}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={containers.innerView}>
                            <ProfileLogoSection title={''} profile={true} picture={profilePicture} setPicture={setProfilePicture}
                                                altStyle={onDarkBackground.titleText}
                            />
                            <View style={containers.input}>
                                <Text style={onDarkBackground.sectionText}>Name</Text>
                                <TextInput
                                    style={onDarkBackground.inputBox}
                                    placeholder='Enter your name'
                                    placeholderTextColor='#CCCCCC'
                                    onChangeText={(text) => setName(text)}
                                    value={name}
                                />
                                <Text style={onDarkBackground.sectionText}>Date of Birth</Text>
                                <DropdownCalendar input={'MM/DD/YYYY'} selectedDate={dateOfBirth} setDate={setDateOfBirth}
                                                  altStyle={onDarkBackground.dropdown}
                                />
                                <Text style={onDarkBackground.sectionText}>Email</Text>
                                <TextInput
                                    style={onDarkBackground.inputBox}
                                    placeholder='Enter email address'
                                    placeholderTextColor='#CCCCCC'
                                    onChangeText={(text) => setEmail(text)}
                                    value={email}
                                />
                                <Text style={onDarkBackground.sectionText}>Instrument(s)</Text>
                                <DropdownSelector input={'Select your instrument(s)'} dataList={INSTRUMENTS}
                                                  multiselect={true} selectedItems={instruments} setSelectedItems={setInstruments}
                                                  altStyle={onDarkBackground.dropdown}
                                />
                                <Text style={onDarkBackground.sectionText}>Musical Level</Text>
                                <DropdownSelector input={'Select your level'} dataList={LEVELS}
                                                  multiselect={false} selectedItems={level} setSelectedItems={setLevel}
                                                  altStyle={onDarkBackground.dropdown}
                                />
                                <Text style={onDarkBackground.sectionText}>New Password</Text>
                                <TextInput
                                    style={onDarkBackground.inputBox}
                                    placeholder='Enter a password'
                                    placeholderTextColor='#CCCCCC'
                                    secureTextEntry
                                    onChangeText={(text) => setPassword(text)}
                                    value={password}
                                />
                                <Text style={onDarkBackground.sectionText}>Confirm Password</Text>
                                <TextInput
                                    style={onDarkBackground.inputBox}
                                    placeholder="Re-enter password above"
                                    placeholderTextColor='#CCCCCC'
                                    secureTextEntry
                                    onChangeText={(text) => setConfPassword(text)}
                                    value={confPassword}
                                />
                            </View>
                            <View style={containers.singleButton}>
                                <TouchableOpacity onPress={handleRegister} style={buttons.largeBlack}>
                                    <Text style={texts.button}>Register</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text style={onDarkBackground.footer}>Already a user? Click here.</Text>
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
