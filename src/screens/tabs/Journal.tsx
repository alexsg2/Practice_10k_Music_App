import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';


import { buttons, onLightBackground, texts } from '../../assets/common_styles';

import { getMonthlyDateRangeFromDate } from '../../helpers';
import { DataManagementAPI } from '../../services/apis/data_management_api';

import { JournalStackParamList } from './app_navigation';
type journalScreenProp = StackNavigationProp<JournalStackParamList, 'Journal'>;


const Journal = () =>
{
  const [plans, setPlans] = useState<any[]>([]);
  const [markedDates, setMarkedDates] = useState<{ [date: string]: any }>({});

  const navigation = useNavigation<journalScreenProp>();

  const [loading, setLoading] = useState<boolean>(true);
  async function loadData(date: Date) {
    setLoading(true);
    try {
        const monthlyRange = getMonthlyDateRangeFromDate(date);
        const [practiceData, practiceDataDates] = await DataManagementAPI.getCompletedPracticeDataByDate(monthlyRange[0], monthlyRange[1]);
        setPlans(practiceData.sort((a: any, b: any) => a.practiceDate - b.practiceDate) || []);
        setMarkedDates(practiceDataDates);
    }
    catch (e) {
        // Handle in any way
    }
    setLoading(false);
  }
  useFocusEffect(React.useCallback(() => { loadData(new Date()); }, []));

    
  return (
    <View style={onLightBackground.safeArea}>
      <Calendar markedDates={markedDates} onMonthChange={(date) => { loadData(new Date(date.dateString)) }}/>
      <Text style={onLightBackground.sectionText}>Entries</Text>
      {loading ? (
        <View style={{ marginTop: '20%' }}>
          <ActivityIndicator size='large' color='black'/>
        </View>
      ) : (
        <ScrollView style={{ width: '95%', alignSelf: 'center'}}>
          {plans.length > 0 ? (
            <>
            {plans.map((item: any, index: any) => (
              <TouchableOpacity style={buttons.blueList} key={index} onPress={() => navigation.navigate('JournalDetail', { item })}>
                  <View style={{ flex: 1, paddingRight: '5%', alignItems: 'center', flexDirection: 'row' }}>
                    <Ionicons name='musical-note' size={25}/>
                    <Text>{item.practiceDate.toDate().toDateString()}</Text>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={{ flex: 1 }}> - {item.title}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <AntDesign name='right' size={24} color='black'/>
                  </View>
              </TouchableOpacity>
            ))}
            </>
          ) : (
            <Text style={texts.empty}>No plans available for the month.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default Journal;
