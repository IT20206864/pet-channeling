import React, { useState, useEffect } from 'react';
import { useToast } from "react-native-toast-notifications";
import {
    View,
    Text, TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { channelingStyles } from '../../styles';
import { db } from '../../config';
import { onSnapshot, collection, updateDoc, doc } from 'firebase/firestore';

export default function EditChanneling({ route, navigation }) {

    const [description, setDescription] = useState(route.params.channeling.description);
    const [pets, setPets] = useState([
        { label: 'Tommy - Dog  ', value: 'Tommy - Dog' },
        { label: 'Kitty - Cat', value: 'Kitty - Cat' },
    ]);
    const [doctors, setDoctors] = useState([]);
    const [date, setDat] = useState(route.params.channeling.cDate);
    const [dropDownOpen, setDropdownOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState(route.params.channeling.petName);
    const [DocDropDownOpen, setDocDropdownOpen] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(route.params.channeling.vetName);
    const ownerName = "Shehan Silva"
    const toast = useToast();

    const setDate = (event, date) => {
        const {
            type,
            nativeEvent: { timestamp },
        } = event;
        setDat(new Date(timestamp))
    };
    // Fetch Doctors 
    useEffect(() => {
        const colRef = collection(db, 'staff');
        onSnapshot(colRef, (QuerySnapshot) => {
            const doctors = [];
            QuerySnapshot.forEach((doc) => {
                const { fullname } = doc.data();
                const docId = doc.id;
                doctors.push({
                    label: fullname,
                    value: fullname,
                });
            });
            setDoctors(doctors);
        });
    }, []);
    async function UpdateReservation() {
        const ref = doc(db, 'channelings', route.params.channeling.id);
        await updateDoc(ref, {
            petName: selectedPet,
            description: description,
            date: date.toString(),
            vetName: selectedDoc,
        })
            .then(() => {
                toast.show("Reservation Updated Successfully !", {
                    type: "success",
                    placement: "bottom",
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                });
                navigation.navigate('View Channelings');
            })
            .catch((error) => {
                alert(error.message);
            });
    }
    return (
        <>
            <View style={channelingStyles.container}>
                <Text style={channelingStyles.header}>Edit reservation</Text>
                <ScrollView style={channelingStyles.formContainer}>
                    <Text style={channelingStyles.label1}>Owner Name</Text>
                    <TextInput
                        style={channelingStyles.textInput}
                        value={ownerName}
                        editable={false}
                        placeholderTextColor="#b5b5ba"
                    />
                    <DropDownPicker
                        value={selectedPet}
                        items={pets}
                        open={dropDownOpen}
                        setOpen={setDropdownOpen}
                        setValue={setSelectedPet}
                        setItems={setPets}
                        listMode="SCROLLVIEW"
                        dropDownContainerStyle={channelingStyles.dropDownContainer}
                        style={channelingStyles.dropDown}
                        selectedItemLabelStyle={channelingStyles.dropDownSelected}
                        labelStyle={channelingStyles.dropDownLabel}
                        listItemLabelStyle={channelingStyles.dropDownLabel}
                        placeholderStyle={channelingStyles.dropDownPlaceholder}
                    />
                    <DropDownPicker
                        value={selectedDoc}
                        items={doctors}
                        open={DocDropDownOpen}
                        setOpen={setDocDropdownOpen}
                        setValue={setSelectedDoc}
                        setItems={setDoctors}
                        listMode="SCROLLVIEW"
                        placeholder="Select a veterinarian"
                        dropDownContainerStyle={channelingStyles.dropDownContainer}
                        style={channelingStyles.dropDown}
                        selectedItemLabelStyle={channelingStyles.dropDownSelected}
                        labelStyle={channelingStyles.dropDownLabel}
                        listItemLabelStyle={channelingStyles.dropDownLabel}
                        placeholderStyle={channelingStyles.dropDownPlaceholder}
                    />

                    <Text style={[channelingStyles.label1, { marginTop: 20 }]}>Select Date and Time</Text>
                    <View style={channelingStyles.dateContainer}>
                        <DateTimePicker
                            mode="datetime"
                            value={new Date(date)}
                            minuteInterval={10}
                            minimumDate={new Date()}
                            onChange={setDate}
                        />
                    </View>
                    <Text style={[channelingStyles.label1, { marginTop: 20 }]}>Enter a Description</Text>
                    <TextInput
                        multiline={true}
                        placeholder="Enter a brief description of what's wrong"
                        onChangeText={setDescription}
                        placeholderTextColor="#b5b5ba"
                        value={description}
                        style={[channelingStyles.multiline, { marginTop: 5 }]}
                    />
                    <TouchableOpacity
                        onPress={() => UpdateReservation()}
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
                        <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 18 }}>Update Reservation</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </>
    )
}