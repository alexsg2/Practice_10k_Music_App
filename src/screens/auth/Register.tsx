import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { SafeAreaView, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';


import { containerStyles, inputStyles, bottomStyles } from "./auth_style";
import { INSTRUMENTS, LEVELS } from '../../assets/constants/profile_fields';
import { DropdownSelector, DropdownCalendar, ProfileLogoSection } from '../../components';

const auth = getAuth();
import { AuthStackParamList } from './auth_nav';
import { validateRegistrationFormat } from '../../helpers/validate_auth';
type registerScreenProp = StackNavigationProp<AuthStackParamList, 'Register'>;


const Register = () =>
{
    const [name, setName] = useState('');
    // TODO : note that profile picture is being saved in componet/profile_logo_section
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [instruments, setInstruments] = useState<string[]>([]);
    const [level, setLevel] = useState<string[]>([]);          
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [error, setError] = useState('');
    // TODO : should error disapear after awhile ??

    const navigation = useNavigation<registerScreenProp>();

    async function handleRegistering() {
        const registerError = validateRegistrationFormat(name, dateOfBirth, instruments, level, email, newPassword, confPassword);
        if (registerError) {
            setError(registerError);
        }
        else {
            try {
                await createUserWithEmailAndPassword(auth, email, newPassword);
            }
            catch (error: any) {
                // TODO : fix this
                // if (error.code === 'user-not-found') {
                //     setError('No account with the given email exists.');
                // }
                // else if (error.code === 'wrong-password') {
                //     setError('Password is incorrect.');
                // }
                // else {
                //     setError(error.code);
                // }
            }
        }
    }
    
    return (
        <SafeAreaView style={containerStyles.safeContainer}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={containerStyles.innerContainer}>
                            <ProfileLogoSection profile={true}/>
                            <View style={containerStyles.inputContainer}>
                                <Text style={inputStyles.labelText}>Name</Text>
                                <TextInput
                                    style={inputStyles.inputBox}
                                    placeholder='First Last'
                                    placeholderTextColor='#CCCCCC'
                                    onChangeText={(text) => setName(text)}
                                    value={name}
                                />
                                <Text style={inputStyles.labelText}>Date of Birth</Text>
                                <DropdownCalendar selectedDate={dateOfBirth} setDate={setDateOfBirth}/>
                                <Text style={inputStyles.labelText}>Email</Text>
                                <TextInput
                                    style={inputStyles.inputBox}
                                    placeholder='you@example.com'
                                    placeholderTextColor='#CCCCCC'
                                    onChangeText={(text) => setEmail(text)}
                                    value={email}
                                />
                                <Text style={inputStyles.labelText}>Instrument(s)</Text>
                                <DropdownSelector dataList={INSTRUMENTS} multiselect={true} selectedItems={instruments} setSelectedItems={setInstruments}/>
                                <Text style={inputStyles.labelText}>Musical Level</Text>
                                <DropdownSelector dataList={LEVELS} multiselect={false} selectedItems={level} setSelectedItems={setLevel}/>
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
                            <View style={containerStyles.errorContainer}>
                                <Text style={inputStyles.errorText}>{error}</Text>
                            </View>
                            <View style={containerStyles.buttonContainer}>
                                <TouchableOpacity onPress={handleRegistering} style={bottomStyles.button}>
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
