import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { LogBox, Text, View } from 'react-native';

// import 'intl-pluralrules';
// import { I18nextProvider } from 'react-i18next';
// import i18n from '../i18n'; // 确保你有 i18n.js 文件

const Stack = createNativeStackNavigator();


LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function AppNavigation() {
  return (
    // <I18nextProvider i18n={i18n}>
      <NavigationContainer >
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    // </I18nextProvider>
  )
  
}