import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';


import { getMonthlyDateRangeFromDate } from '../../helpers';
import { DataManagementAPI } from '../../services/apis/data_management_api';

import { JournalStackParamList } from './app_navigation';
type journalScreenProp = StackNavigationProp<JournalStackParamList, 'Journal'>;


const Journal = () =>
{
  const [plans, setPlans] = useState<any[]>([]);
  const [markedDates, setMarkedDates] = useState<{ [date: string]: any }>({});

  const navigation = useNavigation<journalScreenProp>();

  async function loadData(date: Date) {
    try {
        const monthlyRange = getMonthlyDateRangeFromDate(date);
        const [practiceData, practiceDataDates] = await DataManagementAPI.getCompletedPracticeDataByDate(monthlyRange[0], monthlyRange[1]);
        setPlans(practiceData.sort((a: any, b: any) => a.practiceDate - b.practiceDate) || []);
        setMarkedDates(practiceDataDates);
    }
    catch (e) {
        // Handle in any way
    }
  }
  useFocusEffect(React.useCallback(() => { loadData(new Date()); }, []));

    
  return (
    <View style={{flex:1}}>
      <Calendar
        markedDates={markedDates}
        onMonthChange={(date) => { loadData(new Date(date.dateString)) }}
      />
      <Text style={{paddingVertical: '2.5%', marginHorizontal: 10, marginVertical: 5, fontSize: 18, fontWeight: '500'}}>Entries</Text>
      <ScrollView>
        {plans.map((item: any, index: any) => (
          <TouchableOpacity style={styles.item} key={index} onPress={() => navigation.navigate('JournalDetail', {item})}>
              <Ionicons name='musical-note' size={25}></Ionicons>
              <Text>{item.practiceDate.toDate().toDateString()}</Text>
              <Text numberOfLines={1} ellipsizeMode="tail" style={{flex: 1}}> - {item.title}</Text>
        </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Journal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
      backgroundColor: '#7BC3E9',
      padding: 20,
      margin: 10,
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center'
    },
  itemText: {
    color: 'black',
    fontSize: 16,
  },
  text: {
    fontSize: 24,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
});
