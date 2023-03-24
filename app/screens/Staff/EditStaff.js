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
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import Toggle from 'react-native-toggle-element';

import { Icon } from '@rneui/themed';

const EditStaff = ({ route, navigation }) => {
  const [fullname, setfullname] = useState(route.params.data.fullname);
  const [email, setemail] = useState(route.params.data.email);
  const [contactNo, setcontactNo] = useState(route.params.data.contactNo);

  const [categories, setcategories] = useState([
    { label: 'Veterinarian  ', value: 'Veterinarian' },
    { label: 'Veterinary Technician', value: 'Veterinary Technician' },
  ]);
  const [categoryOpen, setcategoryOpen] = useState(false);
  const [selectedCategory, setselectedCategory] = useState(route.params.data.stafftype);
  const [theme, setTheme] = useState('light');
  const [toggleValue, setToggleValue] = useState(true);

  const styles = getStyles(theme);

  const toggleTheme = (newState) => {
    setToggleValue(newState);
    console.log(newState);
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

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
    const ref = doc(db, 'staff', route.params.data.staffId);
    await updateDoc(ref, {
      fullname: fullname,
      email: email,
      stafftype: selectedCategory,
      contactNo: contactNo,
    })
      .then(async () => {
        showToast('Staff Member Updated Successfully!');
        navigation.navigate('ViewStaff');
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.toggleContainer}>
            <Toggle
              value={toggleValue}
              onPress={() => toggleTheme(toggleValue)}
              thumbActiveComponent={<Icon name="sun" type="fontisto" color="gray" />}
              thumbInActiveComponent={<Icon name="night-clear" type="fontisto" color="gray" />}
              trackBar={{
                activeBackgroundColor: '#9ee3fb',
                inActiveBackgroundColor: '#3c4145',
                borderActiveColor: '#86c3d7',
                borderInActiveColor: '#1c1c1c',
                borderWidth: 5,
                width: 100,
              }}
            />
          </View>
          <Text style={styles.header}>Edit Staff</Text>
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
            placeholder="Enter Email"
            placeholderTextColor="#b5b5ba"
            onChangeText={setemail}
            value={email}
          ></TextInput>
          <View style={{ zIndex: 1000 }}>
            <Text style={styles.label}>Staff Type</Text>
            <DropDownPicker
              placeholder="Select Staff type"
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
            placeholder="Enter Contact No"
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
            <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 18 }}>Update Staff</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};
const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      paddingTop: 30,
      flex: 1,
      backgroundColor: theme === 'light' ? '#fff' : '#333',
      flexDirection: 'column',
    },
    header: {
      color: theme === 'light' ? '#000000' : '#fff',
      paddingBottom: 10,
      fontSize: 25,
      fontWeight: 'bold',
    },
    textInput: {
      backgroundColor: theme === 'light' ? '#F3F1F1' : '#fff',
      padding: 10,
      height: 40,
      width: '100%',
      fontSize: 18,
      marginBottom: 10,
      color: '#4A4A4A',
    },
    label: {
      marginVertical: 5,
      fontSize: 18,
      color: theme === 'light' ? '#808080' : '#fff',
      paddingBottom: 20,
    },
    scrollContainer: {
      padding: 10,
      alignContent: 'center',
    },
    dropDown: {
      backgroundColor: '#F3F1F1',
      height: 40,
      width: '100%',
      padding: 10,
      borderRadius: 5,
      fontSize: 18,
      marginBottom: 10,
      borderWidth: 0,
      color: '#4A4A4A',

      alignSelf: 'center',
      marginVertical: 10,
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
    toggleButton: {
      backgroundColor: theme === 'light' ? '#555' : '#fff',
      borderRadius: 5,
      padding: 10,
      width: '70%',
      alignItems: 'left',
    },
    toggleText: {
      color: theme === 'light' ? '#fff' : '#333',
      fontSize: 16,
    },
    toggleContainer: {
      justifyContent: 'flex-end',
      flexDirection: 'row',
    },
  });

export default EditStaff
