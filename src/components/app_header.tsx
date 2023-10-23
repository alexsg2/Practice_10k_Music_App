import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';


import { RootState } from '../redux/store';
import { colorPallete, fontSizes } from '../assets/design_library';

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
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image source={require('../assets/images/small-black-logo.png')} style={styles.logo} />
                </TouchableOpacity>
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.nameText}>{name}</Text>
            </View>
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={picture ? typeof picture === 'string' ? { uri: picture } : picture : require('../assets/images/blank-profile-picture.png')} style={styles.profile} />
                </TouchableOpacity>
            </View>
        </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create(
{
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomColor: colorPallete.black_gradiant["default"],
    },
    logoContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    logo: {
        width: 45,
        height: 45,
    },
    nameContainer: {
        flex: 1,
        alignItems: 'center',
    },
    nameText: {
        fontWeight: 'bold',
        fontSize: fontSizes.name,
    },
    profileContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    profile: {
        width: 45,
        height: 45,
        borderRadius: 35,
        borderWidth: 0.5,
        borderColor: colorPallete.black_gradiant["40%"],
    },
});
