import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView, ScrollView, View, TouchableOpacity, Text } from 'react-native';


import { ProfileLogoSection } from '../../components';
import { onDarkBackground, containers, buttons, texts } from '../../assets/common_styles';

import { AuthStackParamList } from './auth_navigation';
type startScreenProp = StackNavigationProp<AuthStackParamList, 'Start'>;


const Start = () =>
{
    const navigation = useNavigation<startScreenProp>();
    
    return (
        <SafeAreaView style={onDarkBackground.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={containers.innerView}>
                    <ProfileLogoSection title={'All-In-One Practice Hub'} profile={false} altStyle={[onDarkBackground.titleText]}/>
                    <View style={containers.singleButton}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={buttons.largeBlack}>
                            <Text style={texts.button}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={buttons.largeBlack}>
                            <Text style={texts.button}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Start;
