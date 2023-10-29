import React from 'react';
import { useSelector } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert, SafeAreaView, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, View, Text, TextInput, TouchableOpacity } from 'react-native';


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
    const navigation = useNavigation<profileScreenProp>();

    const currentUserProfile = useSelector((state: RootState) => state?.profile);
    const name = currentUserProfile.name;
    const email = user?.email;
    const dateOfBirth = currentUserProfile.dateOfBirth;
    const instruments = currentUserProfile.instruments;
    const level = currentUserProfile.level;

    async function  handleDeletion() {
        Alert.alert('Delete Account','Are you sure you want to delete your account?',
                    [ {text: 'Cancel' }, { text: 'Delete', onPress: async () => {
                        try {
                            // TODO : await auth.deleteUser(user.uid);
                            await deleteUserAccount(user.uid);
                        } catch (e) {
                            Alert.alert('Request Failed', 'Unable to delete account. Please try again later.', [{ text: 'OK' }]);
                        }
                    },
                },
            ]
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
                                    value={email || ''}
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
                                <TouchableOpacity onPress={() => signOut(auth)} style={bottomStyles.blackButton}>
                                    <Text style={bottomStyles.buttonText}>Logout</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleDeletion} style={bottomStyles.redButton}>
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
