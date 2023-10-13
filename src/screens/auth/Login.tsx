import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { SafeAreaView, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';


import { ProfileLogoSection } from '../../components';
import { containerStyles, inputStyles, bottomStyles } from "./auth_style";

const auth = getAuth();
import { AuthStackParamList } from './auth_nav';
import { validateLoginFormat } from '../../helpers/AuthValidation';
type loginScreenProp = StackNavigationProp<AuthStackParamList, 'Login'>;


const Login = () =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigation<loginScreenProp>();
    
    async function handleLogin() {
        const loginError = validateLoginFormat(email, password);
        if (loginError) {
            setError(loginError);
        }
        else {
            try {
                await signInWithEmailAndPassword(auth, email, password);
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
                            <ProfileLogoSection profile={false}/>
                            <View style={containerStyles.errorContainer}>
                                <Text style={inputStyles.errorText}>{error}</Text>
                            </View>
                            <View style={containerStyles.inputContainer}>
                                <Text style={inputStyles.labelText}>Email</Text>
                                <TextInput
                                    style={inputStyles.inputBox}
                                    placeholder='Enter email address'
                                    placeholderTextColor='#CCCCCC'
                                    onChangeText={(text) => setEmail(text)}
                                    value={email}
                                />
                                <Text style={inputStyles.labelText}>Password</Text>
                                <TextInput
                                    style={inputStyles.inputBox}
                                    placeholder='Enter password'
                                    placeholderTextColor='#CCCCCC'
                                    secureTextEntry
                                    onChangeText={(text) => setPassword(text)}
                                    value={password}
                                />
                                <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                                    <Text style={inputStyles.forgotText}>Forgot Password? Click here.</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={containerStyles.buttonContainer}>
                                <TouchableOpacity onPress={handleLogin} style={bottomStyles.button}>
                                    <Text style={bottomStyles.buttonText}>Login</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                    <Text style={bottomStyles.footerText}>Not registered? Click here.</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default Login;
