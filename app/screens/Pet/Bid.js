/**
 * @description This is a functional component for the Bid screen
 * @param {object} navigation - Navigation object with different methods to navigate between screens
*/

import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Bid = ({ navigation }) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [animation]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 1],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { transform: [{ translateY }], opacity }]}>
        <Text style={styles.logoText}></Text>
        <Text style={styles.logoText}>Welocme to Pet Biddings</Text>
        <Text style={styles.heading2}>In this page you will be able to place a bid to adopt any pet</Text>
        <Image
          resizeMode="contain"
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
      </Animated.View>
      <View style={styles.buttonContainer}></View>
      <View style={styles.buttonOuter}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.viewButton]}
            onPress={() => navigation.navigate('ViewBid')}
          >
            <Ionicons name="grid-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>View Bids</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.addButton]}
            onPress={() => navigation.navigate('AddBid')}
          >
            <Ionicons name="add-circle-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Add Bids</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    width: '100%',
    height: '75%',
  },
  logo: {
    width: '100%',
    height: '90%',
    marginBottom: 10,
  },
  logoText: {
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  heading2: {
    fontSize: 20,
    color: '#000000',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    padding: 10
  },
  buttonOuter: {
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: '100%',
    width: '40%',
    elevation: 5,
    padding: 20
  },
  viewButton: {
    backgroundColor: '#f7ad19',
  },
  addButton: {
    backgroundColor: '#053f5c',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: '5%',
    color: '#fff',
  },
});

export default Bid;
