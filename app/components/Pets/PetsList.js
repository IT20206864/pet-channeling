import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import PetItem from './PetItem';

function PetsList({ pets }) {
  const navigation = useNavigation();

  function selectPlaceHandler(id) {
    navigation.navigate('PetDetails', {
      placeId: id,
    });
  }

  if (!pets || pets.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No pets added yet - start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={pets}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PetItem pet={item} onSelect={selectPlaceHandler} />}
    />
  );
}

export default PetsList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: '#808080',
  },
});
