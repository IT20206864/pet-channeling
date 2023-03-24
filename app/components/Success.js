import React from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function Success({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-circle-sharp" size={200} color="#35D627" />
      <Text style={styles.heading}>Submitted Successfully!</Text>
      <Text style={styles.subHeading}>An agent will contact you soon.</Text>
      <TouchableNativeFeedback
        onPress={() => navigation.navigate("View Channelings")}
      >
        <View style={styles.btn}>
          <Text style={styles.btnText}>View Your Reservations</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: "#3E3E3E",
  },
  subHeading: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "400",
    color: "#3E3E3E",
  },
  smallText: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "400",
    color: "#3E3E3E",
  },
  btn: {
    backgroundColor: "#42A5F5",
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 50,
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Success;
