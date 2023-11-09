import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';


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
    const currentMusicPieces = useSelector((state: RootState) => state?.music);
    const allMusicPieces = currentMusicPieces.musicPieces;
    const colors = ['#5982C2', '#7BC3E9'];


    return (
        <View style={{ flex: 1, marginTop: '-7%', marginBottom: '10%', paddingHorizontal: '5%' }}>
            <Text style={{ flex: 1, alignSelf: 'center', marginTop: '5%', fontSize: 18, fontStyle: 'italic' }}>Select One:</Text>
            {allMusicPieces.length > 0 ? (
                allMusicPieces.map((music, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.item, { backgroundColor: colors[index % colors.length] }]}
                        onPress={() => {handleSave(music)}}
                    >
                        <View style={styles.itemContainer}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: '5%', paddingHorizontal: '5%', }}>{music.title}</Text>
                            <View style={{ alignSelf: 'center'}}>
                                <Text style={styles.itemText}>Piece: {music.piece}</Text>
                                <Text style={styles.itemText}>Composer: {music.composer}</Text>
                                <Text style={styles.itemText}>Instrument: {music.instrument}</Text>
                                {music.notes !== '' ? (
                                    <Text style={styles.itemText}>Notes: {music.notes}</Text>
                                ) : null}
                            </View>
                        </View>
                    </TouchableOpacity>
                ))
            ) : (
                <Text style={{ fontSize: 16, fontStyle: 'italic', alignSelf: 'center', marginTop: '7%' }}>No music pieces to load.</Text>
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
