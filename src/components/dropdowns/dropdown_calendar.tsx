import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import DatePicker from 'react-native-modern-datepicker';
import { StyleProp, ViewStyle, View, Text, TouchableOpacity } from 'react-native';


import { color_pallete, texts } from '../../assets/common_styles';

interface DropDownProp {
    input: string,
    selectedDate: string,
    setDate: (selectedDate: string) => void;
    altStyle: StyleProp<ViewStyle>;
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
                              style={altStyle}
            >
                <Text style={selectedDate !== '' ? texts.selected : texts.default}>
                    {selectedDate !== '' ? selectedDate : input}
                </Text>
                <Ionicons name='calendar-sharp' size={30} color='white' onPress={() => setShowDatePicker(!showDatePicker)}/>
            </TouchableOpacity>
            {showDatePicker && (
                <DatePicker
                    style={{ marginTop: '-5%', marginBottom: '5%', borderRadius: 10, borderWidth: 1,
                             borderColor: color_pallete.black_gradiant['20%']
                          }}
                    mode="calendar"
                    selectorEndingYear={(new Date()).getFullYear()}
                    options={{ backgroundColor: color_pallete.darkGrey,
                               textHeaderColor: color_pallete.white_gradiant['default'],
                               textDefaultColor: color_pallete.white_gradiant['default'],
                               selectedTextColor: color_pallete.blue_gradiant['default'],
                               mainColor: color_pallete.white_gradiant['default'],
                               textSecondaryColor: color_pallete.white_gradiant['default'],
                               borderColor: color_pallete.white_gradiant['20%'],
                            }}
                    onSelectedChange={handleDateChange}
                />
            )}
        </View>
    );
};

export default DropdownCalendar;
