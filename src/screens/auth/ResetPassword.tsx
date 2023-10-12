import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Image, TouchableOpacity, Text, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import PopupMessage from '../../components/PopupMessage';

import authStyles from './authStyles';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from './AuthNavigation';
import { RouteProp } from '@react-navigation/native';
type resetScreenProp = StackNavigationProp<AuthStackParamList, 'ResetPassword'>;

interface ResetPasswordProps {
    navigation: StackNavigationProp<AuthStackParamList, 'ResetPassword'>;
    route: RouteProp<AuthStackParamList, 'ResetPassword'>;
    showPopup: (message: string) => void;
}
const ResetPassword = () =>
{
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigation<resetScreenProp>();

    async function handleResetPassword() {
        // TODO: write the logic
        const auth = getAuth();
        // the email takes the user to firebase to reset password
        sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log("email sent");
            navigation.navigate('Login');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
        // navigation.navigate('Login');

        
    };

    return (
        <SafeAreaView style={authStyles.safeContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={authStyles.innerContainer}>
                    <View style={authStyles.logoContainer}>
                        <Image source={require('../../assets/images/med-white-logo.png')} style={authStyles.logo}/>
                        <Text style={authStyles.titleText}>Reset Your Password.</Text>
                    </View>
                    <View style={authStyles.inputContainer}>
                        <TextInput
                            placeholder='Email'
                            placeholderTextColor='white'
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            style={authStyles.input}
                        />
                    </View>
                    <View style={authStyles.errorContainer}>
                            <Text style={authStyles.errorText}>{error}</Text>
                    </View>
                    <View style={authStyles.buttonContainer}>
                        <TouchableOpacity onPress={handleResetPassword} style={authStyles.button}>
                            <Text style={authStyles.buttonText}>Reset Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ResetPassword;
