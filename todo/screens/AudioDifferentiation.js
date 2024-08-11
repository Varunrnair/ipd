// AudioDifferentiation.js
import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import FFT from 'fft.js';

const AudioDifferentiation = () => {
  const [sound, setSound] = useState();
  const [prevFrequencies, setPrevFrequencies] = useState([]);
  const [comparisonResult, setComparisonResult] = useState('');

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = async (uri, isFirstAudio) => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    setSound(sound);
    await sound.playAsync();
    const frequencies = await analyzeFrequencies(sound);
    if (isFirstAudio) {
      setPrevFrequencies(frequencies);
    } else {
      compareFrequencies(prevFrequencies, frequencies);
    }
  };

  const analyzeFrequencies = async (sound) => {
    const status = await sound.getStatusAsync();
    if (status.isLoaded) {
      const fft = new FFT(1024);
      const audioBuffer = new Float32Array(1024);
      fft.forward(audioBuffer);
      return fft.spectrum;
    }
    return [];
  };

  const compareFrequencies = (prevFreq, currFreq) => {
    const prevAvg = prevFreq.reduce((a, b) => a + b, 0) / prevFreq.length;
    const currAvg = currFreq.reduce((a, b) => a + b, 0) / currFreq.length;
    if (currAvg > prevAvg) {
      setComparisonResult('Higher');
    } else if (currAvg < prevAvg) {
      setComparisonResult('Lower');
    } else {
      setComparisonResult('Same');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Play Audio 1" onPress={() => playSound('audio1_uri_here', true)} />
      <Button title="Play Audio 2" onPress={() => playSound('audio2_uri_here', false)} />
      <Text style={styles.result}>Comparison Result: {comparisonResult}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AudioDifferentiation;
