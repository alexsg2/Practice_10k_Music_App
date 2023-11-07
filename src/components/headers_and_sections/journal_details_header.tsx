import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


import { colorPallete, fontSizes } from '../../assets/design_library';

export type JournalDetailsHeaderStackParamList = {
    JournalScreen: undefined;
    JournalDetails: undefined;
};
type JournalDetailsHeaderNavigationProp = NavigationProp<JournalDetailsHeaderStackParamList, 'JournalScreen' | 'JournalDetails'>;


const JournalDetailsHeader: React.FC = () =>
{
    const navigation = useNavigation<JournalDetailsHeaderNavigationProp>();

    
    return (
        <View style={styles.container}>
            <View style={styles.backContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={40} color='black' left="5%"/>
                </TouchableOpacity>
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.nameText}>Plan Details</Text>
            </View>
        </View>
    );
};

export default JournalDetailsHeader;

const styles = StyleSheet.create(
{
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: colorPallete.black_gradiant["default"],
    },
    backContainer: {
        flex: 1,
        left: '-35%',
        alignItems: 'flex-start',
    },
    nameContainer: {
        flex: 1,
        left: '-175%',
        alignItems: 'center',
    },
    nameText: {
        fontWeight: 'bold',
        fontSize: fontSizes.name,
    },
});
