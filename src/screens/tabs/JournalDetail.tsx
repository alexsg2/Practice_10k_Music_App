import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView, ScrollView, Text, View, TextInput, StyleSheet } from 'react-native';


// TODO : encapsulate Timestamp in APIs
import { Timestamp } from 'firebase/firestore';
import { containerStyles, inputStyles } from '../../assets/styles/auth_and_profile_styles';

type JournalParamList = {
    JournalDetail: { item: { title: string; piece: string; composer: string; instrument: string;
                             duration: number; practiceDate: Timestamp; status: string; notes: string } };
  };

type JournalDetailRouteProp = RouteProp<JournalParamList, 'JournalDetail'>;


const JournalDetail = () =>
{
    const route = useRoute<JournalDetailRouteProp>();
    const item = route.params.item

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF1F7' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={containerStyles.innerContainer}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', padding: '5%', textAlign: 'center' }}>{item.title}</Text>
                    <View style={containerStyles.inputContainer}>
                        <Text style={inputStyles.profileLabelText}>Piece</Text>
                        <TextInput
                            style={inputStyles.profileInputBox}
                            value={item.piece}
                            editable={false}
                        />
                        <Text style={inputStyles.profileLabelText}>Composer</Text>
                        <TextInput
                            style={inputStyles.profileInputBox}
                            value={item.composer}
                            editable={false}
                        />
                        <Text style={inputStyles.profileLabelText}>Instrument</Text>
                        <TextInput
                            style={inputStyles.profileInputBox}
                            value={item.instrument}
                            editable={false}
                        />
                        <Text style={inputStyles.profileLabelText}>Date</Text>
                        <TextInput
                            style={inputStyles.profileInputBox}
                            value={item.practiceDate.toDate().toDateString()}
                            editable={false}
                        />
                        <Text style={inputStyles.profileLabelText}>Duration (in hrs)</Text>
                        <TextInput
                            style={inputStyles.profileInputBox}
                            value={item.duration.toString()}
                            editable={false}
                        />
                        <Text style={inputStyles.profileLabelText}>Status</Text>
                        <TextInput
                            style={inputStyles.profileInputBox}
                            value={item.status}
                            editable={false}
                        />
                        <Text style={inputStyles.profileLabelText}>Notes</Text>
                        {/* TODO : make the space for notes bigger */}
                        <TextInput
                            style={inputStyles.profileInputBox}
                            value={item.notes}
                            editable={false}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default JournalDetail;
