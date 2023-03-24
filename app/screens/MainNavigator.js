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
    <Stack.Navigator>

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


    </Stack.Navigator>
  );
}
