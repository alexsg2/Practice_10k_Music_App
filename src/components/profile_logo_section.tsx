import React, { useState }from 'react';
import * as ImagePicker from 'expo-image-picker';
import { StyleProp, ViewStyle, View, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

import { colorPallete, fontSizes } from '../assets/design_library';


interface ProfileLogoProp {
    title: string,
    profile: boolean,
    altStyle?: StyleProp<ViewStyle>;
}
  
const ProfileLogoSection: React.FC<ProfileLogoProp> = ({ title, profile, altStyle }) =>
{
    const [profilePicture, setProfilePicture] = useState('');

    const changeProfilePicture = async () => {
        const status = await ImagePicker.getMediaLibraryPermissionsAsync();

        // TODO : Make picture editable (e.g., position) and save where (local or remote storage)?
        if (status.granted) {
            const result = await ImagePicker.launchImageLibraryAsync();
            
            if (!result.canceled) {
                setProfilePicture(result.assets[0].uri);
            }
        }
        else {
            Alert.alert('Access Denied', 'Access to photo library denied. Check your settings.', [{ text: 'OK' }]);
        }
    };

    return (
        <View style={styles.container}>
            {profile ? (
                <Image source={profilePicture !== '' ? { uri: profilePicture } : require('../assets/images/blank-profile-picture.png')} style={styles.profilePicture} />
            ) : (
                <Image source={require('../assets/images/med-white-logo.png')} style={styles.logo} />
            )}
            {title !== '' ? (
                <Text style={styles.nameText}>{title}</Text>
            ): null}
            {profile ? (
                <TouchableOpacity onPress={changeProfilePicture} style={[styles.changePictureButton, altStyle]}>
                    <Text style={styles.changePictureText}>Change {profile ? 'Profile ' : ''}Picture</Text>
                </TouchableOpacity>
            ) : (
                <Text style={styles.titleText}>{title}</Text>
            )}
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
    nameText: {
        marginTop: '5%',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: fontSizes.title,
        color: colorPallete.black_gradiant["default"],
    },
    titleText: {
        marginTop: '10%',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '7.5%',
        fontSize: fontSizes.title,
        color: colorPallete.white_gradiant["default"],
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderWidth: 1,
        borderRadius: 75,
        marginTop: '10%',
        borderColor: colorPallete.black_gradiant["40%"],
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
        fontWeight: 'bold',
        marginVertical: '5%',
        fontSize: fontSizes.footer,
        color: colorPallete.white_gradiant["default"],
    },
});
