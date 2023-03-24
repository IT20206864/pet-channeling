/**
 * Add Bid Component
 * @description A component to add a new bid to the database.
 * @param {Object} navigation - The navigation object used for navigating between screens.
 * @returns A JSX element containing form fields for adding a new bid.
*/

import React, { useState } from 'react';
import { db } from '../../config';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Image
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { addDoc, collection } from 'firebase/firestore';

const AddBid = ({ navigation }) => {
  const [fullname, setfullname] = useState('');
  const [email, setemail] = useState('');
  const [contactNo, setcontactNo] = useState('');
  const [categoryOpen, setcategoryOpen] = useState(false);
  const [selectedCategory, setselectedCategory] = useState(null);
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

  //Add staff member
  async function saveStaff(async) {
    await addDoc(collection(db, 'bid'), {
      fullname: fullname,
      email: email,
      stafftype: selectedCategory,
      contactNo: contactNo,
    })
      .then(() => {
        console.log('a');
        setfullname('');
        setemail('');
        setcontactNo('');
        setselectedCategory(null);
        showToast('Bid Record Added Successfully!');
        navigation.navigate('ViewBid');
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  // Validation
  function AddBid() {
    if (fullname.length == 0 || email.length == 0 || contactNo.length == 0) {
      alert('The fields Name, Mail and Phone are required');
      return;
    }

    // Validate email format and extension
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || !email.endsWith('.com')) {
      alert('Please enter a valid email address with the ".com" and "@" extension');
      return;
    }

    // Validate contact number format
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(contactNo)) {
      alert('Please enter a valid 10-digit contact number');
      return;
    }

    console.log('Record Successfully added');
    saveStaff();
  }

  // Increasing user experience
  function clearStaff() {
    setfullname('');
    setemail('');
    setcontactNo('');
    setselectedCategory(null);
  }

  //show toast message
  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.logoText}>Add Bid Record</Text>
          <Text style={styles.heading2}>In the screen you would be able to create a new bids</Text>
          <Image
            resizeMode="contain"
            source={require('../../assets/pet4.png')}
            style={styles.logo}
          />
          <Text style={styles.label}>Enter your Full Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Full Name"
            placeholderTextColor="#b5b5ba"
            onChangeText={setfullname}
            value={fullname}
          ></TextInput>
          <Text style={styles.label}>Your Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Email"
            placeholderTextColor="#b5b5ba"
            onChangeText={setemail}
            value={email}
            keyboardType="email-address"
          ></TextInput>
          <View style={{ zIndex: 1000 }}>
            <Text style={styles.label}>Pet Type</Text>
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

            <Text style={styles.label}>Contact No</Text>
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
            onPress={() => AddBid()}
            activeOpacity={0.7}
            style={{
              height: 45,
              width: '100%',
              backgroundColor: '#f7ad19',
              marginVertical: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 18 }}>Save Bid Record</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => clearStaff()}
            activeOpacity={0.7}
            style={{
              height: 45,
              width: '100%',
              backgroundColor: '#053f5c',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 18 }}>Clear Feilds</Text>
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

export default AddBid;
