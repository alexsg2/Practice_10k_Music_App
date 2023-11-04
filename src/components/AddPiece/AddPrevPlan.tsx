import React from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons'; 
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface AddPrevPlanProps {
    plans: any[];
    handleSave: (plan: any) => void;
}


const AddPrevPlan: React.FC<AddPrevPlanProps> = ({plans, handleSave }) =>
{
    return (
        <View style={{ flex: 1, paddingHorizontal: '3%' }}>
            { plans.length > 0 ? (
                    plans.map((plan, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.item}
                            onPress={() => {handleSave(plan)}}
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
