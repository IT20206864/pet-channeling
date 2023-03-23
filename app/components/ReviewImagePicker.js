import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  Image,
  StyleSheet,
  Text,
  Pressable,
  Alert,
  ToastAndroid,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import ImageView from 'react-native-image-viewing';

function ReviewImagePicker({ img, onImageChange }) {
  const [image, setimage] = useState(null);
  const [showImageViewer, setshowImageViewer] = useState(false);

  //called when user wants to select an image
  pickImageHandler = () => {
    Alert.alert(
      'Select Image',
      'Choose an option...',
      [
        {
          text: 'Open Camera',
          onPress: () => openCamera(),
        },
        {
          text: 'Open Gallery',
          onPress: () => openLibrary(),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  //called to grant access to gallery and select an image
  const openLibrary = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      ToastAndroid.show(
        "You've refused to allow this app to access your photos!",
        ToastAndroid.LONG
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      setimage(result.assets[0].uri);
      onImageChange(result.assets[0].uri);
    }
  };

  //called to grant camera access and take a photo
  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      ToastAndroid.show(
        "You've refused to allow this app to access your camera!",
        ToastAndroid.LONG
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setimage(result.assets[0].uri);
      onImageChange(result.assets[0].uri);
    }
  };

  //Used for deleting the selected image
  deleteImage = () => {
    setimage(null);
    onImageChange(null);
  };

  useEffect(() => {
    setimage(img);
    console.log('rrr', img);
  }, []);

  return (
    <View style={styles.container}>
      {image && (
        <Pressable onPress={() => setshowImageViewer(true)}>
          <Image source={{ uri: image }} style={styles.image} />
        </Pressable>
      )}
      {image && (
        <ImageView
          images={[{ uri: image }]}
          imageIndex={0}
          visible={showImageViewer}
          onRequestClose={() => setshowImageViewer(false)}
        />
      )}
      {image && (
        <Pressable style={styles.deleteImageWrapper} onPress={deleteImage}>
          <AntDesign name="delete" size={24} color="red" style={styles.deleteIcon} />
          <Text style={styles.deleteImageText}>Delete Photo</Text>
        </Pressable>
      )}
      <Pressable style={styles.imageUploadWrapper} onPress={pickImageHandler}>
        <AntDesign name="camerao" size={24} color="black" style={styles.cameraIcon} />
        <Text style={styles.imageUploadText}>Upload a Photo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 40 },
  imageUploadWrapper: {
    marginTop: 10,
    height: 50,
    borderWidth: 2,
    borderColor: '#053f5c',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageUploadText: {
    fontSize: 14,
    color: '#053f5c',
    fontWeight: 'bold',
  },
  cameraIcon: {
    color: '#053f5c',
    marginRight: 10,
  },
  deleteIcon: { color: '#fff', marginRight: 10 },
  deleteImageText: { fontSize: 14, color: '#fff', fontWeight: 'bold' },
  deleteImageWrapper: {
    marginTop: 10,
    height: 50,
    backgroundColor: '#950101',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: '100%', height: 200, borderRadius: 16 },
});

export default ReviewImagePicker;
