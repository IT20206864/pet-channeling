import React, { useState, useEffect } from 'react';
import {
    Button,
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    DatePickerIOS,
    Alert,
    Image,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { commonStyles, channelingStyles } from '../../styles';
import * as ImagePicker from 'expo-image-picker';

export default function editChanneling({ route, navigation }) {

    const [description, setDescription] = useState(route.params.channeling.description);
    const [pets, setPets] = useState([
        { label: 'Tommy - Dog  ', value: 'Tommy - Dog' },
        { label: 'Kitty - Cat', value: 'Kitty - Cat' },
    ]);
    const [date, setDate] = useState(route.params.channeling.dateTime);
    const [dropDownOpen, setDropdownOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState(route.params.channeling.petName);
    const ownerName = "Shehan Silva"

    async function UpdateReservation() {
        const ref = doc(db, 'channeling', route.params.channeling.id);
        await updateDoc(ref, {
            petName: selectedPet,
            description: description,
            date: date,
        })
            .then(async () => {
                showToast('Reservation Updated Successfully!');
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
                    <Text style={channelingStyles.label}>Owner Name</Text>
                    <TextInput
                        style={channelingStyles.textInput}
                        value={ownerName}
                        editable={false}
                        placeholderTextColor="#b5b5ba"
                    />
                    <Text style={channelingStyles.label}>Select Pet</Text>
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
                    <Text style={channelingStyles.label}>Select Date and Time</Text>
                    <View style={channelingStyles.dateContainer}>
                        <DatePickerIOS
                            date={date} onDateChange={setDate}
                        />
                    </View>
                    <Text style={channelingStyles.label}>Enter a Description</Text>
                    <TextInput
                        multiline={true}
                        placeholder="Enter a brief description of what's wrong"
                        onChange={setDescription}
                        placeholderTextColor="#b5b5ba"
                        value={description}
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