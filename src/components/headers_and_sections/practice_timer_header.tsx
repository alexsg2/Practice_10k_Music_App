import React from 'react';
import { View, Text } from 'react-native';


import { colorPallete, fontSizes } from '../../assets/design_library';


const PracticeTimerHeader: React.FC = () =>
{
    return (
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', borderBottomColor: colorPallete.black_gradiant["default"] }}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: fontSizes.name }}>Practicing</Text>
            </View>
        </View>
    );
};

export default PracticeTimerHeader;
