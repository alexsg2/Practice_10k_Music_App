import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Alert, View, Text, TouchableOpacity, StyleSheet } from 'react-native';


import { colorPallete, fontSizes } from '../../assets/design_library';

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
        <View style={styles.container}>
            <View style={styles.backContainer}>
                <TouchableOpacity onPress={handleBackToProfile}>
                    <Ionicons name="arrow-back" size={40} color='black' left="5%"/>
                </TouchableOpacity>
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.nameText}>Edit Profile</Text>
            </View>
        </View>
    );
};

export default EditHeader;

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
