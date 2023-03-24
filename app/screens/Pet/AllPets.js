import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import PetsList from '../../components/Pets/PetsList';
import { fetchPlaces } from '../../util/database';

function AllPets({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const pets = await fetchPlaces();
      setLoadedPlaces(pets);
    }

    if (isFocused) {
      loadPlaces();
      // setLoadedPlaces((curPlaces) => [...curPlaces, route.params.pet]);
    }
  }, [isFocused]);

  return <PetsList pets={loadedPlaces} />;
}

export default AllPets;
