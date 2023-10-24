import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons'
import { db } from '../../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Journal: React.FC = () => {
  const [practiceLogs, setPracticeLogs] = useState([] as any);
  const [filteredLogs, setFilteredLogs] = useState([] as any);
  const [markedDates, setMarkedDates] = useState<{ [date: string]: any }>({});
  //let markedDates = {};
  let currMonth = new Date().getMonth() + 1;

  // Load data when user opens screen
  useEffect(() => {
    const loadData = async () => {
      // use authentication, then user.uid
      const users = collection(db, "users/52N76v6p9F7bsg4WLfqF/practiceLogs");
      const querySnapshot = await getDocs(users);
      
      const dates: { [date: string]: any } = {};
      // Format the dates properly
      querySnapshot.forEach((doc) => {
        const date = doc.data().date.toDate().toISOString().split('T')[0]; // Adjust this to your data structure
        dates[date] = { marked: true, dotColor: "red" };
      });

      // All practice logs
      setPracticeLogs(querySnapshot.docs.map(doc => doc.data()));

      // Initially the filtered logs should be the same as the practice
      setFilteredLogs(querySnapshot.docs.map(doc => doc.data()).filter((log: any) => 
        log.date.toDate().toISOString().split('-')[1] == currMonth));
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

          // Filter practice logs based on the current month
          setFilteredLogs(practiceLogs.filter((log: any) => 
            log.date.toDate().toISOString().split('-')[1] == month.month))
          }}
      />
        <FlatList
          data={filteredLogs}
          extraData={filteredLogs}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.item}>
              <Ionicons name='musical-note' size={25}></Ionicons>
              <Text key={item.id}>{item.date.toDate().toDateString()}</Text>
            </TouchableOpacity>
          )}
        />
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