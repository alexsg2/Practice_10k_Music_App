import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Timestamp } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colorPallete, fontSizes } from '../../assets/design_library';
import { Ionicons } from '@expo/vector-icons'

type JournalParamList = {
    JournalDetail: { item: { date: Timestamp; duration: number; instrument: string; musicID: Array<string>, note: string} };
  };

type JournalDetailRouteProp = RouteProp<JournalParamList, 'JournalDetail'>;

const JournalDetail = () => {
    const route = useRoute<JournalDetailRouteProp>();
    const item = route.params.item
    const navigation = useNavigation();

    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity style={styles.cancelButton}>
                    <Ionicons name="arrow-back" onPress={() => navigation.goBack()} size={40} color='black' left="5%"/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Practice Details</Text>
                <Text style={{width: "15%"}}></Text>
            </View>
            <Text style={styles.detailsText}>
                <Text style={styles.detailsHeader}>Music ID: </Text>
                <Text>{item.musicID[0]}</Text>
            </Text>
            <Text style={styles.detailsText}>
                <Text style={styles.detailsHeader}>Instrument: </Text>
                <Text>{item.instrument}</Text>
            </Text>
            <Text style={styles.detailsText}>
                <Text style={styles.detailsHeader}>Date: </Text>
                <Text>{item.date.toDate().toDateString()}</Text>
            </Text>
            <Text style={styles.detailsText}>
                <Text style={styles.detailsHeader}>Duration: </Text>
                <Text>{item.duration.toString()}</Text>
            </Text>
            <Text style={{fontSize: 16, fontWeight: "bold", margin: 10}}>Notes: </Text>
            <Text style={styles.detailsText}>{item.note}</Text>
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
    header: {
        height: 60,
        verticalAlign: "top",
        marginBottom: '2%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: colorPallete.black_gradiant["default"],
        justifyContent:'space-between'
    },
    cancelButton: {
        width: "15%"
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: fontSizes.name,
    },
    detailsText: {
        margin: 10,
        fontSize: 16
    },
    detailsHeader: {
        fontSize: 16,
        fontWeight: "bold"
    }
});

export default JournalDetail;