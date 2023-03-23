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
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { addDoc, collection } from 'firebase/firestore';
import Toggle from 'react-native-toggle-element';
import { Icon } from '@rneui/themed';

const AddStaff = ({ navigation }) => {
  const [fullname, setfullname] = useState('');
  const [email, setemail] = useState('');
  const [contactNo, setcontactNo] = useState('');

  const [categories, setcategories] = useState([
    { label: 'Veterinarian  ', value: 'Veterinarian' },
    { label: 'Veterinary Technician', value: 'Veterinary Technician' },
  ]);
  const [categoryOpen, setcategoryOpen] = useState(false);
  const [selectedCategory, setselectedCategory] = useState(null);
  const [theme, setTheme] = useState('light');
  const [toggleValue, setToggleValue] = useState(true);

  const styles = getStyles(theme);

  //change theme
  const toggleTheme = (newState) => {
    setToggleValue(newState);
    console.log(newState);
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  //Add staff member
  async function saveStaff(async) {
    await addDoc(collection(db, 'staff'), {
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
        showToast('Staff Member Added Successfully!');
        navigation.navigate('ViewStaff');
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function AddStaff() {
    console.log('but');
    if (fullname.length == 0 || email.length == 0 || contactNo.length == 0) {
      alert('The fields Name, Mail and Phone are required');
      return;
    }
    saveStaff();
  }

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

          <Text style={styles.header}>Add New Staff</Text>
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
            keyboardType="email-address"
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
            onPress={() => AddStaff()}
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
            <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 18 }}>Save Staff</Text>
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
            <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 18 }}>Clear</Text>
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
      borderWidth: 1,
      alignSelf: 'center',
      marginVertical: 10,
    },
    dropDownContainer: {
      borderWidth: 1,
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

export default AddStaff;
