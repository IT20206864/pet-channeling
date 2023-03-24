import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
  RefreshControl,
} from 'react-native';
import { Rating } from 'react-native-rating-element';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config';
import YourReviewCard from '../../components/YourReviewCard';
import ReviewCard from '../../components/ReviewCard';
import { commonStyles, reviewStyles } from '../../styles';

function Reviews({ navigation, route }) {
  const [showHeaderTitle, setshowHeaderTitle] = useState(false);
  const [reviews, setreviews] = useState([]);
  const [myReviews, setmyReviews] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
  const [email, setemail] = useState('anjulasjay@gmail.com');
  const [vetName, setvetName] = useState('')
  const [name, setname] = useState('Anjula Jayasinghe');
  const [avgRating, setavgRating] = useState('0.0');

  //called when user scrolls the view
  const onScroll = (event) => {
    if (event.nativeEvent.contentOffset.y > 92) {
      setshowHeaderTitle(true);
    } else {
      setshowHeaderTitle(false);
    }
  };

  //called to fetch reviews from firebase
  const fetchData = async (showRefreshing) => {
    if (showRefreshing) {
      setrefreshing(true);
    }

    const docSnap = await getDocs(collection(db, `reviews`));
    let rvs = [];
    let userRvs = [];
    docSnap.forEach((doc) => {
      if (doc.data().vetName === route.params.channeling.vetName) {
        if (doc.data().email === email) {
          userRvs.push({ id: doc.id, ...doc.data() });
        } else {
          rvs.push({ id: doc.id, ...doc.data() });
        }
      }
    });

    setmyReviews(userRvs);
    setreviews(rvs);
    calcAvgRating([...userRvs, ...rvs]);
    setrefreshing(false);
  };

  //used to calculate average start rating
  const calcAvgRating = (arr) => {
    if (arr.length > 0) {
      let total = 0;
      arr.map((d) => {
        total += d.startRating;
      });

      const avg = (total / arr.length).toFixed(1);
      setavgRating(avg);
    } else {
      setavgRating(0);
    }
  };

  useEffect(() => {
    setvetName(route.params.channeling.vetName);
    fetchData(true);

  }, []);
  return (
    <View style={[commonStyles.container, { backgroundColor: '#EEEEEE' }]}>
      <StatusBar style="auto" />
      {/*       <View style={reviewStyles.header}>
        <TouchableOpacity style={reviewStyles.backBtn}>
          <MaterialCommunityIcons name="keyboard-backspace" size={28} color="black" />
        </TouchableOpacity>

        <Text style={reviewStyles.headerTitle}>Reviews & Feedbacks</Text>
      </View> */}
      <ScrollView
        contentContainerStyle={reviewStyles.reviewScrollView}
        onScroll={onScroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => fetchData(true)} />
        }
      >
        <View style={reviewStyles.ratings}>
          <View style={reviewStyles.overallRating}>
            <View style={reviewStyles.avgRatingWrapper}>
              <Text style={reviewStyles.avgRatingTxt}>{avgRating}</Text>
              <Text style={reviewStyles.avgRatingSecondaryText}>out of 5</Text>
              <Rating
                rated={parseFloat(avgRating)}
                totalCount={5}
                ratingColor="#f7ad19"
                ratingBackgroundColor="#d4d4d4"
                size={24}
                readonly
                icon="ios-star"
                direction="row"
              />
              <Text style={reviewStyles.total}>
                {' '}
                {myReviews.length + reviews.length} Total Ratings
              </Text>
            </View>
          </View>
          <TouchableNativeFeedback
            style={{ width: '100%' }}
            onPress={() => navigation.navigate('Write Review', { vetName, email, name })}
          >
            <View style={reviewStyles.writeReviewBtn}>
              <Text style={reviewStyles.writeReviewBtnTxt}>Write a Review</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        {myReviews.map((review) => {
          return (
            <YourReviewCard
              key={review.id}
              review={review}
              email={email}
              fetchData={fetchData}
              navigation={navigation}
            />
          );
        })}

        {reviews.map((review) => {
          return <ReviewCard key={review.id} review={review} email={email} fetchData={fetchData} />;
        })}
      </ScrollView>
    </View>
  );
}

export default Reviews;
