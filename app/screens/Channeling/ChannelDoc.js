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

function ChannelDoc({ navigation, route }) {
    // Fetch booking and see available times
    const [description, setDescription] = useState();
    // Get name , pets from login info
    const [pets, setPets] = useState([
        { label: 'Tommy - Dog  ', value: 'Tommy - Dog' },
        { label: 'Kitty - Cat', value: 'Kitty - Cat' },
    ]);
    const [date, setDate] = useState(new Date());
    const [dropDownOpen, setDropdownOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);
    const [fileUri, setFileUri] = useState();
    const ownerName = "Shehan"

    function AddReservation() {

    }

    //called to upload selected image to firebase storage
    const uploadImage = async () => {
        if (fileUri) {
            const response = await fetch(fileUri);
            const blob = await response.blob();

            const storage = getStorage();
            const storageRef = ref(storage, `chanelling/images/${fileUri.split('/').pop()}`);

            const uploadTask = uploadBytesResumable(storageRef, blob);

            uploadTask.on(
                'state_changed',
                (snapshot) => { },
                (error) => {
                    ToastAndroid.show('Error Making Reservation!', ToastAndroid.SHORT);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log(downloadURL);
                    });
                }
            );
        }
    };

    async function chooseImage() {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);

        if (!result.canceled) {
            console.log(result.assets[0].uri)
            setFileUri(result.assets[0].uri);
        }
    };

    async function cameraCapture() {
        const { status } = await ImagePicker.getCameraPermissionsAsync();
        console.log(status);
        if (status !== 'granted') {
            const newPermission = await ImagePicker.requestCameraPermissionsAsync();
            if (newPermission.status === 'granted') {
                let result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1, r
                })
                console.log(result);

                if (!result.canceled) {
                    setFileUri(result.assets[0].uri);
                }
            } else {
                Alert.alert("Grant Permissions to access camera !")
            }
        } else {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1, r
            })
            console.log(result);

            if (!result.canceled) {
                setFileUri(result.assets[0].uri);
            }
        }


    };
    const renderFileUri = () => {
        if (fileUri) {
            return (
                <> <Image source={{ fileUri: fileUri }} style={channelingStyles.imageContainer} /> </>
            )
        } else {
            return null;
        }
    }

    // Succeess message , evey channeling will be Rs. 1000 , to paid at the premises ,
    // if no show penalty of Rs. 2000
    // Create booking with receipt object
    return (
        <>
            <View style={channelingStyles.container}>
                <Text style={channelingStyles.header}>Make a reservation</Text>
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
                    <Text style={channelingStyles.label}>Pick Image from Camera Or Gallery</Text>
                    <View style={channelingStyles.ImageSections}>
                        {/* <View>{renderFileUri}</View> */}
                        <Image source={{ fileUri: fileUri }} style={channelingStyles.imageContainer} />
                    </View>

                    <View style={channelingStyles.btnParentSection}>
                        <TouchableOpacity
                            onPress={() => chooseImage()}
                            style={channelingStyles.cameraBtn}>
                            <Text style={channelingStyles.cameraBtnText}>Choose File</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => cameraCapture()}
                            style={channelingStyles.btnSection}>
                            <Text style={channelingStyles.cameraBtnText}>Directly Launch Camera</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => AddReservation()}
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
                        <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 18 }}>Make Reservation</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </>
    )
}

export default ChannelDoc