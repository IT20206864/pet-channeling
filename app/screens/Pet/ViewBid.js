/**
 * This is a react native component for viewing and deleting bid records. It fetches bid records from a 
 * Firebase Firestore collection and displays them in a ScrollView. It also provides a confirmation dialog box to delete a bid record.
 * 
 * @param {object} navigation - A navigation object used to navigate between screens.
 * 
 * Displays a confirmation dialog box to confirm deletion of a bid record.
 * @param {object} data - The bid record to be deleted.
*/

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, doc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from '../../config';


export default function ViewBid({ navigation }) {

  const [staff, setstaff] = useState([]);

  useEffect(() => {
    const colRef = collection(db, 'bid');
    onSnapshot(colRef, (QuerySnapshot) => {

      const staff = [];
      QuerySnapshot.forEach((doc) => {
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
    });
  }, []);

  const showConfirmDialog = (data) => {
    console.log(data);
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to Delete this Bid Record? This action cannot be undone!',
      [
        {
          text: 'Yes',
          onPress: () => {
            DeleteStaff(data);
          },
        },
        {
          text: 'No',
        },
      ]
    );
  };

  async function DeleteStaff(data) {
    const ref = doc(db, 'bid', data);
    await deleteDoc(ref)
      .then(() => {
        alert('Bid Record Deleted Successfully!');
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logoText}>Welocme to Pet Biddings</Text>
      <Text style={styles.heading2}>In the screen you would be able to create, update and read your placed bids</Text>
      <Image
        resizeMode="contain"
        source={require('../../assets/pet2.png')}
        style={styles.logo}
      />
      {staff.map((data) => {
        return (
          <View key={data._id}>
            <View style={styles.todoContainer}>
              <View style={styles.todoDetails}>
                <Text key={data._id} style={styles.todoTitle}>
                  {data.fullname}
                </Text>
                <Text key={data._id} style={styles.todoSubTitle}>
                  {'Title : ' + data.stafftype}
                </Text>
                <Text key={data._id} style={styles.subTitle}>
                  {'Email : ' + data.email}
                </Text>
                <Text key={data._id} style={styles.subTitle}>
                  {'Contact : ' + data.contactNo}
                </Text>
              </View>
              <View style={styles.iconsContainer}>
                <View style={styles.updateBtn}>
                  <Pressable onPress={() => navigation.navigate('EditBid', { data })}>
                    <View style={styles.iconContainer}>
                      <Ionicons name="create" size={30} color="#000000" />
                    </View>
                  </Pressable>
                </View>
                <Pressable
                  onPress={() => {
                    showConfirmDialog(data.staffId);
                  }}
                >
                  <View style={styles.iconContainer}>
                    <Ionicons name="close-circle" size={30} color="#000000" />
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
    paddingTop: 30,
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#D3D3D3',
    paddingVertical: 10,
    paddingHorizontal: '3%',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 4, // for Android devices
    shadowColor: '#000', // for iOS devices
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingBottom: 20
  },
  todoDetails: {
    flex: 1,
    paddingRight: '5%',
    borderWidth: 0,
  },
  todoTitle: {
    fontWeight: 'bold',
    marginTop: '10%',
    fontSize: 18,
  },
  todoSubTitle: {
    fontWeight: 'regular',
    marginTop: '10%',
    marginLeft: '5%',
    marginBottom: '5%',
    fontSize: 15,
  },
  subTitle: {
    fontWeight: 'regular',
    marginTop: '5%',
    marginLeft: '5%',
    marginBottom: '5%',
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
  logoText: {
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  heading2: {
    fontSize: 15,
    color: '#000000',
    justifyContent: 'left',
    alignContent: 'left',
    textAlign: 'left',
    paddingBottom: 40
  },
});
