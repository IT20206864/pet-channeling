/**
* A screen component that allows a user to edit a bid record
* @param {Object} route - The route object containing data about the screen's route
* @param {Object} navigation - The navigation object containing methods for navigating between screens
*/

import React, { useState } from 'react';
import { db } from '../../config';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Image
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { updateDoc, doc } from 'firebase/firestore';

const EditBid = ({ route, navigation }) => {
  const [fullname, setfullname] = useState(route.params.data.fullname);
  const [email, setemail] = useState(route.params.data.email);
  const [contactNo, setcontactNo] = useState(route.params.data.contactNo);
  const [categoryOpen, setcategoryOpen] = useState(false);
  const [selectedCategory, setselectedCategory] = useState(route.params.data.stafftype);
  const [theme, setTheme] = useState('light');
  const [categories, setcategories] = useState([
    { label: 'Dog', value: 'Dog' },
    { label: 'Hippopotamus', value: 'Hippopotamus' },
    { label: 'Cat', value: 'Cat' },
    { label: 'Bird', value: 'Bird' },
    { label: 'Snake', value: 'Snake' },
    { label: 'Monkey', value: 'Monkey' },
    { label: 'Fish', value: 'Fish' },
  ]);

  const styles = getStyles(theme);

  const showConfirmDialog = () => {
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to Update this Staff Member? This action cannot be undone!',
      [
        {
          text: 'Yes',
          onPress: () => {
            updateStaff();
          },
        },
        {
          text: 'No',
        },
      ]
    );
  };

  //show toast message
  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  async function updateStaff() {
    const ref = doc(db, 'bid', route.params.data.staffId);
    await updateDoc(ref, {
      fullname: fullname,
      email: email,
      stafftype: selectedCategory,
      contactNo: contactNo,
    })
      .then(async () => {
        showToast('Bid Record Updated Successfully!');
        navigation.navigate('ViewBid');
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.logoText}>Edit Bid Record</Text>
          <Text style={styles.heading2}>In the screen you would be able to modify your placed bids</Text>
          <Image
            resizeMode="contain"
            source={require('../../assets/pet3.png')}
            style={styles.logo}
          />
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Full Name"
            placeholderTextColor="#b5b5ba"
            onChangeText={setfullname}
            value={fullname}
          ></TextInput>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Email"
            placeholderTextColor="#b5b5ba"
            onChangeText={setemail}
            value={email}
          ></TextInput>
          <View style={{ zIndex: 1000 }}>
            <Text style={styles.label}>Select Pet type</Text>
            <DropDownPicker
              placeholder="Select Pet type"
              open={categoryOpen}
              value={selectedCategory}
              items={categories}
              setOpen={setcategoryOpen}
              setValue={setselectedCategory}
              setItems={setcategories}
              listMode="SCROLLVIEW"
              dropDownContainerStyle={styles.dropDownContainer}
              style={styles.dropDown}
              selectedItemLabelStyle={styles.dropDownSelected}
              labelStyle={styles.dropDownLabel}
              listItemLabelStyle={styles.dropDownLabel}
              placeholderStyle={styles.dropDownPlaceholder}
            />

            <Text style={styles.label}>Contact Number</Text>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Phone Number"
            placeholderTextColor="#b5b5ba"
            value={contactNo}
            onChangeText={setcontactNo}
            keyboardType="numeric"
            minLength={10}
          ></TextInput>

          <TouchableOpacity
            onPress={() => showConfirmDialog()}
            activeOpacity={0.7}
            style={{
              height: 55,
              width: '100%',
              backgroundColor: '#f7ad19',
              marginVertical: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 18 }}>Update Bid Record</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};
const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      paddingTop: 20,
      flex: 1,
      flexDirection: 'column',
    },
    header: {
      paddingBottom: 10,
      fontSize: 25,
      fontWeight: 'bold',
    },
    textInput: {
      padding: 10,
      height: 40,
      width: '100%',
      fontSize: 18,
      marginBottom: 10,
      color: '#4A4A4A',
      backgroundColor: '#E5E4E2',
    },
    label: {
      marginVertical: 5,
      fontSize: 18,
      paddingBottom: 5,
    },
    scrollContainer: {
      padding: 10,
      alignContent: 'center',
    },
    dropDown: {
      backgroundColor: '#E5E4E2',
      height: 40,
      width: '100%',
      padding: 10,
      borderRadius: 5,
      fontSize: 18,
      marginBottom: 10,
      borderWidth: 0,
      color: '#4A4A4A',

      alignSelf: 'center',
      marginVertical: 0,
    },
    dropDownContainer: {
      borderWidth: 0,
      elevation: 1,
      shadowColor: '#000',
      alignSelf: 'center',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    dropDownSelected: {
      color: '#2AB9FE',
    },
    dropDownLabel: {
      color: '#4A4A4A',
      fontSize: 18,
    },
    dropDownPlaceholder: {
      color: '#b5b5ba',
      fontSize: 18,
    },
    logoText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000000',
    },
    heading2: {
      fontSize: 15,
      color: '#000000',
      paddingBottom: 40
    },
  });

export default EditBid
