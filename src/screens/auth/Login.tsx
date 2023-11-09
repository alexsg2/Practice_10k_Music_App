import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert, SafeAreaView, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, View, Text, TextInput, TouchableOpacity } from 'react-native';


import { validateLoginFormat } from '../../helpers';
import { AuthenticationAPI } from '../../services/apis/authentication_api';

import { ProfileLogoSection } from '../../components';
import { containerStyles, componentStyles, inputStyles, bottomStyles } from "../../assets/styles/auth_and_profile_styles";

import { AuthStackParamList } from './auth_navigation';
type loginScreenProp = StackNavigationProp<AuthStackParamList, 'Login'>;


const Login = () =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation<loginScreenProp>();
    
    async function handleLogin() {
        const loginError = validateLoginFormat(email, password);
        if (loginError) {
            Alert.alert('Invalid Login', loginError, [{ text: 'OK' }]);
        }
        else {
            try {
                await AuthenticationAPI.logIn(email, password);
            }
            catch (e: any) {
                Alert.alert('Login Failed', 'Please check credentials or try again later: ' + e.code,
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
                            <ProfileLogoSection title={'Hello.'} profile={false} altStyle={[componentStyles.authTitleText]}/>
                            <View style={containerStyles.inputContainer}>
                                <Text style={inputStyles.authLabelText}>Email</Text>
                                <TextInput
                                    style={inputStyles.authInputBox}
                                    placeholder='Enter email address'
                                    placeholderTextColor='#CCCCCC'
                                    onChangeText={(text) => setEmail(text)}
                                    value={email}
                                />
                                <Text style={inputStyles.authLabelText}>Password</Text>
                                <TextInput
                                    style={inputStyles.authInputBox}
                                    placeholder='Enter password'
                                    placeholderTextColor='#CCCCCC'
                                    secureTextEntry
                                    onChangeText={(text) => setPassword(text)}
                                    value={password}
                                />
                                <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                                    <Text style={{ fontStyle: 'italic', fontSize: 13, marginTop: '-4%', marginBottom: '5%',
                                                   paddingRight: '2%', textAlign: 'right', color: 'white'
                                                }}>
                                        Forgot Password? Click here.
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={containerStyles.buttonContainer}>
                                <TouchableOpacity onPress={handleLogin} style={bottomStyles.blackButton}>
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
