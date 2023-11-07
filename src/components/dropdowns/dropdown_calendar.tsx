import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import DatePicker from 'react-native-modern-datepicker';
import { StyleProp, ViewStyle, View, Text, TouchableOpacity } from 'react-native';


import { colorPallete } from '../../assets/design_library';

interface DropDownProp {
    input: string,
    selectedDate: string,
    setDate: (selectedDate: string) => void;
    altStyle: StyleProp<ViewStyle>[];
}


const DropdownCalendar: React.FC<DropDownProp> = ({ input, selectedDate, setDate, altStyle }) =>
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
                    {selectedDate !== '' ? selectedDate : input}
                </Text>
                <Ionicons name="calendar-sharp" size={30} color="white" onPress={() => setShowDatePicker(!showDatePicker)}/>
            </TouchableOpacity>
            {showDatePicker && (
                <DatePicker
                    style={{borderRadius: 10, marginTop: '-5%', marginBottom: '5%', borderWidth: 1, borderColor: colorPallete.black_gradiant["20%"]}}
                    mode="calendar"
                    selectorEndingYear={(new Date()).getFullYear()}
                    options={{ backgroundColor: '#333333',
                               textHeaderColor: colorPallete.white_gradiant["default"],
                               textDefaultColor: colorPallete.white_gradiant["default"],
                               selectedTextColor: colorPallete.blue_gradiant["default"],
                               mainColor: colorPallete.white_gradiant["default"],
                               textSecondaryColor: colorPallete.white_gradiant["default"],
                               borderColor: colorPallete.white_gradiant["20%"],
                            }}
                    onSelectedChange={handleDateChange}
                />
            )}
        </View>
    );
};

export default DropdownCalendar;
