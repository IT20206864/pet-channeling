import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddStaff from '../components/AddStaff';
import EditStaff from '../components/EditStaff';
import StaffManagement from '../components/StaffManagement';
import ViewStaff from '../components/ViewStaff';
import Reviews from './Reviews/Reviews';
import WriteReview from './Reviews/WriteReview';
import EditReview from './Reviews/EditReview';
import Home from './Home';
import ChannelDoc from './Channeling/ChannelDoc';

export default function MainNavigator() {
  const Stack = createNativeStackNavigator();
  const headerOptions = {
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTintColor: '#000',
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
    </Stack.Navigator>
  );
}
