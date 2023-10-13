import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import DatePicker from 'react-native-modern-datepicker';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { colorPallete, fontSizes } from '../assets/DesignLibrary';


interface DropDownProp {
    selectedDate: string,
    setDate: (selectedDate: string) => void;
}
  
const DropdownCalendar: React.FC<DropDownProp> = ({ selectedDate, setDate }) =>
{
    const [showDatePicker, setShowDatePicker] = useState(false);
    
    const handleDateChange = (date: string) => {
        const formatParts = date.split('/');
        const formattedDate = `${formatParts[1]}/${formatParts[2]}/${formatParts[0]}`;
        setDate(formattedDate);
        setShowDatePicker(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.calendarButton} onPress={() => setShowDatePicker(!showDatePicker)}>
                <Text style={styles.buttonText}>
                    {selectedDate !== '' ? selectedDate : 'Select'}
                </Text>
                <Ionicons name="calendar-sharp" size={30} color="white" onPress={() => setShowDatePicker(!showDatePicker)}/>
            </TouchableOpacity>
            {showDatePicker && (
                <DatePicker
                    mode="calendar"
                    selectorEndingYear={(new Date()).getFullYear()}
                    options={{mainColor: '#5982C2'}}
                    onSelectedChange={handleDateChange}
                    style={styles.calendarBox}
                />
            )}
        </View>
  );
};

export default DropdownCalendar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    calendarButton: {
        width: '100%',
        padding: '7%',
        borderRadius: 10,
        marginTop: '2.5%',
        marginBottom: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colorPallete.white_gradiant["20%"],
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: fontSizes.normal,
        color: colorPallete.white_gradiant["default"],
    },
    calendarBox: {
        width: '110%',
        borderRadius: 10,
        marginTop: '-5%',
        marginBottom: '10%',
        backgroundColor: colorPallete.white_gradiant["60%"],
    },
});
