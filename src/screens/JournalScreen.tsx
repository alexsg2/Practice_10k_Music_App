import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Calendar, Agenda} from 'react-native-calendars';


const JournalScreen: React.FC = () => {

    const [selected, setSelected] = useState('');

    const agendaItems = {
        '2023-09-25': [
          {
            name: 'Sonata in A minor',
            time: '10:00 AM',
            height: 50, // Add a height property
            day: '2023-09-25', // Add a day property
          },
          {
            name: 'Rhapsody no 1',
            time: '12:30 PM',
            height: 50,
            day: '2023-09-25',
          },
        ],
        '2023-09-26': [
          {
            name: 'Warm Up',
            time: '9:30 AM',
            height: 50,
            day: '2023-09-26',
          },
          {
            name: 'Concerto',
            time: '2:00 PM',
            height: 50,
            day: '2023-09-26',
          },
        ],
      };

      const renderEmptyDate = () => {
        return (
          <SafeAreaView style={styles.emptyDate}>
            <Text>No practice entries for this day.</Text>
          </SafeAreaView>
        );
      };
    
    
    return (
      <SafeAreaView style={styles.calendar}>
        <Agenda
            items={agendaItems}
            renderItem={(item, isFirst) => (
                <TouchableOpacity style={styles.item}>
                <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
            )}
            renderEmptyDate={renderEmptyDate}
            showOnlySelectedDayItems
        />
        {/*<Calendar
            theme={{
                calendarBackground: '#ECF1F7',
                
            }}
            onDayPress={day => {
                setSelected(day.dateString);
            }}
            markedDates={{
                [selected]: {selected: true, disableTouchEvent: true}
            }}
        />*/}
        
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    calendar: {
        flex: 1,
        width: '100%'
    },
    item: {
        backgroundColor: '#7BC3E9',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
      },
      itemText: {
        color: 'black',
        fontSize: 16,
      },
    emptyDate: {
        height: 15,
        flex: 1,
        verticalAlign: 'center',
        paddingTop: 30
    },
    text: {
      fontSize: 24,
    },
  });
  
  export default JournalScreen;