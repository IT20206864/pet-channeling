import { Button, View, Text, StyleSheet, TouchableHighlight } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight style={styles.buttonContainer}>
        <Button title="Add Staff" onPress={() => navigation.navigate('AddStaff')}></Button>
      </TouchableHighlight>
      <TouchableHighlight style={styles.buttonContainer}>
        <Button title="view Staff" onPress={() => navigation.navigate('ViewStaff')}></Button>
      </TouchableHighlight>
      <TouchableHighlight style={styles.buttonContainer}>
        <Button title="Reviews" onPress={() => navigation.navigate('Reviews')}></Button>
      </TouchableHighlight>
      <TouchableHighlight style={styles.buttonContainer}>
        <Button
          title="Staff Management"
          onPress={() => navigation.navigate('StaffManagement')}
        ></Button>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  buttonContainer: {
    height: 40,
    width: '100%',
    borderRadius: 10,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
  },
});

export default Home;
