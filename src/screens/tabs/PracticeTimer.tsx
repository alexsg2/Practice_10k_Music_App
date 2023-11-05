import React, { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PracticeTimer: React.FC = () => {
  const [timerOn, setTimerOn] = useState(false);
  const [time, setTime] = useState(0);
  const [timerVisible, setTimerVisible] = useState(true);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const colors = ['#5982C2', '#7BC3E9'];


  // This is the amount of time spent on the practice this should go to fire base.
  const [stoppedTime, setStoppedTime] = useState<number | null>(null); 


  let interval: NodeJS.Timeout | null = null;

  //This is the list of peices that should be gather from firebase
  const pieces = [
    {
      songtitle: 'Sonata in a minor',
      artisttitle: 'Bach',
      notes: 'Here is the things I have written it will be long and say a lot of things so I can check if this works'
    },
    {
      songtitle: 'Example Song Title',
      artisttitle: 'Example Artist',
      notes: 'Example Notes'
    },
    {
      songtitle: 'Example 2 Song Title',
      artisttitle: 'Example Artist',
      notes: 'Example Notes'
    },
    {
      songtitle: 'Example 3 Song Title',
      artisttitle: 'Example Artist',
      notes: 'Example Notes'
    },
    // Add more pieces as needed
  ];

  const [currentPieceIndex, setCurrentPieceIndex] = useState(0);

  const currentPiece = pieces[currentPieceIndex];

  useEffect(() => {
    if (timerOn) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000); // Increment time every 1 second (1000ms)
    } else {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timerOn]);

  const handleTimerControl = () => {
    setTimerOn(prevState => !prevState);
  };

  const stopTimer = () => {
    if (timerOn) {
      setTimerOn(false);
    }
    const stoppedMinutes = Math.floor(time / 60);
    setStoppedTime(stoppedMinutes);
  };

  const toggleTimerVisibility = () => {
    setTimerVisible(!timerVisible);
  };

  const handleNextPiece = () => {
    const nextIndex = (currentPieceIndex + 1) % pieces.length;

    if (nextIndex === 0) {
      stopTimer();
    } else {
      const nextColorIndex = (currentColorIndex + 1) % colors.length;
      setCurrentPieceIndex(nextIndex);
      setCurrentColorIndex(nextColorIndex);
    }
  };

  const currentColor = colors[currentColorIndex];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF1F7', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View style={{ marginRight: 20 }}>
          <Text style={{ fontSize: 8 }}>Now Playing:</Text>
          <Text style={{ fontSize: 12 }}>{currentPiece.artisttitle} - {currentPiece.songtitle}</Text>
        </View>
        {/* Timer visibility logic */}
        {timerVisible && (
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 20 }}>
              {Math.floor(time / 3600).toString().padStart(2, '0')}:
              {Math.floor((time % 3600) / 60).toString().padStart(2, '0')}:
              {(time % 60).toString().padStart(2, '0')}
            </Text>
          </View>
        )}
        {/* Toggle timer visibility button */}
        <TouchableOpacity onPress={toggleTimerVisibility}>
          <Text style={{ fontSize: 12, marginLeft: 7 }}>
            {timerVisible ? ' Hide\nTimer' : 'Show\nTimer'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Display stopped time temporarily */}
      {/* USE THIS WHEN WE WANT TO SEND INFORMATION AFTER END OF SCESSION ALONG WITH UPDATING PRACTICE SCHEDULE */}
      {stoppedTime !== null && (
        <Text style={{ fontSize: 18, color: 'red' }}>
          Timer Stopped: {stoppedTime} minutes
        </Text>
      )}

      {/* UI for the current piece */}
      <View
        style={{
          backgroundColor: currentColor,
          width: '95%',
          height: '65%',
          borderRadius: 10,
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 32, margin: 40 }}>{currentPiece.songtitle}</Text>
        <Text style={{ fontSize: 28, marginBottom: 10 }}>Artist:</Text>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>{currentPiece.artisttitle}</Text>
        <Text style={{ fontSize: 28, marginBottom: 10 }}>Notes:</Text>
        <Text style={{
          fontSize: 20,
          width: '85%',
          textAlign: 'center',
        }}>{currentPiece.notes}</Text>
      </View>

      {/* Timer control button */}
      <TouchableOpacity
        onPress={handleTimerControl}
        style={{
          width: '95%',
          padding: '5%',
          marginVertical: '3%',
          borderRadius: 10,
          alignSelf: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#7BC3E9',
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          {timerOn ? 'Pause Timer  ' : 'Start Timer  '}
        </Text>
        <Ionicons name={timerOn ? 'pause' : 'play'} size={25} color="black" />
      </TouchableOpacity>

      {/* Buttons for stop timer and next piece */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={stopTimer}
          style={{
            width: '45%',
            padding: '5%',
            borderRadius: 10,
            alignSelf: 'center',
            alignItems: 'center',
            marginRight: 5,
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#7BC3E9',
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Stop Session  </Text>
          <Ionicons name="square" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNextPiece}
          style={{
            width: '45%',
            padding: '5%',
            borderRadius: 10,
            alignSelf: 'center',
            alignItems: 'center',
            marginLeft: 5,
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#7BC3E9',
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Next Piece  </Text>
          <Ionicons name="arrow-redo" size={25} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PracticeTimer;
