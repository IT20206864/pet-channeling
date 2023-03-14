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

function Reviews({ navigation }) {
  const [showHeaderTitle, setshowHeaderTitle] = useState(false);
  const [reviews, setreviews] = useState([]);
  const [myReviews, setmyReviews] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
  const [email, setemail] = useState('cristiano@gmail.com');
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

    const docSnap = await getDocs(collection(db, 'reviews'));
    let rvs = [];
    let userRvs = [];
    docSnap.forEach((doc) => {
      if (doc.data().email === email) {
        userRvs.push({ id: doc.id, ...doc.data() });
      } else {
        rvs.push({ id: doc.id, ...doc.data() });
      }
    });

    setmyReviews(userRvs);
    setreviews(rvs);
    calcAvgRating([...userRvs, ...rvs]);
    setrefreshing(false);
  };

  //used to calculate average start rating
  const calcAvgRating = (arr) => {
    let total = 0;
    arr.map((d) => {
      total += d.startRating;
    });

    const avg = (total / arr.length).toFixed(1);
    setavgRating(avg);
  };

  useEffect(() => {
    fetchData(true);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/*       <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
          <MaterialCommunityIcons name="keyboard-backspace" size={28} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Reviews & Feedbacks</Text>
      </View> */}
      <ScrollView
        contentContainerStyle={styles.scrollView}
        onScroll={onScroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => fetchData(true)} />
        }
      >
        <View style={styles.ratings}>
          <View style={styles.overallRating}>
            <View style={styles.avgRatingWrapper}>
              <Text style={styles.avgRatingTxt}>{avgRating}</Text>
              <Text style={styles.avgRatingSecondaryText}>out of 5</Text>
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
              <Text style={styles.total}> {myReviews.length + reviews.length} Total Ratings</Text>
            </View>
          </View>
          <TouchableNativeFeedback
            style={{ width: '100%' }}
            onPress={() => navigation.navigate('Write Review')}
          >
            <View style={styles.writeReviewBtn}>
              <Text style={styles.writeReviewBtnTxt}>Write a Review</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
  },
  backBtn: {
    position: 'absolute',
    left: 10,
  },

  scrollView: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },

  ratings: {
    marginTop: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  overallRating: {
    width: '30%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  ratingBreakdown: {
    width: '70%',
  },
  avgRatingWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  avgRatingTxt: {
    fontSize: 52,
    color: '#2d2d2d',
    fontWeight: 'bold',
  },
  avgRatingSecondaryText: {
    fontSize: 12,
    marginBottom: 5,
    color: '#2d2d2d',
  },
  bars: {
    backgroundColor: '#cdcdcd',
    height: 80,
  },
  total: {
    textAlign: 'right',
    color: '#2d2d2d',
    fontSize: 14,
    marginTop: 10,
  },
  writeReviewBtn: {
    width: '100%',
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

export default Reviews;
