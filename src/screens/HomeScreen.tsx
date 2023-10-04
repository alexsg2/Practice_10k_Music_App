import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth()

export default function HomeScreen() {
    const { user } = useAuthentication();
    
  return (
    <View style={styles.container}>
        <Text>Temporary home screen.</Text>
        <Text>Welcome, {user?.email}</Text>
        <TouchableOpacity onPress={() => signOut(auth)} style={styles.button}>
            <Text>Press here to logout</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10
  },
});