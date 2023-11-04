import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Modal, View, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';


import { RootState } from '../../redux/store';
import DropdownSelector from '../dropdown_selector';
import { validatePracticePlan, addPracticeData } from '../../helpers';
import { bottomStyles, componentStyles, inputStyles } from '../../assets/styles/auth_and_profile_styles';
import AddPlanDeatails from './add_plan_details'
import AddPieceButtons from './AddPieceButtons'
import AddPrevPlan from './AddPrevPlan'

interface AddPieceContainerProps {
    plans: any[];
    view: boolean;
    setView: (selected: boolean) => void;
    setReloadData: (selected: boolean) => void;
    date: Date[];
    reload: boolean;
}


const AddPieceContainer: React.FC<AddPieceContainerProps> = ({plans, view, setView, setReloadData, date, reload}) =>
{
    const [showAddNewView, setShowAddNewView] = useState<boolean>(false);
    const [showAddPrevView, setShowAddPrevView] = useState<boolean>(false);
    const showInitialView = !showAddNewView && !showAddPrevView;
    
    const {id} = useSelector((state: RootState) => state?.profile);
    
    const openAddNewView = () => {
      setShowAddPrevView(false);
      setShowAddNewView(true);
    }
    
    const openAddPrevView = () => {
      setShowAddNewView(false);
      setShowAddPrevView(true);
    }
    return (
        <Modal animationType="fade" transparent={true} visible={view}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <SafeAreaView style={{ flex: 0.70, width: '90%', backgroundColor: '#ECF1F7', borderRadius: 10 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ width: '95%', padding: '5%', alignSelf: 'center', backgroundColor: '#ECF1F7' }}>
                            <View style={{ width: '95%', marginBottom: '5%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => setView(false)} style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                    <Ionicons name="close" size={40} color='black'/>
                                </TouchableOpacity>
                                <Text style={{ fontSize: 25, fontWeight: 'bold', left: '-95%', alignItems: 'center', }}>Add Piece</Text>
                            </View>
                        </View>
                        {showInitialView && <AddPieceButtons openAddNewView={openAddNewView} openAddPrevView={openAddPrevView}/>}
                        {showAddNewView && <AddPlanDeatails uid={id} date={date[0]} setReloadData={setReloadData}/>}
                        {showAddPrevView && <AddPrevPlan userId={id} date={date} reload={reload} setReload={setReloadData} plans={plans} />}
                    </ScrollView>
                </SafeAreaView>
            </View>
        </Modal>
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
