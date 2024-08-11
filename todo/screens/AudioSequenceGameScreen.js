import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Audio } from 'expo-av';

const images = [
  { id: 1, src: require('../assets/image1.png') },
  { id: 2, src: require('../assets/image2.png') },
  { id: 3, src: require('../assets/image3.png') },
];

const audioFiles = [
  { id: 1, file: require('../assets/audio1.mp3') },
  { id: 2, file: require('../assets/audio2.mp3') },
  { id: 3, file: require('../assets/audio3.mp3') },
];

const AudioSequenceGameScreen = () => {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    playSequence();
  }, []);

  const playSequence = async () => {
    setIsPlaying(true);
    const newSequence = audioFiles.map((file) => file.id);
    setSequence(newSequence);

    for (const id of newSequence) {
      const sound = new Audio.Sound();
      try {
        await sound.loadAsync(audioFiles.find((file) => file.id === id).file);
        await sound.playAsync();
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before playing next sound
        await sound.unloadAsync();
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    }

    setIsPlaying(false);
  };

  const handleImagePress = (id) => {
    if (isPlaying) return;

    setUserSequence([...userSequence, id]);

    if (sequence[userSequence.length] === id) {
      if (userSequence.length + 1 === sequence.length) {
        Alert.alert('Success', 'You have completed the sequence correctly!');
        setUserSequence([]);
        playSequence();
      }
    } else {
      Alert.alert('Failure', 'You clicked the wrong sequence. Try again!');
      setUserSequence([]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audio Sequence Game</Text>
      <View style={styles.imagesContainer}>
        {images.map((image) => (
          <TouchableOpacity key={image.id} onPress={() => handleImagePress(image.id)}>
            <Image source={image.src} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imagesContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
});

export default AudioSequenceGameScreen;
