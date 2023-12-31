import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert, SafeAreaView, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, View, Text, TextInput, TouchableOpacity } from 'react-native';


import { validateLoginFormat } from '../../helpers';
import { AuthenticationAPI } from '../../services/apis/authentication_api';

import { ProfileLogoSection } from '../../components';
import { color_pallete, font_sizes, onDarkBackground, containers, buttons, texts } from '../../assets/common_styles';

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
        <SafeAreaView style={onDarkBackground.safeArea}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={containers.innerView}>
                            <ProfileLogoSection title={'Hello.'} profile={false} altStyle={[onDarkBackground.titleText]}/>
                            <View style={containers.input}>
                                <Text style={onDarkBackground.sectionText}>Email</Text>
                                <TextInput
                                    style={onDarkBackground.inputBox}
                                    placeholder='Enter email address'
                                    placeholderTextColor='#CCCCCC'
                                    onChangeText={(text) => setEmail(text)}
                                    value={email}
                                />
                                <Text style={onDarkBackground.sectionText}>Password</Text>
                                <TextInput
                                    style={onDarkBackground.inputBox}
                                    placeholder='Enter password'
                                    placeholderTextColor='#CCCCCC'
                                    secureTextEntry
                                    onChangeText={(text) => setPassword(text)}
                                    value={password}
                                />
                                <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                                    <Text style={{ fontStyle: 'italic', fontSize: font_sizes.inputs, textAlign: 'right',
                                                   marginTop: '-4%', marginBottom: '5%', paddingRight: '2%',
                                                   color: color_pallete.white_gradiant['default']
                                                }}
                                    >
                                        Forgot Password? Click here.
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={containers.singleButton}>
                                <TouchableOpacity onPress={handleLogin} style={buttons.largeBlack}>
                                    <Text style={texts.button}>Login</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                    <Text style={onDarkBackground.footer}>Not registered? Click here.</Text>
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
