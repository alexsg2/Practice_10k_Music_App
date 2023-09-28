import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // TODO : when firebase is set up, login logic goes here
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.headerText}>Hello.</Text>
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
      <View style={styles.forgotContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgotText}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterScreen')}
          style={styles.footerContainer}
        >
          <Text style={styles.footerText}>Not registered? Click here.</Text>
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
  forgotContainer: {
    width: '80%',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  forgotText: {
    color: 'white',
    fontSize: 14,
    fontStyle: 'italic',
    alignItems: 'center',
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
