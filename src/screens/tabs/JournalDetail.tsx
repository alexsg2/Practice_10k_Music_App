import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView, ScrollView, Text, View, TextInput } from 'react-native';


import { color_pallete, containers, font_sizes, onLightBackground, texts } from '../../assets/common_styles';

type JournalParamList = {
    JournalDetail: { item: { title: string; piece: string; composer: string; instrument: string;
                             duration: number; practiceDate: any; status: string; notes: string;
                           }
                   };
};
type JournalDetailRouteProp = RouteProp<JournalParamList, 'JournalDetail'>;


const JournalDetail = () =>
{
    const route = useRoute<JournalDetailRouteProp>();
    const item = route.params.item

    return (
        <SafeAreaView style={onLightBackground.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={containers.innerView}>
                    <Text style={texts.cardTitle}>{item.title}</Text>
                    <View style={containers.input}>
                        <Text style={onLightBackground.sectionText}>Piece</Text>
                        <TextInput
                            style={onLightBackground.inputBox}
                            value={item.piece}
                            editable={false}
                        />
                        <Text style={onLightBackground.sectionText}>Composer</Text>
                        <TextInput
                            style={onLightBackground.inputBox}
                            value={item.composer}
                            editable={false}
                        />
                        <Text style={onLightBackground.sectionText}>Instrument</Text>
                        <TextInput
                            style={onLightBackground.inputBox}
                            value={item.instrument}
                            editable={false}
                        />
                        <Text style={onLightBackground.sectionText}>Date</Text>
                        <TextInput
                            style={onLightBackground.inputBox}
                            value={item.practiceDate.toDate().toDateString()}
                            editable={false}
                        />
                        <Text style={onLightBackground.sectionText}>Duration (in hrs)</Text>
                        <TextInput
                            style={onLightBackground.inputBox}
                            value={item.duration.toString()}
                            editable={false}
                        />
                        <Text style={onLightBackground.sectionText}>Status</Text>
                        <TextInput
                            style={onLightBackground.inputBox}
                            value={item.status}
                            editable={false}
                        />
                        <Text style={onLightBackground.sectionText}>Notes:</Text>
                        <Text style={onLightBackground.notesInputBox}>
                            {item.notes}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default JournalDetail;
