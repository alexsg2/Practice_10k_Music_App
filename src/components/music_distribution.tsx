import React from 'react';
import PieChart from 'react-native-pie-chart';
import { View, Text, StyleSheet } from 'react-native';


interface MusicDistributionProps {
  date: string;
  hours_amount: string;
  minutes_amount: string;
  composers: { composer: string, hour: number }[];
}


const MusicDistribution: React.FC<MusicDistributionProps> = ({ date, hours_amount, minutes_amount, composers }) =>
{
  const composersArray = composers.map(item => item.hour);
  
  const colorOptions = ['#3E98FF', '#FCC235', '#B42A43', '#079D94', '#222425'];
  const seriesColor = composers.map((_, index) => { return index < colorOptions.length ? colorOptions[index] : 'black'; });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: '7%' }}>{date}</Text>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View>
          <PieChart
            widthAndHeight={200}
            series={composersArray}
            sliceColor={seriesColor}
            coverRadius={0.85}
            coverFill={'#ECF1F7'}
          />
        </View>
        <View style={{ position: 'absolute', alignItems: 'center' }}>
          <Text style={{ fontSize: 28 }}>{`${hours_amount} : ${minutes_amount}`}</Text>
          <Text style={{ fontSize: 10 }}>hours : minutes</Text>
        </View>
      </View>
      <View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginVertical: '5%' }}>
          {composers.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', margin: '5%',}}>
              <Text style={{ fontSize: 20 }}>{item.composer}</Text>
              <View style={{ width: 20, height: 20, backgroundColor: seriesColor[index], margin: 5 }} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export default MusicDistribution;
