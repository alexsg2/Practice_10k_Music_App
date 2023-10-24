import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { DesignLibrary } from '../assets/DesignLibrary';

function MusicDistribution({ date = "", hours_amount = "0", minutes_amount = "0"}) {

  const series = [30, 20, 50]; // Replace with your data series
  const sliceColor = ['#F44336', '#2196F3', '#4CAF50']; // Replace with your desired colors

  // Calculate hours and minutes (replace with your logic)
  const hours = hours_amount;
  const minutes = minutes_amount;

  return (
    <View style={styles.text_container}>
      <Text style={{ marginBottom: 35, marginLeft: 20, fontSize: 30}}>{date}</Text>
      <View style={styles.container}>
        <View style={styles.chartContainer}>
          <PieChart
            widthAndHeight={200}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.85}
            coverFill={'#FFF'}
          />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{`${hours} : ${minutes}`}</Text>
          <Text style={styles.timeUnitText}>hours : minutes</Text>
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  text_container: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartContainer: {
    position: 'relative',
  },
  timeContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 28,
  },
  timeUnitText: {
    fontSize: 10,
  },
});

export default MusicDistribution;
