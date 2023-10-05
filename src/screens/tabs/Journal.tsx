import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Calendar, Agenda, ExpandableCalendar, CalendarProvider, AgendaList} from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons'

const Journal: React.FC = () => {

    const [selected, setSelected] = useState('');

    const agendaItems = {
        '2023-09-20': [
          {
            name: 'The Wild Horseman',
            height: 50,
            day: '2023-09-19'
          }
        ],
        '2023-09-25': [
          {
            name: 'Sonata in A minor',
            time: '10:00 AM',
            height: 50,
            day: '2023-09-25',
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
          <View style={styles.container}>
            <Text style={styles.emptyDate}>No practice logs for this day.</Text>
          </View>
        );
      };

      const marked = useMemo(() => ({
        [selected]: {
          selected: true,
          selectedColor: '#222222',
          selectedTextColor: 'yellow',
        }
      }), [selected]);
    
    
    return (
      // TODO : Cannot exit calendar view when it's been pulled down.
      <SafeAreaView style={styles.calendar}>
        <Agenda
            items={agendaItems}
            renderItem={(item, isFirst) => (
                <TouchableOpacity style={styles.item}>
                  <Ionicons name='musical-note' size={30}></Ionicons>
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
            )}
            onDayPress={day => {
              setSelected(day.dateString);
          }}
            renderEmptyDate={renderEmptyDate}
            renderEmptyData={renderEmptyDate}
            theme={{
              dotColor: 'red'
            }}
            />
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
        margin: 10,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center'
      },
    itemText: {
      color: 'black',
      fontSize: 16,
    },
    emptyDate: {
        fontSize: 24,
        alignItems: 'center',
        justifyContent: 'center',
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