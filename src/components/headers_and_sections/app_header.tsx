import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';


import { RootState } from '../../redux/store';
import { color_pallete, containers, texts } from '../../assets/common_styles';

export type AppHeaderStackParamList = {
    Home: undefined;
    Profile: undefined;
};
type AppHeaderNavigationProp = NavigationProp<AppHeaderStackParamList, 'Home' | 'Profile'>;


interface HeaderProp {
    name: string;
}

const AppHeader: React.FC<HeaderProp> = ({ name }) =>
{
    const currentUserProfile = useSelector((state: RootState) => state?.profile);
    const picture = currentUserProfile.profilePicture;
    
    const navigation = useNavigation<AppHeaderNavigationProp>();

    return (
        <View style={containers.header}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image source={require('../../assets/images/small-black-logo.png')} style={{ width: 45, height: 45 }} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={texts.header}>{name}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={ picture ? { uri: picture } : require('../../assets/images/blank-profile-picture.png') }
                           style={{ width: 45, height: 45, borderRadius: 35, borderWidth: 0.5, borderColor: color_pallete.black_gradiant['40%'] }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AppHeader;
