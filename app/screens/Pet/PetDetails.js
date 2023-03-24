/**
 * @description This is a functional component named "PetDetails". It receives props such as `route` and `navigation` from its parent component. 
 * This component renders the details of a pet, including an image, some text information, and an "OutlinedButton" component. 
 * It also fetches the details of a selected pet from a database and loads it into state. If the data is not available, it renders a fallback view with a loading message.
 *
 * @param {object} route - Contains the parameters passed to this component, which includes the `placeId`.
 * @param {object} navigation - Allows the component to navigate to other screens in the app.
 *
 * @returns If `fetchedPlace` is not yet available, it returns a fallback view with a loading message. Otherwise, it returns the details of the selected pet. 
 */

import { useEffect, useState } from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';

import OutlinedButton from '../../components/UI/OutlinedButton';
import { Colors } from '../../constants/colors';
import { fetchPlaceDetails } from '../../util/database';

function PetDetails({ route, navigation }) {
  const [fetchedPlace, setFetchedPlace] = useState();

  function showOnMapHandler() {
    navigation.navigate('Map', {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng,
    });
  }

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlaceData() {
      const pet = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(pet);
      navigation.setOptions({
        title: pet.title,
      });
    }

    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading pet data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PetDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
