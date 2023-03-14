import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
  TextInput,
  ToastAndroid,
} from 'react-native';
import { Rating } from 'react-native-rating-element';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config';
import ReviewImagePicker from '../../components/ReviewImagePicker';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import LoadingIndicator from '../../components/LoadingIndicator';

function WriteReview({ navigation }) {
  const [startRating, setstartRating] = useState(0);
  const [comment, setcomment] = useState('');
  const [image, setimage] = useState(null);
  const [loading, setloading] = useState(false);

  //add a review
  const addReview = () => {
    //check if a valid star rating is given
    if (startRating !== 0) {
      setloading(true);
      uploadImage((uploadedImageUri) => {
        console.log('uri', uploadedImageUri);
        addDoc(collection(db, 'reviews'), {
          name: 'Cristiano Ronaldo',
          email: 'cristiano@gmail.com',
          startRating,
          comment,
          image: uploadedImageUri,
          date: new Date().toISOString().split('T')[0],
          likes: [],
          dislikes: [],
        })
          .then(() => {
            ToastAndroid.show('Review Submitted!', ToastAndroid.SHORT);
            setloading(false);
            navigation.goBack();
          })
          .catch((err) => {
            console.log(err);
            setloading(false);
            ToastAndroid.show('Error Submitting Review!', ToastAndroid.SHORT);
          });
      });
    } else {
      //show error if star rating was not given
      ToastAndroid.show('Please give a start rating!', ToastAndroid.SHORT);
    }
  };

  //called when user selects/ deletes an image
  const onImageChange = (imageUri) => {
    setimage(imageUri);
  };

  //called to upload selected image to firebase storage
  const uploadImage = async (callback) => {
    if (image) {
      const response = await fetch(image);
      const blob = await response.blob();

      const storage = getStorage();
      const storageRef = ref(storage, `reviews/images/${image.split('/').pop()}`);

      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          ToastAndroid.show('Error Submitting Review!', ToastAndroid.SHORT);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            callback(downloadURL);
          });
        }
      );
    } else {
      callback('');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {loading ? <LoadingIndicator /> : null}

      {/*  <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="keyboard-backspace" size={28} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Write a Review</Text>
      </View> */}
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.userRating}>
            <Text style={styles.labelTxt}>Select Your Rating</Text>
            <Text style={styles.ratingTxt}>{startRating.toFixed(1)}</Text>
            <Rating
              rated={startRating}
              totalCount={5}
              ratingColor="#f7ad19"
              ratingBackgroundColor="#d4d4d4"
              size={40}
              icon="ios-star"
              direction="row"
              onIconTap={(position) => setstartRating(position)}
            />
          </View>
          <ReviewImagePicker onImageChange={onImageChange} img={null} />
          <View style={{ marginTop: 30 }}>
            <Text style={[styles.labelTxt, { marginBottom: 10 }]}>Describe Your Experience</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Type here..."
              multiline={true}
              value={comment}
              onChangeText={setcomment}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableNativeFeedback style={{ width: '100%' }} onPress={addReview}>
        <View style={styles.writeReviewBtn}>
          <Text style={styles.writeReviewBtnTxt}>Submit Review</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flexGrow: 1,
    flexDirection: 'column',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
  },
  backBtn: {
    position: 'absolute',
    left: 10,
  },
  userRating: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  ratingTxt: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  ratingSecondaryText: {
    fontSize: 12,
    marginBottom: 10,
  },
  labelTxt: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 400,
  },
  imageUploadWrapper: {
    marginTop: 40,
    height: 150,
    borderWidth: 2,
    borderColor: '#053f5c',
    borderRadius: 16,
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
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#053f5c',
    borderRadius: 16,
    height: 150,
    textAlignVertical: 'top',
    padding: 10,
    fontSize: 14,
  },
  writeReviewBtn: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    marginTop: 15,
    backgroundColor: '#f7ad19',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  writeReviewBtnTxt: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});

export default WriteReview;
