import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons'
import { db, getAuth } from '../../services/config/firebase';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';

import { JournalStackParamList } from './app_navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type journalScreenProp = StackNavigationProp<JournalStackParamList, 'Journal'>;

const Journal: React.FC = () => {
  const [practiceLogs, setPracticeLogs] = useState([] as any);
  const [filteredLogs, setFilteredLogs] = useState([] as any);
  const [markedDates, setMarkedDates] = useState<{ [date: string]: any }>({});
 
  let currMonth = new Date().getMonth() + 1;

  const navigation = useNavigation<journalScreenProp>();

  // Load data when user opens screen
  useEffect(() => {
    const loadData = async () => {
      // Get the userID of the current user
      const auth = getAuth();
      const user = auth.currentUser!
      if (user == null) {
        console.log("Error fetching practice logs.")
        return;
      }
      const dates: { [date: string]: any } = {};

      // Get the user's completed practice log collection
      const q = query(collection(db, "users/" + user.uid + "/practiceData"), where("status", "==", "Completed"));

      // Listen for changes in firestore
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const date = doc.data().practiceDate.toDate().toISOString().split('T')[0]; // Adjust this to your data structure
          dates[date] = { marked: true, dotColor: "red" };
        });
        // All practice logs
        setPracticeLogs(querySnapshot.docs.map(doc => doc.data()));

        // Get the logs for the current month only
        setFilteredLogs(querySnapshot.docs
          .sort((a, b) => a.data().practiceDate - b.data().practiceDate)
          .map(doc => doc.data()).filter((log: any) => 
          log.practiceDate.toDate().toISOString().split('-')[1] == currMonth).sort());
      });      
      
      setMarkedDates(dates);
      
    }
    loadData();
  }, []);
    
  return (
    <View style={{flex:1}}>
      <Calendar
        markedDates={markedDates}
        markingType="period"
        onMonthChange={(month) => {
          currMonth = month.month;

          // Filter practice logs based on the current month, sort ascending
          setFilteredLogs(practiceLogs
            .filter((log: any) => 
            log.practiceDate.toDate().toISOString().split('-')[1] == month.month)
            .sort((a: any, b: any) => a.practiceDate - b.practiceDate))
          }}
      />
      <Text style={{marginHorizontal: 10, marginVertical: 5, fontSize: 18, fontWeight: '500'}}>Entries</Text>
      <ScrollView>
        {filteredLogs.map((item: any, index: any) => (
          <TouchableOpacity style={styles.item} key={index} onPress={() => navigation.navigate('JournalDetail', {item})}>
              <Ionicons name='musical-note' size={25}></Ionicons>
              <Text key={item.id}>{item.practiceDate.toDate().toDateString()}</Text>
              <Text key={item.id} numberOfLines={1} ellipsizeMode="tail" style={{flex: 1}}> - {item.title}</Text>
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