import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';


import { containers, texts } from '../../assets/common_styles';

export type JournalHeaderStackParamList = {
    JournalScreen: undefined;
    JournalDetail: undefined;
};
type JournalHeaderNavigationProp = NavigationProp<JournalHeaderStackParamList, 'JournalScreen' | 'JournalDetail'>;


const JournalDetailsHeader: React.FC = () =>
{
    const navigation = useNavigation<JournalHeaderNavigationProp>();

    
    return (
        <View style={containers.header}>
            <View style={containers.back}>
                <TouchableOpacity onPress={() => navigation.navigate('JournalScreen')}>
                    <Ionicons name='arrow-back' size={40} color='black' left='5%'/>
                </TouchableOpacity>
            </View>
            <View style={{ left: '-175%' }}>
                <Text style={texts.header}>Practice Details</Text>
            </View>
        </View>
    );
};

export default JournalDetailsHeader;
