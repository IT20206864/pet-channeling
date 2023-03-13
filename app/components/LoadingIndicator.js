import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

function LoadingIndicator() {
  return (
    <View style={styles.loadingView}>
      <ActivityIndicator size="large" color="#f7ad19" />
    </View>
  );
}

styles = StyleSheet.create({
  loadingView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    opacity: 0.5,
    zIndex: 2,
  },
});

export default LoadingIndicator;
