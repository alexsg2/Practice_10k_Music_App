import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Alert, View, Text, TouchableOpacity, StyleSheet } from 'react-native';


import { colorPallete, fontSizes } from '../../assets/design_library';

export type PracticeHeaderStackParamList = {
    PracticeScreen: undefined;
    PracticeTimer: undefined;
};
type PracticeHeaderNavigationProp = NavigationProp<PracticeHeaderStackParamList, 'PracticeScreen' | 'PracticeTimer'>;


const PracticeTimerHeader: React.FC = () =>
{
    const navigation = useNavigation<PracticeHeaderNavigationProp>();

    async function handleBackToPractice() {
        Alert.alert('Exiting Practice Mode', 'Some plans may still be incomplete. Are you sure you want to go back to the practice page?',
                   [{text: 'Yes', onPress: () => navigation.navigate('PracticeScreen')}, {text: 'No'} ]
        );
    }


    return (
        <View style={styles.container}>
            <View style={styles.backContainer}>
                <TouchableOpacity onPress={handleBackToPractice}>
                    <Ionicons name="arrow-back" size={40} color='black' left="5%"/>
                </TouchableOpacity>
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.nameText}>Practicing</Text>
            </View>
        </View>
    );
};

export default PracticeTimerHeader;

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
