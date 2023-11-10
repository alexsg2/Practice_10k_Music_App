import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { CircularProgress } from 'react-native-circular-progress';


import { color_pallete, font_sizes } from '../../assets/common_styles';

interface ProgressProps {
  title: string;
  goal_amount: string;
  hours_amount: number;
  pieces_amount: number;
}


const ProgressTracker: React.FC<ProgressProps> = ({ title, goal_amount, hours_amount, pieces_amount }) =>
{
  const goal = parseInt(goal_amount.replace(/,/g, ''));
  const hours_done = hours_amount;
  const hoursRemaining = goal - hours_done > 0 ? goal - hours_done : 0;
  const pieces_done = pieces_amount;

  return (
    <View style={{ width: '90%', height: 200, borderRadius: 10, borderWidth: 2, borderColor: color_pallete.black_gradiant['default'],
                   flexDirection: 'row', backgroundColor: color_pallete.lightWhite }}
    >
      <View style={{ flex: 3.5, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: font_sizes.headers, marginBottom: '1.5%' }}>{title}</Text>
        <Text style={{ fontSize: font_sizes.footers, marginBottom: '5%' }}>Remaining = Goal - Hours</Text>
        <View style={{ width: 100, height: 100 }}>
          <CircularProgress size={100} width={10} fill={100 - (hoursRemaining / goal) * 100}
                            tintColor={color_pallete.lightBlue} backgroundColor={color_pallete.darkBlue} rotation={0}
          >
            {() => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: font_sizes.buttons }}>{`${hoursRemaining}`}</Text>
                <Text style={{ fontSize: font_sizes.footers }}>Remaining</Text>
              </View>
            )}
          </CircularProgress>
        </View>
      </View>
      <View style={{ flex: 2.5, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginRight: '5%' }}>
            <FontAwesome5 name='font-awesome-flag' size={24} color={color_pallete.darkRed}/>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: font_sizes.touchables, fontWeight: '300' }}>Goal</Text>
            <Text style={{ fontSize: font_sizes.touchables, fontWeight: '600', marginTop: '5%', marginBottom: '15%' }}>{goal_amount} hours</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginRight: '5%' }}>
            <MaterialIcons name='queue-music' size={24} color={color_pallete.purple}/>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: font_sizes.touchables, fontWeight: '300' }}>Pieces</Text>
            <Text style={{ fontSize: font_sizes.touchables, fontWeight: '600', marginTop: '5%' }}>{pieces_done}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProgressTracker;
