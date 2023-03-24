/**
 * @description Component that allows the user to take a picture with the camera and displays a preview of the taken image.
 * @param {function} onTakeImage - Function to be called when an image is taken with the camera.
*/

import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { useState } from 'react';

import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';

function ImagePicker({ onTakeImage }) {

  // State to store the URI of the captured image
  const [pickedImage, setPickedImage] = useState();

  // Get camera permissions and status
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

  // Verify camera permissions
  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.'
      );
      return false;
    }

    return true;
  }

  // Handler for taking image using the device camera
  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(image);

    setPickedImage(image.uri);
    onTakeImage(image.uri);
  }

  // Display a preview of the captured image
  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
