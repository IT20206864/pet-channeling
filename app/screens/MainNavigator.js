import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Reviews from './Reviews/Reviews';
import WriteReview from './Reviews/WriteReview';
import EditReview from './Reviews/EditReview';
import Home from './Home';
import ChannelDoc from './Channeling/ChannelDoc';
import AddStaff from './Staff/AddStaff';
import ViewStaff from './Staff/ViewStaff';
import EditStaff from './Staff/EditStaff';
import StaffManagement from './Staff/StaffManagement';
import ViewChannelings from './Channeling/ViewChannelings';
import EditChanneling from './Channeling/EditChanneling';
import Success from '../components/Success';

import AllPets from './Pet/AllPets';
import AddPet from './Pet/AddPet';
import PetDetails from './Pet/PetDetails';
import IconButton from '../components/UI/IconButton';
import Map from './Pet/Map';
import AddBid from './Pet/AddBid';
import ViewBid from './Pet/ViewBid';
import EditBid from './Pet/EditBid';
import Bid from './Pet/Bid';

export default function MainNavigator() {
  const Stack = createNativeStackNavigator();
  const headerOptions = {
    headerStyle: {
      backgroundColor: '#053f5c',
    },
    headerTintColor: '#29b6f6',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#053f5c' },
        headerTintColor: '#ffffff',
      }}>

      <Stack.Screen name="Home" component={Home} options={headerOptions} />
      <Stack.Screen name="AddStaff" component={AddStaff} options={headerOptions} />
      <Stack.Screen name="ViewStaff" component={ViewStaff} options={headerOptions} />
      <Stack.Screen name="EditStaff" component={EditStaff} options={headerOptions} />
      <Stack.Screen name="StaffManagement" component={StaffManagement} options={headerOptions} />
      <Stack.Screen name="Reviews" component={Reviews} options={headerOptions} />
      <Stack.Screen name="Write Review" component={WriteReview} options={headerOptions} />
      <Stack.Screen name="Edit Review" component={EditReview} options={headerOptions} />
      <Stack.Screen name="Channel Doctor" component={ChannelDoc} options={headerOptions} />
      <Stack.Screen name="View Channelings" component={ViewChannelings} options={headerOptions} />
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
      <Stack.Screen name="AddBid" component={AddBid} options={headerOptions} />
      <Stack.Screen name="ViewBid" component={ViewBid} options={headerOptions} />
      <Stack.Screen name="EditBid" component={EditBid} options={headerOptions} />
      <Stack.Screen name="Bid" component={Bid} options={headerOptions} />
      <Stack.Screen name="Update Channeling" component={EditChanneling} options={headerOptions} />
      <Stack.Screen name="Success Screen" component={Success} options={headerOptions} />
    </Stack.Navigator>
  );
}
