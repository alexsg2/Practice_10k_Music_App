import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { CircularProgress } from 'react-native-circular-progress';


import { DesignLibrary } from '../../assets/DesignLibrary';

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
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={{ fontSize: 24 }}>{title}</Text>
        <Text style={{ marginBottom: 15, fontSize: 10 }}>Remaining = Goal - Hours</Text>
        <View style={styles.progressContainer}>
          <CircularProgress
            size={100}
            width={10}
            fill={100 - (hoursRemaining / goal) * 100}
            tintColor="#7BC3E9"
            backgroundColor="#3D5AA5"
            rotation={0}
          >
            {() => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>{`${hoursRemaining}`}</Text>
                <Text style={{ fontSize: 10 }}>Remaining</Text>
              </View>
            )}
          </CircularProgress>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.iconTextContainer}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="font-awesome-flag" size={24} color="#E74E4E" />
          </View>
          <View style={styles.textContainer}>
            <Text style={{ fontSize: 16, fontWeight: '300' }}>Goal</Text>
            <Text style={{ marginBottom: 20, fontSize: 16, fontWeight: '600' }}>{goal_amount} hours</Text>
          </View>
        </View>
        <View style={styles.iconTextContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="queue-music" size={24} color="#7F079D" />
          </View>
          <View style={styles.textContainer}>
            <Text style={{ fontSize: 16, fontWeight: '300' }}>Pieces</Text>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>{pieces_done}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create(
{
  container: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#ECF1F7',
    flexDirection: 'row',
    borderWidth: 2, // Add a black border
    borderColor: DesignLibrary.color_pallete.black["default"], // Set the border color to black
  },
  leftContainer: {
    flex: 3.5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    width: 100, // Set your desired size for the progress bar
    height: 100,
  },
  rightContainer: {
    flex: 2.5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTextContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    marginRight: 15, // Adjust the spacing between icon and text
  },
  textContainer: {
    flex: 1, // Allow text to expand to fill available space
  },
});

export default ProgressTracker;
