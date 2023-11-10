import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Alert, View, Text, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';


import { containers, texts } from '../../assets/common_styles';

export type EditHeaderStackParamList = {
    ProfileScreen: undefined;
    EditProfile: undefined;
};
type EditHeaderNavigationProp = NavigationProp<EditHeaderStackParamList, 'ProfileScreen' | 'EditProfile'>;


const EditHeader: React.FC = () =>
{
    const navigation = useNavigation<EditHeaderNavigationProp>();

    async function handleBackToProfile() {
        Alert.alert('Exiting Edit Mode', 'No changes will be saved. Are you sure you want to go back to the profile page?',
                   [{ text: 'Yes', onPress: () => navigation.navigate('ProfileScreen')}, {text: 'No' }]
        );
    }
    

    return (
        <View style={containers.header}>
            <View style={containers.back}>
                <TouchableOpacity onPress={handleBackToProfile}>
                    <Ionicons name='arrow-back' size={40} color='black' left="5%"/>
                </TouchableOpacity>
            </View>
            <View style={containers.headerTitle}>
                <Text style={texts.header}>Edit Profile</Text>
            </View>
        </View>
    );
};

export default EditHeader;
