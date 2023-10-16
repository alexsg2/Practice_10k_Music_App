import React, { useState }from 'react';
import * as ImagePicker from 'expo-image-picker';
import { StyleProp, ViewStyle, View, Image, TouchableOpacity, Text, Alert } from 'react-native';

import { colorPallete, fontSizes } from '../assets/design_library';


interface ProfileLogoProp {
    title: string,
    profile: boolean,
    altStyle: StyleProp<ViewStyle>[];
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
        <View style={{ flex: 1, width: '80%', alignItems: 'center', justifyContent: 'center' }}>
            {profile ? (
                <Image source={profilePicture !== '' ? { uri: profilePicture } : require('../assets/images/blank-profile-picture.png')}
                       style={{ width: 150, height: 150, marginTop: '10%', borderWidth: 1, borderRadius: 75, borderColor: colorPallete.black_gradiant["40%"] }}
                />
            ) : (
                <Image source={require('../assets/images/med-white-logo.png')} style={{ aspectRatio: 1, marginTop: '10%' }}/>
            )}
            {title !== '' ? (
                <Text style={altStyle[0]}>{title}</Text>
            ) : null}
            {profile ? (
                <TouchableOpacity onPress={changeProfilePicture} style={altStyle[1]}>
                    <Text style={altStyle[2]}>Change Profile Picture</Text>
                </TouchableOpacity>
            ) : null}
        </View>
    );
};

export default ProfileLogoSection;
