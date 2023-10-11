import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView, ScrollView, View, Image, TouchableOpacity, Text } from 'react-native';


import authStyles from './authStyles';

import { AuthStackParamList } from './AuthNavigation';
type startScreenProp = StackNavigationProp<AuthStackParamList, 'Start'>;


const Start = () =>
{
    const navigation = useNavigation<startScreenProp>();
    
    return (
        <SafeAreaView style={authStyles.safeContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={authStyles.innerContainer}>
                    <View style={authStyles.logoContainer}>
                        <Image source={require('../../assets/images/med-white-logo.png')} style={authStyles.logo}/>
                        <Text style={authStyles.titleText}>All-in-One Practice Hub.</Text>
                    </View>
                    <View style={authStyles.buttonContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={authStyles.button}>
                            <Text style={authStyles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={authStyles.button}>
                            <Text style={authStyles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Start;
