import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text } from 'react-native';


import { buttons, texts } from '../../../assets/common_styles';

interface AddPlanButtonsProps {
  openAddNewView: () => void;
  openAddPrevView: () => void;
}


const AddPlanButtons: React.FC<AddPlanButtonsProps> = ({ openAddNewView, openAddPrevView }) =>
{
  
    return (
      <View style={{ flex: 1 }}>
          <TouchableOpacity style={[buttons.blueList, { marginTop: '25%' }]} onPress={openAddNewView}>
            <Ionicons name='add-sharp' size={30} color='black'/>
            <Text style={texts.list}>Add New Piece</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[buttons.blueList, { marginTop: '25%' }]} onPress={openAddPrevView}>
            <Ionicons name='add-sharp' size={30} color='black'/>
            <Text style={texts.list}>Add Previous Piece</Text>
          </TouchableOpacity>
      </View>
    );
};

export default AddPlanButtons;
