import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

import { color_pallete, font_sizes, buttons, texts, containers } from '../../../assets/common_styles';

interface AddPrevPlanProps {
    handleSave: (plan: any) => void;
}


const AddPrevPlan: React.FC<AddPrevPlanProps> = ({ handleSave }) =>
{
    const currentMusicPieces = useSelector((state: RootState) => state?.music);
    const allMusicPieces = currentMusicPieces.musicPieces;
    const colors = [color_pallete.lightBlue, color_pallete.darkBlue];


    return (
        <View style={{ flex: 1 }}>
            <Text style={{ flex: 1, alignSelf: 'center', marginTop: '5%', fontSize: font_sizes.sections, fontStyle: 'italic' }}>Select One:</Text>
            {allMusicPieces.length > 0 ? (
                allMusicPieces.map((music, index) => (
                    <TouchableOpacity
                        key={index}
                        style={buttons.blueList}
                        onPress={() => {handleSave(music)}}
                    >
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={texts.listTitle}>{music.title}</Text>
                            <View style={containers.list}>
                                <Text style={texts.listField}>Piece: </Text>
                                <Text style={texts.listValue}>{music.piece}</Text>
                            </View>
                            <View style={containers.list}>
                                <Text style={texts.listField}>Composer: </Text>
                                <Text style={texts.listValue}>{music.composer}</Text>
                            </View>
                            <View style={containers.list}>
                                <Text style={texts.listField}>Instrument: </Text>
                                <Text style={texts.listValue}>{music.instrument}</Text>
                            </View>
                            <View style={containers.list}>
                                <Text style={texts.listField}>Notes: </Text>
                                <Text style={texts.listValue}>{music.notes}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))
            ) : (
                <Text style={texts.empty}>No music pieces to load.</Text>
            )}
        </View>
    );
};

export default AddPrevPlan;
