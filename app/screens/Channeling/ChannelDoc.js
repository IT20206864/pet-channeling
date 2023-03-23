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
    Alert
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { commonStyles, channelingStyles } from '../../styles';
import * as ImagePicker from 'expo-image-picker';

const ChannelDoc = ({ navigation }) => {
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


    async function chooseImage() {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);

        if (!result.canceled) {
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
            return
            <> <Image source={{ fileUri: fileUri }} style={channelingStyles.imageContainer} /> </>
        } else {
            return null;
        }
    }

    // Succeess message , evey channeling will be Rs. 1000 , to paid at the premises ,
    // if no show penalty of Rs. 2000
    // Create booking with receipt object
    return (
        <>
            <View style={[commonStyles.container, { backgroundColor: '#EEEEEE' }]}>
                <View style={channelingStyles.formContainer}>
                    <TextInput
                        style={channelingStyles.input}
                        value={ownerName}
                        editable={false}
                    />
                    <DropDownPicker

                        value={selectedPet}
                        items={pets}
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
                    <View style={channelingStyles.dateContainer}>
                        <DatePickerIOS
                            date={date} onDateChange={setDate}
                        />
                    </View>
                    <TextInput
                        multiline={true}
                        placeholder="Enter a brief description of what's wrong"
                        onChange={setDescription}
                        value={description}
                    />
                    <Text
                        style={{ textAlign: 'center', fontSize: 20, paddingBottom: 10 }}>
                        Pick Images from Camera & Gallery
                    </Text>
                    <View style={channelingStyles.ImageSections}>
                        <View>{renderFileUri}</View>
                    </View>

                    <View style={channelingStyles.btnParentSection}>
                        <TouchableOpacity
                            onPress={() => chooseImage()}
                            style={channelingStyles.btnSection}>
                            <Text style={channelingStyles.btnText}>Choose File</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => cameraCapture()}
                            style={channelingStyles.btnSection}>
                            <Text style={channelingStyles.btnText}>Directly Launch Camera</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}

export default ChannelDoc;