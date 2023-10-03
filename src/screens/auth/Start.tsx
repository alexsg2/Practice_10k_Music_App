import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

const StartScreen = () =>
{
    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/images/white-logo.png')} style={styles.logo}/>
                <Text style={styles.headerText}>All-in-One Practice Hub.</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default StartScreen;

const styles = StyleSheet.create(
{
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5982C2',
    },
    logoContainer: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        aspectRatio: 1,
        marginTop: '30%',
    },
    headerText: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
        marginVertical: '10%',
        // TODO: get a cursive font style
    },
    buttonContainer: {
        width: '80%',
        marginBottom: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '100%',
        padding: '7%',
        borderRadius: 10,
        marginVertical: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
});
