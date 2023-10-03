import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';


import authStyles from './authStyles';

const StartScreen = () =>
{
    const navigation = useNavigation();
    
    return (
        <View style={authStyles.container}>
            <View style={authStyles.logoContainer}>
                <Image source={require('../../assets/images/white-logo.png')} style={authStyles.logo}/>
                <Text style={authStyles.headerText}>All-in-One Practice Hub.</Text>
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
    );
}

export default StartScreen;
