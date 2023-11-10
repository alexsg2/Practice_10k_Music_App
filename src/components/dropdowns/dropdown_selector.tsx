import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 
import { StyleProp, ViewStyle, ScrollView, View, Text, TouchableOpacity } from 'react-native';


import { color_pallete, font_sizes, texts } from '../../assets/common_styles';

interface DropDownProp {
    input: string,
    dataList: string[];
    multiselect: boolean,
    selectedItems: string[];
    setSelectedItems: (items: string[]) => void;
    altStyle: StyleProp<ViewStyle>;
}
  

const DropdownSelector: React.FC<DropDownProp> = ({ input, dataList, multiselect, selectedItems, setSelectedItems, altStyle }) =>
{
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

    const handleItemSelect = (item: string) => {
        if (selectedItems.includes(item)) {
            const updatedSelections = selectedItems.filter((selectedItem) => selectedItem !== item);
            setSelectedItems(updatedSelections);
        }
        else {
            if (multiselect) {
                setSelectedItems([...selectedItems, item]);
            }
            else {
                setSelectedItems([item]);
                setDropdownIsOpen(!dropdownIsOpen);
            }
        }
    }

    return (
        <View>
            <TouchableOpacity onPress={() => setDropdownIsOpen(!dropdownIsOpen)} style={altStyle}>
                <Text style={selectedItems.length > 0 ? texts.selected : texts.default}>
                    {selectedItems.length > 0 ? selectedItems.join(', ') : input}
                </Text>
                {dropdownIsOpen ? (
                    <MaterialIcons name="keyboard-arrow-up" size={30} color="white"/>
                ) : (
                    <MaterialIcons name="keyboard-arrow-down" size={30} color="white"/>
                )}
            </TouchableOpacity>
            {dropdownIsOpen ? (
                <ScrollView style={{ width: '100%', alignSelf: 'center', maxHeight: 250, marginTop: '-7%', marginBottom: '5%',
                                     borderRadius: 10, alignContent: 'center', backgroundColor: color_pallete.darkGrey
                                   }}
                >
                    <Text style={{ flex: 1, alignSelf: 'center', marginVertical: '5%', fontWeight: 'bold',
                                   fontSize: font_sizes.sections, color: color_pallete.white_gradiant['60%']
                                }}
                    >
                        Options:
                    </Text>
                    {dataList.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleItemSelect(item)}
                            style={[{ padding: '7%', borderBottomWidth: 1, borderBottomColor: color_pallete.white_gradiant['60%'] },
                                      selectedItems.includes(item) ? { backgroundColor: color_pallete.white_gradiant['60%'] } : null
                                   ]}
                        >
                            <Text style={{ flex: 1, alignSelf: 'center', fontSize: font_sizes.inputs, color: color_pallete.white_gradiant['default'] }}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            ) : null}
        </View>
    );
};

export default DropdownSelector;
