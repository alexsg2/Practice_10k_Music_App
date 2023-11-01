import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EmailAuthProvider, getAuth, onAuthStateChanged, reauthenticateWithCredential, signOut } from 'firebase/auth';
import { Alert, SafeAreaView, ActivityIndicator, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';


import { RootState } from '../../redux/store';
import { deleteUserAccount } from '../../helpers';
import { ProfileLogoSection } from '../../components';
import { colorPallete } from '../../assets/design_library';
import { containerStyles, componentStyles, inputStyles, bottomStyles } from '../../assets/styles/auth_and_profile_styles';

const auth = getAuth();
const user = auth.currentUser!
import { ProfileStackParamList } from './app_navigation';
type profileScreenProp = StackNavigationProp<ProfileStackParamList, 'Profile'>;


const Profile = () =>
{
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<profileScreenProp>();
    const currentUserProfile = useSelector((state: RootState) => state?.profile);
    
    const name = currentUserProfile.name;
    const [uid, setUid] = useState<string>('');
    const [email, setEmail] = useState<string | null>(null);
    useEffect(() => { const unsubscribe = onAuthStateChanged(auth, (user) => {
                        if (user) {
                            setUid(user.uid);
                            setEmail(user.email);
                        }
                        setLoading(false);
                    });
                    return unsubscribe;
    }, [uid, email]);
    const dateOfBirth = currentUserProfile.dateOfBirth;
    const instruments = currentUserProfile.instruments;
    const level = currentUserProfile.level;
    const [password, setPassword] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    async function  handleDeletion() {
        if (!password) {
            Alert.alert('Password Required', 'Please enter your password to confirm account deletion.', [{ text: 'OK' }]);
            return;
        }

        const cred = EmailAuthProvider.credential(email!, password)
        try {
            await reauthenticateWithCredential(user, cred);
            await deleteUserAccount(uid);
            await user.delete();
            setModalVisible(false);
            await signOut(auth);
        }
        catch (e: any) {
            Alert.alert('Deletion Failed', 'Unable to delete account. Please verify password or try again later: ' + e.message,
                        [{ text: 'OK' }]
            );
        }
    }

    async function  handleLogout() {
        Alert.alert('Account Logout','Are you sure you want to logout?',
                [{ text: 'Yes', onPress: () => { signOut(auth); }}, { text: 'Cancel' }]
        );
    }
    
    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF1F7', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color='black'/>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF1F7' }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                                    placeholder={email || ''}
                                    placeholderTextColor='#CCCCCC'
                                    onChangeText={(text) => setEmail(text)}
                                    value={email || ''}
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
                    </TouchableWithoutFeedback>   
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default Profile;
