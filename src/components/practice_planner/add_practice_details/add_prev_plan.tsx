import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native';


import { DataManagementAPI } from '../../../services/apis/data_management_api';

interface AddPrevPlanProps {
    handleSave: (plan: any) => void;
}

interface PiecesProp {
    title: string;
    piece: string;
    composer: string;
    instrument: string;
    notes: string;
}


const AddPrevPlan: React.FC<AddPrevPlanProps> = ({ handleSave }) =>
{
    const [previousPlans, setPreviousPlans] = useState<PiecesProp[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    async function fetchPreviousPlans() {
        setLoading(true);
        try {
            const plans = await DataManagementAPI.getAllMusicPieces();
            setPreviousPlans(plans);
        }
        catch (e) {
            // Handle in any way
        }
        setLoading(false);
    };

    useFocusEffect(React.useCallback(() => { fetchPreviousPlans(); }, []));

    const colors = ['#5982C2', '#7BC3E9'];


    return (
        <View style={{ flex: 1, marginTop: '-7%', marginBottom: '10%', paddingHorizontal: '5%' }}>
            {loading ? (
                <ActivityIndicator size='large' color='black' style={{ marginTop: '5%'}} />
            ) : (
                <>
                <Text style={{ flex: 1, alignSelf: 'center', marginTop: '5%', fontSize: 18, fontStyle: 'italic' }}>Select One:</Text>
                {previousPlans.length > 0 ? (
                    previousPlans.map((plan, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.item, { backgroundColor: colors[index % colors.length] }]}
                            onPress={() => {handleSave(plan)}}
                        >
                            <View style={styles.itemContainer}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: '5%', paddingHorizontal: '5%', }}>{plan.title}</Text>
                                <View style={{ alignSelf: 'center'}}>
                                    <Text style={styles.itemText}>Piece: {plan.piece}</Text>
                                    <Text style={styles.itemText}>Composer: {plan.composer}</Text>
                                    <Text style={styles.itemText}>Instrument: {plan.instrument}</Text>
                                    {plan.notes !== '' ? (
                                        <Text style={styles.itemText}>Notes: {plan.notes}</Text>
                                    ) : null}
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={{ fontSize: 16, fontStyle: 'italic', alignSelf: 'center', marginTop: '7%' }}>No previous plans.</Text>
                )}
                </>
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
        marginTop: '7%',
        borderRadius: 15,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#7BC3E9',
    },
    itemContainer: {
        flex: 1,
        alignItems: 'center',
    },
    itemText: {
        fontSize: 16,
        alignSelf: 'flex-start',
        paddingVertical: '1%',
        paddingHorizontal: '5%',
    },
});
