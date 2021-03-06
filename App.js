import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import firebase from './src/services/firebaseConnection';
import Routes from './src/routes'

import AuthProvider from './src/contexts/auth';

export default function AppFinancas() {
 return (
   <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor='#121212' barStyle='light-content' />
        <Routes />
      </AuthProvider>
   </NavigationContainer>
  );
}