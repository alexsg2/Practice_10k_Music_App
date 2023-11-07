import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert, SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';


import { RootState } from '../../redux/store';
import { AuthenticationAPI } from '../../services/authentication_api';

import { ProfileLogoSection } from '../../components';
import { colorPallete } from '../../assets/design_library';
import { containerStyles, componentStyles, inputStyles, bottomStyles } from '../../assets/styles/auth_and_profile_styles';


import { ProfileStackParamList } from './app_navigation';
type ProfileScreenProp = StackNavigationProp<ProfileStackParamList, 'Profile'>;


const Profile = () =>
{
    const currentUserProfile = useSelector((state: RootState) => state?.profile);
    const name = currentUserProfile.name;
    const level = currentUserProfile.level;
    const email = currentUserProfile.email;
    const [password, setPassword] = useState('');
    const dateOfBirth = currentUserProfile.dateOfBirth;
    const instruments = currentUserProfile.instruments;

    const navigation = useNavigation<ProfileScreenProp>();
    const [modalVisible, setModalVisible] = useState(false);

    async function  handleDeletion() {
        if (!password) {
            Alert.alert('Password Required', 'Please enter your password to confirm account deletion.', [{ text: 'OK' }]);
            return;
        }

        try {
            await AuthenticationAPI.deleteAccount(email, password);
            setModalVisible(false);
        }
        catch (e: any) {
            Alert.alert('Deletion Failed', 'Please verify password or try again later: ' + e.code,
                        [{ text: 'OK' }]
            );
        }
    }

    async function  handleLogout() {
        Alert.alert('Logging Out','Are you sure you want to logout?',
                    [{ text: 'Yes', onPress: async () => { await AuthenticationAPI.logOut(); }},
                     { text: 'No' }]
        );
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF1F7' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={containerStyles.innerContainer}>
                    <ProfileLogoSection title={name} profile={true}
                                        altStyle={[componentStyles.profileTitleText, componentStyles.profileChangePictureButton, componentStyles.profileChangeText]}
                    />
                    <View style={{ flex: 1, width: '90%', marginBottom: '2%', borderRadius: 10, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}
                                          style={{ paddingVertical: '3%', paddingHorizontal: '5%', borderRadius: 10,
                                                   alignItems: 'flex-end', justifyContent: 'flex-end', backgroundColor: colorPallete.black_gradiant["60%"]
                                                }}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'white' }}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={containerStyles.inputContainer}>
                        <Text style={inputStyles.profileLabelText}>Email</Text>
                        <TextInput
                            style={inputStyles.profileInputBox}
                            value={email}
                            editable={false}
                        />
                        <Text style={inputStyles.profileLabelText}>Date of Birth</Text>
                        <TextInput
                            style={inputStyles.profileInputBox}
                            value={dateOfBirth}
                            editable={false}
                        />
                        <Text style={inputStyles.profileLabelText}>Level</Text>
                        <TextInput
                            style={inputStyles.profileInputBox}
                            value={level}
                            editable={false}
                        />
                        <Text style={inputStyles.profileLabelText}>Instrument(s)</Text>
                        <TextInput
                            style={inputStyles.profileInputBox}
                            value={instruments.length > 0 ? instruments.join(', ') : instruments[0]}
                            editable={false}
                        />
                    </View>
                    <View style={containerStyles.buttonContainer}>
                        <TouchableOpacity onPress={handleLogout} style={bottomStyles.blackButton}>
                            <Text style={bottomStyles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {setModalVisible(!modalVisible);
                            }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                <View style={{ flex: 0.25, width: '90%', padding: '5%', alignSelf: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: '5%', alignSelf: 'center' }}>Confirm Account Deletion</Text>
                                    <TextInput
                                        style={inputStyles.profileInputBox}
                                        placeholder='Enter your password'
                                        placeholderTextColor='#CCCCCC'
                                        secureTextEntry
                                        onChangeText={(text) => setPassword(text)}
                                        value={password}
                                    />
                                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                        <TouchableOpacity onPress={handleDeletion} style={bottomStyles.smallRedButton}>
                                            <Text style={bottomStyles.buttonText}>Confirm</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setModalVisible(false)} style={bottomStyles.smallBlackButton}>
                                            <Text style={bottomStyles.buttonText}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        <TouchableOpacity onPress={() => setModalVisible(true)} style={bottomStyles.redButton}>
                            <Text style={bottomStyles.buttonText}>Delete Account</Text>
                        </TouchableOpacity>
                    </View> 
                </View>   
            </ScrollView>
        </SafeAreaView>
    );
}

export default Profile;
