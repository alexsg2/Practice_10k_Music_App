import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { SafeAreaView, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';


import { containerStyles, inputStyles, bottomStyles } from "./auth_styles";
import { INSTRUMENTS, LEVELS } from '../../assets/constants/profile_fields';
import { DropdownSelector, DropdownCalendar, ProfileLogoSection } from '../../components';

const auth = getAuth();
import { AuthStackParamList } from './auth_nav';
import { validateRegistrationFormat, addUserData } from '../../helpers';
type registerScreenProp = StackNavigationProp<AuthStackParamList, 'Register'>;


const Register = () =>
{
    // TODO : Figure out how to handle profile picture !!
    //      - For now, picture is not editable and is set in component/profile_logo_section file.
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [instruments, setInstruments] = useState<string[]>([]);
    const [level, setLevel] = useState<string[]>([]);          
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const navigation = useNavigation<registerScreenProp>();

    async function handleRegister() {
        const registerError = validateRegistrationFormat(name, dateOfBirth, instruments, level, email, newPassword, confPassword);
        if (registerError) {
            Alert.alert('Invalid Registration', registerError, [ {text: 'OK'} ]);
        }
        else {
            try {
                const userCredentials = await createUserWithEmailAndPassword(auth, email, newPassword);
                const userUid = userCredentials.user.uid;
                await addUserData(userUid, name, dateOfBirth, email, instruments, level, confPassword);
            }
            catch (e) {
                Alert.alert('Registration Failed', 'Unable to register account. Please check your provided information or try again later.',
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
                            <ProfileLogoSection title={''} profile={true}/>
                            <View style={containerStyles.inputContainer}>
                                <Text style={inputStyles.labelText}>Name</Text>
                                <TextInput
                                    style={inputStyles.inputBox}
                                    placeholder='Enter your name'
                                    placeholderTextColor='#CCCCCC'
                                    onChangeText={(text) => setName(text)}
                                    value={name}
                                />
                                <Text style={inputStyles.labelText}>Date of Birth</Text>
                                <DropdownCalendar title={'MM/DD/YYYY'} selectedDate={dateOfBirth} setDate={setDateOfBirth}/>
                                <Text style={inputStyles.labelText}>Email</Text>
                                <TextInput
                                    style={inputStyles.inputBox}
                                    placeholder='Enter email address'
                                    placeholderTextColor='#CCCCCC'
                                    onChangeText={(text) => setEmail(text)}
                                    value={email}
                                />
                                <Text style={inputStyles.labelText}>Instrument(s)</Text>
                                <DropdownSelector title={'Select your instrument(s)'} dataList={INSTRUMENTS} multiselect={true} selectedItems={instruments} setSelectedItems={setInstruments}/>
                                <Text style={inputStyles.labelText}>Musical Level</Text>
                                <DropdownSelector title={'Select your level'} dataList={LEVELS} multiselect={false} selectedItems={level} setSelectedItems={setLevel}/>
                                <Text style={inputStyles.labelText}>New Password</Text>
                                <TextInput
                                    style={inputStyles.inputBox}
                                    placeholder='Enter a password'
                                    placeholderTextColor='#CCCCCC'
                                    secureTextEntry
                                    onChangeText={(text) => setNewPassword(text)}
                                    value={newPassword}
                                />
                                <Text style={inputStyles.labelText}>Confirm Password</Text>
                                <TextInput
                                    style={inputStyles.inputBox}
                                    placeholder="Re-enter password above"
                                    placeholderTextColor='#CCCCCC'
                                    secureTextEntry
                                    onChangeText={(text) => setConfPassword(text)}
                                    value={confPassword}
                                />
                            </View>
                            <View style={containerStyles.buttonContainer}>
                                <TouchableOpacity onPress={handleRegister} style={bottomStyles.button}>
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
