import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';

interface PopupMessageProps {
  message: string;
  duration: number;
  onAnimationEnd: () => void;
}

const PopupMessage: React.FC<PopupMessageProps> = ({ message, duration, onAnimationEnd }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 100,
      duration: duration,
      useNativeDriver: false,
    }).start(onAnimationEnd);
  }, [slideAnim, duration, onAnimationEnd]);

  return (
    <View style={styles.popupContainer}>
      <Text style={styles.popupText}>{message}</Text>
      <Animated.View style={[styles.slider, { width: slideAnim.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%']
        }) }]} />

    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#000',
    padding: 10,
    alignItems: 'center',
  },
  popupText: {
    color: '#fff',
  },
  slider: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: '#f00',
  },
});

export default PopupMessage;
