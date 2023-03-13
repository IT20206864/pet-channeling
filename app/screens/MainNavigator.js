import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddStaff from '../components/AddStaff';
import EditStaff from '../components/EditStaff';
import StaffManagement from '../components/StaffManagement';
import ViewStaff from '../components/ViewStaff';
import Home from './Home';

export default function MainNavigator() {
  const Stack = createNativeStackNavigator();
  const headerOptions = {
    headerStyle: {
      backgroundColor: '#0077C2',
    },
    headerTintColor: '#fff',
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
    </Stack.Navigator>
  );
}
