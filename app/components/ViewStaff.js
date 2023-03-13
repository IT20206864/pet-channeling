import React, { useEffect, useState } from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Alert,
  LogBox,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {
  collection,
  doc,
  onSnapshot,
  QuerySnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import db from '../config';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
export default function ViewStaff({ navigation }) {
  const [staff, setstaff] = useState([]);

  useEffect(() => {
    const colRef = collection(db, 'staff');
    onSnapshot(colRef, (QuerySnapshot) => {
      const staff = [];
      QuerySnapshot.forEach((doc) => {
        //console.log(doc.id)
        const { fullname, email, stafftype, contactNo } = doc.data();
        const staffId = doc.id;
        staff.push({
          staffId,
          fullname,
          email,
          stafftype,
          contactNo,
        });
      });
      setstaff(staff);
      //console.log(users)
    });
  }, []);

  const showConfirmDialog = (data) => {
    console.log(data);
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to Delete this Staff Member? This action cannot be undone!',
      [
        {
          text: 'Yes',
          onPress: () => {
            DeleteUser(data);
          },
        },
        {
          text: 'No',
        },
      ]
    );
  };

  async function DeleteUser(data) {
    const ref = doc(db, 'staff', data);
    await deleteDoc(ref)
      .then(() => {
        alert('Staff Member Deleted Successfully!');
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {staff.map((data) => {
        return (
          <View key={data._id}>
            <View style={styles.todoContainer}>
              <View style={styles.todoDetails}>
                <Text key={data._id} style={styles.todoTitle}>
                  {data.fullname}
                </Text>
                <Text key={data._id} style={styles.subTitle}>
                  {'Title :' + data.stafftype}
                </Text>
                <Text key={data._id} style={styles.subTitle}>
                  {data.email}
                </Text>
                <Text key={data._id} style={styles.subTitle}>
                  {data.contactNo}
                </Text>
              </View>
              <View style={styles.iconsContainer}>
                <Pressable onPress={() => navigation.navigate('EditStaff', { data })}>
                  <View style={styles.iconContainer}>
                    <Entypo name="edit" size={24} color="black" />
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    showConfirmDialog(data.staffId);
                  }}
                >
                  <View style={styles.iconContainer}>
                    <AntDesign name="delete" size={24} color="red" />
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: '2%',
    paddingBottom: 20,
    paddingTop: 10,
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#CDF0EA',
    paddingVertical: 10,
    paddingHorizontal: '3%',
    borderRadius: 10,
    marginBottom: 10,
  },
  todoDetails: {
    flex: 1,
    paddingRight: '3%',
    borderWidth: 0,
  },
  todoTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  subTitle: {
    marginTop: '1%',
    opacity: 0.6,
    fontSize: 15,
  },
  iconsContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',

    marginHorizontal: '2%',
  },
  iconContainer: {
    padding: '3%',
    marginHorizontal: '1%',
  },
});
