import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const StaffManagement = ({ navigation }) => {
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
        <Image
          resizeMode="stretch"
          source={require('../../assets/staff.png')}
          style={styles.logo}
        />
        <Text style={styles.logoText}>Welocme to Staff Management</Text>
      </Animated.View>
      <View style={styles.buttonContainer}></View>
      <View style={styles.buttonOuter}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.viewButton]}
            onPress={() => navigation.navigate('ViewStaff')}
          >
            <Ionicons name="ios-eye" size={30} color="#fff" />
            <Text style={styles.buttonText}>View Staff</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.addButton]}
            onPress={() => navigation.navigate('AddStaff')}
          >
            <Ionicons name="ios-add" size={30} color="#fff" />
            <Text style={styles.buttonText}>Add Staff</Text>
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
    borderRadius: 10,
    height: '100%',
    width: '40%',
    elevation: 5,
  },
  viewButton: {
    backgroundColor: '#4caf50',
  },
  addButton: {
    backgroundColor: '#2196f3',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: '5%',
    color: '#fff',
  },
});

export default StaffManagement;
