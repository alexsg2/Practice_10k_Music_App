import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 
import { StyleProp, ViewStyle, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

import { colorPallete, fontSizes } from '../assets/design_library';


interface DropDownProp {
    title: string,
    dataList: string[];
    multiselect: boolean,
    selectedItems: string[];
    setSelectedItems: (items: string[]) => void;
    altStyle: StyleProp<ViewStyle>[];
}
  
// TODO : Issue with scrolling when we reach the bottom of the flatlist
const DropdownSelector: React.FC<DropDownProp> = ({ title, dataList, multiselect, selectedItems, setSelectedItems, altStyle }) =>
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
            <TouchableOpacity onPress={() => setDropdownIsOpen(!dropdownIsOpen)} style={[altStyle[0]]}>
                <Text style={selectedItems.length > 0 ? altStyle[1] : altStyle[2]}>
                    {selectedItems.length > 0 ? selectedItems.join(', ') : title}
                </Text>
                {dropdownIsOpen ? (
                    <MaterialIcons name="keyboard-arrow-up" size={30} color="white"/>
                ) : (
                    <MaterialIcons name="keyboard-arrow-down" size={30} color="white"/>
                )}
            </TouchableOpacity>
            {dropdownIsOpen ? (
                <View style={altStyle[3]}>
                    <Text style={{ marginVertical: '2%', fontSize: fontSizes.label, color: colorPallete.black_gradiant["default"] }}>
                        Options:
                    </Text>
                    <FlatList
                        data={dataList}
                        keyExtractor={(index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleItemSelect(item)}
                                              style={[{ padding: '7%', marginBottom: '2.5%', borderBottomWidth: 1, borderBottomColor: colorPallete.white_gradiant["60%"] },
                                                        selectedItems.includes(item) ?
                                                            { borderRadius: 10, backgroundColor: colorPallete.login_blue["default"] }
                                                            : null
                                                    ]} 
                            >
                                <Text style={{ fontSize: fontSizes.normal, color: colorPallete.black_gradiant["default"] }}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            ) : null}
        </View>
  );
};

export default DropdownSelector;
