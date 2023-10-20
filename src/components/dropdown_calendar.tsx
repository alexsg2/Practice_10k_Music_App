import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import DatePicker from 'react-native-modern-datepicker';
import { StyleProp, ViewStyle, View, Text, TouchableOpacity } from 'react-native';


interface DropDownProp {
    title: string,
    selectedDate: string,
    setDate: (selectedDate: string) => void;
    altStyle: StyleProp<ViewStyle>[];
}
  
const DropdownCalendar: React.FC<DropDownProp> = ({ title, selectedDate, setDate, altStyle }) =>
{
    const [showDatePicker, setShowDatePicker] = useState(false);
    
    const handleDateChange = (date: string) => {
        const formatParts = date.split('/');
        const formattedDate = `${formatParts[1]}/${formatParts[2]}/${formatParts[0]}`;
        setDate(formattedDate);
        setShowDatePicker(false);
    };

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => setShowDatePicker(!showDatePicker)}
                              style={altStyle[0]}
            >
                <Text style={selectedDate !== '' ? altStyle[1] : altStyle[2]}>
                    {selectedDate !== '' ? selectedDate : title}
                </Text>
                <Ionicons name="calendar-sharp" size={30} color="white" onPress={() => setShowDatePicker(!showDatePicker)}/>
            </TouchableOpacity>
            {showDatePicker && (
                <DatePicker
                    style={altStyle[3]}
                    mode="calendar"
                    selectorEndingYear={(new Date()).getFullYear()}
                    options={{mainColor: '#5982C2'}}
                    onSelectedChange={handleDateChange}
                />
            )}
        </View>
  );
};

export default DropdownCalendar;
