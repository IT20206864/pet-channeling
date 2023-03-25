/**
 * Component for creating a new pet form with title, image, and location
 * @param {Function} onCreatePlace - function to create a new pet
 */

import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Image } from 'react-native';

import { Colors } from '../../constants/colors';
import { Pet } from '../../models/pet';
import Button from '../UI/Button';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';

function PetForm({ onCreatePlace }) {

  // State variables for the entered title, selected image, and picked location
  const [enteredTitle, setEnteredTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  /**
   * Handler function to update the entered title state
   * @param {String} enteredText - the entered text for the title
   */
  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  /**
   * Handler function to update the selected image state
   * @param {String} imageUri - the URI of the selected image
   */
  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  /**
   * Handler function to update the picked location state
   * @param {Object} location - the picked location object with latitude and longitude properties
   */
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  /**
   * Handler function to create a new pet with the entered title, selected image, and picked location
   */
  function savePlaceHandler() {
    const placeData = new Pet(enteredTitle, selectedImage, pickedLocation);
    onCreatePlace(placeData);
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.form}>
        <Text style={styles.logoText}>Add New Pet</Text>
        <Text style={styles.heading2}>In the screen you would be able to add your pets</Text>
        <Image
          resizeMode="contain"
          source={require('../../assets/pet5.png')}
          style={styles.logo}
        />
        <View>
          <Text style={styles.label}>Pet Name</Text>
          <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle} />
        </View>
        <View style={{ paddingTop: 10 }}>
          <ImagePicker onTakeImage={takeImageHandler} />
        </View>
        <View style={{ paddingTop: 10 }}>
          <LocationPicker onPickLocation={pickLocationHandler} />
        </View>
        <View style={{ paddingTop: 10, marginBottom: 90 }}>
          <Button onPress={savePlaceHandler}>Add Pet</Button>
        </View>
      </ScrollView >
    </View>
  );
}

export default PetForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  container: {
    paddingTop: 10,
    flex: 1,
    flexDirection: 'column',
  },
  logo: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'regular',
    marginBottom: 4,
    color: '#000000',
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
  text: {
    color: '#ffffff'
  },
  uploadBtn: {
    height: 20,
    width: '35%',
    backgroundColor: Colors.primary800,
    marginVertical: 20,
    justifyContent: "center",
    paddingLeft: 20,
    borderRadius: 5,
  },
  dropDown: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  dropDownContainer: {
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#000',
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  dropDownSelected: {
    color: '#2AB9FE',
  },
  dropDownLabel: {
    color: '#4A4A4A',
    fontSize: 18,
  },
  dropDownPlaceholder: {
    color: '#2AB9FE',
    fontSize: 18,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  heading2: {
    fontSize: 15,
    color: '#000000',
    paddingBottom: 40
  },
});
