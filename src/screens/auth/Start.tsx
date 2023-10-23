import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView, ScrollView, View, TouchableOpacity, Text } from 'react-native';


import { ProfileLogoSection } from '../../components';
import { containerStyles, componentStyles, bottomStyles } from "../../assets/styles/auth_and_profile_styles";

import { AuthStackParamList } from './auth_navigation';
type startScreenProp = StackNavigationProp<AuthStackParamList, 'Start'>;


const Start = () =>
{
    const navigation = useNavigation<startScreenProp>();
    
    return (
        <SafeAreaView style={containerStyles.safeContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={containerStyles.innerContainer}>
                    <ProfileLogoSection title={'All-In-One Practice Hub'} profile={false} altStyle={[componentStyles.authTitleText]}/>
                    <View style={containerStyles.buttonContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={bottomStyles.blackButton}>
                            <Text style={bottomStyles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={bottomStyles.blackButton}>
                            <Text style={bottomStyles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Start;
