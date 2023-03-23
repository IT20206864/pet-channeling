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
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPets"
            component={AllPets}
            options={({ navigation }) => ({
              title: 'Your Favorite Pets',
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate('AddPet')}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPet"
            component={AddPet}
            options={{
              title: 'Add a new Pet',
            }}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen
            name="PetDetails"
            component={PetDetails}
            options={{
              title: 'Loading Pet...',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
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
