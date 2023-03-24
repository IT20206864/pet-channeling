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

export const channelingStyles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  header: {
    color: '#000000',
    paddingBottom: 10,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  textInput: {
    backgroundColor: '#F3F1F1',
    padding: 10,
    height: 40,
    width: '100%',
    fontSize: 18,
    marginBottom: 10,
    color: '#4A4A4A',
  },
  label: {
    marginVertical: 5,
    fontSize: 18,
    color: '#808080',
    paddingBottom: 20,
  },
  scrollContainer: {
    padding: 10,
    alignContent: 'center',
  },
  dropDown: {
    backgroundColor: '#F3F1F1',
    height: 40,
    width: '100%',
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
    marginBottom: 10,
    borderWidth: 0,
    color: '#4A4A4A',
    borderWidth: 1,
    alignSelf: 'center',
    marginVertical: 10,
  },
  dropDownContainer: {
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#000',
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  dropDownSelected: {
    color: '#2AB9FE',
  },
  dropDownLabel: {
    color: '#4A4A4A',
    fontSize: 18,
  },
  dropDownPlaceholder: {
    color: '#b5b5ba',
    fontSize: 18,
  },
  toggleButton: {
    backgroundColor: '#555',
    borderRadius: 5,
    padding: 10,
    width: '70%',
    alignItems: 'left',
  },
  toggleText: {
    color: '#fff',
    fontSize: 16,
  },
  toggleContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  formContainer: {
    marginLeft: 20,
    marginTop: 10,
  },
  cameraBtn: {
    height: 20,
    width: '30%',
    backgroundColor: SECONDARY_COLOR,
    marginVertical: 20,
    justifyContent: "center",
    paddingLeft: 20,
    borderRadius: 10,

  },
  cameraBtnText: {
    color: '#fff'
  },

  chanellingsContainer: {
    backgroundColor: "#7FC9DA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
  },
});




