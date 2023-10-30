import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { DesignLibrary } from '../assets/DesignLibrary';

type Song = {
  artist: string;
  duration: number;
};

interface MusicDistributionProps {
  date?: string;
  hours_amount?: string;
  minutes_amount?: string;
  songs: Song[]; // Use the defined Song type
}

function MusicDistribution({ date = "", hours_amount = "0", minutes_amount = "0", songs }: MusicDistributionProps) {
  const topArtists = songs.slice(0, 4); // Get the top 3 artists
  const otherArtists = songs.slice(4); // Get the rest of the artists

  const topDurations = topArtists.map(song => song.duration);
  const totalTopDurations = topDurations.reduce((acc, duration) => acc + duration, 0);

  const otherDurations = otherArtists.map(song => song.duration);
  const totalOtherDurations = otherDurations.reduce((acc, duration) => acc + duration, 0);

  const series = [topDurations[0], topDurations[1], topDurations[2], topDurations[3], totalOtherDurations]; // Series for Pie Chart
  const sliceColor = ['#3E98FF', '#FCC235', '#B42A43', '#079D94', '#222425']; // Colors for Pie Chart

  // Calculate hours and minutes (replace with your logic)
  const hours = hours_amount;
  const minutes = minutes_amount;

  const artistColors = ['#3E98FF', '#FCC235', '#B42A43', '#079D94']; // Colors for top 3 artists

  return (
    <View style={styles.text_container}>
      <Text style={{ marginBottom: 35, marginLeft: 20, fontSize: 30 }}>{date}</Text>
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
      <View style={styles.flexContainer}>
        <View style={styles.artistRow}>
          {topArtists.map((song, index) => (
            <View key={index} style={styles.artistEntry}>
              <Text style={{ fontSize: 20 }}>{song.artist}</Text>
              <View style={{ width: 20, height: 20, backgroundColor: artistColors[index], margin: 5 }} />
            </View>
          ))}
          {otherArtists.length > 0 && (
            <View style={styles.artistRow}>
              <View style={styles.artistEntry}>
                <Text style={{ fontSize: 20 }}>Other</Text>
                <View style={{ width: 20, height: 20, backgroundColor: '#222425', margin: 5 }} />
              </View>
            </View>
          )}
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
  flexContainer: {
    padding: 30,
  },
  artistRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  artistEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
});

export default MusicDistribution;
