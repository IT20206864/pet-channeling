import React, { useState, useEffect } from 'react';
import { useToast } from "react-native-toast-notifications";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Alert,
    Image,
    Pressable
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { channelingStyles } from '../../styles';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection, onSnapshot } from '@firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db } from '../../config';
import LoadingIndicator from '../../components/LoadingIndicator';

function ChannelDoc({ navigation, route }) {

    const [description, setDescription] = useState('');
    const [pets, setPets] = useState([
        { label: 'Tommy - Dog  ', value: 'Tommy - Dog' },
        { label: 'Kitty - Cat', value: 'Kitty - Cat' },
    ]);
    const [doctors, setDoctors] = useState([]);
    const [date, setDat] = useState(new Date("2023-03-27"));
    const [dropDownOpen, setDropdownOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);
    const [DocDropDownOpen, setDocDropdownOpen] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [fileUri, setFileUri] = useState(null);
    const [loading, setLoading] = useState(false);
    const ownerName = "Shehan"
    const toast = useToast();

    const setDate = (event, date) => {
        const {
            nativeEvent: { timestamp },
        } = event;
        setDat(new Date(timestamp))
        console.log(timestamp);
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

    async function AddReservation() {
        try {
            if (selectedDoc === undefined || selectedPet === undefined || date === undefined) {
                alert('Veterinary , pet name and date are mandatory !');
                return;
            }
            else {
                setLoading(true);
                uploadImage(async (imageUri) => {
                    console.log(description);
                    await addDoc(collection(db, 'channelings'), {
                        date: date.toString(),
                        description: description,
                        vetName: selectedDoc,
                        image: imageUri,
                        petName: selectedPet,
                        ownerName: ownerName,
                    }).then(() => {
                        setLoading(false);
                        toast.show("Reservation Created", {
                            type: "success",
                            placement: "bottom",
                            duration: 4000,
                            offset: 30,
                            animationType: "slide-in",
                        });
                        setTimeout(() => {
                            navigation.navigate('Success Screen')
                        }, 4000)
                    }).catch((err) => {
                        setLoading(false);
                        console.log(err);
                        toast.show("Failed to create reservation ! ", {
                            type: "danger",
                            placement: "bottom",
                            duration: 4000,
                            offset: 30,
                            animationType: "slide-in",
                        });
                    })
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    //called to upload selected image to firebase storage
    const uploadImage = async (callback) => {
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
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        callback(downloadURL);
                    });
                }
            );
        }
        else {
            callback('');
        }
    }

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
            console.log(fileUri);
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
                    quality: 1
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
                quality: 1
            })
            console.log(result);
            if (!result.canceled) {
                setFileUri(result.assets[0].uri);
            }
        }
    };
    return (
        <>
            <View style={channelingStyles.container}>

                <Text style={channelingStyles.header}>Make a reservation</Text>
                {loading ? <LoadingIndicator /> : null}
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
                        placeholder="Select your Pet"
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
                    <Text style={channelingStyles.label2}>Select Date and Time</Text>
                    <View style={channelingStyles.dateContainer}>
                        <DateTimePicker
                            mode="datetime"
                            value={new Date(date)}
                            minuteInterval={10}
                            minimumDate={new Date(Date.now())}
                            onChange={setDate}
                        />
                    </View>
                    <TextInput
                        multiline={true}
                        placeholder="Enter a brief description of what's wrong"
                        onChangeText={setDescription}
                        placeholderTextColor="#b5b5ba"
                        value={description}
                        style={channelingStyles.multiline}
                    />
                    <Text style={channelingStyles.label1}>Pick Image from Camera Or Gallery</Text>
                    <View style={channelingStyles.ImageSections}>
                        {/* {fileUri && (
                            <Image source={{ uri: fileUri }} style={channelingStyles.image} />
                        )} */}
                        {fileUri && (
                            <Pressable>
                                <Image source={{ uri: fileUri }} style={channelingStyles.image} />
                            </Pressable>
                        )}
                    </View>

                    <View style={channelingStyles.imageBtns}>
                        <TouchableOpacity
                            onPress={chooseImage}
                            style={channelingStyles.cameraBtn}>
                            <Text style={channelingStyles.cameraBtnText}>Choose File</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={cameraCapture}
                            style={channelingStyles.cameraBtn}>
                            <Text style={channelingStyles.cameraBtnText}>Capture Image</Text>
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