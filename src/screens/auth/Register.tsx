import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { SafeAreaView, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';


const auth = getAuth();
import authStyles from './authStyles';
import { AuthStackParamList } from './AuthNavigation';
import { validateRegistrationFormat } from '../../helpers/AuthValidation';
type registerScreenProp = StackNavigationProp<AuthStackParamList, 'Register'>;


const Register = () =>
{
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigation<registerScreenProp>();
    
    async function handleRegistering() {
        const registerError = validateRegistrationFormat(email, newPassword, confPassword);
        if (registerError) {
            setError(registerError);
        }
        else {
            try {
                await createUserWithEmailAndPassword(auth, email, newPassword);
                // TODO : navigate to profile setup screen
            }
            catch (e) {
                // TODO : explain failure (i.e., does user already exist? Or another reason)
                setError('Could not register user.');
            }
        }
    }
    
    return (
        // TODO : make screen automatically scroll up when keyboard is enabled for 
        //        input fields at the bottom.
        <SafeAreaView style={authStyles.safeContainer}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={authStyles.innerContainer}>
                            <View style={authStyles.logoContainer}>
                                <Image source={require('../../assets/images/med-white-logo.png')} style={authStyles.logo}/>
                                <Text style={authStyles.titleText}>Hello.</Text>
                            </View>
                            <View style={authStyles.errorContainer}>
                                <Text style={authStyles.errorText}>{error}</Text>
                            </View>
                            <View style={authStyles.inputContainer}>
                                <TextInput
                                    placeholder='Email'
                                    placeholderTextColor='white'
                                    onChangeText={(text) => setEmail(text)}
                                    value={email}
                                    style={authStyles.input}
                                />
                                <TextInput
                                    placeholder='New Password'
                                    placeholderTextColor='white'
                                    onChangeText={(text) => setNewPassword(text)}
                                    value={newPassword}
                                    secureTextEntry
                                    style={authStyles.input}
                                />
                                <TextInput
                                    placeholder='Confirm Password'
                                    placeholderTextColor='white'
                                    onChangeText={(text) => setConfPassword(text)}
                                    value={confPassword}
                                    secureTextEntry
                                    style={authStyles.input}
                                />
                            </View>
                            <View style={authStyles.buttonContainer}>
                                <TouchableOpacity onPress={handleRegistering} style={authStyles.button}>
                                    <Text style={authStyles.buttonText}>Register</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text style={authStyles.footerText}>Already a user? Click here.</Text>
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
