import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LectureScreen from '../screens/LectureScreen';
import StudentScreen from '../screens/StudentScreen';
import CreateClassScreen from '../screens/CreateClassScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Lecture' component={LectureScreen} />
      <Stack.Screen name='Student' component={StudentScreen} />
      <Stack.Screen name='Create Class' component={CreateClassScreen} />
    </Stack.Navigator>
  );
}