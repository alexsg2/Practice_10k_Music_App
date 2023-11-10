import React from 'react';
import { View, Text } from 'react-native';


import { containers, texts } from '../../assets/common_styles';


const PracticeTimerHeader: React.FC = () =>
{
    return (
        <View style={containers.header}>
            <View style={{ alignItems: 'center' }}>
                <Text style={texts.header}>Practicing</Text>
            </View>
        </View>
    );
};

export default PracticeTimerHeader;
