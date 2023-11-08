import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons'
import { db, getAuth } from '../../config/firebase';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';

import { JournalStackParamList } from './app_navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getCompletedPracticeLogs, getMarkedDates } from '../../helpers/touch_firestore_data';

type journalScreenProp = StackNavigationProp<JournalStackParamList, 'Journal'>;

const Journal: React.FC = () => {
  const [markedDates, setMarkedDates] = useState<{ [date: string]: any }>({});
  const [plans, setPlans] = useState<any[]>([]);
 
  let currMonth = new Date().getMonth();
  let currYear = new Date().getFullYear();
  const userId = getAuth().currentUser?.uid || "";

  const navigation = useNavigation<journalScreenProp>();

  const loadData = async () => {
    // Get the userID of the current user
    const auth = getAuth();
    const user = auth.currentUser!
    if (user == null) {
      console.log("Error fetching practice logs.")
      return;
    }
    
    // Get the logs for the current month only
    const practiceData = await getCompletedPracticeLogs(user.uid, new Date(currYear, currMonth, 1), 
    currMonth == 12 ? new Date(currYear + 1, 1, 1) : new Date(currYear, currMonth + 1, 1));

    setPlans(practiceData.sort((a: any, b: any) => a.practiceDate - b.practiceDate) || []);

    const tempDates = await getMarkedDates(user.uid);
    setMarkedDates(tempDates);    
  }

  // Load data when user opens screen
  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(React.useCallback(() => { loadData(); }, []));
    
  return (
    <View style={{flex:1}}>
      <Calendar
        markedDates={markedDates}
        onMonthChange={async (date) => {
          currMonth = date.month;
          currYear = date.year;
          const practiceData = await getCompletedPracticeLogs(userId, new Date(currYear, currMonth - 1, 1), 
            currMonth == 12 ? new Date(currYear + 1, 0, 1) : new Date(currYear, currMonth, 1));

          setPlans(practiceData.sort((a: any, b: any) => a.practiceDate - b.practiceDate) || []);
          }}
      />
      <Text style={{marginHorizontal: 10, marginVertical: 5, fontSize: 18, fontWeight: '500'}}>Entries</Text>
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
  
  export default Journal;