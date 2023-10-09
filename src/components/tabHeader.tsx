import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';


export type TabHeaderStackParamList = {
    Home: undefined;
    Profile: undefined;
};
 
type HeaderNavigationProp = NavigationProp<TabHeaderStackParamList, 'Home' | 'Profile'>;

interface HeaderProp {
    title: string;
}

const TabHeader: React.FC<HeaderProp> = ({ title }) =>
{
    const navigation = useNavigation<HeaderNavigationProp>();
    // TODO : home navigation isn't working
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image source={require('../assets/images/small-black-logo.png')} style={styles.logo} />
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={require('../assets/images/temp-profile.avif')} style={styles.profile} />
                </TouchableOpacity>
            </View>
        </View>
  );
};

TabHeader.propTypes = {
    title: PropTypes.string.isRequired,
};

export default TabHeader;

const styles = StyleSheet.create(
{
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomColor: 'black',
      justifyContent: 'space-between',
    },
    logoContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    logo: {
        width: 45,
        height: 45,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    profile: {
        width: 45,
        height: 45,
        borderRadius: 35,
    },
});
  