import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { getAuth, signOut } from 'firebase/auth';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { setUserDataField } from '../../helpers';


const auth = getAuth();

export default function Home() {
    const { user } = useAuthentication();
    
    return (
        <View style={styles.container}>
            <Text>Temporary home screen.</Text>
            <Text>Welcome, {user?.email}</Text>
            <Text>To logout, go to Profile and scroll down</Text>
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
