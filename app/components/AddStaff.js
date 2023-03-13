import React, { useState } from 'react';
import db from '../config';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { async } from '@firebase/util';
import { addDoc, collection } from 'firebase/firestore';
const AddStaff = ({ navigation }) => {
  const [fullname, setfullname] = useState('');
  const [email, setemail] = useState('');
  const [contactNo, setcontactNo] = useState('');

  const [categories, setcategories] = useState([
    { label: 'veterinarian  ', value: 'veterinarian' },
    { label: 'veterinary technician', value: 'veterinary technician' },
  ]);
  const [categoryOpen, setcategoryOpen] = useState(false);
  const [selectedCategory, setselectedCategory] = useState(null);

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

  return (
    <>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text
            style={{
              color: '#000000',
              paddingBottom: 10,
              fontSize: 25,
              fontWeight: 'bold',
            }}
          >
            Add New Staff
          </Text>
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
          ></TextInput>

          <TouchableOpacity
            onPress={() => AddStaff()}
            activeOpacity={0.7}
            style={{
              height: 55,
              width: '100%',
              backgroundColor: '#0077C2',
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
              height: 55,
              width: '100%',
              backgroundColor: '#0077C2',
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

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  textInput: {
    backgroundColor: '#F3F1F1',
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
    color: '#808080',
    paddingBottom: 20,
  },
  scrollContainer: {
    padding: 10,
    alignContent: 'center',
  },
  dropDown: {
    backgroundColor: '#F3F1F1',
    height: 60,
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
});

export default AddStaff;
