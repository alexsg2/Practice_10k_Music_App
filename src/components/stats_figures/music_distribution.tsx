import React from 'react';
import { View, Text } from 'react-native';
import PieChart from 'react-native-pie-chart';


import { totalDurationInHoursAndMinutes } from '../../helpers';
import { color_pallete, font_sizes } from '../../assets/common_styles';

interface MusicDistributionProps {
  date: string;
  composers: { composer: string, hour: number }[];
}


const MusicDistribution: React.FC<MusicDistributionProps> = ({ date, composers }) =>
{
  const composersArray = composers.map(item => item.hour);
  const [totalHours, totalMinutes] = totalDurationInHoursAndMinutes(composersArray);
  
  const colorOptions = ['#3E98FF', '#FCC235', '#B42A43', '#079D94', '#222425'];
  const seriesColor = composers.map((_, index) => { return index < colorOptions.length ? colorOptions[index] : 'black'; });

  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: font_sizes.buttons, marginVertical:'5%' }}>{date}</Text>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <PieChart widthAndHeight={200} series={composersArray} sliceColor={seriesColor}
                  coverRadius={0.85} coverFill={color_pallete.lightWhite}
        />
        <View style={{ position: 'absolute', alignItems: 'center' }}>
          <Text style={{ fontSize: font_sizes.headers }}>{`${totalHours} : ${totalMinutes}`}</Text>
          <Text style={{ fontSize: font_sizes.footers }}>hours : minutes</Text>
        </View>
      </View>
      <View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginVertical: '5%' }}>
          {composers.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', margin: '5%',}}>
              <Text style={{ fontSize: font_sizes.sections }}>{item.composer}</Text>
              <View style={{ width: 20, height: 20, backgroundColor: seriesColor[index], margin: 5 }} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export default MusicDistribution;
