import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableNativeFeedback, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          source={require('../assets/logo.png')}
          style={styles.image}
        ></Image>
        <Text style={styles.heading}>Friendly Paws</Text>
        <Image
          resizeMode="contain"
          source={require('../assets/logo.png')}
          style={styles.image}
        ></Image>
      </View>

      <View style={styles.cardContainer}>
        <TouchableNativeFeedback onPress={() => navigation.navigate('Channel Doctor')}>
          <View style={[styles.card, styles.firstCard]}>
            <Fontisto name="doctor" size={28} color="black" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Chanelling</Text>
          </View>
        </TouchableNativeFeedback>
        {/* <TouchableNativeFeedback onPress={() => navigation.navigate('StaffManagement')}>
          <View style={styles.card}>
            <MaterialIcons name="feedback" size={28} color="black" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>User Reviews</Text>
          </View>
        </TouchableNativeFeedback> */}
        <TouchableNativeFeedback onPress={() => navigation.navigate('StaffManagement')}>
          <View style={styles.card}>
            <FontAwesome5 name="hospital-user" size={28} color="black" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Manage Staff</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
        //onPress={() => navigation.navigate("Admin View Complaints")}
        >
          <View style={[styles.card, styles.lastCard]}>
            <FontAwesome5 name="dog" size={28} color="red" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Pet Adopt</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => navigation.navigate('View Channelings')}
        >
          <View style={[styles.card, styles.lastCard]}>
            <FontAwesome5 name="dog" size={28} color="red" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>View Channelings</Text>
          </View>
        </TouchableNativeFeedback>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7ad19',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  heading: {
    fontSize: 40,
    fontWeight: '700',
    margin: 5,
    color: '#053f5c',
  },
  buttonContainer: {
    height: 40,
    width: '100%',
    borderRadius: 10,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 4,
  },
  card: {
    padding: 20,
    width: 300,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#053f5c',
    borderRadius: 20,
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: '#29b6f6',
  },
  cardIcon: {
    marginBottom: 10,
    color: '#29b6f6',
  },
  firstCard: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  lastCard: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '15%',
    borderBottomRightRadius: -10,
  },
});

export default Home;
