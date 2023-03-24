import PetForm from '../../components/Pets/PetForm';
import { insertPlace } from '../../util/database';

function AddPet({ navigation }) {
  async function createPlaceHandler(pet) {
    await insertPlace(pet);
    navigation.navigate('AllPets');
  }

  return <PetForm onCreatePlace={createPlaceHandler} />;
}

export default AddPet;
