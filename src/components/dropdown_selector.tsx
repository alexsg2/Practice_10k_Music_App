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
    altStyle?: StyleProp<ViewStyle>;
}
  
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
        <View style={styles.container}>
            <TouchableOpacity style={[styles.dropdownButton, altStyle]} onPress={() => setDropdownIsOpen(!dropdownIsOpen)}>
                <Text style={selectedItems.length > 0 ? styles.selectedText : styles.defaultText}>
                    {selectedItems.length > 0 ? selectedItems.join(', ') : title}
                </Text>
                {dropdownIsOpen ? (
                    <MaterialIcons name="keyboard-arrow-up" size={30} color="white"/>
                ) : (
                    <MaterialIcons name="keyboard-arrow-down" size={30} color="white"/>
                )}
            </TouchableOpacity>
            {dropdownIsOpen ? (
                <View style ={styles.dropdownArea}>
                    <Text style={styles.optionsText}>Options:</Text>
                    <FlatList
                        data={dataList}
                        keyExtractor={(index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={[styles.dropdownItem, selectedItems.includes(item) ? styles.selectedDropdownItem : null]} onPress={() => handleItemSelect(item)}>
                                <Text style={styles.itemText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            ) : null}
        </View>
  );
};

export default DropdownSelector;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    dropdownButton: {
        width: '100%',
        padding: '7%',
        borderRadius: 10,
        marginVertical: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colorPallete.white_gradiant["20%"],
    },
    selectedText: {
        alignSelf: 'center',
        fontSize: fontSizes.normal,
        color: colorPallete.white_gradiant["default"],
    },
    defaultText: {
        alignSelf: 'center',
        fontSize: fontSizes.normal,
        color: colorPallete.grey_gradiant["50%"],
    },
    dropdownArea: {
        height: 250,
        width: '100%',
        paddingVertical: '5%',
        borderRadius: 10,
        marginBottom: '10%',
        alignItems: 'center',
        backgroundColor: colorPallete.white_gradiant["60%"],
    },
    optionsText: {
        marginVertical: '2%',
        fontSize: fontSizes.label,
        color: colorPallete.black_gradiant["default"],
    },
    dropdownItem: {
        padding: '7%',
        borderBottomWidth: 1,
        marginBottom: '2.5%',
        borderBottomColor: colorPallete.white_gradiant["60%"],
    },
    selectedDropdownItem: {
        borderRadius: 10,
        backgroundColor: colorPallete.login_blue["default"],
    },
    itemText: {
        fontSize: fontSizes.normal,
        color: colorPallete.black_gradiant["default"],
    },
});
