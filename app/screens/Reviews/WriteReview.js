import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
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
import { commonStyles, reviewStyles } from '../../styles';

function WriteReview({ navigation, route }) {
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
          vetName: route.params.vetName,
          name: route.params.name,
          email: route.params.email,
          startRating,
          comment,
          image: uploadedImageUri,
          date: new Date().toISOString(),
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
        (snapshot) => { },
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
    <View style={commonStyles.container}>
      <StatusBar style="auto" />
      {loading ? <LoadingIndicator /> : null}

      {/*  <View style={reviewStyles.header}>
        <TouchableOpacity style={reviewStyles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="keyboard-backspace" size={28} color="black" />
        </TouchableOpacity>

        <Text style={reviewStyles.headerTitle}>Write a Review</Text>
      </View> */}
      <ScrollView>
        <View style={reviewStyles.body}>
          <View style={reviewStyles.userRating}>
            <Text style={reviewStyles.labelTxt}>Select Your Rating</Text>
            <Text style={reviewStyles.ratingTxt}>{startRating.toFixed(1)}</Text>
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
            <Text style={[reviewStyles.labelTxt, { marginBottom: 10 }]}>
              Describe Your Experience
            </Text>
            <TextInput
              style={reviewStyles.textInput}
              placeholder="Type here..."
              multiline={true}
              value={comment}
              onChangeText={setcomment}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableNativeFeedback style={{ width: '100%' }} onPress={addReview}>
        <View style={reviewStyles.submitReviewBtn}>
          <Text style={reviewStyles.submitReviewBtnTxt}>Submit Review</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

export default WriteReview;
