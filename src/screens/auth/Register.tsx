import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { decrement } from '../../redux/actions';
import { ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';

const auth = getAuth();
import authStyles from './authStyles';
import { AuthStackParamList } from './authNavigation';
import { validateRegistrationFormat } from '../../helpers/AuthValidation';

type registerScreenProp = StackNavigationProp<AuthStackParamList, 'Register'>;

const Register = () =>
{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigation<registerScreenProp>();
    const dispatch = useDispatch();
    const { count } = useSelector((state: any) => state.counter);
    
    async function handleRegistering() {
        const registerError = validateRegistrationFormat(name, email, newPassword, confPassword);
        if (registerError) {
            setError(registerError);
        }
        else {
            try {
                await createUserWithEmailAndPassword(auth, email, newPassword);
                // navigation.navigate('ProfileSetup');
            }
            catch (e) {
                // TODO : display more detailed explanations of why registration was not possible
                setError('Could not register user.');
            }
        }
    }
    
    return (
        <ScrollView contentContainerStyle={authStyles.scrollContainer}>
            <KeyboardAvoidingView style={authStyles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={authStyles.innerContainer}>
                        <View style={authStyles.backContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('Start')}>
                                <Ionicons name="arrow-back" size={30} color='white'/>
                            </TouchableOpacity>
                        </View>
                        <View style={authStyles.logoContainer}>
                            <Image source={require('../../assets/images/med-white-logo.png')} style={authStyles.logo}/>
                            <Text style={authStyles.headerText}>Hello.</Text>
                        </View>
                        <View style={authStyles.errorContainer}>
                            <Text style={authStyles.errorText}>{error}</Text>
                        </View>
                        <View style={authStyles.inputContainer}>
                            <TextInput
                                placeholder='Name'
                                placeholderTextColor='white'
                                onChangeText={(text) => setName(text)}
                                value={name}
                                style={authStyles.input}
                            />
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
                            <TouchableOpacity onPress={() => dispatch(decrement())} style={authStyles.button}>
                                <Text style={authStyles.buttonText}>Register {count}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={authStyles.footerText}>Already a user? Click here.</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

export default Register;
