import React, {useState} from 'react';
import {View, Image, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

export default function RegisterScreen({ navigation })
{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleRegister = async () => {
        // TODO : when firebase is set up, register logic goes here
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../../assets/logo.png')}
                    style={styles.logo}
                />
            </View>
            <Text style={styles.headerText}>Welcome.</Text>
            <TextInput
                placeholder="First Name"
                placeholderTextColor="#F5F5F5"
                onChangeText={(text) => setFirstName(text)}
                value={firstName}
                style={styles.input}
            />
            <TextInput
                placeholder="Last Name"
                placeholderTextColor="#F5F5F5"
                onChangeText={(text) => setLastName(text)}
                value={lastName}
                secureTextEntry
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                placeholderTextColor="#F5F5F5"
                onChangeText={(text) => setEmail(text)}
                value={email}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                placeholderTextColor="#F5F5F5"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
                style={styles.input}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleRegister} style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.footerContainer}>
                    <Text style={styles.footerText}>Already registered? Click here.</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5982C2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 120,
        height: 120,
    },
    headerText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    input: {
        width: '80%',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
    },
    buttonContainer: {
        width: '80%',
    },
    button: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footerContainer: {
        alignItems: 'center',
    },
    footerText: {
        color: 'white',
        fontSize: 14,
        textDecorationLine: 'underline',
        alignItems: 'center',
    },
});
