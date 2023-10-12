import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Image, TouchableOpacity, Text, TextInput } from 'react-native';


import authStyles from './authStyles';


const ResetPassword = () =>
{
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');


    async function handleResetPassword() {
        // TODO: write the logic
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
