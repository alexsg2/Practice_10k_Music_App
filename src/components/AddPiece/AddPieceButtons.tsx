import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Modal, View, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';


import { RootState } from '../../redux/store';
import DropdownSelector from '../dropdown_selector';
import { validatePracticePlan, addPracticeData } from '../../helpers';
import { bottomStyles, componentStyles, inputStyles } from '../../assets/styles/auth_and_profile_styles';
import AddPlanDeatails from './add_plan_details'

interface AddPieceContainerProps {
  openAddNewView: () => void;
  openAddPrevView: () => void;
}


const AddPieceContainer: React.FC<AddPieceContainerProps> = ({ openAddNewView, openAddPrevView }) =>
{
  
    return (
      <View style={{ width: '95%', padding: '5%', alignSelf: 'center', backgroundColor: '#ECF1F7' }}>
          <TouchableOpacity style={styles.item} onPress={openAddNewView}>
            <Ionicons name="add-sharp" size={30} color="black"/>
            <Text style={styles.itemText}>Add New</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={openAddPrevView}>
            <Ionicons name="add-sharp" size={30} color="black"/>
            <Text style={styles.itemText}>Add Previous</Text>
          </TouchableOpacity>
      </View>
    );
};

export default AddPieceContainer;

const styles = StyleSheet.create(
  {
      item: {
          width: '98%',
          padding: '5%',
          marginTop: '5%',
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
