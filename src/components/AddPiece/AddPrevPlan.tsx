import React, { useEffect, useState } from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons'; 
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { getPracticeDataByDate } from '../../helpers';

interface AddPrevPlanProps {
    userId: string;
    date: Date[];
    reload: boolean;
    setReload: (selected: boolean) => void;
    plans: any[];
}


const AddPrevPlan: React.FC<AddPrevPlanProps> = ({plans, userId, date, reload, setReload }) =>
{
    const [selectedPlan, setSelectedPlan] = useState<{ id: string; title: string; piece: string;
                                                       composer: string; instrument: string;
                                                       practiceDate: Date; duration: number;
                                                       status: string; notes: string; }>({ id: '', title: '', piece: '', composer: '',
                                                                                           instrument: '', practiceDate: new Date(),
                                                                                           duration: 0, status: '', notes: '' });
    const [addPlanVisible, setAddPlanVisible] = useState(false);
    const [viewPlanVisible, setViewPlanVisible] = useState(false);
    const [editable, setEditable] = useState<boolean>(false);
    
    async function handleViewPlan(plan: any) {
        setSelectedPlan({ id: plan.id, title: plan.title, piece: plan.piece, composer: plan.composer,
                          instrument: plan.instrument, practiceDate: plan.practiceDate, duration: plan.duration,
                          status: plan.status, notes: plan.notes });
        
        const curr = new Date();
        curr.setHours(-4, 0, 0, 0);
        const selec = new Date(date[1]);
        selec.setHours(-4, 0, 1, 0);
        if (selec >= curr) {
            setEditable(true);
        }
        else {
            setEditable(false);
        }
        
        setViewPlanVisible(true);
    };

    const curr = new Date();
    curr.setHours(-4, 0, 0, 0);
    const selection = new Date(date[1]);
    selection.setHours(-4, 0, 1, 0);

    return (
        <View style={{ flex: 1, paddingHorizontal: '3%' }}>
            { plans.length > 0 ? (
                    plans.map((plan, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.item}
                            onPress={() => {handleViewPlan(plan)}}
                        >
                            <View style={styles.leftContainer}>
                                <Ionicons name='musical-note' size={25}></Ionicons>
                                <Text style={styles.itemText}>{plan.title}</Text>
                            </View>
                            <View style={styles.rightContainer}>
                                <AntDesign name="right" size={24} color="black"/>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={{ fontSize: 16, fontStyle: 'italic', alignSelf: 'center', marginTop: '7%' }}>Nothing planned for this date.</Text>
                )}
        </View>
    );
};

export default AddPrevPlan;

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
