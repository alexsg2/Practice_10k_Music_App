import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert, SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';


import { RootState } from '../../redux/store';
import { AuthenticationAPI } from '../../services/apis/authentication_api';

import { ProfileLogoSection } from '../../components';
import { color_pallete, font_sizes, onLightBackground, containers, buttons, texts } from '../../assets/common_styles';


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
    const profilePicture = currentUserProfile.profilePicture;

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
        <SafeAreaView style={onLightBackground.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={containers.innerView}>
                    <ProfileLogoSection title={name} profile={true} picture={profilePicture}
                                        altStyle={onLightBackground.titleText}
                    />
                    <View style={{ flex: 1, width: '90%', marginBottom: '2%', borderRadius: 10, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}
                                          style={{ paddingVertical: '3%', paddingHorizontal: '5%', borderRadius: 10, alignItems: 'flex-end',
                                                   justifyContent: 'flex-end', backgroundColor: color_pallete.black_gradiant['60%']
                                                }}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 14, color: color_pallete.white_gradiant['default'] }}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={containers.input}>
                        <Text style={onLightBackground.sectionText}>Email</Text>
                        <TextInput
                            style={onLightBackground.inputBox}
                            value={email}
                            editable={false}
                        />
                        <Text style={onLightBackground.sectionText}>Date of Birth</Text>
                        <TextInput
                            style={onLightBackground.inputBox}
                            value={dateOfBirth}
                            editable={false}
                        />
                        <Text style={onLightBackground.sectionText}>Level</Text>
                        <TextInput
                            style={onLightBackground.inputBox}
                            value={level}
                            editable={false}
                        />
                        <Text style={onLightBackground.sectionText}>Instrument(s)</Text>
                        <TextInput
                            style={onLightBackground.inputBox}
                            value={instruments.length > 0 ? instruments.join(', ') : instruments[0]}
                            editable={false}
                        />
                    </View>
                    <View style={containers.singleButton}>
                        <TouchableOpacity onPress={handleLogout} style={buttons.largeBlack}>
                            <Text style={texts.button}>Logout</Text>
                        </TouchableOpacity>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {setModalVisible(!modalVisible);
                            }}>
                            <View style={containers.backgroundModal}>
                                <View style={{ flex: 0.25, width: '90%', padding: '5%', borderRadius: 10, alignSelf: 'center',
                                               justifyContent: 'center', backgroundColor: color_pallete.white_gradiant['default'] }}>
                                    <Text style={{ fontSize: font_sizes.sections, fontWeight: 'bold', marginVertical: '5%', alignSelf: 'center' }}>Confirm Deletion</Text>
                                    <TextInput
                                        style={onLightBackground.inputBox}
                                        placeholder='Enter your password'
                                        placeholderTextColor='#CCCCCC'
                                        secureTextEntry
                                        onChangeText={(text) => setPassword(text)}
                                        value={password}
                                    />
                                    <View style={containers.doubleButton}>
                                        <TouchableOpacity onPress={handleDeletion} style={buttons.smallRed}>
                                            <Text style={texts.button}>Confirm</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setModalVisible(false)} style={buttons.smallBlack}>
                                            <Text style={texts.button}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        <TouchableOpacity onPress={() => setModalVisible(true)} style={buttons.largeRed}>
                            <Text style={texts.button}>Delete Account</Text>
                        </TouchableOpacity>
                    </View> 
                </View>   
            </ScrollView>
        </SafeAreaView>
    );
}

export default Profile;
