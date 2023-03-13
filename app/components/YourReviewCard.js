import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ToastAndroid } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Rating } from 'react-native-rating-element';
import { updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config';
import ImageView from 'react-native-image-viewing';
import { getStorage, ref, deleteObject } from 'firebase/storage';

function YourReviewCard({ review, email, fetchData, navigation }) {
  const [showImageViewer, setshowImageViewer] = useState(false);
  //called when user clicks like button
  const like = (review) => {
    if (review.likes.includes(email)) {
      let arr = review.likes.filter((data) => email !== data);
      review.likes = arr;
    } else {
      review.likes.push(email);
      let arr = review.dislikes.filter((data) => email !== data);
      review.dislikes = arr;
    }
    updateReview(review);
  };

  //called when user clicks dislike button
  const dislike = (review) => {
    if (review.dislikes.includes(email)) {
      let arr = review.dislikes.filter((data) => email !== data);
      review.dislikes = arr;
    } else {
      review.dislikes.push(email);
      let arr = review.likes.filter((data) => email !== data);
      review.likes = arr;
    }
    updateReview(review);
  };

  //update a selected review
  const updateReview = (data) => {
    updateDoc(doc(db, 'reviews', data.id), {
      name: data.name,
      email: data.email,
      startRating: data.startRating,
      comment: data.comment,
      image: data.image,
      date: data.date,
      likes: data.likes,
      dislikes: data.dislikes,
    })
      .then(() => {
        fetchData(false);
      })
      .catch((err) => console.log(err));
  };

  //Confirmation alert when user tries to delete a review
  const confirmDelete = (id) => {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete your review? This process can not be undone.',
      [
        {
          text: 'Yes',
          onPress: () => deleteReview(id),
        },
        {
          text: 'No',
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  //delete a selected review
  const deleteReview = (id) => {
    deleteDoc(doc(db, 'reviews', id))
      .then(() => {
        fetchData(true);
        ToastAndroid.show('Review Deleted!', ToastAndroid.SHORT);
        deleteImage();
      })
      .catch((err) => console.log(err));
  };

  //delete image submitted with the review
  const deleteImage = () => {
    const storage = getStorage();

    const imageRef = ref(storage, review.image);

    deleteObject(imageRef);
  };
  return (
    <View style={styles.highlightedReview}>
      <View style={styles.highlightedReviewHeader}>
        <Text style={styles.highlightedReviewHeaderTxt}>Your Review</Text>
        <View style={styles.highlightedReviewHeaderActions}>
          <TouchableOpacity onPress={() => navigation.navigate('Edit Review', { review })}>
            <AntDesign name="edit" size={20} color="#fff" style={{ marginRight: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => confirmDelete(review.id)}>
            <AntDesign name="delete" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.reviewCard}>
        <View style={styles.reviewHeader}>
          <View style={styles.reviewHeader1}>
            <Text style={styles.reviewerName}>{review.name}</Text>
            <View style={styles.reviewRatingContainer}>
              <Rating
                rated={review.startRating}
                totalCount={5}
                ratingColor="#f7ad19"
                ratingBackgroundColor="#d4d4d4"
                size={12}
                readonly // by default is false
                icon="ios-star"
                direction="row" // anyOf["row" (default), "row-reverse", "column", "column-reverse"]
              />
              <Text style={styles.reviewStars}>{review.startRating.toFixed(1)} star(s)</Text>
            </View>
          </View>
          <Text style={styles.reviewDate}>{review.date}</Text>
        </View>
        {review.comment !== '' ? (
          <View style={styles.reviewTextContainer}>
            <Text style={styles.reviewText}>{review.comment}</Text>
          </View>
        ) : null}

        <View>
          {review.image !== '' ? (
            <Image
              style={styles.reviewImage}
              source={{
                uri: review.image,
              }}
            />
          ) : null}
          <TouchableOpacity style={styles.viewImgBtn} onPress={() => setshowImageViewer(true)}>
            <Text style={styles.viewImgBtnTxt}>Click to View</Text>
          </TouchableOpacity>
          <ImageView
            images={[{ uri: review.image }]}
            imageIndex={0}
            visible={showImageViewer}
            onRequestClose={() => setshowImageViewer(false)}
          />
        </View>
        <View style={styles.likeContainer}>
          <TouchableOpacity onPress={() => like(review)}>
            <View style={styles.feedbackBtn}>
              <Text
                style={[
                  styles.count,
                  {
                    color: review.likes.includes(email) ? '#f7ad19' : '#000',
                    fontWeight: review.likes.includes(email) ? 'bold' : 'normal',
                  },
                ]}
              >
                {review.likes.length}
              </Text>
              <AntDesign
                name={review.likes.includes(email) ? 'like1' : 'like2'}
                size={20}
                color={review.likes.includes(email) ? '#f7ad19' : '#000'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dislike(review)}>
            <View style={styles.feedbackBtn}>
              <Text
                style={[
                  styles.count,
                  {
                    color: review.dislikes.includes(email) ? '#f7ad19' : '#000',
                    fontWeight: review.dislikes.includes(email) ? 'bold' : 'normal',
                  },
                ]}
              >
                {review.dislikes.length}
              </Text>
              <AntDesign
                name={review.dislikes.includes(email) ? 'dislike1' : 'dislike2'}
                size={20}
                color={review.dislikes.includes(email) ? '#f7ad19' : '#000'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewCard: {
    width: '100%',
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewHeader1: {
    marginBottom: 10,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewDate: {
    fontSize: 12,
  },
  reviewStars: {
    fontSize: 12,
    marginLeft: 5,
  },
  reviewTextContainer: {
    marginBottom: 15,
  },
  reviewText: {
    fontSize: 16,
  },
  likeContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  likeBtn: {},
  feedbackBtn: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    /*  borderWidth: 1,
      borderColor: '#000', */
    marginLeft: 5,
    borderRadius: 20,
  },
  count: {
    marginRight: 5,
  },
  subHeader: {
    backgroundColor: 'blue',
  },
  reviewRatingContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewImage: {
    width: '100%',
    height: 150,
  },
  viewImgBtn: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    opacity: 0.5,
  },
  viewImgBtnTxt: {
    color: '#fff',
    opacity: 1,
    zIndex: 2,
  },
  highlightedReview: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#053f5c',
    backgroundColor: '#053f5c',
    marginBottom: 5,
  },
  highlightedReviewHeader: {
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  highlightedReviewHeaderTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  highlightedReviewHeaderActions: {
    flexDirection: 'row',
  },
});

export default YourReviewCard;
