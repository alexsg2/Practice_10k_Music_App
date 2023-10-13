import React, { useState }from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { colorPallete, fontSizes } from '../assets/DesignLibrary';


interface ProfileLogoProp {
    profile: boolean,
}
  
const ProfileLogoSection: React.FC<ProfileLogoProp> = ({ profile }) =>
{
    const [profilePicture, setProfilePicture] = useState('');
    const [error, setError] = useState('');
    // TODO : should error disapear after awhile ??

    const changeProfilePicture = async () => {
        const status = await ImagePicker.getMediaLibraryPermissionsAsync();
    
        if (status.granted) {
            const result = await ImagePicker.launchImageLibraryAsync();
            
            if (!result.canceled) {
                setProfilePicture(result.assets[0].uri);
            }
        }
        else {
            setError('Access to photo library denied, check your settings.');
        }
    };

    return (
        <View style={styles.container}>
            {profile ? (
                <Image source={profilePicture !== '' ? { uri: profilePicture } : require('../assets/images/blank-profile-picture.png')} style={styles.profilePicture} />
            ) : (
                <Image source={require('../assets/images/med-white-logo.png')} style={styles.logo} />
            )}
            {profile ? (
                <TouchableOpacity onPress={changeProfilePicture} style={styles.changePictureButton}>
                    <Text style={styles.changePictureText}>Change {profile ? 'Profile ' : ''}Picture</Text>
                </TouchableOpacity>
            ) : (
                <Text style={styles.titleText}>Hello.</Text>
            )}
            <Text style={styles.errorText}>{error}</Text>
        </View>
    );
};

export default ProfileLogoSection;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        aspectRatio: 1,
        marginTop: '10%',
    },
    titleText: {
        fontWeight: 'bold',
        marginTop: '10%',
        marginBottom: '7.5%',
        textAlign: 'center',
        fontSize: fontSizes.titles,
        color: colorPallete.white_gradiant["default"],
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderWidth: 1,
        borderRadius: 75,
        marginTop: '10%',
        borderColor: 'grey',
    },
    changePictureButton: {
        width: '70%',
        borderRadius: 10,
        marginVertical: '7%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorPallete.black_gradiant["50%"],
    },
    changePictureText: {
        marginVertical: '5%',
        fontSize: fontSizes.footers,
        color: colorPallete.white_gradiant["default"],
    },
    errorText: {
        fontWeight: 'bold',
        marginBottom: '5%',
        textAlign: 'center',
        fontSize: fontSizes.normal,
        color: colorPallete.yellow_gradiant["default"],
    }
});
