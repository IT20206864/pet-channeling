/**
 * Represents a component for displaying a pet item in a list.
 * @param {Object} pet - An object representing the pet item to be displayed.
 * @param {Function} onSelect - A function to be executed when the pet item is selected.
*/

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';


/**
 * A callback function to be executed when the pet item is selected.
 * @param {string} petId - The ID of the selected pet item.
*/
function PetItem({ pet, onSelect }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect.bind(this, pet.id)}
    >
      <Image style={styles.image} source={{ uri: pet.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{pet.title}</Text>
        <Text style={styles.phone}>{pet.phone}</Text>
        <Text style={styles.email}>{pet.email}</Text>
        <Text style={styles.address}>{pet.address}</Text>
      </View>
    </Pressable>
  );
}

export default PetItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: '#053f5c',
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 14,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ffffff',
  },
  address: {
    fontSize: 12,
    color: '#ffffff',
  },
});
