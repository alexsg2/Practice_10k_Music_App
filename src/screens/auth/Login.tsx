import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth();


import authStyles from './authStyles';

const LoginScreen = () =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigation();
    
    async function handleLogin() {
        if (email === '' || password === '') {
            setError('Email and password are mandatory.')
            return;
          }
      
          try {
            await signInWithEmailAndPassword(auth, email, password);
          } catch (signError) {
            setError('Incorrect username or password.')
          }
    }
    
    return (
        <KeyboardAvoidingView style={authStyles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={authStyles.innerContainer}>
                    <View style={authStyles.backContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Start')}>
                            <Image style={authStyles.back} source={require('../../assets/images/back-arrow.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={authStyles.logoContainer}>
                        <Image source={require('../../assets/images/white-logo.png')} style={authStyles.logo}/>
                        <Text style={authStyles.headerText}>Hello.</Text>
                    </View>
                   {/* {!!error && <View style={styles.error}><Text>{error}</Text></View>} */}
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
                        <TouchableOpacity onPress={handleLogin} style={authStyles.button}>
                            <Text style={authStyles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={authStyles.footerText}>Not registered? Click here.</Text>
                        </TouchableOpacity>
                    </View>
                </View> 
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default LoginScreen;
