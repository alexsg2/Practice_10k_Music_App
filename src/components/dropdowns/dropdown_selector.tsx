import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 
import { StyleProp, ViewStyle, ScrollView, View, Text, TouchableOpacity } from 'react-native';


import { colorPallete, fontSizes } from '../../assets/design_library';

interface DropDownProp {
    input: string,
    dataList: string[];
    multiselect: boolean,
    selectedItems: string[];
    setSelectedItems: (items: string[]) => void;
    altStyle: StyleProp<ViewStyle>[];
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
            <TouchableOpacity onPress={() => setDropdownIsOpen(!dropdownIsOpen)} style={[altStyle[0]]}>
                <Text style={selectedItems.length > 0 ? altStyle[1] : altStyle[2]}>
                    {selectedItems.length > 0 ? selectedItems.join(', ') : input}
                </Text>
                {dropdownIsOpen ? (
                    <MaterialIcons name="keyboard-arrow-up" size={30} color="white"/>
                ) : (
                    <MaterialIcons name="keyboard-arrow-down" size={30} color="white"/>
                )}
            </TouchableOpacity>
            {dropdownIsOpen ? (
                <ScrollView style={{ width: '100%', alignSelf: 'center', maxHeight: 250, marginTop: '-7%', marginBottom: '5%', borderRadius: 10, alignContent: 'center', backgroundColor: '#333333' }} >
                    <Text style={{ flex: 1, alignSelf: 'center', marginVertical: '5%', fontWeight: 'bold', fontSize: fontSizes.button, color: colorPallete.white_gradiant["60%"] }}>
                        Options:
                    </Text>
                    {dataList.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleItemSelect(item)}
                            style={[
                                { padding: '7%', borderBottomWidth: 1, borderBottomColor: colorPallete.white_gradiant["60%"] },
                                selectedItems.includes(item) ? { backgroundColor: colorPallete.white_gradiant["60%"] } : null
                            ]}
                        >
                            <Text style={{ flex: 1, alignSelf: 'center', fontSize: fontSizes.normal, color: colorPallete.white_gradiant["default"] }}>
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
