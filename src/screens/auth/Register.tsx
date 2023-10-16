import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { SafeAreaView, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';


import { INSTRUMENTS, LEVELS } from '../../assets/constants/profile_fields';
import { DropdownSelector, DropdownCalendar, ProfileLogoSection } from '../../components';
import { containerStyles, componentStyles, inputStyles, bottomStyles } from "../../assets/styles/auth_and_profile_styles";


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
                            <ProfileLogoSection title={''} profile={true} altStyle={[componentStyles.authTitleText, componentStyles.authChangePictureButton, componentStyles.authChangeText]}/>
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
                                <DropdownCalendar title={'MM/DD/YYYY'} selectedDate={dateOfBirth} setDate={setDateOfBirth}
                                                  altStyle={[componentStyles.authComponentButton, componentStyles.selectedText, componentStyles.defaultText, containerStyles.authCalendarBox]}
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
                                <DropdownSelector title={'Select your instrument(s)'} dataList={INSTRUMENTS}
                                                  multiselect={true} selectedItems={instruments} setSelectedItems={setInstruments}
                                                  altStyle={[componentStyles.authComponentButton, componentStyles.selectedText, componentStyles.defaultText, containerStyles.authDropdownBox]}
                                />
                                <Text style={inputStyles.authLabelText}>Musical Level</Text>
                                <DropdownSelector title={'Select your level'} dataList={LEVELS}
                                                  multiselect={false} selectedItems={level} setSelectedItems={setLevel}
                                                  altStyle={[componentStyles.authComponentButton, componentStyles.selectedText, componentStyles.defaultText, containerStyles.authDropdownBox]}
                                />
                                <Text style={inputStyles.authLabelText}>New Password</Text>
                                <TextInput
                                    style={inputStyles.authInputBox}
                                    placeholder='Enter a password'
                                    placeholderTextColor='#CCCCCC'
                                    secureTextEntry
                                    onChangeText={(text) => setNewPassword(text)}
                                    value={newPassword}
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
