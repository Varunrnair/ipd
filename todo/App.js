import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import ToDoScreen from './screens/ToDoScreen';
import AudioSequenceGameScreen from './screens/AudioSequenceGameScreen';
import AudioDifferentiation from './screens/AudioDifferentiation';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="ToDo" component={ToDoScreen} />
          <Stack.Screen name="AudioSequenceGame" component={AudioSequenceGameScreen} />
          <Stack.Screen name="AudioDifferentiation" component={AudioDifferentiation} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
