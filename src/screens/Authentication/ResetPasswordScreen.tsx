import React, {useState} from 'react';
import {View, Image, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

export default function ResetPasswordScreen()
{
    const [email, setEmail] = useState('');
    
    const handlePasswordReset = async () => {
        // TODO : logic will be implemented here later
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../../assets/logo.png')}
                    style={styles.logo}
                />
            </View>
            <Text style={styles.headerText}>Reset your password.</Text>
            <TextInput
                placeholder="Email"
                placeholderTextColor="#F5F5F5"
                onChangeText={(text) => setEmail(text)}
                value={email}
                style={styles.input}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handlePasswordReset} style={styles.button}>
                    <Text style={styles.buttonText}>Continue</Text>
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
        fontSize: 25,
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
});
