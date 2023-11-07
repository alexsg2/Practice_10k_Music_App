import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';


interface AddPlanButtonsProps {
  openAddNewView: () => void;
  openAddPrevView: () => void;
}


const AddPlanButtons: React.FC<AddPlanButtonsProps> = ({ openAddNewView, openAddPrevView }) =>
{
  
    return (
      <View style={{ width: '95%', padding: '5%', alignSelf: 'center', backgroundColor: '#ECF1F7' }}>
          <TouchableOpacity style={styles.item} onPress={openAddNewView}>
            <Ionicons name="add-sharp" size={30} color="black"/>
            <Text style={styles.itemText}>Add New Piece</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={openAddPrevView}>
            <Ionicons name="add-sharp" size={30} color="black"/>
            <Text style={styles.itemText}>Add Previous Piece</Text>
          </TouchableOpacity>
      </View>
    );
};

export default AddPlanButtons;

const styles = StyleSheet.create(
{
    item: {
        width: '98%',
        padding: '5%',
        marginTop: '25%',
        borderRadius: 15,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#7BC3E9',
    },
    leftContainer: {
        flex: 1,
        paddingRight: '5%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    rightContainer: {
        alignItems: 'flex-end',
    },
    itemText: {
        fontSize: 16,
        alignSelf: 'center',
        paddingHorizontal: '5%',
    },
});
