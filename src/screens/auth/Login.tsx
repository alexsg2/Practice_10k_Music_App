import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { SafeAreaView, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';


const auth = getAuth();
import authStyles from './authStyles';
import { AuthStackParamList } from './AuthNavigation';
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
            catch (signError) {
                setError('Incorrect email or password.')
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
                                    placeholder='Password'
                                    placeholderTextColor='white'
                                    onChangeText={(text) => setPassword(text)}
                                    value={password}
                                    secureTextEntry
                                    style={authStyles.input}
                                />
                            </View>
                            <View style={authStyles.buttonContainer}>
                                {/* TODO: ADD RESET PASSWORD FUNCTIONALITY HERE */}
                                <TouchableOpacity onPress={handleLogin} style={authStyles.button}>
                                    <Text style={authStyles.buttonText}>Login</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                    <Text style={authStyles.footerText}>Not registered? Click here.</Text>
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
