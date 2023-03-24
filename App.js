import { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';

import AllPets from './app/screens/AllPets';
import AddPet from './app/screens/AddPet';
import IconButton from './app/components/UI/IconButton';
import { Colors } from './app/constants/colors';
import Map from './app/screens/Map';
import { init } from './app/util/database';
import PetDetails from './app/screens/PetDetails';
import Home from './app/screens/Home';
import MainNavigator from './app/screens/MainNavigator';
import { ToastProvider } from 'react-native-toast-notifications'

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }
  return (
    <ToastProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </ToastProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});




