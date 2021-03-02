import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

// react nav imports
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SignOutButton } from './src/components/sign-out';

// custom screens
import { Landing } from './src/screens/Landing';
import { SelectJobScreen } from './src/screens/SelectJobScreen';
import JobScreen from './src/screens/JobScreen';
import AddBoxScreen from './src/screens/AddBoxScreen';

// Amplify Imports
import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config)

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Landing'>
        <Stack.Screen name='Landing' component={Landing}/>
        <Stack.Screen
          name='Select Job' 
          component={SelectJobScreen} 
          options={({navigation, route}) => ({
            gestureEnabled: false, 
            headerLeft: null, 
            headerRight: () => <SignOutButton navigation={navigation} />
          })}
        />
        <Stack.Screen name='Job Screen' component={JobScreen} />
        <Stack.Screen name='Add a Box' component={AddBoxScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
