import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, View, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

const RegisterScreen = () =>
{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigation();
    
    async function handleRegistering() {
        if (email === '' || password === '') {
            setError('Email and password are mandatory.')
            return;
        }
      
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigation.navigate('Login');
          } catch (error) {
            setError('')
          }
    }
    
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.innerContainer}>
                    <View style={styles.backContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Start')}>
                            <Image style={styles.back} source={require('../../assets/images/back-arrow.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/images/white-logo.png')} style={styles.logo}/>
                        <Text style={styles.headerText}>Hello.</Text>
                    </View>
                    {!!error && <View style={styles.error}><Text>{error}</Text></View>}
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Name'
                            placeholderTextColor='white'
                            onChangeText={(text) => setName(text)}
                            value={name}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Email'
                            placeholderTextColor='white'
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Password'
                            placeholderTextColor='white'
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            secureTextEntry
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleRegistering} style={styles.button}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.footerText}>Already a user? Click here.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    );
}

export default RegisterScreen;

const styles = StyleSheet.create(
{
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5982C2',
    },
    innerContainer: {
        flexGrow: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    backContainer: {
        top: '10%',
        left: '-40%',
        position: 'relative',
    },
    back: {
        width: 30,
        height: 27,
        tintColor: 'white',
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
    inputContainer: {
        width: '80%',
        marginBottom: '5%',
    },
    input: {
        width: '100%',
        padding: '7%',
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: '5%',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
    footerText: {
        fontSize: 14,
        color: 'white',
        textDecorationLine: 'underline',
    },
    error: {
        marginTop: 10,
        padding: 10,
        color: 'white',
        fontWeight: 'bold'
      }
});
    