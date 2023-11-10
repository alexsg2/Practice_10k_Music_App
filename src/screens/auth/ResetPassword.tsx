import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';


import { AuthenticationAPI } from '../../services/apis/authentication_api';

import { ProfileLogoSection } from '../../components';
import { onDarkBackground, containers, buttons, texts } from '../../assets/common_styles';

import { AuthStackParamList} from './auth_navigation';
type resetPasswordScreenProp = StackNavigationProp<AuthStackParamList, 'ResetPassword'>;


const ResetPassword = () =>
{
    const [email, setEmail] = useState('');

    const navigation = useNavigation<resetPasswordScreenProp>();

    async function handleReset() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            Alert.alert('Invalid Email', 'Please check the format of your email.', [{ text: 'OK' }]);
        }
        else {
            try {
                await AuthenticationAPI.resetPassword(email);
                Alert.alert('Reset Email Sent', 'Check your email for instructions.',
                            [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
                );
            }
            catch (e: any) {
                Alert.alert('Request Failed', 'Please check email or try again later: ' + e.code, [{ text: 'OK' }]);
            }
        }        
    };

    
    return (
        <SafeAreaView style={onDarkBackground.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={containers.innerView}>
                    <ProfileLogoSection title={'Reset Password.'} profile={false} altStyle={[onDarkBackground.titleText]}/>
                    <View style={containers.input}>
                        <Text style={onDarkBackground.sectionText}>Email</Text>
                        <TextInput
                            style={onDarkBackground.inputBox}
                            placeholder='Enter email address'
                            placeholderTextColor='#CCCCCC'
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                        />
                    </View>
                    <View style={containers.singleButton}>
                        <TouchableOpacity onPress={handleReset} style={buttons.largeBlack}>
                            <Text style={texts.button}>Reset Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ResetPassword;
