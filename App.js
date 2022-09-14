import * as React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

import Ionicons from '@expo/vector-icons/Ionicons';

import { STstoreProvider } from './lib/Store';

import HomeScreen from './pages/Home';
import SettingsScreen from './pages/Settings';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <STstoreProvider>
      <NavigationContainer>
        <NativeBaseProvider>
          <Tab.Navigator initialRouteName='Home'>
            <Tab.Screen name='Home' component={HomeScreen} options={options} />
            <Tab.Screen
              name='Settings'
              component={SettingsScreen}
              options={options}
            />
          </Tab.Navigator>
          <StatusBar style='dark' />
        </NativeBaseProvider>
      </NavigationContainer>
    </STstoreProvider>
  );
}

const options = {
  tabBarIcon: () => (
    <Ionicons name='ios-information-circle' size={32} color='green' />
  ),
};
