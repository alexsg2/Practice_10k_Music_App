import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { StyleProp, ViewStyle, Alert, View, Image, Text, TouchableOpacity } from 'react-native';


import { RootState } from '../../redux/store';
import { setProfile } from '../../redux/actions';
import { DataManagementAPI } from '../../services/apis/data_management_api';

import { color_pallete, buttons, texts } from '../../assets/common_styles';


interface ProfileLogoProp {
    title: string,
    profile: boolean,
    picture?: string,
    setPicture?: (newPicture: string) => void;
    altStyle: StyleProp<ViewStyle>;
}
  
const ProfileLogoSection: React.FC<ProfileLogoProp> = ({ title, profile, picture, setPicture, altStyle }) =>
{
    const dispatch = useDispatch();
    const currentUserProfile = useSelector((state: RootState) => state?.profile);
    
    async function changeProfilePicture() {
        const status = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status.granted) {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled) {
                if (setPicture) {
                    setPicture(result.assets[0].uri);
                }
                else {
                    try {
                        await DataManagementAPI.updateUserProfilePicture(result.assets[0].uri);
                        dispatch(setProfile({ ...currentUserProfile, profilePicture: result.assets[0].uri }));
                    }
                    catch (e: any) {
                        Alert.alert('Profile Picture Update Failed', 'Please try again later: ' + e.code,
                                   [{ text: 'OK' }]);
                    }
                }
            }
        }
        else {
            Alert.alert('Access Denied', 'Check settings for access to photo library.', [{ text: 'OK' }]);
        }
    };


    return (
        <View style={{ flex: 1, width: '80%', alignItems: 'center', justifyContent: 'center' }}>
            {profile ? (
                <Image source={ picture ? { uri: picture } : require('../../assets/images/blank-profile-picture.png') }
                       style={{ width: 150, height: 150, marginTop: '10%', borderWidth: 1, borderRadius: 75, borderColor: color_pallete.black_gradiant['40%'] }}
                />
            ) : (
                <Image source={ require('../../assets/images/med-white-logo.png')} style={{ aspectRatio: 1, marginTop: '10%' }}/>
            )}
            {title !== '' ? (
                <Text style={altStyle}>{title}</Text>
            ) : null}
            {profile ? (
                <TouchableOpacity onPress={changeProfilePicture} style={buttons.changePicture}>
                    <Text style={texts.changePicture}>Change Profile Picture</Text>
                </TouchableOpacity>
            ) : null}
        </View>
    );
};

export default ProfileLogoSection;
