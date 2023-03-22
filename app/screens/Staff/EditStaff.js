import React, { useState } from 'react';
import { db } from '../../config';
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
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
const EditStaff = ({ route, navigation }) => {
  const [fullname, setfullname] = useState(route.params.data.fullname);
  const [email, setemail] = useState(route.params.data.email);
  const [contactNo, setcontactNo] = useState(route.params.data.contactNo);

  const [categories, setcategories] = useState([
    { label: 'veterinarian  ', value: 'veterinarian' },
    { label: 'veterinary technician', value: 'veterinary technician' },
  ]);
  const [categoryOpen, setcategoryOpen] = useState(false);
  const [selectedCategory, setselectedCategory] = useState(route.params.data.stafftype);

  async function updateStaff() {
    const ref = doc(db, 'staff', route.params.data.staffId);
    await updateDoc(ref, {
      fullname: fullname,
      email: email,
      stafftype: selectedCategory,
      contactNo: contactNo,
    })
      .then(() => {
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
          <Text
            style={{
              color: '#000000',
              paddingBottom: 10,
              fontSize: 25,
              fontWeight: 'bold',
            }}
          >
            Edit Staff
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
            onPress={() => updateStaff()}
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

export default EditStaff;
