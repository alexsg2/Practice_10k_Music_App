import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Image, TouchableOpacity, Text, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import PopupMessage from '../../components/PopupMessage';

import { ProfileLogoSection } from '../../components';
import { containerStyles, inputStyles, bottomStyles } from "./auth_style";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from './auth_nav';
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
        <SafeAreaView style={containerStyles.safeContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={containerStyles.innerContainer}>
                    <ProfileLogoSection profile={false}/>
                    <View style={containerStyles.inputContainer}>
                        <TextInput
                            style={inputStyles.inputBox}
                            placeholder='Email'
                            placeholderTextColor='white'
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                        />
                    </View>
                    <View style={containerStyles.errorContainer}>
                        <Text style={inputStyles.errorText}>{error}</Text>
                    </View>
                    <View style={containerStyles.buttonContainer}>
                        <TouchableOpacity onPress={handleResetPassword} style={bottomStyles.button}>
                            <Text style={bottomStyles.buttonText}>Reset Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ResetPassword;
