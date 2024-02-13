import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { LogBox, Text, View } from 'react-native';

import 'intl-pluralrules';
// import { I18nextProvider } from 'react-i18next';
// import i18n from '../i18n'; // 确保你有 i18n.js 文件
// import { useTransition } from 'react-i18next' ;

const Stack = createNativeStackNavigator();

// const {t} = useTransition();

// import {en,zh} from './localizations';
// import { useState } from 'react';
// import * as Localization from 'expo-localization';



LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function AppNavigation() {
  return (

    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  )
  
}