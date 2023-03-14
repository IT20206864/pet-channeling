import { StyleSheet } from 'react-native';

const PRIMARY_COLOR = '#f7ad19'; //orange
const SECONDARY_COLOR = '#053f5c'; //blue

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export const reviewStyles = StyleSheet.create({
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
    borderColor: SECONDARY_COLOR,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageUploadText: {
    fontSize: 14,
    color: SECONDARY_COLOR,
    fontWeight: 'bold',
  },
  cameraIcon: {
    color: SECONDARY_COLOR,
  },
  textInput: {
    borderWidth: 2,
    borderColor: SECONDARY_COLOR,
    borderRadius: 16,
    height: 150,
    textAlignVertical: 'top',
    padding: 10,
    fontSize: 14,
  },
  submitReviewBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: 15,
    backgroundColor: PRIMARY_COLOR,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitReviewBtnTxt: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  reviewScrollView: {
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
    backgroundColor: PRIMARY_COLOR,
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
    borderColor: SECONDARY_COLOR,
    backgroundColor: SECONDARY_COLOR,
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
